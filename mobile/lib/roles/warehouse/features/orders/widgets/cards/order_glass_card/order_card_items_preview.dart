import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/widgets/cards/order_item_row.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/widgets/modals/order_items_modal.dart';

class OrderCardItemsPreview extends StatelessWidget {
  final WarehouseOrderModel order;

  const OrderCardItemsPreview({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    if (order.items.isEmpty) return const SizedBox.shrink();

    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.4),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Column(
        children: [
          ...order.items.take(2).map((item) => OrderItemRow(item: item)),
          if (order.items.length > 2)
            GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                OrderItemsModal.show(context, order);
              },
              behavior: HitTestBehavior.opaque,
              child: Padding(
                padding: const EdgeInsets.only(top: 8.0, bottom: 4.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      '+ ${order.items.length - 2} ${'sản phẩm nữa'.tr()}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Icon(
                      CupertinoIcons.chevron_down,
                      size: 14,
                      color: theme.colorScheme.primary,
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
