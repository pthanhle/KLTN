import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../../../../../core/utils/formatters.dart';
import '../../../../../../auth/models/task_model.dart';

class TaskCardCustomer extends StatelessWidget {
  final TaskModel task;

  const TaskCardCustomer({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Row(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: context.colors.tertiaryContainer,
                child: Text(
                  Formatters.getInitials(task.customerName ?? ''),
                  style: context.textTheme.labelLarge?.copyWith(
                    color: context.colors.onTertiaryContainer,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task.customerName ?? 'Unknown',
                      style: context.textTheme.titleSmall?.copyWith(
                        color: context.colors.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    if (task.customerPhone != null)
                      Text(
                        task.customerPhone!,
                        style: context.textTheme.bodySmall?.copyWith(
                          color: context.colors.onSurfaceVariant,
                        ),
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
        Row(
          children: [
            if (task.chatLogs != null && task.chatLogs!.isNotEmpty)
              IconButton(
                icon: const Icon(Icons.chat_bubble_outline, size: 20),
                color: context.colors.primary,
                style: IconButton.styleFrom(
                  backgroundColor: context.colors.primaryContainer.withValues(alpha: 0.5),
                ),
                onPressed: () {}, // TODO: Open chat
              ),
            const SizedBox(width: 4),
            IconButton(
              icon: const Icon(Icons.phone, size: 20),
              color: context.colors.primary,
              style: IconButton.styleFrom(
                backgroundColor: context.colors.primaryContainer.withValues(alpha: 0.5),
              ),
              onPressed: () {}, // TODO: Open dialer
            ),
          ],
        ),
      ],
    );
  }
}
