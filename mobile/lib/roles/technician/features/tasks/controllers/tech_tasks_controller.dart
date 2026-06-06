import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/tech_task_model.dart';
import '../data/tech_api_repository.dart';

class TechTasksState {
  final List<TechTaskModel> allTasks;
  final TechTaskStatus? currentFilter;
  final int currentTabIndex;
  final String searchQuery;

  TechTasksState({
    required this.allTasks,
    required this.currentFilter,
    required this.currentTabIndex,
    this.searchQuery = '',
  });

  List<TechTaskModel> get filteredTasks {
    var list = currentFilter == null
        ? List<TechTaskModel>.from(allTasks)
        : allTasks.where((task) => task.status == currentFilter).toList();

    if (searchQuery.isNotEmpty) {
      final q = searchQuery.toLowerCase();
      list = list.where((t) {
        return t.plate.toLowerCase().contains(q) ||
            t.model.toLowerCase().contains(q) ||
            t.bay.toLowerCase().contains(q);
      }).toList();
    }

    // Newest first: reverse insertion order (API returns chronological)
    return list.reversed.toList();
  }

  TechTasksState copyWith({
    List<TechTaskModel>? allTasks,
    TechTaskStatus? currentFilter,
    int? currentTabIndex,
    String? searchQuery,
  }) {
    return TechTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentFilter: currentFilter,
      currentTabIndex: currentTabIndex ?? this.currentTabIndex,
      searchQuery: searchQuery ?? this.searchQuery,
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
    final timer = Timer.periodic(const Duration(seconds: 30), (_) => refresh());
    ref.onDispose(timer.cancel);
    return _fetchTasksData(0);
  }

  Future<TechTasksState> _fetchTasksData(int tabIndex) async {
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

    final tasks = await techApiRepository.getTasks();

    return TechTasksState(
      allTasks: tasks,
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

  void updateSearch(String query) {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(searchQuery: query));
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
