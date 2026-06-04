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

enum ROStage {
  pending,       // Cần đón
  quotation,     // Báo giá
  inProgress,    // Đang sửa
  qc,            // Chờ QC
  delivery,      // Giao xe
}

class RepairOrderModel {
  final String id;
  final String bookingId;
  final VehicleInfo vehicleInfo;
  final CustomerInfo customerInfo;
  final String serviceType;
  final bool isWaitingInLounge;
  final ROStage stage;
  final DateTime scheduledArrivalTime;
  final DateTime? actualArrivalTime;
  final DateTime? expectedDeliveryTime;
  final AssignedTechnician? assignedTechnician;
  final List<ServicePackageModel> selectedServices;

  RepairOrderModel({
    required this.id,
    required this.bookingId,
    required this.vehicleInfo,
    required this.customerInfo,
    required this.serviceType,
    required this.isWaitingInLounge,
    required this.stage,
    required this.scheduledArrivalTime,
    this.actualArrivalTime,
    this.expectedDeliveryTime,
    this.assignedTechnician,
    this.selectedServices = const [],
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

    return RepairOrderModel(
      id: json['id'] ?? '',
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
    );
  }
}
