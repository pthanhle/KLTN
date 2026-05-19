import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/auth/controllers/auth_controller.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';

enum TaskTab { todo, inProgress, done }

class SalesTasksState {
  final List<TaskModel> allTasks;
  final TaskTab currentTab;
  final bool isLoading;

  SalesTasksState({
    this.allTasks = const [],
    this.currentTab = TaskTab.todo,
    this.isLoading = true,
  });

  SalesTasksState copyWith({
    List<TaskModel>? allTasks,
    TaskTab? currentTab,
    bool? isLoading,
  }) {
    return SalesTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentTab: currentTab ?? this.currentTab,
      isLoading: isLoading ?? this.isLoading,
    );
  }

  List<TaskModel> get todoTasks => allTasks.where((t) => t.status == 'todo' || t.status == 'confirmed' || t.status == null).toList();
  List<TaskModel> get inProgressTasks => allTasks.where((t) => t.status == 'customer_arrived' || t.status == 'in_progress').toList();
  List<TaskModel> get doneTasks => allTasks.where((t) => t.status == 'post_drive' || t.status == 'done').toList();

  List<TaskModel> get activeTasks {
    switch (currentTab) {
      case TaskTab.todo:
        return todoTasks;
      case TaskTab.inProgress:
        return inProgressTasks;
      case TaskTab.done:
        return doneTasks;
    }
  }
}

class SalesTasksController extends Notifier<SalesTasksState> {
  @override
  SalesTasksState build() {
    Future.microtask(() => _loadTasks());
    return SalesTasksState();
  }

  Future<void> _loadTasks() async {
    await Future.delayed(const Duration(milliseconds: 600));
    
    final user = ref.read(authControllerProvider).value;
    if (user != null && user.performance != null && user.performance!.kanban != null) {
      final kanban = user.performance!.kanban!;
      state = state.copyWith(
        allTasks: kanban.tasks ?? [],
        isLoading: false,
      );
    } else {
      state = state.copyWith(isLoading: false);
    }
  }

  void changeTab(int index) {
    if (index >= 0 && index < TaskTab.values.length) {
      state = state.copyWith(currentTab: TaskTab.values[index]);
    }
  }

  void updateTaskStatus(String taskId, String newStatus) {
    final updatedTasks = state.allTasks.map((t) {
      if (t.id == taskId) {
        return t.copyWith(status: newStatus);
      }
      return t;
    }).toList();

    state = state.copyWith(allTasks: updatedTasks);
  }
}

final salesTasksControllerProvider =
    NotifierProvider.autoDispose<SalesTasksController, SalesTasksState>(
        SalesTasksController.new);
