import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
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
        bgColor = context.colors.errorContainer.withValues(alpha: 0.85);
        textColor = context.colors.onErrorContainer;
        dotColor = context.colors.error;
        labelKey = 'KHẨN CẤP';
        break;
      case 'HIGH':
        bgColor = const Color(0xFFffedd5);
        textColor = const Color(0xFF9a3412);
        dotColor = const Color(0xFFf97316);
        labelKey = 'CAO';
        break;
      case 'MEDIUM':
        bgColor = context.colors.primaryContainer.withValues(alpha: 0.85);
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
      decoration: ShapeDecoration(
        color: bgColor,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 10,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: dotColor.withValues(alpha: 0.25),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Dot nhỏ dùng squircle thay BoxShape.circle
          Container(
            width: 6,
            height: 6,
            decoration: ShapeDecoration(
              color: dotColor,
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 3,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
          ),
          const SizedBox(width: 4),
          Text(
            tr(labelKey, context: context),
            style: context.textTheme.labelSmall?.copyWith(
              color: textColor,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.3,
            ),
          ),
        ],
      ),
    );
  }
}