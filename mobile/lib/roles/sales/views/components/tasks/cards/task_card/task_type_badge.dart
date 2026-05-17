import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../../core/utils/theme_extension.dart';

class TaskTypeBadge extends StatelessWidget {
  final String? taskType;

  const TaskTypeBadge({super.key, this.taskType});

  @override
  Widget build(BuildContext context) {
    if (taskType == null || taskType!.isEmpty) return const SizedBox.shrink();

    String typeText = taskType!;
    IconData iconData = Icons.assignment;

    switch (taskType!.toUpperCase()) {
      case 'TEST_DRIVE':
        typeText = tr('Lái Thử', context: context);
        iconData = Icons.directions_car;
        break;
      case 'CONSULTATION':
        typeText = tr('Tư Vấn', context: context);
        iconData = Icons.support_agent;
        break;
      case 'CONTRACT':
        typeText = tr('Ký Hợp Đồng', context: context);
        iconData = Icons.edit_document;
        break;
      case 'DELIVERY':
        typeText = tr('Giao Xe', context: context);
        iconData = Icons.local_shipping;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: context.colors.secondaryContainer.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: context.colors.secondary.withValues(alpha: 0.2),
          width: 0.5,
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
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
