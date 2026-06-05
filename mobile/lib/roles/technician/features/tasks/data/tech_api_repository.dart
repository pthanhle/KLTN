import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/tech_task_model.dart';

class TechApiRepository {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  // Backend auto-filters by mechanic_id when role is 'service'
  Future<List<TechTaskModel>> getTasks({String? status}) async {
    final token = await _getToken();
    if (token == null) throw Exception('SESSION_EXPIRED');

    final params = <String, dynamic>{'limit': 100};
    if (status != null) params['status'] = status;

    try {
      final response = await _dio.get(
        '${ApiConfig.baseUrl}/staff/service/repair-progress',
        queryParameters: params,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data;
      if (data['repairProgresses'] == null) return [];

      final List progresses = data['repairProgresses'];
      final result = <TechTaskModel>[];
      for (int i = 0; i < progresses.length; i++) {
        try {
          result.add(_mapToTask(progresses[i]));
        } catch (e) {
          print('[TechRepo] Failed to parse progress[$i]: $e');
        }
      }
      return result;
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.remove('access_token');
        throw Exception('SESSION_EXPIRED');
      }
      throw Exception('Không thể tải danh sách công việc: ${e.message}');
    }
  }

  Future<void> submitDiagnostics({
    required String progressId,
    required List<Map<String, dynamic>> diagnostics,
    required String conclusion,
  }) async {
    final token = await _getToken();
    if (token == null) throw Exception('SESSION_EXPIRED');

    try {
      await _dio.post(
        '${ApiConfig.baseUrl}/staff/service/repair-progress/diagnostics',
        data: {
          'progress_id': progressId,
          'diagnostics': diagnostics,
          'conclusion': conclusion,
        },
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.remove('access_token');
        throw Exception('SESSION_EXPIRED');
      }
      throw Exception(
        e.response?.data?['message'] ?? 'Không thể gửi kết quả chẩn đoán: ${e.message}',
      );
    }
  }

  TechTaskModel _mapToTask(Map<String, dynamic> json) {
    final booking = json['booking_id'] ?? {};
    final vehicle = booking['vehicle_info'] ?? {};

    final startDt = json['expected_start_datetime'] != null
        ? DateTime.tryParse(json['expected_start_datetime'].toString())
        : null;
    final endDt = json['expected_end_datetime'] != null
        ? DateTime.tryParse(json['expected_end_datetime'].toString())
        : null;

    final String startTime = startDt != null
        ? '${startDt.hour.toString().padLeft(2, '0')}:${startDt.minute.toString().padLeft(2, '0')}'
        : '--:--';
    final String endTime = endDt != null
        ? '${endDt.hour.toString().padLeft(2, '0')}:${endDt.minute.toString().padLeft(2, '0')}'
        : '--:--';

    final String status = json['status']?.toString() ?? 'DIAGNOSING';
    final taskStatus = _parseStatus(status);

    return TechTaskModel(
      // Store progress._id as task id so MPI submit can use it
      id: json['_id']?.toString() ?? '',
      plate: vehicle['license_plate']?.toString() ?? '',
      model: '${vehicle['brand'] ?? ''} ${vehicle['model'] ?? ''}'.trim(),
      bay: json['bay_id']?.toString() ?? '-',
      startTime: startTime,
      endTime: endTime,
      role: 'Thợ chính',
      urgency: TechTaskUrgency.standard,
      status: taskStatus,
    );
  }

  TechTaskStatus _parseStatus(String status) {
    switch (status) {
      case 'DIAGNOSING':
        return TechTaskStatus.diagnosing;
      case 'QUOTING':
      case 'IN_PROGRESS':
        return TechTaskStatus.inProgress;
      case 'COMPLETED':
        return TechTaskStatus.completed;
      default:
        return TechTaskStatus.diagnosing;
    }
  }
}

final techApiRepository = TechApiRepository();
