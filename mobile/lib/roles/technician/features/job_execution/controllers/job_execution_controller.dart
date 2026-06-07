import 'dart:async';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import '../models/job_task_model.dart';
import '../models/job_part_model.dart';

class JobExecutionState {
  final String? progressId;
  final List<JobTaskModel> tasks;
  final List<JobPartModel> parts;
  final bool isLoading;
  final String? error;
  // true khi đơn đang ở bước WAITING_PARTS (kho chưa xuất đủ phụ tùng cho báo giá)
  final bool awaitingParts;

  JobExecutionState({
    this.progressId,
    required this.tasks,
    required this.parts,
    this.isLoading = false,
    this.error,
    this.awaitingParts = false,
  });

  JobExecutionState copyWith({
    String? progressId,
    List<JobTaskModel>? tasks,
    List<JobPartModel>? parts,
    bool? isLoading,
    String? error,
    bool? awaitingParts,
  }) {
    return JobExecutionState(
      progressId: progressId ?? this.progressId,
      tasks: tasks ?? this.tasks,
      parts: parts ?? this.parts,
      isLoading: isLoading ?? this.isLoading,
      error: error,
      awaitingParts: awaitingParts ?? this.awaitingParts,
    );
  }
}

class JobExecutionController extends AsyncNotifier<JobExecutionState> {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
  ));

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  @override
  FutureOr<JobExecutionState> build() async {
    return JobExecutionState(tasks: [], parts: []);
  }

  Future<void> init(String progressId) async {
    final current = state.value;
    if (current?.progressId == progressId) return;

    state = AsyncData(JobExecutionState(progressId: progressId, tasks: [], parts: [], isLoading: true));

    try {
      final token = await _getToken();
      if (token == null) throw Exception('Phiên đăng nhập đã hết hạn');

      final response = await _dio.get(
        '${ApiConfig.baseUrl}/staff/service/repair-progress/$progressId',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data as Map<String, dynamic>? ?? {};
      final quotation = data['quotation'] as Map<String, dynamic>? ?? {};
      final labors = quotation['labors'] as List<dynamic>? ?? [];
      // Phụ tùng đang chờ phải lấy từ `parts_usage` (nguồn dữ liệu thật do kho cập nhật
      // trạng thái nhặt hàng), KHÔNG lấy từ `quotation.parts` (danh sách tĩnh advisor báo giá).
      final partsUsage = data['parts_usage'] as List<dynamic>? ?? [];
      final progressStatus = (data['status'] ?? data['progress']?['status'])?.toString();
      final awaitingParts = progressStatus == 'WAITING_PARTS';

      final taskModels = labors.asMap().entries.map((entry) {
        final i = entry.key;
        final l = entry.value as Map<String, dynamic>;
        return JobTaskModel(
          id: l['_id']?.toString() ?? l['service_id']?.toString() ?? 'labor_$i',
          laborCode: l['labor_code']?.toString() ?? l['service_id']?.toString() ?? 'labor_$i',
          // Backend lưu tên hạng mục công việc trong field `description`
          // (xem backend/models/repairProgressModel.js -> quotation.labors)
          name: l['description']?.toString() ?? l['service_name']?.toString() ?? 'Hạng mục ${i + 1}',
          description: '${l['hours'] ?? 0} giờ công',
          icon: JobTaskIcon.build,
        );
      }).toList();

      final partModels = partsUsage.asMap().entries.map((entry) {
        final i = entry.key;
        final p = entry.value as Map<String, dynamic>;
        final rawStatus = p['status']?.toString() ?? 'WAITING';
        final etaRaw = p['eta']?.toString();
        final eta = etaRaw != null ? DateTime.tryParse(etaRaw) : null;

        JobPartStatus status;
        switch (rawStatus) {
          case 'IN_PROGRESS':
            status = JobPartStatus.installing;
            break;
          case 'COMPLETED':
            status = JobPartStatus.completed;
            break;
          case 'WAITING':
          default:
            // Quá hạn ETA mà kho vẫn chưa xuất -> coi như hàng đặt thêm (backorder)
            status = (eta != null && eta.isBefore(DateTime.now()))
                ? JobPartStatus.backorder
                : JobPartStatus.pending;
        }

        return JobPartModel(
          id: p['_id']?.toString() ?? p['part_id']?.toString() ?? 'part_$i',
          sku: p['sku']?.toString() ?? '',
          name: p['name']?.toString() ?? 'Phụ tùng ${i + 1}',
          quantity: (p['quantity'] as num?)?.toInt() ?? 1,
          icon: JobPartIcon.settings,
          status: status,
          etaTime: eta,
        );
      }).toList();

      state = AsyncData(JobExecutionState(
        progressId: progressId,
        tasks: taskModels,
        parts: partModels,
        isLoading: false,
        awaitingParts: awaitingParts,
      ));
    } catch (e) {
      state = AsyncData(JobExecutionState(
        progressId: progressId,
        tasks: [],
        parts: [],
        isLoading: false,
        error: e.toString(),
      ));
    }
  }

  Future<void> startTask(String taskId) async {
    final currentState = state.value;
    if (currentState == null) return;
    // Khoá thao tác bắt đầu thi công cho tới khi kho xuất đủ phụ tùng cho đơn này
    if (currentState.awaitingParts) return;

    final updatedTasks = currentState.tasks.map((task) {
      if (task.id == taskId && task.status == JobTaskStatus.pending) {
        return task.copyWith(status: JobTaskStatus.inProgress, startedAt: DateTime.now());
      }
      return task;
    }).toList();

    state = AsyncData(currentState.copyWith(tasks: updatedTasks));
  }

  Future<void> completeTask(String taskId) async {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedTasks = currentState.tasks.map((task) {
      if (task.id == taskId && task.status == JobTaskStatus.inProgress) {
        return task.copyWith(status: JobTaskStatus.completed, completedAt: DateTime.now());
      }
      return task;
    }).toList();

    state = AsyncData(currentState.copyWith(tasks: updatedTasks));
  }

  Future<void> refresh() async {
    final progressId = state.value?.progressId;
    if (progressId == null) return;
    state = AsyncData(JobExecutionState(tasks: [], parts: []));
    await init(progressId);
  }
}

final jobExecutionControllerProvider = AsyncNotifierProvider<JobExecutionController, JobExecutionState>(
  () => JobExecutionController(),
);
