import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';

class TaskCardFooter extends StatelessWidget {
  final TaskModel task;

  const TaskCardFooter({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    final bool hasTime = task.appointmentTime != null;
    final bool hasLocation = task.address != null || task.locationType != null;
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (hasTime)
                    Row(
                      children: [
                        Icon(Icons.schedule_rounded, size: 16, color: context.colors.onSurfaceVariant.withValues(alpha: 0.8)),
                        const SizedBox(width: 6),
                        Text(
                          task.appointmentTime!,
                          style: context.textTheme.labelMedium?.copyWith(
                            color: context.colors.onSurfaceVariant.withValues(alpha: 0.9),
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0,
                          ),
                        ),
                      ],
                    ),
                  if (hasTime && hasLocation) const SizedBox(height: 6),
                  if (hasLocation)
                    Row(
                      children: [
                        Icon(
                          task.locationType?.toUpperCase() == 'HOME' ? Icons.home_rounded : Icons.location_on_rounded, 
                          size: 16, 
                          color: context.colors.onSurfaceVariant.withValues(alpha: 0.8)
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            (task.address?.trim().isNotEmpty == true) 
                                ? task.address! 
                                : tr('Tại Showroom', context: context),
                            style: context.textTheme.labelMedium?.copyWith(
                              color: context.colors.onSurfaceVariant.withValues(alpha: 0.9),
                              letterSpacing: 0,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                ],
              ),
            ),
            if (task.billed != null)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: ShapeDecoration(
                  color: context.colors.primary.withValues(alpha: 0.15),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: context.colors.primary.withValues(alpha: 0.2),
                      width: 0.5,
                    ),
                  ),
                ),
                child: Text(
                  task.billed!,
                  style: context.textTheme.labelLarge?.copyWith(
                    color: context.colors.primary,
                    fontWeight: FontWeight.w800,
                    letterSpacing: -0.2,
                  ),
                ),
              ),
          ],
        ),
        if (task.progress != null) ...[
          const SizedBox(height: 16),
          ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            child: LinearProgressIndicator(
              value: task.progress! / 100,
              backgroundColor: context.colors.surfaceContainerHigh.withValues(alpha: 0.5),
              valueColor: AlwaysStoppedAnimation<Color>(context.colors.primary),
              minHeight: 6, // Slightly thicker for better visibility in glassmorphism
            ),
          ),
        ]
      ],
    );
  }
}
