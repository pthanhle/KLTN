import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'packing_item_card/packing_item_actions.dart';
import 'packing_item_card/packing_item_animated_container.dart';
import 'packing_item_card/packing_item_image.dart';
import 'packing_item_card/packing_item_info.dart';
import 'packing_item_card/packing_item_progress.dart';

class PackingItemCard extends StatelessWidget {
  final WarehouseOrderItemModel item;
  final int packedQuantity;
  final VoidCallback onIncrement;
  final VoidCallback onPackAll;
  final VoidCallback onUndo;

  const PackingItemCard({
    super.key,
    required this.item,
    required this.packedQuantity,
    required this.onIncrement,
    required this.onPackAll,
    required this.onUndo,
  });

  @override
  Widget build(BuildContext context) {
    final isPacked = packedQuantity == item.quantity;

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Slidable(
        key: ValueKey(item.partId),
        startActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.3,
          children: PackingItemActions.buildStartActions(context, onPackAll),
        ),
        endActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.25,
          children: PackingItemActions.buildEndActions(context, onUndo),
        ),
        child: GestureDetector(
          onTap: () {
            if (!isPacked) {
              HapticFeedback.selectionClick();
              onIncrement();
            } else {
              HapticFeedback.heavyImpact();
              onUndo();
            }
          },
          behavior: HitTestBehavior.opaque,
          child: PackingItemAnimatedContainer(
            isPacked: isPacked,
            child: Row(
              children: [
                PackingItemImage(
                  imageUrl: item.image,
                  size: 80,
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: PackingItemInfo(
                    item: item,
                    isPacked: isPacked,
                  ),
                ),
                const SizedBox(width: 16),
                PackingItemProgress(
                  packedQuantity: packedQuantity,
                  totalQuantity: item.quantity,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
