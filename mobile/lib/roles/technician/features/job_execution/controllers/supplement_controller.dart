import 'dart:async';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import '../models/supplement_request_model.dart';
import '../utils/supplement_validators.dart';

class SupplementController extends AsyncNotifier<SupplementRequestModel?> {
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
  FutureOr<SupplementRequestModel?> build() {
    return null;
  }

  Future<void> submitRequest({
    required String orderId,
    required String taskId,
    required String description,
    required String proposedSolution,
    required List<String> evidenceUrls,
  }) async {
    final descError = SupplementValidators.validateDescription(description);
    if (descError != null) throw Exception(descError);

    final solError = SupplementValidators.validateSolution(proposedSolution);
    if (solError != null) throw Exception(solError);

    state = const AsyncLoading();

    try {
      final token = await _getToken();
      if (token == null) throw Exception('Phiên đăng nhập đã hết hạn');

      final title = description.length > 50 ? description.substring(0, 50) : description;

      await _dio.post(
        '${ApiConfig.baseUrl}/staff/service/repair-progress/supplement',
        data: {
          'progress_id': orderId,
          'title': title,
          'description': description,
          'delay_reason': proposedSolution,
          'parts': [],
          'labors': [],
          'total_price': 0,
          'evidence_images': evidenceUrls.where((u) => !u.contains('dummy')).toList(),
        },
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final request = SupplementRequestModel(
        orderId: orderId,
        taskId: taskId,
        description: description,
        proposedSolution: proposedSolution,
        evidenceUrls: evidenceUrls,
        status: 'PENDING',
      );

      state = AsyncData(request);
    } on DioException catch (e) {
      final msg = e.response?.data?['message']?.toString() ?? 'Không thể gửi yêu cầu bổ sung';
      state = AsyncError(Exception(msg), StackTrace.current);
      throw Exception(msg);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }
}

final supplementControllerProvider = AsyncNotifierProvider<SupplementController, SupplementRequestModel?>(
  () => SupplementController(),
);
