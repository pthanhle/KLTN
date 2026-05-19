import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../core/utils/theme_extension.dart';

class PriorityBadge extends StatelessWidget {
  final String priority;

  const PriorityBadge({super.key, required this.priority});

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    Color textColor;
    Color dotColor;
    String labelKey;

    switch (priority.toUpperCase()) {
      case 'URGENT':
        bgColor = context.colors.errorContainer;
        textColor = context.colors.onErrorContainer;
        dotColor = context.colors.error;
        labelKey = 'KHẨN CẤP';
        break;
      case 'HIGH':
        bgColor = const Color(0xFFffedd5); // Orange-100 equivalent
        textColor = const Color(0xFF9a3412); // Orange-800
        dotColor = const Color(0xFFf97316); // Orange-500
        labelKey = 'CAO';
        break;
      case 'MEDIUM':
        bgColor = context.colors.primaryContainer;
        textColor = context.colors.onPrimaryContainer;
        dotColor = context.colors.primary;
        labelKey = 'TRUNG BÌNH';
        break;
      case 'LOW':
      default:
        bgColor = context.colors.surfaceContainerHighest;
        textColor = context.colors.onSurfaceVariant;
        dotColor = context.colors.outline;
        labelKey = 'THẤP';
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: dotColor,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 4),
          Text(
            tr(labelKey, context: context),
            style: context.textTheme.labelSmall?.copyWith(
              color: textColor,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }
}