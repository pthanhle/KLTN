import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/supplement_part_model.dart';
import '../../../utils/supplement_cost_utils.dart';

class PartPickerCatalogItem extends StatelessWidget {
  final SupplementPartModel part;
  final VoidCallback onAdd;

  const PartPickerCatalogItem({
    super.key,
    required this.part,
    required this.onAdd,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final isOutOfStock = part.stockOnHand <= 0;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: ShapeDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.03),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 12,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.outline.withValues(alpha: 0.1),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: ShapeDecoration(
              color: isOutOfStock 
                ? theme.colorScheme.errorContainer.withValues(alpha: 0.3)
                : theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 10,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            child: Icon(
              CupertinoIcons.cube_box,
              color: isOutOfStock ? theme.colorScheme.error : theme.colorScheme.primary,
              size: 24,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  part.name,
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: isOutOfStock ? theme.colorScheme.onSurfaceVariant : theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(
                      part.sku,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: ShapeDecoration(
                        color: isOutOfStock 
                          ? theme.colorScheme.error.withValues(alpha: 0.1)
                          : theme.colorScheme.primary.withValues(alpha: 0.1),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 4,
                            cornerSmoothing: 1.0,
                          ),
                        ),
                      ),
                      child: Text(
                        isOutOfStock ? 'Hết hàng'.tr() : 'Còn hàng'.tr(),
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: isOutOfStock ? theme.colorScheme.error : theme.colorScheme.primary,
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  SupplementCostUtils.formatCurrency(part.unitPrice),
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: isOutOfStock ? theme.colorScheme.onSurfaceVariant : theme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          CupertinoButton(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: theme.colorScheme.primary,
            borderRadius: BorderRadius.circular(8),
            minSize: 0,
            onPressed: onAdd,
            child: Text(
              'Thêm'.tr(),
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
