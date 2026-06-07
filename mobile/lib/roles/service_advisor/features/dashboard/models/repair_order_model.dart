import '../../walkaround/models/service_package_model.dart';

class VehicleInfo {
  final String licensePlate;
  final String model;
  final String color;
  final String? imageUrl;

  VehicleInfo({
    required this.licensePlate,
    required this.model,
    required this.color,
    this.imageUrl,
  });

  factory VehicleInfo.fromJson(Map<String, dynamic> json) {
    return VehicleInfo(
      licensePlate: json['license_plate'] ?? '',
      model: json['model'] ?? '',
      color: json['color'] ?? '',
      imageUrl: json['image_url'],
    );
  }
}

class CustomerInfo {
  final String name;
  final String phone;

  CustomerInfo({
    required this.name,
    required this.phone,
  });

  factory CustomerInfo.fromJson(Map<String, dynamic> json) {
    return CustomerInfo(
      name: json['name'] ?? '',
      phone: json['phone'] ?? '',
    );
  }
}

class AssignedTechnician {
  final String id;
  final String name;
  final String avatarUrl;

  AssignedTechnician({
    required this.id,
    required this.name,
    required this.avatarUrl,
  });

  factory AssignedTechnician.fromJson(Map<String, dynamic> json) {
    return AssignedTechnician(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      avatarUrl: json['avatarUrl'] ?? '',
    );
  }
}

class ReceptionInfo {
  final int odometer;
  final double fuelLevel;
  final String customerNotes;
  final List<Map<String, dynamic>> damageMap;
  final List<Map<String, dynamic>> belongings;
  final String? advisorSignatureUrl;
  final String? customerSignatureUrl;

  ReceptionInfo({
    this.odometer = 0,
    this.fuelLevel = 0.0,
    this.customerNotes = '',
    this.damageMap = const [],
    this.belongings = const [],
    this.advisorSignatureUrl,
    this.customerSignatureUrl,
  });

  factory ReceptionInfo.fromJson(Map<String, dynamic> json, Map<String, dynamic> signatures) {
    return ReceptionInfo(
      odometer: json['odometer'] ?? 0,
      fuelLevel: (json['fuel_level'] ?? 0.0).toDouble(),
      customerNotes: json['customer_notes'] ?? '',
      damageMap: List<Map<String, dynamic>>.from(json['damage_map'] ?? []),
      belongings: List<Map<String, dynamic>>.from(json['belongings'] ?? []),
      advisorSignatureUrl: signatures['advisor']?['signature_url'],
      customerSignatureUrl: signatures['customer']?['signature_url'],
    );
  }
}

enum ROStage {
  pending,       // Cần đón
  quotation,     // Báo giá
  inProgress,    // Đang sửa
  qc,            // Chờ QC
  delivery,      // Giao xe
}

class MpiCategory {
  final String id;
  final String title;
  final String? technicianNote;
  final List<Map<String, dynamic>> items;

  MpiCategory({
    required this.id,
    required this.title,
    this.technicianNote,
    this.items = const [],
  });

  factory MpiCategory.fromJson(Map<String, dynamic> json) {
    return MpiCategory(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      technicianNote: json['technician_note']?.toString(),
      items: List<Map<String, dynamic>>.from(json['items'] ?? []),
    );
  }

  int get warningCount => items.where((i) => i['status'] == 'warning').length;
  int get criticalCount => items.where((i) => i['status'] == 'critical').length;
}

class RepairOrderModel {
  final String id;
  final String bookingId;
  final String bookingCode;
  final String customerNote;
  final VehicleInfo vehicleInfo;
  final CustomerInfo customerInfo;
  final String serviceType;
  final bool isWaitingInLounge;
  final ROStage stage;
  final String rawStatus;
  final DateTime scheduledArrivalTime;
  final DateTime? actualArrivalTime;
  final DateTime? expectedDeliveryTime;
  final AssignedTechnician? assignedTechnician;
  final List<ServicePackageModel> selectedServices;
  final ReceptionInfo? receptionInfo;
  final List<MpiCategory> mpiDiagnostics;
  final String mpiConclusion;
  final String? pendingSupplementId;
  final double servicePackageTotal;

  RepairOrderModel({
    required this.id,
    required this.bookingId,
    this.bookingCode = '',
    this.customerNote = '',
    required this.vehicleInfo,
    required this.customerInfo,
    required this.serviceType,
    required this.isWaitingInLounge,
    required this.stage,
    this.rawStatus = '',
    required this.scheduledArrivalTime,
    this.actualArrivalTime,
    this.expectedDeliveryTime,
    this.assignedTechnician,
    this.selectedServices = const [],
    this.receptionInfo,
    this.mpiDiagnostics = const [],
    this.mpiConclusion = '',
    this.pendingSupplementId,
    this.servicePackageTotal = 0.0,
  });

  factory RepairOrderModel.fromJson(Map<String, dynamic> json) {
    ROStage _parseStage(String status) {
      switch (status) {
        case 'QUOTATION': return ROStage.quotation;
        case 'IN_PROGRESS': return ROStage.inProgress;
        case 'QC': return ROStage.qc;
        case 'DELIVERY': return ROStage.delivery;
        case 'PENDING':
        default: return ROStage.pending;
      }
    }

    ReceptionInfo? parsedReceptionInfo;
    final timelineList = json['timeline'] as List<dynamic>? ?? [];
    for (var step in timelineList) {
      if (step['step'] == 'RECEIVED' && step['reception_info'] != null) {
        parsedReceptionInfo = ReceptionInfo.fromJson(
          step['reception_info'],
          step['signatures'] ?? {},
        );
        break;
      }
    }

    return RepairOrderModel(
      id: json['id'] ?? '',
      bookingId: json['bookingId'] ?? '',
      bookingCode: json['bookingCode'] ?? '',
      customerNote: json['customerNote'] ?? '',
      vehicleInfo: VehicleInfo.fromJson(json['vehicle_info'] ?? {}),
      customerInfo: CustomerInfo.fromJson(json['customer_info'] ?? {}),
      serviceType: json['service_type'] ?? '',
      isWaitingInLounge: json['is_waiting_in_lounge'] ?? false,
      stage: _parseStage(json['stage'] ?? 'PENDING'),
      scheduledArrivalTime: DateTime.parse(json['scheduled_arrival_time'] ?? json['actual_arrival_time'] ?? DateTime.now().toIso8601String()),
      actualArrivalTime: json['actual_arrival_time'] != null ? DateTime.parse(json['actual_arrival_time']) : null,
      expectedDeliveryTime: json['expected_delivery_time'] != null ? DateTime.parse(json['expected_delivery_time']) : null,
      assignedTechnician: json['assigned_technician'] != null 
          ? AssignedTechnician.fromJson(json['assigned_technician']) 
          : null,
      selectedServices: (json['selected_services'] as List<dynamic>?)
              ?.map((e) => ServicePackageModel.fromJson(e))
              .toList() ??
          [],
      receptionInfo: parsedReceptionInfo,
    );
  }
}
