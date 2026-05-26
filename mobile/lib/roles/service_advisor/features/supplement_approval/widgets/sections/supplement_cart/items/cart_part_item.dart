import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/supplement_part_model.dart';
import '../../../../utils/supplement_cost_utils.dart';
import '../../../../constants/supplement_ui_constants.dart';

class CartPartItem extends StatelessWidget {
  final SupplementPartModel part;
  final ValueChanged<int> onQuantityChanged;
  final VoidCallback onRemove;

  const CartPartItem({
    super.key,
    required this.part,
    required this.onQuantityChanged,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(SupplementUiConstants.innerPadding),
      decoration: ShapeDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.03),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: SupplementUiConstants.itemRadius,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.outline.withValues(alpha: 0.1),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: ShapeDecoration(
              color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 8,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            child: Icon(
              CupertinoIcons.cube_box,
              color: theme.colorScheme.primary,
              size: 20,
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
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${part.sku} • ${SupplementCostUtils.formatCurrency(part.unitPrice)}',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: onRemove,
                      child: Icon(
                        CupertinoIcons.clear_circled_solid,
                        size: 18,
                        color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                      ),
                    ),
                    Container(
                      height: 32,
                      decoration: ShapeDecoration(
                        color: theme.colorScheme.surface,
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 8,
                            cornerSmoothing: 1.0,
                          ),
                          side: BorderSide(
                            color: theme.colorScheme.outline.withValues(alpha: 0.2),
                          ),
                        ),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(CupertinoIcons.minus, size: 14),
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                            onPressed: () => onQuantityChanged(part.quantity - 1),
                          ),
                          Text(
                            '${part.quantity}',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          IconButton(
                            icon: const Icon(CupertinoIcons.add, size: 14),
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                            onPressed: () => onQuantityChanged(part.quantity + 1),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      SupplementCostUtils.formatCurrency(part.total),
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
