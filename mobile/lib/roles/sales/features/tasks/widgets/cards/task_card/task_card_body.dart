import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:figma_squircle/figma_squircle.dart';

class TaskCardBody extends StatelessWidget {
  final TaskModel task;

  const TaskCardBody({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Text(
                task.title,
                style: context.textTheme.titleMedium?.copyWith(
                  color: context.colors.onSurface,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.6, // Chuẩn Apple: Chữ to thường khít lại
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            if (task.licensePlate != null || task.vehicleModel != null) ...[
              const SizedBox(width: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: ShapeDecoration(
                  color: context.colors.surfaceContainerHighest.withValues(alpha: 0.5),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: context.colors.outline.withValues(alpha: 0.1),
                      width: 0.5,
                    )
                  ),
                ),
                child: Text(
                  task.licensePlate ?? task.vehicleModel!,
                  style: context.textTheme.labelSmall?.copyWith(
                    color: context.colors.onSurfaceVariant,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ],
          ],
        ),
        if (task.description != null) ...[
          const SizedBox(height: 8),
          Text(
            task.description!,
            style: context.textTheme.bodyMedium?.copyWith(
              color: context.colors.onSurfaceVariant.withValues(alpha: 0.8), // Mờ tinh tế
              height: 1.4,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ],
    );
  }
}
