import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../quotation/widgets/shared/glass_card.dart';
import '../../../constants/supplement_ui_constants.dart';
import '../../../controllers/supplement_controller.dart';
import 'supplement_cart_empty_state.dart';
import 'supplement_cart_part_list.dart';
import 'supplement_cart_labor_list.dart';
import 'skeletons/supplement_cart_skeleton.dart';

class SupplementCartSection extends ConsumerWidget {
  const SupplementCartSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final supplementState = ref.watch(supplementControllerProvider);
    final controller = ref.read(supplementControllerProvider.notifier);

    return GlassCard(
      padding: const EdgeInsets.all(SupplementUiConstants.cardPadding),
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
                  CupertinoIcons.cart_fill,
                  color: theme.colorScheme.primary,
                  size: SupplementUiConstants.iconSize,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'Chi phí phát sinh'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.3,
                  ),
                ),
              ),
              supplementState.maybeWhen(
                data: (data) {
                  final total = data.addedParts.length + data.addedLabors.length;
                  if (total == 0) return const SizedBox.shrink();
                  return AnimatedSwitcher(
                    duration: const Duration(milliseconds: 300),
                    child: _CartCountBadge(
                      key: ValueKey(total),
                      count: total,
                      theme: theme,
                    ),
                  );
                },
                orElse: () => const SizedBox.shrink(),
              ),
            ],
          ),
          const SizedBox(height: SupplementUiConstants.sectionSpacing),
          
          supplementState.when(
            data: (data) {
              if (data.addedParts.isEmpty && data.addedLabors.isEmpty) {
                return const SupplementCartEmptyState();
              }
              
              return Column(
                children: [
                  SupplementCartPartList(
                    parts: data.addedParts,
                    onUpdateQuantity: controller.updatePartQuantity,
                    onRemove: controller.removePart,
                  ),
                  if (data.addedParts.isNotEmpty && data.addedLabors.isNotEmpty)
                    const SizedBox(height: SupplementUiConstants.itemSpacing),
                  SupplementCartLaborList(
                    labors: data.addedLabors,
                    onRemove: controller.removeLabor,
                  ),
                ],
              );
            },
            loading: () => const SupplementCartSkeleton(),
            error: (_, __) => const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}

class _CartCountBadge extends StatelessWidget {
  final int count;
  final ThemeData theme;

  const _CartCountBadge({super.key, required this.count, required this.theme});

  @override
  Widget build(BuildContext context) {
    final primary = theme.colorScheme.primary;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: ShapeDecoration(
        color: primary.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
          side: BorderSide(color: primary.withValues(alpha: 0.25), width: 0.5),
        ),
      ),
      child: Text(
        '$count',
        style: theme.textTheme.labelMedium?.copyWith(
          color: primary,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

