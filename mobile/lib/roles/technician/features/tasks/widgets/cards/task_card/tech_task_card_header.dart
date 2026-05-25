import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/tech_task_model.dart';

class TechTaskCardHeader extends StatelessWidget {
  final TechTaskModel task;
  final Color urgencyColor;
  final String urgencyText;

  const TechTaskCardHeader({
    super.key,
    required this.task,
    required this.urgencyColor,
    required this.urgencyText,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: ShapeDecoration(
            color: urgencyColor.withValues(alpha: 0.12),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
            ),
          ),
          child: Icon(CupertinoIcons.car_detailed, color: urgencyColor, size: 24),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                task.plate,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.5,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                task.model,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                ),
              ),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: ShapeDecoration(
            color: urgencyColor.withValues(alpha: 0.12),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
              side: BorderSide(
                color: urgencyColor.withValues(alpha: 0.20),
                width: 0.5,
              ),
            ),
          ),
          child: Text(
            urgencyText,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.5,
              color: urgencyColor,
            ),
          ),
        ),
      ],
    );
  }
}
