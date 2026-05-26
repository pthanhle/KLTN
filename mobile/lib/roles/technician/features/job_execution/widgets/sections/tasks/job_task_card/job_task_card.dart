import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/job_task_model.dart';
import '../../../../utils/job_status_utils.dart';
import '../../../../constants/job_execution_constants.dart';
import 'job_task_icon_badge.dart';
import 'job_task_action_row.dart';

class JobTaskCard extends StatelessWidget {
  final JobTaskModel task;
  final bool isDark;
  final VoidCallback onAction;
  final VoidCallback onCamera;

  const JobTaskCard({
    super.key,
    required this.task,
    required this.isDark,
    required this.onAction,
    required this.onCamera,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: const EdgeInsets.only(bottom: JobExecutionUiConstants.cardMarginBottom),
      decoration: ShapeDecoration(
        color: JobTaskStatusUtils.cardBgColor(task.status, isDark),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.cardCornerRadius,
            cornerSmoothing: JobExecutionUiConstants.cardCornerSmoothing,
          ),
          side: BorderSide(
            color: JobTaskStatusUtils.cardBorderColor(task.status, isDark),
            width: JobExecutionUiConstants.cardBorderWidth,
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
          cornerRadius: JobExecutionUiConstants.cardCornerRadius,
          cornerSmoothing: JobExecutionUiConstants.cardCornerSmoothing,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: JobExecutionUiConstants.cardBlurSigma,
            sigmaY: JobExecutionUiConstants.cardBlurSigma,
          ),
          child: Padding(
            padding: const EdgeInsets.all(JobExecutionUiConstants.cardPadding),
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
                    JobTaskIconBadge(status: task.status, iconType: task.icon),
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
                JobTaskActionRow(
                  status: task.status,
                  hasMedia: task.mediaUrls.isNotEmpty,
                  onAction: onAction,
                  onCamera: onCamera,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
