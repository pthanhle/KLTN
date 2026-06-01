import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/data/mocks/warehouse_orders_mock.dart';
import 'package:ttauto_staff/roles/warehouse/shared/services/warehouse_api_service.dart';

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

    try {
      final pickLists = await WarehouseApiService.fetchPickLists();

      final parsedOrders = pickLists.map<WarehouseOrderModel>((json) {
        final partsList = json['parts'] as List<dynamic>? ?? [];
        return WarehouseOrderModel(
          id: json['progress_id'] ?? '',
          code: json['booking_code'] ?? 'N/A',
          customerName: json['customer_name'] ?? 'Khách hàng',
          customerType: CustomerType.b2c,
          totalItems: partsList.length,
          priority: OrderPriority.standard,
          status: OrderStatus.pendingPick,
          createdAt: DateTime.now(),
          assignedStaffId: 'INV-112',
          items: partsList.map<WarehouseOrderItemModel>((part) {
            return WarehouseOrderItemModel(
              partId: part['_id'] ?? '',
              sku: part['sku'] ?? 'N/A',
              name: part['name'] ?? 'N/A',
              quantity: part['quantity'] ?? 1,
              unitPrice: 0.0,
              totalPrice: 0.0,
            );
          }).toList(),
        );
      }).toList();

      state = state.copyWith(
        isLoading: false,
        orders: parsedOrders,
      );
    } catch (e) {
      print('Failed to load orders from API: $e');
      final parsedOrders = mockWarehouseOrdersJson
          .map((json) => WarehouseOrderModel.fromJson(json))
          .toList();

      state = state.copyWith(
        isLoading: false,
        orders: parsedOrders,
      );
    }
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

  Future<void> quickPack(String id) async {
    final order = state.orders.firstWhere((o) => o.id == id);
    final partIds = order.items.map((e) => e.partId).toList();

    final success = await WarehouseApiService.dispatchParts(id, partIds);
    if (!success) {
      print('Failed to dispatch parts on API');
    }

    final updatedOrders = state.orders.map((o) {
      if (o.id == id) {
        return o.copyWith(status: OrderStatus.pendingDelivery);
      }
      return o;
    }).toList();

    state = state.copyWith(orders: updatedOrders);
  }

  void dispatchOrder(String id, String provider, String trackingCode) {
    final updatedOrders = state.orders.map((order) {
      if (order.id == id) {
        return order.copyWith(
          status: OrderStatus.shipping,
          shippingProvider: provider,
          trackingCode: trackingCode,
        );
      }
      return order;
    }).toList();

    state = state.copyWith(orders: updatedOrders);
  }
}
