import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../constants/post_drive_data.dart';
import '../controllers/post_drive_controller.dart';

class InterestLevelSelector extends ConsumerWidget {
  const InterestLevelSelector({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(postDriveControllerProvider);
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          tr('MỨC ĐỘ QUAN TÂM'),
          style: textTheme.labelSmall?.copyWith(
            fontWeight: FontWeight.w600,
            letterSpacing: 0.05,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            for (var i = 0; i < PostDriveConstants.interestLevels.length; i++) ...[
              _buildTempBtn(
                context,
                ref,
                PostDriveConstants.interestLevels[i],
                state.selectedInterestLevelId == PostDriveConstants.interestLevels[i].id,
              ),
              if (i < PostDriveConstants.interestLevels.length - 1) const SizedBox(width: 8),
            ]
          ],
        ),
      ],
    );
  }

  Widget _buildTempBtn(BuildContext context, WidgetRef ref, InterestLevelData data, bool isSelected) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return Expanded(
      child: GestureDetector(
        onTap: () {
          ref.read(postDriveControllerProvider.notifier).setInterestLevel(data.id);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
          decoration: ShapeDecoration(
            color: isSelected ? data.baseColor.withValues(alpha: 0.1) : colorScheme.surfaceContainerHigh.withValues(alpha: 0.5),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
              side: isSelected 
                  ? BorderSide(color: data.baseColor, width: 1.5) 
                  : BorderSide(color: colorScheme.outlineVariant.withValues(alpha: 0.3), width: 1),
            ),
          ),
          alignment: Alignment.center,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                data.emoji,
                style: textTheme.headlineSmall, // Apple HIG emojis typically map to headline sizes
              ),
              const SizedBox(height: 4),
              Text(
                data.localizedLabel,
                textAlign: TextAlign.center,
                style: textTheme.labelSmall?.copyWith(
                  color: isSelected ? data.baseColor : colorScheme.onSurfaceVariant,
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
