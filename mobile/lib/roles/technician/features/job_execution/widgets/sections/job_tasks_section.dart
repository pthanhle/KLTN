import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/job_task_model.dart';
import '../../constants/job_execution_constants.dart';
import 'tasks/job_task_card/job_task_card.dart';
import 'tasks/skeletons/job_task_card_skeleton.dart';

class JobTasksSection extends StatelessWidget {
  final List<JobTaskModel> tasks;
  final bool isDark;
  final bool isLoading;
  final Function(String taskId) onToggleStatus;
  final Function(String taskId) onCameraTap;

  const JobTasksSection({
    super.key,
    required this.tasks,
    required this.isDark,
    this.isLoading = false,
    required this.onToggleStatus,
    required this.onCameraTap,
  });

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return ListView.builder(
        padding: const EdgeInsets.symmetric(
          horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
          vertical: JobExecutionUiConstants.sectionVerticalPadding,
        ),
        itemCount: 3,
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemBuilder: (context, _) => const JobTaskCardSkeleton(),
      );
    }

    if (tasks.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
          vertical: 48,
        ),
        child: Center(
          child: Text(
            'Không có hạng mục thi công nào'.tr(),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(
        horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
        vertical: JobExecutionUiConstants.sectionVerticalPadding,
      ),
      itemCount: tasks.length,
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return JobTaskCard(
          key: ValueKey(task.id),
          task: task,
          isDark: isDark,
          onAction: () => onToggleStatus(task.id),
          onCamera: () => onCameraTap(task.id),
        );
      },
    );
  }
}
