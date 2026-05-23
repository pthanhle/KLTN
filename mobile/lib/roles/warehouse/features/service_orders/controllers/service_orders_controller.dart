import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/service_order_model.dart';
import '../data/mocks/service_orders_mock.dart';

final serviceOrdersProvider = NotifierProvider<ServiceOrdersController, ServiceOrdersState>(() {
  return ServiceOrdersController();
});

class ServiceOrdersState {
  final bool isLoading;
  final List<ServiceOrderModel> orders;

  const ServiceOrdersState({
    this.isLoading = false,
    this.orders = const [],
  });

  ServiceOrdersState copyWith({
    bool? isLoading,
    List<ServiceOrderModel>? orders,
  }) {
    return ServiceOrdersState(
      isLoading: isLoading ?? this.isLoading,
      orders: orders ?? this.orders,
    );
  }
}

class ServiceOrdersController extends Notifier<ServiceOrdersState> {
  @override
  ServiceOrdersState build() {
    Future.microtask(() => fetchServiceOrders());
    return const ServiceOrdersState();
  }

  Future<void> fetchServiceOrders() async {
    state = state.copyWith(isLoading: true);
    await Future.delayed(const Duration(milliseconds: 500));
    state = state.copyWith(
      isLoading: false,
      orders: mockServiceOrders,
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
