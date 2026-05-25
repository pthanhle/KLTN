import 'package:flutter/material.dart';
import '../../models/job_task_model.dart';
import '../cards/job_task_card.dart';

class JobTasksSection extends StatelessWidget {
  final List<JobTaskModel> tasks;
  final bool isDark;
  final Function(String) onToggleStatus;
  final Function(String) onCameraTap;

  const JobTasksSection({
    super.key,
    required this.tasks,
    required this.isDark,
    required this.onToggleStatus,
    required this.onCameraTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      itemCount: tasks.length,
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return JobTaskCard(
          task: task,
          isDark: isDark,
          onToggleStatus: () => onToggleStatus(task.id),
          onCameraTap: () => onCameraTap(task.id),
        );
      },
    );
  }
}
