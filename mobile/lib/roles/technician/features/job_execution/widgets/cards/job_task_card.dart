import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/job_task_model.dart';
import '../buttons/job_action_button.dart';
import '../buttons/job_camera_button.dart';

class JobTaskCard extends StatelessWidget {
  final JobTaskModel task;
  final bool isDark;
  final VoidCallback onToggleStatus;
  final VoidCallback onCameraTap;

  const JobTaskCard({
    super.key,
    required this.task,
    required this.isDark,
    required this.onToggleStatus,
    required this.onCameraTap,
  });

  IconData _getIconData(JobTaskIcon iconType) {
    switch (iconType) {
      case JobTaskIcon.build:
        return CupertinoIcons.wrench_fill;
      case JobTaskIcon.cleaningServices:
        return CupertinoIcons.sparkles;
      case JobTaskIcon.checkCircle:
        return CupertinoIcons.checkmark_circle_fill;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isCompleted = task.status == JobTaskStatus.completed;
    final isInProgress = task.status == JobTaskStatus.inProgress;

    Color bgColor = isDark
        ? Colors.white.withValues(alpha: 0.04)
        : Colors.white.withValues(alpha: 0.65);
    Color borderColor = Colors.white.withValues(alpha: isDark ? 0.12 : 0.80);

    if (isCompleted) {
      bgColor = Colors.green.shade600.withValues(alpha: isDark ? 0.1 : 0.05);
      borderColor = Colors.green.shade600.withValues(alpha: 0.2);
    } else if (isInProgress) {
      bgColor = Colors.orange.shade600.withValues(alpha: isDark ? 0.1 : 0.05);
      borderColor = Colors.orange.shade600.withValues(alpha: 0.2);
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
          side: BorderSide(color: borderColor, width: 1.0),
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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        task.name,
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontFamily: 'Hanken Grotesk',
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: ShapeDecoration(
                        color: isCompleted
                            ? const Color(0xFF34C759).withValues(alpha: 0.15)
                            : (isInProgress
                                ? const Color(0xFFFF9500).withValues(alpha: 0.12)
                                : theme.colorScheme.primary.withValues(alpha: 0.10)),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                        ),
                      ),
                      child: Icon(
                        isCompleted ? CupertinoIcons.checkmark_circle_fill : _getIconData(task.icon),
                        size: 20,
                        color: isCompleted
                            ? const Color(0xFF34C759)
                            : (isInProgress
                                ? const Color(0xFFFF9500)
                                : theme.colorScheme.primary),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  task.description,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    JobActionButton(
                      status: task.status,
                      onTap: onToggleStatus,
                    ),
                    JobCameraButton(
                      isVisible: isCompleted,
                      onTap: onCameraTap,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
