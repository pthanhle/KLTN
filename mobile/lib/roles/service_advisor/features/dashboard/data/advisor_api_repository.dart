import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/repair_order_model.dart';
// MpiCategory is defined in repair_order_model.dart

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

    if (token == null) throw Exception('SESSION_EXPIRED');

    try {
      final response = await _dio.get(
        url,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data;
      if (data['repairProgresses'] != null) {
        final List progresses = data['repairProgresses'];
        final List<RepairOrderModel> result = [];
        for (int i = 0; i < progresses.length; i++) {
          try {
            result.add(_mapBackendToModel(progresses[i]));
          } catch (parseErr) {
            print('[AdvisorRepo] Failed to parse progress[$i]: $parseErr');
            print('[AdvisorRepo] Raw data: ${progresses[i]}');
          }
        }
        return result;
      }
      return [];
    } on DioException catch (e) {
      print('[AdvisorRepo] DioException: ${e.response?.statusCode} ${e.message}');
      print('[AdvisorRepo] Response body: ${e.response?.data}');
      if (e.response?.statusCode == 401) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.remove('access_token');
        throw Exception('SESSION_EXPIRED');
      }
      throw Exception('Không thể tải dữ liệu: ${e.message}');
    } catch (e) {
      print('[AdvisorRepo] Unexpected error: $e');
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
        // Reception done → advisor waits for KTV; KTV diagnosing; or advisor creating quotation
        case 'RECEIVED':
        case 'DIAGNOSING':
        case 'QUOTING':
        case 'QUOTATION': return ROStage.quotation;
        case 'IN_PROGRESS': return ROStage.inProgress;
        case 'QC_TESTING':
        case 'QC': return ROStage.qc;
        case 'DELIVERY':
        case 'COMPLETED': return ROStage.delivery;
        case 'PENDING':
        default: return ROStage.pending;
      }
    }

    final currentStatus = json['current_step'] ?? json['status'] ?? 'PENDING';

    ReceptionInfo? parsedReceptionInfo;
    List<MpiCategory> mpiDiagnostics = [];
    String mpiConclusion = '';

    final timelineList = json['timeline'] as List<dynamic>? ?? [];
    for (var step in timelineList) {
      if (step['step'] == 'RECEIVED' && step['reception_info'] != null) {
        parsedReceptionInfo = ReceptionInfo.fromJson(
          step['reception_info'],
          step['signatures'] ?? {},
        );
      }
      if (step['step'] == 'DIAGNOSING' && step['diagnostics'] != null) {
        final diagList = step['diagnostics'] as List<dynamic>;
        mpiDiagnostics = diagList
            .map((d) => MpiCategory.fromJson(d as Map<String, dynamic>))
            .toList();
        mpiConclusion = step['notes']?.toString() ?? '';
      }
    }

    String? pendingSupplementId;
    final supplementRequests = json['supplement_requests'] as List<dynamic>? ?? [];
    for (final s in supplementRequests) {
      if ((s['status'] ?? '') == 'PENDING') {
        pendingSupplementId = s['_id']?.toString();
        break;
      }
    }

    return RepairOrderModel(
      id: json['_id']?.toString() ?? '',
      bookingId: booking['_id']?.toString() ?? '',
      bookingCode: booking['booking_code']?.toString() ?? '',
      customerNote: booking['customer_note']?.toString() ?? '',
      vehicleInfo: VehicleInfo(
        licensePlate: vehicle['license_plate']?.toString() ?? '',
        model: vehicle['model']?.toString() ?? vehicle['brand']?.toString() ?? '',
        color: vehicle['color']?.toString() ?? '',
      ),
      customerInfo: CustomerInfo(
        name: customer['full_name']?.toString() ?? '',
        phone: customer['phone']?.toString() ?? '',
      ),
      serviceType: (service is Map ? service['service_name']?.toString() : null) ?? booking['service_type']?.toString() ?? '',
      isWaitingInLounge: false,
      stage: parseStage(currentStatus),
      rawStatus: currentStatus,
      scheduledArrivalTime: booking['booking_date'] != null
          ? (DateTime.tryParse(booking['booking_date'].toString()) ?? DateTime.now())
          : DateTime.now(),
      actualArrivalTime: null,
      expectedDeliveryTime: json['expected_delivery_time'] != null
          ? DateTime.tryParse(json['expected_delivery_time'].toString())
          : null,
      assignedTechnician: json['mechanic_id'] != null && json['mechanic_id'] is Map
          ? AssignedTechnician(
              id: json['mechanic_id']['_id']?.toString() ?? '',
              name: json['mechanic_id']['full_name']?.toString() ?? '',
              avatarUrl: json['mechanic_id']['avatar']?.toString() ?? '',
            )
          : null,
      receptionInfo: parsedReceptionInfo,
      mpiDiagnostics: mpiDiagnostics,
      mpiConclusion: mpiConclusion,
      pendingSupplementId: pendingSupplementId,
    );
  }
}
