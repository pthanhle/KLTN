import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../controllers/warehouse_orders_controller.dart';
import 'cards/order_card_skeleton.dart';
import 'cards/order_glass_card.dart';
import '../dispatch/dispatch_bottom_sheet.dart';

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
