import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/shared/services/warehouse_api_service.dart';

final warehouseOrdersProvider = NotifierProvider<WarehouseOrdersController, WarehouseOrdersState>(() {
  return WarehouseOrdersController();
});

class WarehouseOrdersState {
  final bool isLoading;
  final OrderStatus currentTab;
  final List<WarehouseOrderModel> orders;
  final String searchQuery;
  final DateTime? filterDate;

  const WarehouseOrdersState({
    this.isLoading = false,
    this.currentTab = OrderStatus.pendingPick,
    this.orders = const [],
    this.searchQuery = '',
    this.filterDate,
  });

  WarehouseOrdersState copyWith({
    bool? isLoading,
    OrderStatus? currentTab,
    List<WarehouseOrderModel>? orders,
    String? searchQuery,
    DateTime? filterDate,
    bool clearFilterDate = false,
  }) {
    return WarehouseOrdersState(
      isLoading: isLoading ?? this.isLoading,
      currentTab: currentTab ?? this.currentTab,
      orders: orders ?? this.orders,
      searchQuery: searchQuery ?? this.searchQuery,
      filterDate: clearFilterDate ? null : (filterDate ?? this.filterDate),
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
      final rawOrders = await WarehouseApiService.fetchMyOrders();

      final parsedOrders = rawOrders
          .map<WarehouseOrderModel?>((json) {
            try {
              return WarehouseOrderModel.fromJson(json as Map<String, dynamic>);
            } catch (e) {
              print('Failed to parse order: $e');
              return null;
            }
          })
          .whereType<WarehouseOrderModel>()
          .toList();

      state = state.copyWith(
        isLoading: false,
        orders: parsedOrders,
      );
    } catch (e) {
      print('Error loading orders: $e');
      state = state.copyWith(isLoading: false, orders: const []);
    }
  }

  void setTab(OrderStatus tab) {
    state = state.copyWith(currentTab: tab);
  }

  List<WarehouseOrderModel> get filteredOrders {
    var list = state.orders.where((order) => order.status == state.currentTab).toList();

    if (state.filterDate != null) {
      final fd = state.filterDate!;
      list = list.where((o) {
        final d = o.createdAt;
        return d.year == fd.year && d.month == fd.month && d.day == fd.day;
      }).toList();
    }

    if (state.searchQuery.isNotEmpty) {
      final q = state.searchQuery.toLowerCase();
      list = list.where((o) {
        return o.code.toLowerCase().contains(q) ||
            o.customerName.toLowerCase().contains(q);
      }).toList();
    }

    list.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    return list;
  }

  void updateSearch(String query) {
    state = state.copyWith(searchQuery: query);
  }

  void setFilterDate(DateTime? date) {
    if (date == null) {
      state = state.copyWith(clearFilterDate: true);
    } else {
      state = state.copyWith(filterDate: date);
    }
  }

  Future<void> refresh() async {
    await _loadOrders();
  }

  // Mark order as packed: CONFIRMED → PROCESSING
  Future<bool> quickPack(String id) async {
    final success = await WarehouseApiService.packOrder(id);

    if (success) {
      final updatedOrders = state.orders.map((o) {
        if (o.id == id) {
          return o.copyWith(status: OrderStatus.pendingDelivery);
        }
        return o;
      }).toList();
      state = state.copyWith(orders: updatedOrders);
    }

    return success;
  }

  // Confirm dispatch: PROCESSING → SHIPPED
  Future<bool> dispatchOrder(String id, String provider, String trackingCode) async {
    final success = await WarehouseApiService.dispatchOrderToShipping(
      id,
      provider: provider.isNotEmpty ? provider : null,
      trackingCode: trackingCode.isNotEmpty ? trackingCode : null,
    );

    if (success) {
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

    return success;
  }
}
