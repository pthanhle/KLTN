import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../controllers/labor_search_controller.dart';
import '../../../../../../data/mocks/labor_master_data.dart';

class LaborActionIsland extends ConsumerWidget {
  const LaborActionIsland({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(laborSearchControllerProvider);
    final notifier = ref.read(laborSearchControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    if (state.selectedLaborIds.isEmpty) return const SizedBox.shrink();

    double totalPrice = 0;
    for (final id in state.selectedLaborIds) {
      final labor = mockLaborMasterData.firstWhere((l) => l.laborCode == id);
      totalPrice += labor.basePrice;
    }

    return Positioned(
      bottom: MediaQuery.of(context).padding.bottom + 12,
      left: 20,
      right: 20,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 400),
          child: Container(
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.70),
              shape: SmoothRectangleBorder(
                borderRadius:
                    SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.12),
                  blurRadius: 32,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius:
                  SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 32, sigmaY: 32),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16, vertical: 12),
                  child: Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${'Đã chọn'.tr()}: ${state.selectedLaborIds.length}',
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: theme.colorScheme.onSurfaceVariant,
                                fontWeight: FontWeight.w600,
                                letterSpacing: 0.2,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              NumberFormat.currency(
                                      locale: 'vi_VN', symbol: 'đ')
                                  .format(totalPrice),
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w800,
                                color: theme.colorScheme.primary,
                                letterSpacing: -0.3,
                              ),
                            ),
                          ],
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          HapticFeedback.mediumImpact();
                          notifier.confirmSelection();
                          Navigator.of(context).pop();
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 20, vertical: 11),
                          decoration: ShapeDecoration(
                            color: theme.colorScheme.primary
                                .withValues(alpha: isDark ? 0.20 : 0.12),
                            shape: SmoothRectangleBorder(
                              borderRadius: SmoothBorderRadius(
                                  cornerRadius: 16, cornerSmoothing: 1.0),
                              side: BorderSide(
                                color: theme.colorScheme.primary
                                    .withValues(alpha: 0.30),
                                width: 0.5,
                              ),
                            ),
                          ),
                          child: ClipSmoothRect(
                            radius: SmoothBorderRadius(
                                cornerRadius: 16, cornerSmoothing: 1.0),
                            child: BackdropFilter(
                              filter:
                                  ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    'Xác nhận'.tr(),
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      color: theme.colorScheme.primary,
                                      fontWeight: FontWeight.w700,
                                      letterSpacing: -0.2,
                                    ),
                                  ),
                                  const SizedBox(width: 6),
                                  Icon(
                                    CupertinoIcons.arrow_right,
                                    color: theme.colorScheme.primary,
                                    size: 15,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
