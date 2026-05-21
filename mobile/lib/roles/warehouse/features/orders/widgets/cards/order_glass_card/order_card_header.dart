import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';

class OrderCardHeader extends StatelessWidget {
  final WarehouseOrderModel order;

  const OrderCardHeader({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUrgent = order.priority == OrderPriority.urgent;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          order.code,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.primary,
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: ShapeDecoration(
            color: isUrgent
                ? theme.colorScheme.errorContainer.withValues(alpha: 0.85)
                : theme.colorScheme.surfaceContainerHighest,
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 10,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: isUrgent
                    ? theme.colorScheme.error.withValues(alpha: 0.3)
                    : theme.colorScheme.outline.withValues(alpha: 0.15),
                width: 0.5,
              ),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isUrgent
                    ? CupertinoIcons.clock_fill
                    : CupertinoIcons.check_mark_circled_solid,
                size: 13,
                color: isUrgent
                    ? theme.colorScheme.error
                    : theme.colorScheme.onSurfaceVariant,
              ),
              const SizedBox(width: 4),
              Text(
                isUrgent ? 'Gấp'.tr() : 'Thường'.tr(),
                style: theme.textTheme.labelSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.3,
                  color: isUrgent
                      ? theme.colorScheme.error
                      : theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
