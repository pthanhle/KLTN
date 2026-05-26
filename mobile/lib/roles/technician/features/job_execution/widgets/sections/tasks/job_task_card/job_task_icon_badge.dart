import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/job_task_model.dart';
import '../../../../utils/job_status_utils.dart';
import '../../../../constants/job_execution_constants.dart';

class JobTaskIconBadge extends StatelessWidget {
  final JobTaskStatus status;
  final JobTaskIcon iconType;

  const JobTaskIconBadge({
    super.key,
    required this.status,
    required this.iconType,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final accent = JobTaskStatusUtils.accentColor(status, theme);
    final isCompleted = status == JobTaskStatus.completed;

    return Container(
      width: JobExecutionUiConstants.iconBadgeSize,
      height: JobExecutionUiConstants.iconBadgeSize,
      decoration: ShapeDecoration(
        color: accent.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.iconBadgeCornerRadius,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Icon(
        isCompleted
            ? CupertinoIcons.checkmark_circle_fill
            : JobTaskIconUtils.fromModel(iconType),
        size: JobExecutionUiConstants.iconSize,
        color: accent,
      ),
    );
  }
}
