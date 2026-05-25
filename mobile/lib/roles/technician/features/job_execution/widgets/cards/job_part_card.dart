import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/job_part_model.dart';
import '../buttons/job_part_check_button.dart';

class JobPartCard extends StatelessWidget {
  final JobPartModel part;
  final bool isDark;
  final VoidCallback onToggleCheck;

  const JobPartCard({
    super.key,
    required this.part,
    required this.isDark,
    required this.onToggleCheck,
  });

  IconData _getIconData(JobPartIcon iconType) {
    switch (iconType) {
      case JobPartIcon.settings:
        return CupertinoIcons.gear_alt_fill;
      case JobPartIcon.waterDrop:
        return CupertinoIcons.drop_fill;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isCompleted = part.status == JobPartStatus.completed;

    Color bgColor = isDark
        ? Colors.white.withValues(alpha: 0.04)
        : Colors.white.withValues(alpha: 0.65);
    Color borderColor = Colors.white.withValues(alpha: isDark ? 0.12 : 0.80);

    if (isCompleted) {
      bgColor = Colors.green.shade600.withValues(alpha: isDark ? 0.1 : 0.05);
      borderColor = Colors.green.shade600.withValues(alpha: 0.2);
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: ShapeDecoration(
        color: bgColor,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 20,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: borderColor,
            width: 1.0,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 32,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 20,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Row(
              children: [
                Container(
                  height: 48,
                  width: 48,
                  decoration: ShapeDecoration(
                    color: isDark ? Colors.white.withValues(alpha: 0.1) : theme.colorScheme.surfaceContainerHighest,
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 12,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                  child: Icon(
                    _getIconData(part.icon),
                    color: theme.colorScheme.onSurfaceVariant,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        part.name,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${'SL'.tr()}: ${part.quantity}',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                JobPartCheckButton(
                  isCompleted: isCompleted,
                  onTap: onToggleCheck,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
