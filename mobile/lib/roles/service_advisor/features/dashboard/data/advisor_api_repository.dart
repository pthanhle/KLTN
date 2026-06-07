import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/repair_order_model.dart';
import '../../walkaround/models/service_package_model.dart';
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

    final currentStatus = json['current_step'] ?? json['status'] ?? 'PENDING';

    // Parse timeline first — receptionInfo is needed to determine the correct stage
    ReceptionInfo? parsedReceptionInfo;
    List<MpiCategory> mpiDiagnostics = [];
    String mpiConclusion = '';

    final timelineList = json['timeline'] as List<dynamic>? ?? [];
    for (var step in timelineList) {
      // Only treat reception as done when the RECEIVED step is COMPLETED.
      // The initial timeline entry (created when admin assigns an advisor) has
      // status 'IN_PROGRESS' and may carry an empty reception_info object from
      // Mongoose schema defaults. We must not mistake that for a real walkaround.
      if (step['step'] == 'RECEIVED' &&
          step['status'] == 'COMPLETED' &&
          step['reception_info'] != null) {
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

    // Determine stage after parsing receptionInfo.
    // Admin may assign a mechanic (→ DIAGNOSING) before the advisor has done the
    // walkaround. Reception is the gate: until reception_info exists the advisor
    // must stay in "Cần Đón", regardless of whether the current_step is RECEIVED
    // or DIAGNOSING.
    ROStage stage;
    switch (currentStatus) {
      case 'WAITING_PARTS':
      case 'IN_PROGRESS':
        stage = ROStage.inProgress;
        break;
      case 'QC_TESTING':
      case 'QC':
        stage = ROStage.qc;
        break;
      case 'DELIVERY':
      case 'COMPLETED':
        stage = ROStage.delivery;
        break;
      default:
        // RECEIVED, DIAGNOSING, QUOTING — or anything unknown:
        // if reception not done yet → Cần Đón; otherwise → Báo Giá
        stage = parsedReceptionInfo == null ? ROStage.pending : ROStage.quotation;
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
      stage: stage,
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
      servicePackageTotal: (booking['total_cost'] as num?)?.toDouble() ?? 0.0,
      selectedServices: _parseBookedServices(service, booking),
    );
  }

  /// Builds the list of pre-booked services from the booking's service_id object.
  /// The booking stores a single service; total_cost is used as the price since
  /// basePrice on the service may be a base rate before any booking-level pricing.
  List<ServicePackageModel> _parseBookedServices(dynamic service, Map<String, dynamic> booking) {
    if (service is! Map || service.isEmpty) return [];
    final totalCost = (booking['total_cost'] as num?)?.toDouble() ?? 0.0;
    return [
      ServicePackageModel(
        id: service['_id']?.toString() ?? service['id']?.toString() ?? '',
        sku: service['sku']?.toString() ?? '',
        name: service['service_name']?.toString() ?? service['name']?.toString() ?? '',
        description: service['description']?.toString() ?? '',
        basePrice: totalCost,
        category: service['category']?.toString() ?? '',
        isPackage: true,
      ),
    ];
  }
}
