import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:ttauto_staff/roles/sales/features/shared/data/test_drive_api_service.dart';

enum TaskTab { todo, inProgress, done }

class SalesTasksState {
  final List<TaskModel> allTasks;
  final TaskTab currentTab;
  final bool isLoading;
  final String? error;

  SalesTasksState({
    this.allTasks = const [],
    this.currentTab = TaskTab.todo,
    this.isLoading = true,
    this.error,
  });

  SalesTasksState copyWith({
    List<TaskModel>? allTasks,
    TaskTab? currentTab,
    bool? isLoading,
    String? error,
  }) {
    return SalesTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentTab: currentTab ?? this.currentTab,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }

  List<TaskModel> get todoTasks => allTasks
      .where((t) =>
          t.status == 'confirmed' ||
          t.status == 'todo' ||
          t.status == null)
      .toList();

  List<TaskModel> get inProgressTasks => allTasks
      .where((t) =>
          t.status == 'customer_arrived' || t.status == 'in_progress')
      .toList();

  List<TaskModel> get doneTasks => allTasks
      .where((t) => t.status == 'post_drive' || t.status == 'done')
      .toList();

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
    state = state.copyWith(isLoading: true, error: null);
    try {
      final tasks = await testDriveApiService.fetchMyTasks();
      state = state.copyWith(allTasks: tasks, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  void changeTab(int index) {
    if (index >= 0 && index < TaskTab.values.length) {
      state = state.copyWith(currentTab: TaskTab.values[index]);
    }
  }

  Future<void> updateTaskStatus(String taskId, String newStatus) async {
    // Optimistic local update
    final updatedTasks = state.allTasks.map((t) {
      if (t.id == taskId) return t.copyWith(status: newStatus);
      return t;
    }).toList();
    state = state.copyWith(allTasks: updatedTasks);

    // Map task status back to booking status for API
    const taskToBookingStatus = {
      'confirmed': 'CONFIRMED',
      'customer_arrived': 'RECEIVED',
      'in_progress': 'IN_PROGRESS',
      'post_drive': 'COMPLETED',
      'done': 'COMPLETED',
      'cancelled': 'CANCELLED',
    };

    final bookingStatus = taskToBookingStatus[newStatus] ?? newStatus.toUpperCase();
    try {
      await testDriveApiService.updateStatus(taskId, bookingStatus);
    } catch (e) {
      // Revert on error and reload
      await _loadTasks();
    }
  }

  Future<void> refresh() async {
    await _loadTasks();
  }
}

final salesTasksControllerProvider =
    NotifierProvider.autoDispose<SalesTasksController, SalesTasksState>(
        SalesTasksController.new);
