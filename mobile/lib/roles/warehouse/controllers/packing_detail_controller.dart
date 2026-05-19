import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/warehouse_order_model.dart';
import 'warehouse_orders_controller.dart';

class PackingDetailState {
  final bool isLoading;
  final WarehouseOrderModel? order;
  final Map<String, int> packedQuantities;

  const PackingDetailState({
    this.isLoading = true,
    this.order,
    this.packedQuantities = const {},
  });

  PackingDetailState copyWith({
    bool? isLoading,
    WarehouseOrderModel? order,
    Map<String, int>? packedQuantities,
  }) {
    return PackingDetailState(
      isLoading: isLoading ?? this.isLoading,
      order: order ?? this.order,
      packedQuantities: packedQuantities ?? this.packedQuantities,
    );
  }

  int getPackedQuantity(String partId) => packedQuantities[partId] ?? 0;

  bool isFullyPacked(String partId) {
    if (order == null) return false;
    final item = order!.items.firstWhere((i) => i.partId == partId);
    return getPackedQuantity(partId) == item.quantity;
  }

  int get totalPackedUnits {
    return packedQuantities.values.fold(0, (sum, qty) => sum + qty);
  }

  bool get isAllPacked {
    if (order == null || order!.items.isEmpty) return false;
    for (final item in order!.items) {
      if (getPackedQuantity(item.partId) < item.quantity) {
        return false;
      }
    }
    return true;
  }
}

class PackingDetailController extends Notifier<PackingDetailState> {
  static final Map<String, Map<String, int>> _progressCache = {};

  @override
  PackingDetailState build() {
    return const PackingDetailState();
  }

  void init(String id) {
    if (state.order?.id != id) {
      Future.microtask(() => _loadOrderDetail(id));
    }
  }

  Future<void> _loadOrderDetail(String id) async {
    if (state.order != null) {
      _progressCache[state.order!.id] = state.packedQuantities;
    }

    state = PackingDetailState(
      isLoading: true,
      packedQuantities: _progressCache[id] ?? const {},
    );
    final ordersState = ref.read(warehouseOrdersProvider);
    WarehouseOrderModel? order;
    
    try {
      order = ordersState.orders.firstWhere((o) => o.id == id);
    } catch (_) {
      await Future.delayed(const Duration(milliseconds: 600));
    }

    state = state.copyWith(
      isLoading: false,
      order: order,
    );
  }

  void incrementItem(String partId) {
    if (state.order == null) return;
    final item = state.order!.items.firstWhere((i) => i.partId == partId);
    final currentQty = state.getPackedQuantity(partId);
    
    if (currentQty < item.quantity) {
      final newMap = Map<String, int>.from(state.packedQuantities);
      newMap[partId] = currentQty + 1;
      state = state.copyWith(packedQuantities: newMap);
    }
  }

  void packAllItem(String partId) {
    if (state.order == null) return;
    final item = state.order!.items.firstWhere((i) => i.partId == partId);
    final newMap = Map<String, int>.from(state.packedQuantities);
    newMap[partId] = item.quantity;
    state = state.copyWith(packedQuantities: newMap);
  }

  void undoItem(String partId) {
    final newMap = Map<String, int>.from(state.packedQuantities);
    newMap.remove(partId);
    state = state.copyWith(packedQuantities: newMap);
  }

  Future<bool> completePacking() async {
    if (state.order == null) return false;
    if (!state.isAllPacked) return false;
    
    ref.read(warehouseOrdersProvider.notifier).quickPack(state.order!.id);
    
    // Clear cache for this order upon completion
    _progressCache.remove(state.order!.id);
    
    return true;
  }
}

final packingDetailProvider = NotifierProvider<PackingDetailController, PackingDetailState>(() {
  return PackingDetailController();
});
