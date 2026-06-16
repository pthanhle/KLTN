import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../../../../../core/utils/formatters.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'controllers/task_card_controller.dart';

class TaskCardCustomer extends ConsumerWidget {
  final TaskModel task;

  const TaskCardCustomer({
    super.key,
    required this.task,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Row(
            children: [
              // Squircle Avatar thay cho CircleAvatar
              Container(
                width: 44,
                height: 44,
                decoration: ShapeDecoration(
                  color: context.colors.tertiaryContainer.withValues(alpha: 0.6),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: context.colors.tertiary.withValues(alpha: 0.2),
                      width: 0.5,
                    ),
                  ),
                ),
                alignment: Alignment.center,
                child: Text(
                  Formatters.getInitials(task.customerName ?? ''),
                  style: context.textTheme.titleMedium?.copyWith(
                    color: context.colors.onTertiaryContainer,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      task.customerName ?? 'Unknown',
                      style: context.textTheme.titleSmall?.copyWith(
                        color: context.colors.onSurface,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.3,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 2),
                    if (task.customerPhone != null)
                      Text(
                        task.customerPhone!,
                        style: context.textTheme.labelMedium?.copyWith(
                          color: context.colors.onSurfaceVariant.withValues(alpha: 0.8),
                          letterSpacing: 0,
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
              _buildActionButton(
                context, 
                icon: CupertinoIcons.chat_bubble_fill, 
                onTap: () => ref.read(taskCardControllerProvider.notifier).openChat(task.id),
              ),
            const SizedBox(width: 8),
            _buildActionButton(
              context, 
              icon: CupertinoIcons.phone_fill, 
              onTap: () {
                if (task.customerPhone != null) {
                  ref.read(taskCardControllerProvider.notifier).callCustomer(task.customerPhone!);
                }
              },
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionButton(BuildContext context, {required IconData icon, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: ShapeDecoration(
          // Kính mờ (Glassmorphism Pill)
          color: context.colors.primaryContainer.withValues(alpha: 0.4),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0), // Pill
            side: BorderSide(
              color: context.colors.primary.withValues(alpha: 0.2),
              width: 0.5,
            ),
          ),
        ),
        child: Icon(
          icon, 
          size: 20,
          color: context.colors.primary,
        ),
      ),
    );
  }
}
