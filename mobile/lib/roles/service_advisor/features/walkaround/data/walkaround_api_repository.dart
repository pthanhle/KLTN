import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/walkaround_model.dart';

class WalkaroundApiRepository {
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

  Future<Map<String, dynamic>> submitReception({
    required String bookingId,
    required WalkaroundModel data,
  }) async {
    final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/reception';
    final token = await _getToken();
    if (token == null) throw Exception('Vui lòng đăng nhập lại.');

    final damageMap = data.hotspots.asMap().entries.map((entry) {
      final i = entry.key;
      final h = entry.value;
      return {
        'label': '${i + 1}',
        'description': h.note,
        'x': h.x,
        'y': h.y,
      };
    }).toList();

    final belongings = data.checklist.map((item) {
      return {
        'item': item.name,
        'status': item.checked,
      };
    }).toList();

    final payload = {
      'booking_id': bookingId,
      'odometer': data.odometer,
      'fuel_level': (data.fuelLevel * 100).round(),
      'customer_notes': data.customerComplaint,
      'damage_map': damageMap,
      'belongings': belongings,
      'signature_data': data.signatureData,
    };

    try {
      final response = await _dio.post(
        url,
        data: payload,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      return response.data as Map<String, dynamic>;
    } on DioException catch (e) {
      final msg = (e.response?.data is Map)
          ? e.response?.data['message']?.toString()
          : null;
      throw Exception(msg ?? 'Lỗi khi gửi dữ liệu tiếp nhận.');
    }
  }
}
