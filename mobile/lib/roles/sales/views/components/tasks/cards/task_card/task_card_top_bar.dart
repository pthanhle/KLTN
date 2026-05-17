import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../../../../auth/models/task_model.dart';
import '../priority_badge.dart';
import 'task_type_badge.dart';

class TaskCardTopBar extends StatelessWidget {
  final TaskModel task;

  const TaskCardTopBar({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Row(
          children: [
            PriorityBadge(priority: task.priority),
            if (task.taskType != null) ...[
              const SizedBox(width: 8),
              TaskTypeBadge(taskType: task.taskType),
            ],
          ],
        ),
        if (task.sla != null)
          Flexible(
            child: Text(
              tr('SLA: {} còn lại', context: context).replaceFirst('{}', task.sla!),
              style: context.textTheme.labelMedium?.copyWith(
                color: task.priority.toUpperCase() == 'URGENT' 
                    ? context.colors.error 
                    : context.colors.onSurfaceVariant,
                fontWeight: FontWeight.bold,
              ),
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.right,
            ),
          ),
      ],
    );
  }
}