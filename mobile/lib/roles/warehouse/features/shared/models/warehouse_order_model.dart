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
      partId: json['part_id'] as String? ?? json['_id'] as String? ?? '',
      sku: json['sku'] as String? ?? '',
      name: json['name'] as String? ?? '',
      image: json['image'] as String?,
      properties: json['properties'] as String?,
      quantity: json['quantity'] as int? ?? 1,
      originalPrice: json['original_price'] != null ? (json['original_price'] as num).toDouble() : null,
      unitPrice: (json['unit_price'] as num?)?.toDouble() ?? 0.0,
      totalPrice: (json['total_price'] as num?)?.toDouble() ?? 0.0,
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
    final delivery = json['delivery'] as Map<String, dynamic>? ?? {};
    final shipping = json['shipping'] as Map<String, dynamic>? ?? {};
    final itemsList = (json['items'] as List<dynamic>?) ?? [];

    final rawStatus = (json['order_status'] ?? json['status'] ?? 'PENDING').toString().toUpperCase();
    OrderStatus mappedStatus;
    switch (rawStatus) {
      case 'CONFIRMED':
      case 'PROCESSING':
        mappedStatus = OrderStatus.pendingPick;
        break;
      case 'PACKED':
        mappedStatus = OrderStatus.pendingDelivery;
        break;
      case 'SHIPPING':
        mappedStatus = OrderStatus.shipping;
        break;
      case 'COMPLETED':
        mappedStatus = OrderStatus.completed;
        break;
      case 'CANCELLED':
        mappedStatus = OrderStatus.cancelled;
        break;
      default:
        mappedStatus = OrderStatus.pendingPick;
    }

    DateTime parsedDate;
    final dateStr = json['order_date'] ?? json['created_at'] ?? '';
    try {
      if (dateStr.contains('/')) {
        final parts = dateStr.split(' ')[0].split('/');
        if (parts.length >= 3) {
          parsedDate = DateTime(int.parse(parts[2]), int.parse(parts[1]), int.parse(parts[0]));
        } else {
          parsedDate = DateTime.now();
        }
      } else {
        parsedDate = DateTime.parse(dateStr);
      }
    } catch (_) {
      parsedDate = DateTime.now();
    }

    int calculatedTotalItems = 0;
    for (var item in itemsList) {
      calculatedTotalItems += (item['quantity'] as int?) ?? 1;
    }

    return WarehouseOrderModel(
      id: json['order_code'] as String? ?? json['id'] as String? ?? '',
      code: json['order_code'] as String? ?? json['code'] as String? ?? '',
      customerName: delivery['receiver_name'] as String? ?? json['customer_name'] as String? ?? 'Khách hàng',
      customerType: CustomerType.b2c,
      totalItems: calculatedTotalItems > 0 ? calculatedTotalItems : (json['total_items'] as int? ?? 0),
      priority: OrderPriority.standard,
      status: mappedStatus,
      createdAt: parsedDate,
      shippingProvider: shipping['provider'] as String? ?? json['shipping_provider'] as String?,
      trackingCode: shipping['tracking_code'] as String? ?? json['tracking_code'] as String?,
      assignedStaffId: json['handled_by'] as String? ?? json['assigned_staff_id'] as String?,
      items: itemsList.map((e) => WarehouseOrderItemModel.fromJson(e as Map<String, dynamic>)).toList(),
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
