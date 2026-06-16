import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/cards/task_card.dart';
import '../cards/task_card_skeleton.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/lists/sales_tasks_empty_state.dart';

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
      final isSearchActive = state.searchQuery.isNotEmpty || state.filterDate != null;
      
      return RefreshIndicator(
        onRefresh: () => ref.read(salesTasksControllerProvider.notifier).refresh(),
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: EdgeInsets.only(top: topPadding, bottom: 100),
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.5,
              child: SalesTasksEmptyState(
                currentTab: state.currentTab,
                hasAnyTasks: state.allTasks.isNotEmpty,
                isSearchActive: isSearchActive,
              ),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: () => ref.read(salesTasksControllerProvider.notifier).refresh(),
      child: ListView.builder(
        padding: EdgeInsets.only(top: topPadding, bottom: 100),
        physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
        itemCount: tasks.length,
        itemBuilder: (context, index) {
          final task = tasks[index];
          return TaskCard(task: task);
        },
      ),
    );
  }
}