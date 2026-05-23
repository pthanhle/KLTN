import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';

class ServiceReportHeader extends StatelessWidget {
  final ServicePartItem item;

  const ServiceReportHeader({
    super.key,
    required this.item,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Báo cáo ngoại lệ phụ tùng'.tr(),
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.onSurface,
            letterSpacing: -0.5,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          '${item.name} - SKU: ${item.sku}',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}
