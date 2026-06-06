import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/controllers/warehouse_orders_controller.dart';
import 'cards/order_card_skeleton.dart';
import 'cards/order_glass_card.dart';
import 'empty_state/assigned_empty_state.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/dispatch/dispatch_bottom_sheet.dart';

class OrdersListView extends ConsumerWidget {
  const OrdersListView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(warehouseOrdersProvider);
    final controller = ref.read(warehouseOrdersProvider.notifier);

    if (state.isLoading) {
      return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) => const OrderCardSkeleton(),
            childCount: 5,
          ),
        ),
      );
    }

    final orders = controller.filteredOrders;

    if (orders.isEmpty) {
      return SliverFillRemaining(
        hasScrollBody: false,
        child: Padding(
          padding: const EdgeInsets.only(bottom: 80.0),
          child: AssignedEmptyState(
            currentTab: state.currentTab,
            hasAnyOrders: state.orders.isNotEmpty,
          ),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final order = orders[index];
            return OrderGlassCard(
              order: order,
              onQuickPack: () => controller.quickPack(order.id),
              onDispatch: () => DispatchBottomSheet.show(context, order.id),
            );
          },
          childCount: orders.length,
        ),
      ),
    );
  }
}
