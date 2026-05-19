import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/cards/task_card.dart';
import '../cards/task_card_skeleton.dart';

class TasksListView extends ConsumerWidget {
  final double topPadding;

  const TasksListView({
    super.key,
    this.topPadding = 8.0,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(salesTasksControllerProvider);
    final controller = ref.read(salesTasksControllerProvider.notifier);

    if (state.isLoading) {
      return ListView.builder(
        padding: EdgeInsets.only(top: topPadding, bottom: 100),
        physics: const BouncingScrollPhysics(),
        itemCount: 4,
        itemBuilder: (context, index) => const TaskCardSkeleton(),
      );
    }

    List<TaskModel> tasks = state.activeTasks;

    if (tasks.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inbox, size: 64, color: context.colors.outlineVariant),
            const SizedBox(height: 16),
            Text(
              tr('Không có công việc nào trong danh sách này.', context: context),
              style: context.textTheme.bodyLarge?.copyWith(
                color: context.colors.onSurfaceVariant,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: EdgeInsets.only(top: topPadding, bottom: 100),
      physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return TaskCard(task: task);
      },
    );
  }
}