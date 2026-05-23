import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/data/mocks/warehouse_orders_mock.dart';

final warehouseOrdersProvider = NotifierProvider<WarehouseOrdersController, WarehouseOrdersState>(() {
  return WarehouseOrdersController();
});

class WarehouseOrdersState {
  final bool isLoading;
  final OrderStatus currentTab;
  final List<WarehouseOrderModel> orders;
  final String currentStaffId;

  const WarehouseOrdersState({
    this.isLoading = false,
    this.currentTab = OrderStatus.pendingPick,
    this.orders = const [],
    this.currentStaffId = 'INV-112',
  });

  WarehouseOrdersState copyWith({
    bool? isLoading,
    OrderStatus? currentTab,
    List<WarehouseOrderModel>? orders,
    String? currentStaffId,
  }) {
    return WarehouseOrdersState(
      isLoading: isLoading ?? this.isLoading,
      currentTab: currentTab ?? this.currentTab,
      orders: orders ?? this.orders,
      currentStaffId: currentStaffId ?? this.currentStaffId,
    );
  }
}

class WarehouseOrdersController extends Notifier<WarehouseOrdersState> {
  @override
  WarehouseOrdersState build() {
    Future.microtask(() => _loadOrders());
    return const WarehouseOrdersState();
  }

  Future<void> _loadOrders() async {
    state = state.copyWith(isLoading: true);
    
    await Future.delayed(const Duration(seconds: 1));
    
    final parsedOrders = mockWarehouseOrdersJson
        .map((json) => WarehouseOrderModel.fromJson(json))
        .toList();
    
    state = state.copyWith(
      isLoading: false,
      orders: parsedOrders,
    );
  }

  void setTab(OrderStatus tab) {
    state = state.copyWith(currentTab: tab);
  }

  List<WarehouseOrderModel> get myOrders {
    return state.orders.where((order) => order.assignedStaffId == state.currentStaffId).toList();
  }

  List<WarehouseOrderModel> get filteredOrders {
    return myOrders.where((order) => order.status == state.currentTab).toList();
  }

  Future<void> refresh() async {
    await _loadOrders();
  }

  void quickPack(String id) {
    final updatedOrders = state.orders.map((order) {
      if (order.id == id) {
        return order.copyWith(status: OrderStatus.pendingDelivery);
      }
      return order;
    }).toList();

    state = state.copyWith(orders: updatedOrders);
  }

  void dispatchOrder(String id, String provider, String trackingCode) {
    final updatedOrders = state.orders.map((order) {
      if (order.id == id) {
        return order.copyWith(
          status: OrderStatus.completed,
          shippingProvider: provider,
          trackingCode: trackingCode,
        );
      }
      return order;
    }).toList();

    state = state.copyWith(orders: updatedOrders);
  }
}
