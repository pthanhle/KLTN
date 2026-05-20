import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
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
    final isDark = theme.brightness == Brightness.dark;
    final diff = newCost - oldCost;

    return GlassCard(
      padding: const EdgeInsets.all(SupplementConstants.cardPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: ShapeDecoration(
                  color: theme.colorScheme.primary.withValues(alpha: 0.12),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 10,
                      cornerSmoothing: 1.0,
                    ),
                    side: BorderSide(
                      color: theme.colorScheme.primary.withValues(alpha: 0.20),
                      width: 0.5,
                    ),
                  ),
                ),
                child: Icon(
                  CupertinoIcons.money_dollar_circle,
                  color: theme.colorScheme.primary,
                  size: 20,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Chi phí thay đổi'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.3,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),

          Container(
            padding: const EdgeInsets.all(SupplementConstants.innerPadding),
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.04)
                  : Colors.black.withValues(alpha: 0.03),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: SupplementConstants.innerRadius,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.35),
                  width: 0.5,
                ),
              ),
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(
                cornerRadius: SupplementConstants.innerRadius,
                cornerSmoothing: 1.0,
              ),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
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
            ),
          ),
          const SizedBox(height: 8),

          Container(
            padding: const EdgeInsets.all(SupplementConstants.innerPadding + 4),
            decoration: ShapeDecoration(
              color: theme.colorScheme.error.withValues(alpha: isDark ? 0.12 : 0.06),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: SupplementConstants.innerRadius,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: theme.colorScheme.error.withValues(alpha: 0.30),
                  width: 0.5,
                ),
              ),
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(
                cornerRadius: SupplementConstants.innerRadius,
                cornerSmoothing: 1.0,
              ),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Chi phí mới'.tr(),
                            style: theme.textTheme.labelMedium?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 0.3,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            '(Dự kiến)'.tr(),
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: theme.colorScheme.error.withValues(alpha: 0.7),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Flexible(
                      child: Text(
                        SupplementUtils.formatCurrency(newCost),
                        style: theme.textTheme.headlineMedium?.copyWith(
                          color: theme.colorScheme.error,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                          height: 1,
                        ),
                        textAlign: TextAlign.right,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),

          if (diff > 0)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: ShapeDecoration(
                color: theme.colorScheme.errorContainer.withValues(alpha: 0.85),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 10,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: theme.colorScheme.error.withValues(alpha: 0.30),
                    width: 0.5,
                  ),
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    CupertinoIcons.arrow_up_right,
                    size: 14,
                    color: theme.colorScheme.onErrorContainer,
                  ),
                  const SizedBox(width: 4),
                  Flexible(
                    child: Text(
                      '${'Tăng'.tr()} +${SupplementUtils.formatCurrency(diff)}',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onErrorContainer,
                        fontWeight: FontWeight.w700,
                        letterSpacing: 0.3,
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
