import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../quotation/widgets/shared/glass_card.dart';
import '../../utils/supplement_utils.dart';
import '../../constants/supplement_constants.dart';

class FinancialImpactSection extends StatelessWidget {
  final double oldCost;
  final double newCost;

  const FinancialImpactSection({
    super.key,
    required this.oldCost,
    required this.newCost,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final diff = newCost - oldCost;

    return GlassCard(
      padding: const EdgeInsets.all(SupplementConstants.cardPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(CupertinoIcons.money_dollar_circle, color: theme.colorScheme.onSurfaceVariant),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Chi phí thay đổi'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),
          
          // Old Cost
          Container(
            padding: const EdgeInsets.all(SupplementConstants.innerPadding),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(SupplementConstants.innerRadius),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    'Chi phí ban đầu'.tr(),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
                Flexible(
                  child: Text(
                    SupplementUtils.formatCurrency(oldCost),
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: theme.colorScheme.outline,
                      decoration: TextDecoration.lineThrough,
                    ),
                    textAlign: TextAlign.right,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          
          // New Cost
          Container(
            padding: const EdgeInsets.all(SupplementConstants.innerPadding + 4),
            decoration: BoxDecoration(
              color: theme.colorScheme.errorContainer.withValues(alpha: 0.2),
              border: Border.all(
                color: theme.colorScheme.errorContainer.withValues(alpha: 0.5),
                width: 1,
              ),
              borderRadius: BorderRadius.circular(SupplementConstants.innerRadius),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Expanded(
                  child: Text(
                    'Chi phí mới (Dự kiến)'.tr(),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Flexible(
                  child: Text(
                    SupplementUtils.formatCurrency(newCost),
                    style: theme.textTheme.headlineMedium?.copyWith(
                      color: theme.colorScheme.error,
                      fontWeight: FontWeight.w700,
                      height: 1,
                    ),
                    textAlign: TextAlign.right,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),
          
          // Diff Badge
          if (diff > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: theme.colorScheme.errorContainer,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    CupertinoIcons.arrow_up_right, 
                    size: 16, 
                    color: theme.colorScheme.onErrorContainer,
                  ),
                  const SizedBox(width: 4),
                  Flexible(
                    child: Text(
                      "${'Tăng'.tr()}: +${SupplementUtils.formatCurrency(diff)}",
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onErrorContainer,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.5,
                      ),
                      overflow: TextOverflow.ellipsis,
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
