import 'warehouse_enums.dart';

class WarehouseOrderItemModel {
  final String partId;
  final String sku;
  final String name;
  final String? image;
  final String? properties;
  final int quantity;
  final double? originalPrice;
  final double unitPrice;
  final double totalPrice;
  final Map<String, dynamic>? selectedOptions;

  const WarehouseOrderItemModel({
    required this.partId,
    required this.sku,
    required this.name,
    this.image,
    this.properties,
    required this.quantity,
    this.originalPrice,
    required this.unitPrice,
    required this.totalPrice,
    this.selectedOptions,
  });

  factory WarehouseOrderItemModel.fromJson(Map<String, dynamic> json) {
    return WarehouseOrderItemModel(
      partId: json['part_id'] as String,
      sku: json['sku'] as String,
      name: json['name'] as String,
      image: json['image'] as String?,
      properties: json['properties'] as String?,
      quantity: json['quantity'] as int,
      originalPrice: json['original_price'] != null ? (json['original_price'] as num).toDouble() : null,
      unitPrice: (json['unit_price'] as num).toDouble(),
      totalPrice: (json['total_price'] as num).toDouble(),
      selectedOptions: json['selected_options'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'part_id': partId,
      'sku': sku,
      'name': name,
      'image': image,
      'properties': properties,
      'quantity': quantity,
      'original_price': originalPrice,
      'unit_price': unitPrice,
      'total_price': totalPrice,
      'selected_options': selectedOptions,
    };
  }
}

class WarehouseOrderModel {
  final String id;
  final String code;
  final String customerName;
  final CustomerType customerType;
  final int totalItems;
  final OrderPriority priority;
  final OrderStatus status;
  final DateTime createdAt;
  final String? shippingProvider;
  final String? trackingCode;
  final String? assignedStaffId;
  final List<WarehouseOrderItemModel> items;

  const WarehouseOrderModel({
    required this.id,
    required this.code,
    required this.customerName,
    required this.customerType,
    required this.totalItems,
    required this.priority,
    required this.status,
    required this.createdAt,
    this.shippingProvider,
    this.trackingCode,
    this.assignedStaffId,
    required this.items,
  });

  WarehouseOrderModel copyWith({
    String? id,
    String? code,
    String? customerName,
    CustomerType? customerType,
    int? totalItems,
    OrderPriority? priority,
    OrderStatus? status,
    DateTime? createdAt,
    String? shippingProvider,
    String? trackingCode,
    String? assignedStaffId,
    List<WarehouseOrderItemModel>? items,
  }) {
    return WarehouseOrderModel(
      id: id ?? this.id,
      code: code ?? this.code,
      customerName: customerName ?? this.customerName,
      customerType: customerType ?? this.customerType,
      totalItems: totalItems ?? this.totalItems,
      priority: priority ?? this.priority,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      shippingProvider: shippingProvider ?? this.shippingProvider,
      trackingCode: trackingCode ?? this.trackingCode,
      assignedStaffId: assignedStaffId ?? this.assignedStaffId,
      items: items ?? this.items,
    );
  }

  factory WarehouseOrderModel.fromJson(Map<String, dynamic> json) {
    return WarehouseOrderModel(
      id: json['id'] as String,
      code: json['code'] as String,
      customerName: json['customer_name'] as String,
      customerType: CustomerType.values.firstWhere((e) => e.name == json['customer_type']),
      totalItems: json['total_items'] as int,
      priority: OrderPriority.values.firstWhere(
        (e) => e.toString() == 'OrderPriority.${json['priority']}',
        orElse: () => OrderPriority.standard,
      ),
      status: OrderStatus.values.firstWhere(
        (e) => e.toString() == 'OrderStatus.${json['status']}',
        orElse: () => OrderStatus.pendingPick,
      ),
      createdAt: DateTime.parse(json['created_at'] as String),
      shippingProvider: json['shipping_provider'] as String?,
      trackingCode: json['tracking_code'] as String?,
      assignedStaffId: json['assigned_staff_id'] as String?,
      items: (json['items'] as List<dynamic>)
          .map((e) => WarehouseOrderItemModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'customer_name': customerName,
      'customer_type': customerType.name,
      'total_items': totalItems,
      'priority': priority.toString().split('.').last,
      'status': status.toString().split('.').last,
      'created_at': createdAt.toIso8601String(),
      'shipping_provider': shippingProvider,
      'tracking_code': trackingCode,
      'assigned_staff_id': assignedStaffId,
      'items': items.map((e) => e.toJson()).toList(),
    };
  }
}
