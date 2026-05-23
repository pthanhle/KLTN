import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:flutter/cupertino.dart';
import '../../../models/service_order_model.dart';
import '../modals/service_report_modal/service_report_modal.dart';
import 'service_packing_item_actions.dart';
import 'service_packing_item_animated_container.dart';
import 'service_packing_item_info.dart';
import 'service_packing_item_progress.dart';

class ServicePackingItemCard extends StatelessWidget {
  final ServicePartItem item;
  final int packedQuantity;
  final VoidCallback onIncrement;
  final VoidCallback onPackAll;
  final VoidCallback onUndo;

  const ServicePackingItemCard({
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
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Slidable(
        key: ValueKey(item.partId),
        startActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.3,
          children: ServicePackingItemActions.buildStartActions(context, () {
            HapticFeedback.mediumImpact();
            onPackAll();
          }),
        ),
        endActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.5,
          children: ServicePackingItemActions.buildEndActions(context, () {
            HapticFeedback.mediumImpact();
            onUndo();
          }, () {
            HapticFeedback.heavyImpact();
            ServiceReportModal.show(context, item);
          }),
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
          child: ServicePackingItemAnimatedContainer(
            isPacked: isPacked,
            child: Row(
              children: [
                Container(
                  width: 56,
                  height: 56,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    CupertinoIcons.cube_box,
                    size: 28,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ServicePackingItemInfo(
                    item: item,
                    isPacked: isPacked,
                  ),
                ),
                const SizedBox(width: 12),
                ServicePackingItemProgress(
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
