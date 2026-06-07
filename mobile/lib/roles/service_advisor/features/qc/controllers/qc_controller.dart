import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';

class QcCheckItem {
  final String id;
  final String label;
  final bool checked;

  const QcCheckItem({required this.id, required this.label, this.checked = false});

  QcCheckItem copyWith({bool? checked}) =>
      QcCheckItem(id: id, label: label, checked: checked ?? this.checked);

  Map<String, dynamic> toJson() => {'id': id, 'label': label, 'passed': checked};
}

class QcState {
  final String progressId;
  final List<QcCheckItem> checklist;
  final bool isSubmitting;
  final String advisorSignature; // base64-encoded PNG

  const QcState({
    this.progressId = '',
    this.checklist = const [],
    this.isSubmitting = false,
    this.advisorSignature = '',
  });

  QcState copyWith({
    String? progressId,
    List<QcCheckItem>? checklist,
    bool? isSubmitting,
    String? advisorSignature,
  }) =>
      QcState(
        progressId: progressId ?? this.progressId,
        checklist: checklist ?? this.checklist,
        isSubmitting: isSubmitting ?? this.isSubmitting,
        advisorSignature: advisorSignature ?? this.advisorSignature,
      );

  bool get allChecked => checklist.isNotEmpty && checklist.every((c) => c.checked);
  bool get canSubmit => allChecked && advisorSignature.isNotEmpty;
}

class QcController extends Notifier<QcState> {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
  ));

  @override
  QcState build() => const QcState();

  void init(String progressId) {
    state = QcState(
      progressId: progressId,
      checklist: _defaultChecklist(),
    );
  }

  List<QcCheckItem> _defaultChecklist() => const [
        QcCheckItem(id: 'wash', label: 'Rửa xe sạch sẽ'),
        QcCheckItem(id: 'noise', label: 'Không còn tiếng ồn bất thường'),
        QcCheckItem(id: 'lights', label: 'Đèn hoạt động bình thường'),
        QcCheckItem(id: 'brakes', label: 'Phanh hoạt động tốt'),
        QcCheckItem(id: 'oil_level', label: 'Mức dầu đúng tiêu chuẩn'),
        QcCheckItem(id: 'parts_installed', label: 'Phụ tùng lắp đặt đúng vị trí'),
        QcCheckItem(id: 'tools_removed', label: 'Đã thu dọn dụng cụ trong xe'),
        QcCheckItem(id: 'test_drive', label: 'Đã lái thử xác nhận hoạt động tốt'),
      ];

  void toggle(String id) {
    final updated = state.checklist.map((c) => c.id == id ? c.copyWith(checked: !c.checked) : c).toList();
    state = state.copyWith(checklist: updated);
  }

  void setSignature(String base64Sig) {
    state = state.copyWith(advisorSignature: base64Sig);
  }

  void clearSignature() {
    state = state.copyWith(advisorSignature: '');
  }

  Future<void> submitQc() async {
    if (state.progressId.isEmpty) throw Exception('Không có lệnh sửa chữa');
    if (!state.canSubmit) throw Exception('Vui lòng hoàn thành checklist và ký tên trước khi xác nhận');

    state = state.copyWith(isSubmitting: true);
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('access_token');

      await _dio.post(
        '${ApiConfig.baseUrl}/staff/service/repair-progress/qc',
        data: jsonEncode({
          'progress_id': state.progressId,
          'qc_checklist': state.checklist.map((c) => c.toJson()).toList(),
          'advisor_signature': state.advisorSignature,
          'qc_metrics': {
            'items_passed': state.checklist.where((c) => c.checked).length,
            'items_total': state.checklist.length,
          },
        }),
        options: Options(headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        }),
      );
    } finally {
      state = state.copyWith(isSubmitting: false);
    }
  }
}

final qcControllerProvider = NotifierProvider<QcController, QcState>(QcController.new);
