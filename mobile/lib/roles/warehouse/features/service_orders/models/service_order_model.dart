import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';

enum ServiceOrderStatus {
  pendingPick,      // Chờ nhặt hàng
  readyForHandover, // Chờ giao KTV
  handedOver,       // Đã giao KTV
}

class AssignedTechnician {
  final String technicianId;
  final String name;
  final String role;
  final String? avatarUrl;
  final String bayNumber;

  const AssignedTechnician({
    required this.technicianId,
    required this.name,
    required this.role,
    this.avatarUrl,
    required this.bayNumber,
  });

  factory AssignedTechnician.fromJson(Map<String, dynamic> json) {
    return AssignedTechnician(
      technicianId: json['technician_id'] as String,
      name: json['name'] as String,
      role: json['role'] as String,
      avatarUrl: json['avatar_url'] as String?,
      bayNumber: json['bay_number'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'technician_id': technicianId,
      'name': name,
      'role': role,
      'avatar_url': avatarUrl,
      'bay_number': bayNumber,
    };
  }
}

class ServiceCustomerInfo {
  final String name;
  final String licensePlate;
  final String vehicleModel;

  const ServiceCustomerInfo({
    required this.name,
    required this.licensePlate,
    required this.vehicleModel,
  });

  factory ServiceCustomerInfo.fromJson(Map<String, dynamic> json) {
    return ServiceCustomerInfo(
      name: json['name'] as String,
      licensePlate: json['license_plate'] as String,
      vehicleModel: json['vehicle_model'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'license_plate': licensePlate,
      'vehicle_model': vehicleModel,
    };
  }
}

class ServicePartItem {
  final String partId;
  final String sku;
  final String name;
  final int quantity;
  final String warehouseStatus;
  final DateTime? estimatedArrivalAt;
  final String? binLocation;

  const ServicePartItem({
    required this.partId,
    required this.sku,
    required this.name,
    required this.quantity,
    required this.warehouseStatus,
    this.estimatedArrivalAt,
    this.binLocation,
  });

  factory ServicePartItem.fromJson(Map<String, dynamic> json) {
    return ServicePartItem(
      partId: json['part_id'] as String,
      sku: json['sku'] as String,
      name: json['name'] as String,
      quantity: json['quantity'] as int,
      warehouseStatus: json['warehouse_status'] as String,
      estimatedArrivalAt: json['estimated_arrival_at'] != null 
          ? DateTime.parse(json['estimated_arrival_at'] as String) 
          : null,
      binLocation: json['bin_location'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'part_id': partId,
      'sku': sku,
      'name': name,
      'quantity': quantity,
      'warehouse_status': warehouseStatus,
      'estimated_arrival_at': estimatedArrivalAt?.toIso8601String(),
      'bin_location': binLocation,
    };
  }
}

class ServiceOrderModel {
  final String id;
  final String quotationId;
  final int? sequenceNumber;
  final OrderPriority priority;
  final ServiceOrderStatus status;
  final DateTime createdAt;
  final ServiceCustomerInfo customer;
  final AssignedTechnician assignedTechnician;
  final List<ServicePartItem> parts;

  const ServiceOrderModel({
    required this.id,
    required this.quotationId,
    this.sequenceNumber,
    required this.priority,
    required this.status,
    required this.createdAt,
    required this.customer,
    required this.assignedTechnician,
    required this.parts,
  });

  int get totalItems => parts.fold(0, (sum, part) => sum + part.quantity);

  factory ServiceOrderModel.fromJson(Map<String, dynamic> json) {
    return ServiceOrderModel(
      id: json['id'] as String,
      quotationId: json['quotation_id'] as String,
      sequenceNumber: (json['sequence_number'] as num?)?.toInt(),
      priority: OrderPriority.values.firstWhere(
        (e) => e.toString() == 'OrderPriority.${json['priority']}',
        orElse: () => OrderPriority.standard,
      ),
      status: ServiceOrderStatus.values.firstWhere(
        (e) => e.toString() == 'ServiceOrderStatus.${json['status']}',
        orElse: () => ServiceOrderStatus.pendingPick,
      ),
      createdAt: DateTime.parse(json['created_at'] as String),
      customer: ServiceCustomerInfo.fromJson(json['customer'] as Map<String, dynamic>),
      assignedTechnician: AssignedTechnician.fromJson(json['assigned_technician'] as Map<String, dynamic>),
      parts: (json['parts'] as List<dynamic>)
          .map((e) => ServicePartItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'quotation_id': quotationId,
      'sequence_number': sequenceNumber,
      'priority': priority.toString().split('.').last,
      'status': status.toString().split('.').last,
      'created_at': createdAt.toIso8601String(),
      'customer': customer.toJson(),
      'assigned_technician': assignedTechnician.toJson(),
      'parts': parts.map((e) => e.toJson()).toList(),
    };
  }
}
