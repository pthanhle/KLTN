import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../../../../auth/models/task_model.dart';

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
                        Icon(Icons.schedule, size: 14, color: context.colors.onSurfaceVariant),
                        const SizedBox(width: 4),
                        Text(
                          task.appointmentTime!,
                          style: context.textTheme.bodySmall?.copyWith(
                            color: context.colors.onSurfaceVariant,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  if (hasTime && hasLocation) const SizedBox(height: 4),
                  if (hasLocation)
                    Row(
                      children: [
                        Icon(
                          task.locationType?.toUpperCase() == 'HOME' ? Icons.home : Icons.location_on, 
                          size: 14, 
                          color: context.colors.onSurfaceVariant
                        ),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            task.address ?? tr('Tại Showroom', context: context),
                            style: context.textTheme.bodySmall?.copyWith(
                              color: context.colors.onSurfaceVariant,
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
                decoration: BoxDecoration(
                  color: context.colors.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  task.billed!,
                  style: context.textTheme.labelLarge?.copyWith(
                    color: context.colors.primary,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
          ],
        ),
        if (task.progress != null) ...[
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(2),
            child: LinearProgressIndicator(
              value: task.progress! / 100,
              backgroundColor: context.colors.surfaceContainerHigh,
              valueColor: AlwaysStoppedAnimation<Color>(context.colors.primary),
              minHeight: 4,
            ),
          ),
        ]
      ],
    );
  }
}
