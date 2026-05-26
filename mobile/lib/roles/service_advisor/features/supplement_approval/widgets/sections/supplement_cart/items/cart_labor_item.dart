import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/supplement_labor_model.dart';
import '../../../../utils/supplement_cost_utils.dart';
import '../../../../constants/supplement_ui_constants.dart';

class CartLaborItem extends StatelessWidget {
  final SupplementLaborModel labor;
  final VoidCallback onRemove;

  const CartLaborItem({
    super.key,
    required this.labor,
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
              color: theme.colorScheme.tertiaryContainer.withValues(alpha: 0.3),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 8,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            child: Icon(
              CupertinoIcons.wrench,
              color: theme.colorScheme.tertiary,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        labor.description,
                        style: theme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: Icon(
                        CupertinoIcons.clear_circled_solid, 
                        size: 18,
                        color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                      ),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                      onPressed: onRemove,
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  '${labor.laborCode} • ${labor.quantity}h',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerRight,
                  child: Text(
                    SupplementCostUtils.formatCurrency(labor.total),
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: theme.colorScheme.tertiary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
