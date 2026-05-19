import 'package:flutter/material.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';

class PackingItemInfo extends StatelessWidget {
  final WarehouseOrderItemModel item;
  final bool isPacked;

  const PackingItemInfo({
    super.key,
    required this.item,
    required this.isPacked,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          item.name,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            decoration: isPacked ? TextDecoration.lineThrough : null,
            color: isPacked 
                ? theme.colorScheme.onSurface.withValues(alpha: 0.6) 
                : theme.colorScheme.onSurface,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        if (item.properties != null && item.properties!.isNotEmpty) ...[
          const SizedBox(height: 4),
          Text(
            item.properties!,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ],
        const SizedBox(height: 4),
        Text(
          'SKU: ${item.sku}',
          style: theme.textTheme.labelSmall?.copyWith(
            fontFamily: 'monospace',
            color: theme.colorScheme.outline,
          ),
        ),
      ],
    );
  }
}
