import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/sales/features/post_drive/data/mock_post_drive_data.dart';
import 'package:ttauto_staff/roles/sales/features/post_drive/controllers/post_drive_controller.dart';

class InterestLevelSelector extends ConsumerWidget {
  const InterestLevelSelector({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(postDriveControllerProvider);
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          tr('MỨC ĐỘ QUAN TÂM'),
          style: textTheme.labelSmall?.copyWith(
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
            color: colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            for (var i = 0; i < MockPostDriveData.interestLevels.length; i++) ...[
              _buildPillItem(
                context,
                ref,
                MockPostDriveData.interestLevels[i],
                state.interestLevelId == MockPostDriveData.interestLevels[i].id,
              ),
              if (i < MockPostDriveData.interestLevels.length - 1) const SizedBox(width: 8),
            ]
          ],
        ),
      ],
    );
  }

  Widget _buildPillItem(BuildContext context, WidgetRef ref, InterestLevelModel data, bool isSelected) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return Expanded(
      child: GestureDetector(
        onTap: () {
          if (!isSelected) {
            HapticFeedback.selectionClick();
            ref.read(postDriveControllerProvider.notifier).setInterestLevel(data.id);
          }
        },
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 4),
          decoration: ShapeDecoration(
            // Liquid Glassmorphism logic
            color: isSelected 
                ? data.baseColor.withValues(alpha: 0.25) 
                : colorScheme.surface.withValues(alpha: 0.35),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0), // Vertical Pill
              side: BorderSide(
                color: isSelected 
                    ? data.baseColor 
                    : colorScheme.outline.withValues(alpha: 0.3), // Specular Highlight
                width: 1.5,
              ),
            ),
          ),
          alignment: Alignment.center,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                data.icon,
                size: 28,
                color: isSelected ? data.baseColor : colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
              ),
              const SizedBox(height: 8),
              Text(
                data.localizedLabel,
                textAlign: TextAlign.center,
                style: textTheme.labelSmall?.copyWith(
                  color: isSelected ? data.baseColor : colorScheme.onSurface,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
