import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../../core/utils/theme_extension.dart';

class TaskTypeBadge extends StatelessWidget {
  final String? taskType;

  const TaskTypeBadge({super.key, this.taskType});

  @override
  Widget build(BuildContext context) {
    if (taskType == null || taskType!.isEmpty) return const SizedBox.shrink();

    String typeText = taskType!;
    IconData iconData = CupertinoIcons.doc_text;

    switch (taskType!.toUpperCase()) {
      case 'TEST_DRIVE':
        typeText = tr('Lái Thử', context: context);
        iconData = CupertinoIcons.car_detailed;
        break;
      case 'CONSULTATION':
        typeText = tr('Tư Vấn', context: context);
        iconData = CupertinoIcons.chat_bubble_2;
        break;
      case 'CONTRACT':
        typeText = tr('Ký Hợp Đồng', context: context);
        iconData = CupertinoIcons.signature;
        break;
      case 'DELIVERY':
        typeText = tr('Giao Xe', context: context);
        iconData = CupertinoIcons.cube_box;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: ShapeDecoration(
        color: context.colors.secondaryContainer.withValues(alpha: 0.5),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 8,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: context.colors.secondary.withValues(alpha: 0.2),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(iconData, size: 12, color: context.colors.secondary),
          const SizedBox(width: 4),
          Text(
            typeText,
            style: context.textTheme.labelSmall?.copyWith(
              color: context.colors.secondary,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
