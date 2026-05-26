import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/job_part_model.dart';
import '../../../../utils/job_status_utils.dart';
import '../../../../constants/job_execution_constants.dart';

class JobPartIconBadge extends StatelessWidget {
  final JobPartIcon iconType;

  const JobPartIconBadge({super.key, required this.iconType});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      height: 48,
      width: 48,
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.10)
            : theme.colorScheme.surfaceContainerHighest,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.iconBadgeCornerRadius,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Icon(
        JobPartIconUtils.fromModel(iconType),
        color: theme.colorScheme.onSurfaceVariant,
        size: 24,
      ),
    );
  }
}
