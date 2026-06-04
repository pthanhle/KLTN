import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/repair_order_model.dart';

class AdvisorApiRepository {
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

  Future<List<RepairOrderModel>> getRepairOrders() async {
    final url = '${ApiConfig.baseUrl}/staff/service/repair-progress';
    final token = await _getToken();
    
    if (token == null) throw Exception('Vui lòng đăng nhập lại.');

    try {
      final response = await _dio.get(
        url,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data;
      if (data['repairProgresses'] != null) {
        final List progresses = data['repairProgresses'];
        return progresses.map((json) => _mapBackendToModel(json)).toList();
      }
      return [];
    } on DioException catch (e) {
      throw Exception('Không thể tải dữ liệu: ${e.message}');
    } catch (e) {
      throw Exception('Đã xảy ra lỗi: $e');
    }
  }

  RepairOrderModel _mapBackendToModel(Map<String, dynamic> json) {
    final booking = json['booking_id'] ?? {};
    final vehicle = booking['vehicle_info'] ?? {};
    final customer = booking['user_id'] ?? {};
    final service = booking['service_id'] ?? {};

    ROStage parseStage(String status) {
      switch (status) {
        case 'QUOTATION': return ROStage.quotation;
        case 'IN_PROGRESS': return ROStage.inProgress;
        case 'QC': return ROStage.qc;
        case 'DELIVERY': return ROStage.delivery;
        case 'RECEIVED': return ROStage.pending;
        case 'PENDING':
        default: return ROStage.pending;
      }
    }

    return RepairOrderModel(
      id: json['_id'] ?? '',
      bookingId: (booking['_id'] ?? '').toString(),
      vehicleInfo: VehicleInfo(
        licensePlate: vehicle['license_plate'] ?? '',
        model: vehicle['model'] ?? vehicle['brand'] ?? '',
        color: vehicle['color'] ?? '',
      ),
      customerInfo: CustomerInfo(
        name: customer['full_name'] ?? '',
        phone: customer['phone'] ?? '',
      ),
      serviceType: service['service_name'] ?? booking['service_type'] ?? '',
      isWaitingInLounge: false,
      stage: parseStage(json['status'] ?? 'PENDING'),
      scheduledArrivalTime: booking['booking_date'] != null 
          ? DateTime.parse(booking['booking_date']) 
          : DateTime.now(),
      actualArrivalTime: null,
      expectedDeliveryTime: json['expected_delivery_time'] != null 
          ? DateTime.parse(json['expected_delivery_time']) 
          : null,
      assignedTechnician: json['mechanic_id'] != null 
          ? AssignedTechnician(
              id: json['mechanic_id']['_id'] ?? '',
              name: json['mechanic_id']['full_name'] ?? '',
              avatarUrl: json['mechanic_id']['avatar'] ?? '',
            )
          : null,
    );
  }
}
