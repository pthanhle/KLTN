import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import '../models/service_order_model.dart';
import '../../../shared/services/warehouse_api_service.dart';

final serviceOrdersProvider = NotifierProvider<ServiceOrdersController, ServiceOrdersState>(() {
  return ServiceOrdersController();
});

class ServiceOrdersState {
  final bool isLoading;
  final List<ServiceOrderModel> orders;
  final String? error;

  const ServiceOrdersState({
    this.isLoading = false,
    this.orders = const [],
    this.error,
  });

  ServiceOrdersState copyWith({
    bool? isLoading,
    List<ServiceOrderModel>? orders,
    String? error,
  }) {
    return ServiceOrdersState(
      isLoading: isLoading ?? this.isLoading,
      orders: orders ?? this.orders,
      error: error,
    );
  }
}

class ServiceOrdersController extends Notifier<ServiceOrdersState> {
  @override
  ServiceOrdersState build() {
    Future.microtask(() => fetchServiceOrders());
    return const ServiceOrdersState(isLoading: true);
  }

  Future<void> fetchServiceOrders() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final rawList = await WarehouseApiService.fetchPickLists();
      final orders = rawList
          .map((item) => _mapPickListToModel(item as Map<String, dynamic>))
          .toList();
      state = state.copyWith(isLoading: false, orders: orders);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  ServiceOrderModel _mapPickListToModel(Map<String, dynamic> json) {
    final mechanic = json['mechanic'] as Map<String, dynamic>?;
    final rawParts = json['parts'] as List<dynamic>? ?? [];
    final priorityStr = json['priority']?.toString() ?? 'standard';

    return ServiceOrderModel(
      id: json['progress_id']?.toString() ?? '',
      quotationId: json['booking_code']?.toString() ?? '',
      priority: priorityStr == 'urgent' ? OrderPriority.urgent : OrderPriority.standard,
      status: ServiceOrderStatus.pendingPick,
      createdAt: json['created_at'] != null
          ? (DateTime.tryParse(json['created_at'].toString()) ?? DateTime.now())
          : DateTime.now(),
      customer: ServiceCustomerInfo(
        name: json['customer_name']?.toString() ?? '',
        licensePlate: json['license_plate']?.toString() ?? '',
        vehicleModel: json['vehicle_model']?.toString() ?? '',
      ),
      assignedTechnician: AssignedTechnician(
        technicianId: mechanic?['id']?.toString() ?? '',
        name: mechanic?['name']?.toString() ?? 'KTV',
        role: 'Kỹ thuật viên',
        avatarUrl: mechanic?['avatar']?.toString(),
        bayNumber: mechanic?['bay_number']?.toString() ?? 'N/A',
      ),
      parts: rawParts.map((p) {
        final part = p as Map<String, dynamic>;
        return ServicePartItem(
          partId: part['part_id']?.toString() ?? '',
          sku: part['sku']?.toString() ?? '',
          name: part['name']?.toString() ?? '',
          quantity: (part['quantity'] as num?)?.toInt() ?? 1,
          warehouseStatus: part['warehouse_status']?.toString() ?? 'WAITING',
          estimatedArrivalAt: part['estimated_arrival_at'] != null
              ? DateTime.tryParse(part['estimated_arrival_at'].toString())
              : null,
          binLocation: null,
        );
      }).toList(),
    );
  }

  void updateOrderStatus(String orderId, ServiceOrderStatus newStatus) {
    final updatedOrders = state.orders.map((o) {
      if (o.id == orderId) {
        return ServiceOrderModel(
          id: o.id,
          quotationId: o.quotationId,
          priority: o.priority,
          status: newStatus,
          createdAt: o.createdAt,
          customer: o.customer,
          assignedTechnician: o.assignedTechnician,
          parts: o.parts,
        );
      }
      return o;
    }).toList();

    state = state.copyWith(orders: updatedOrders);
  }
}

final pendingServiceOrdersProvider = Provider<List<ServiceOrderModel>>((ref) {
  final state = ref.watch(serviceOrdersProvider);
  return state.orders.where((o) => o.status == ServiceOrderStatus.pendingPick).toList();
});

final readyServiceOrdersProvider = Provider<List<ServiceOrderModel>>((ref) {
  final state = ref.watch(serviceOrdersProvider);
  return state.orders.where((o) => o.status == ServiceOrderStatus.readyForHandover).toList();
});
