import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/walkaround_model.dart';
import '../models/service_package_model.dart';

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
      'advisor_signature_data': data.advisorSignatureData,
      'customer_signature_data': data.customerSignatureData,
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

  Future<List<ServicePackageModel>> fetchServiceCatalog({String search = ''}) async {
    final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/catalog/service-items';
    final token = await _getToken();
    if (token == null) throw Exception('Vui lòng đăng nhập lại.');

    try {
      final response = await _dio.get(
        url,
        queryParameters: {
          if (search.isNotEmpty) 'search': search,
          'limit': 100,
        },
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final List rawItems = response.data['serviceItems'] ?? [];
      return rawItems.map((item) {
        final json = item as Map<String, dynamic>;
        final estimatedHours = (json['estimated_hours'] as num?)?.toDouble();
        return ServicePackageModel(
          id: json['id']?.toString() ?? '',
          sku: json['sku']?.toString() ?? '',
          name: json['name']?.toString() ?? '',
          priceType: json['price_type']?.toString() ?? 'FIXED',
          basePrice: (json['price'] as num?)?.toDouble() ?? 0.0,
          estimatedDuration: estimatedHours != null ? (estimatedHours * 60).round() : null,
          category: json['category']?.toString() ?? '',
        );
      }).toList();
    } on DioException catch (e) {
      final msg = (e.response?.data is Map)
          ? e.response?.data['message']?.toString()
          : null;
      throw Exception(msg ?? 'Lỗi khi tải danh mục dịch vụ.');
    }
  }
}
