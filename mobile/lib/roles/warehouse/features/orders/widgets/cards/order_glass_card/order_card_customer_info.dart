import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import '../../../../../../../core/utils/formatters.dart';

class OrderCardCustomerInfo extends StatelessWidget {
  final WarehouseOrderModel order;

  const OrderCardCustomerInfo({super.key, required this.order});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUrgent = order.priority == OrderPriority.urgent;

    return Row(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: theme.colorScheme.secondaryContainer,
            shape: BoxShape.circle,
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.5),
              width: 1,
            ),
          ),
          child: Icon(
            order.customerType == CustomerType.b2b 
                ? CupertinoIcons.building_2_fill 
                : CupertinoIcons.person_fill,
            color: theme.colorScheme.primary,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                order.customerName,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 2),
              Row(
                children: [
                  Icon(
                    CupertinoIcons.cube_box,
                    size: 16,
                    color: theme.colorScheme.secondary,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    '${order.totalItems} ${"Sản phẩm".tr()}',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.secondary,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Icon(
                    isUrgent ? CupertinoIcons.clock_fill : CupertinoIcons.time,
                    size: 16,
                    color: isUrgent ? theme.colorScheme.error : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    Formatters.getTimeElapsed(order.createdAt),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
