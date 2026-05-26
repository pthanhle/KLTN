import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/supplement_labor_model.dart';
import '../../../utils/supplement_cost_utils.dart';

class LaborPickerCatalogItem extends StatelessWidget {
  final SupplementLaborModel labor;
  final VoidCallback onAdd;

  const LaborPickerCatalogItem({
    super.key,
    required this.labor,
    required this.onAdd,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

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
              color: theme.colorScheme.tertiaryContainer.withValues(alpha: 0.3),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 10,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            child: Icon(
              CupertinoIcons.wrench,
              color: theme.colorScheme.tertiary,
              size: 24,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  labor.description,
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${labor.laborCode} • ${labor.quantity}h',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  SupplementCostUtils.formatCurrency(labor.total),
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: theme.colorScheme.tertiary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          CupertinoButton(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: theme.colorScheme.tertiary,
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
