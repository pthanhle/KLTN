import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import '../models/service_order_model.dart';
import 'service_orders_controller.dart';

class ServicePackingState {
  final ServiceOrderModel? order;
  final Map<String, int> packedQuantities;
  final bool isSubmitting;

  const ServicePackingState({
    this.order,
    this.packedQuantities = const {},
    this.isSubmitting = false,
  });

  ServicePackingState copyWith({
    ServiceOrderModel? order,
    Map<String, int>? packedQuantities,
    bool? isSubmitting,
  }) {
    return ServicePackingState(
      order: order ?? this.order,
      packedQuantities: packedQuantities ?? this.packedQuantities,
      isSubmitting: isSubmitting ?? this.isSubmitting,
    );
  }

  int get pickedCount => packedQuantities.values.fold(0, (sum, count) => sum + count);
  
  bool get isAllProcessed {
    if (order == null || packedQuantities.isEmpty) return false;
    for (var part in order!.parts) {
      if ((packedQuantities[part.partId] ?? 0) < part.quantity) {
        return false;
      }
    }
    return true;
  }
}

final servicePackingProvider = NotifierProvider<ServicePackingController, ServicePackingState>(() {
  return ServicePackingController();
});

class ServicePackingController extends Notifier<ServicePackingState> {
  @override
  ServicePackingState build() {
    return const ServicePackingState();
  }

  void loadOrder(String orderId) {
    if (state.order?.id == orderId) return;

    final ordersList = ref.read(serviceOrdersProvider).orders;
    final order = ordersList.firstWhere(
      (o) => o.id == orderId,
      orElse: () => ordersList.first,
    );

    final isAlreadyReady = order.status == ServiceOrderStatus.readyForHandover;

    final initialQuantities = <String, int>{};
    for (var part in order.parts) {
      initialQuantities[part.partId] = isAlreadyReady ? part.quantity : 0;
    }

    state = state.copyWith(
      order: order,
      packedQuantities: initialQuantities,
    );
  }

  void incrementPart(String partId) {
    if (state.order == null) return;
    
    final part = state.order!.parts.firstWhere((p) => p.partId == partId);
    final currentQty = state.packedQuantities[partId] ?? 0;
    
    if (currentQty < part.quantity) {
      final updatedMap = Map<String, int>.from(state.packedQuantities);
      updatedMap[partId] = currentQty + 1;
      state = state.copyWith(packedQuantities: updatedMap);
      _checkAndMoveToReady();
    }
  }

  void packAllPart(String partId) {
    if (state.order == null) return;
    
    final part = state.order!.parts.firstWhere((p) => p.partId == partId);
    final updatedMap = Map<String, int>.from(state.packedQuantities);
    updatedMap[partId] = part.quantity;
    state = state.copyWith(packedQuantities: updatedMap);
    _checkAndMoveToReady();
  }

  void undoPart(String partId) {
    final updatedMap = Map<String, int>.from(state.packedQuantities);
    updatedMap[partId] = 0;
    state = state.copyWith(packedQuantities: updatedMap);
    
    if (!state.isAllProcessed && state.order!.status == ServiceOrderStatus.readyForHandover) {
      ref.read(serviceOrdersProvider.notifier).updateOrderStatus(
        state.order!.id,
        ServiceOrderStatus.pendingPick,
      );
      state = state.copyWith(
        order: ServiceOrderModel(
          id: state.order!.id,
          quotationId: state.order!.quotationId,
          priority: state.order!.priority,
          status: ServiceOrderStatus.pendingPick,
          createdAt: state.order!.createdAt,
          customer: state.order!.customer,
          assignedTechnician: state.order!.assignedTechnician,
          parts: state.order!.parts,
        ),
      );
    }
  }

  void reportPartException(String partId, String reason, DateTime? expectedArrivalDate) {
    if (state.order == null) return;
    
    final updatedParts = state.order!.parts.map((p) {
      if (p.partId == partId) {
        return ServicePartItem(
          partId: p.partId,
          sku: p.sku,
          name: p.name,
          quantity: p.quantity,
          warehouseStatus: reason,
          estimatedArrivalAt: expectedArrivalDate,
          binLocation: p.binLocation,
        );
      }
      return p;
    }).toList();

    state = state.copyWith(
      order: ServiceOrderModel(
        id: state.order!.id,
        quotationId: state.order!.quotationId,
        priority: state.order!.priority,
        status: state.order!.status,
        createdAt: state.order!.createdAt,
        customer: state.order!.customer,
        assignedTechnician: state.order!.assignedTechnician,
        parts: updatedParts,
      ),
    );
    
    undoPart(partId);
  }

  void _checkAndMoveToReady() {
    if (state.isAllProcessed && state.order!.status == ServiceOrderStatus.pendingPick) {
      ref.read(serviceOrdersProvider.notifier).updateOrderStatus(
        state.order!.id,
        ServiceOrderStatus.readyForHandover,
      );
      state = state.copyWith(
        order: ServiceOrderModel(
          id: state.order!.id,
          quotationId: state.order!.quotationId,
          priority: state.order!.priority,
          status: ServiceOrderStatus.readyForHandover,
          createdAt: state.order!.createdAt,
          customer: state.order!.customer,
          assignedTechnician: state.order!.assignedTechnician,
          parts: state.order!.parts,
        ),
      );
    }
  }

  Future<bool> submitHandover() async {
    if (!state.isAllProcessed) return false;
    
    state = state.copyWith(isSubmitting: true);
    
    await Future.delayed(const Duration(milliseconds: 800));
    
    ref.read(serviceOrdersProvider.notifier).updateOrderStatus(
      state.order!.id,
      ServiceOrderStatus.handedOver,
    );
    
    state = state.copyWith(isSubmitting: false);
    return true;
  }
}
