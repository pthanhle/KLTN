import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/tech_task_model.dart';
import '../data/mocks/mock_tech_tasks_data.dart';

class TechTasksState {
  final List<TechTaskModel> allTasks;
  final TechTaskStatus? currentFilter;
  final int currentTabIndex;

  TechTasksState({
    required this.allTasks,
    required this.currentFilter,
    required this.currentTabIndex,
  });

  List<TechTaskModel> get filteredTasks {
    if (currentFilter == null) return allTasks;
    return allTasks.where((task) => task.status == currentFilter).toList();
  }

  TechTasksState copyWith({
    List<TechTaskModel>? allTasks,
    TechTaskStatus? currentFilter,
    int? currentTabIndex,
  }) {
    return TechTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentFilter: currentFilter,
      currentTabIndex: currentTabIndex ?? this.currentTabIndex,
    );
  }
}

final techTasksControllerProvider =
    AsyncNotifierProvider<TechTasksController, TechTasksState>(
  () => TechTasksController(),
);

class TechTasksController extends AsyncNotifier<TechTasksState> {
  int _fetchId = 0;

  @override
  Future<TechTasksState> build() async {
    return _fetchTasksData(0);
  }

  Future<TechTasksState> _fetchTasksData(int tabIndex) async {
    await Future.delayed(const Duration(milliseconds: 500));
    
    TechTaskStatus? filter;
    switch (tabIndex) {
      case 0:
        filter = TechTaskStatus.diagnosing;
        break;
      case 1:
        filter = TechTaskStatus.waitingParts;
        break;
      case 2:
        filter = TechTaskStatus.inProgress;
        break;
      default:
        filter = null;
    }

    return TechTasksState(
      allTasks: MockTechTasksData.tasks,
      currentFilter: filter,
      currentTabIndex: tabIndex,
    );
  }

  Future<void> changeTab(int index) async {
    final previousState = state.value;
    if (previousState?.currentTabIndex == index) return;
    
    if (previousState != null) {
      state = AsyncData(previousState.copyWith(currentTabIndex: index));
    }
    
    state = const AsyncLoading<TechTasksState>().copyWithPrevious(state);
    
    final currentFetchId = ++_fetchId;
    
    try {
      final data = await _fetchTasksData(index);
      if (_fetchId == currentFetchId) {
        state = AsyncValue.data(data);
      }
    } catch (e, st) {
      if (_fetchId == currentFetchId) {
        state = AsyncValue.error(e, st);
      }
    }
  }

  Future<void> refresh() async {
    final currentIndex = state.value?.currentTabIndex ?? 0;
    
    state = const AsyncLoading<TechTasksState>().copyWithPrevious(state);
    
    final currentFetchId = ++_fetchId;
    
    try {
      final data = await _fetchTasksData(currentIndex);
      if (_fetchId == currentFetchId) {
        state = AsyncValue.data(data);
      }
    } catch (e, st) {
      if (_fetchId == currentFetchId) {
        state = AsyncValue.error(e, st);
      }
    }
  }
}
