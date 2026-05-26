import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../quotation/widgets/shared/glass_card.dart';
import '../../../utils/supplement_cost_utils.dart';
import '../../../constants/supplement_ui_constants.dart';
import '../../../controllers/supplement_controller.dart';
import 'supplement_diff_badge.dart';

class SupplementSummarySection extends ConsumerWidget {
  const SupplementSummarySection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final supplementState = ref.watch(supplementControllerProvider);

    return supplementState.when(
      data: (data) {
        final oldCost = data.oldCost;
        final newCost = data.calculatedNewCost;
        final diff = data.costDifference;

        return GlassCard(
          padding: const EdgeInsets.all(SupplementUiConstants.cardPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(SupplementUiConstants.innerPadding),
                decoration: ShapeDecoration(
                  color: isDark
                      ? Colors.white.withValues(alpha: 0.04)
                      : Colors.black.withValues(alpha: 0.03),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: SupplementUiConstants.innerRadius,
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
                    cornerRadius: SupplementUiConstants.innerRadius,
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
                            SupplementCostUtils.formatCurrency(oldCost),
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
                padding: const EdgeInsets.all(SupplementUiConstants.innerPadding + 4),
                decoration: ShapeDecoration(
                  color: diff > 0 
                    ? theme.colorScheme.error.withValues(alpha: isDark ? 0.12 : 0.06)
                    : theme.colorScheme.primary.withValues(alpha: isDark ? 0.12 : 0.06),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: SupplementUiConstants.innerRadius,
                      cornerSmoothing: 1.0,
                    ),
                    side: BorderSide(
                      color: diff > 0 
                        ? theme.colorScheme.error.withValues(alpha: 0.30)
                        : theme.colorScheme.primary.withValues(alpha: 0.30),
                      width: 0.5,
                    ),
                  ),
                ),
                child: ClipSmoothRect(
                  radius: SmoothBorderRadius(
                    cornerRadius: SupplementUiConstants.innerRadius,
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
                                  color: diff > 0 
                                    ? theme.colorScheme.error.withValues(alpha: 0.7)
                                    : theme.colorScheme.primary.withValues(alpha: 0.7),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Flexible(
                          child: Text(
                            SupplementCostUtils.formatCurrency(newCost),
                            style: theme.textTheme.headlineMedium?.copyWith(
                              color: diff > 0 ? theme.colorScheme.error : theme.colorScheme.primary,
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
              const SizedBox(height: SupplementUiConstants.sectionSpacing),

              SupplementDiffBadge(diff: diff),
            ],
          ),
        );
      },
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}
