import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controllers/post_drive_controller.dart';
import '../../../../../../../auth/models/task_model.dart';

class BottomSheetFooter extends ConsumerWidget {
  final TaskModel task;
  final VoidCallback onComplete;

  const BottomSheetFooter({
    super.key,
    required this.task,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    
    return ElevatedButton(
      onPressed: () async {
        await ref.read(postDriveControllerProvider.notifier).submitPostDriveData(task.id);
        onComplete();
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: theme.colorScheme.surfaceContainerHigh,
        foregroundColor: theme.colorScheme.outline,
        disabledBackgroundColor: theme.colorScheme.surfaceContainerHigh.withValues(alpha: 0.6),
        disabledForegroundColor: theme.colorScheme.outline,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
        ),
      ),
      child: Text(
        tr('[ Hoàn thành Công việc ]'), 
        style: theme.textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w600, 
        )
      ),
    );
  }
}