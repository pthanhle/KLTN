import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:ttauto_staff/roles/sales/features/shared/data/test_drive_api_service.dart';

enum TaskTab { todo, inProgress, done }

class SalesTasksState {
  final List<TaskModel> allTasks;
  final TaskTab currentTab;
  final bool isLoading;
  final String? error;
  final String searchQuery;
  final DateTime? filterDate;

  SalesTasksState({
    this.allTasks = const [],
    this.currentTab = TaskTab.todo,
    this.isLoading = true,
    this.error,
    this.searchQuery = '',
    this.filterDate,
  });

  SalesTasksState copyWith({
    List<TaskModel>? allTasks,
    TaskTab? currentTab,
    bool? isLoading,
    String? error,
    String? searchQuery,
    DateTime? filterDate,
    bool clearFilterDate = false,
  }) {
    return SalesTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentTab: currentTab ?? this.currentTab,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      searchQuery: searchQuery ?? this.searchQuery,
      filterDate: clearFilterDate ? null : (filterDate ?? this.filterDate),
    );
  }

  List<TaskModel> _sortAndFilter(List<TaskModel> list) {
    var result = List<TaskModel>.from(list);
    result.sort((a, b) {
      final aTime = DateTime.tryParse(a.appointmentTime ?? '') ?? DateTime(0);
      final bTime = DateTime.tryParse(b.appointmentTime ?? '') ?? DateTime(0);
      return bTime.compareTo(aTime);
    });
    return result;
  }

  List<TaskModel> get todoTasks => _sortAndFilter(allTasks.where((t) =>
      t.status == 'confirmed' || t.status == 'todo' || t.status == null).toList());

  List<TaskModel> get inProgressTasks => _sortAndFilter(allTasks.where((t) =>
      t.status == 'customer_arrived' || t.status == 'in_progress').toList());

  List<TaskModel> get doneTasks => _sortAndFilter(allTasks.where((t) =>
      t.status == 'post_drive' || t.status == 'done').toList());

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

  Future<void> _loadTasks({bool isRefresh = false}) async {
    if (!isRefresh) {
      state = state.copyWith(isLoading: true, error: null);
    } else {
      state = state.copyWith(error: null);
    }
    try {
      String? dateStr;
      if (state.filterDate != null) {
        final fDate = state.filterDate!;
        dateStr = '${fDate.day.toString().padLeft(2, '0')}/${fDate.month.toString().padLeft(2, '0')}/${fDate.year}';
      }
      
      final tasks = await testDriveApiService.fetchMyTasks(
        search: state.searchQuery,
        date: dateStr,
      );
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

  void updateSearch(String query) {
    state = state.copyWith(searchQuery: query);
    _loadTasks(isRefresh: true);
  }

  void setFilterDate(DateTime? date) {
    if (date == null) {
      state = state.copyWith(clearFilterDate: true);
    } else {
      state = state.copyWith(filterDate: date);
    }
    _loadTasks(isRefresh: true);
  }

  Future<void> refresh() async {
    await _loadTasks(isRefresh: true);
  }
}

final salesTasksControllerProvider =
    NotifierProvider.autoDispose<SalesTasksController, SalesTasksState>(
        SalesTasksController.new);
