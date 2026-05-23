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
    
    if (state.selectedLaborIds.isEmpty) {
      return const SizedBox.shrink();
    }

    // Calculate total price
    double totalPrice = 0;
    for (final id in state.selectedLaborIds) {
      final labor = mockLaborMasterData.firstWhere((l) => l.id == id);
      totalPrice += labor.price;
    }

    return Positioned(
      bottom: MediaQuery.of(context).padding.bottom + 24,
      left: 24,
      right: 24,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 400),
          child: ClipSmoothRect(
            radius: const SmoothBorderRadius.all(
              SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface.withValues(alpha: 0.8),
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.2),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 32,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Đã chọn: ${state.selectedLaborIds.length} mục'.tr(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(totalPrice),
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                    
                    GestureDetector(
                      onTap: () {
                        HapticFeedback.mediumImpact();
                        notifier.confirmSelection();
                        Navigator.of(context).pop();
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary,
                          borderRadius: BorderRadius.circular(32),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary.withValues(alpha: 0.3),
                              blurRadius: 8,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Text(
                              'Xác nhận'.tr(),
                              style: theme.textTheme.bodyMedium?.copyWith(
                                color: theme.colorScheme.onPrimary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Icon(
                              CupertinoIcons.arrow_right,
                              color: theme.colorScheme.onPrimary,
                              size: 16,
                            ),
                          ],
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
    );
  }
}
