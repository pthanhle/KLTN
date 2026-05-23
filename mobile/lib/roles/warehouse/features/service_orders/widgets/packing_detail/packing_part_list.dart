import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import '../../controllers/service_packing_controller.dart';
import 'service_packing_item_card/service_packing_item_card.dart';

class PackingPartList extends ConsumerWidget {
  final String orderId;
  final List<ServicePartItem> parts;
  final Map<String, int> packedQuantities;

  const PackingPartList({
    super.key,
    required this.orderId,
    required this.parts,
    required this.packedQuantities,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (parts.isEmpty) {
      return const SliverToBoxAdapter(
        child: SizedBox.shrink(),
      );
    }

    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final part = parts[index];
          final currentQuantity = packedQuantities[part.partId] ?? 0;

          return ServicePackingItemCard(
            item: part,
            packedQuantity: currentQuantity,
            onIncrement: () {
              ref.read(servicePackingProvider.notifier).incrementPart(part.partId);
            },
            onPackAll: () {
              ref.read(servicePackingProvider.notifier).packAllPart(part.partId);
            },
            onUndo: () {
              ref.read(servicePackingProvider.notifier).undoPart(part.partId);
            },
          );
        },
        childCount: parts.length,
      ),
    );
  }
}
