import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/tech_task_model.dart';
import '../data/tech_api_repository.dart';

class TechTasksState {
  final List<TechTaskModel> allTasks;
  final TechTaskStatus? currentFilter;
  final int currentTabIndex;
  final String searchQuery;
  final DateTime? filterDate;

  TechTasksState({
    required this.allTasks,
    required this.currentFilter,
    required this.currentTabIndex,
    this.searchQuery = '',
    this.filterDate,
  });

  List<TechTaskModel> get filteredTasks {
    var list = currentFilter == null
        ? List<TechTaskModel>.from(allTasks)
        : allTasks.where((task) => task.status == currentFilter).toList();

    if (filterDate != null) {
      final fd = filterDate!;
      final fdStr =
          '${fd.year.toString().padLeft(4, '0')}-${fd.month.toString().padLeft(2, '0')}-${fd.day.toString().padLeft(2, '0')}';
      list = list.where((t) => t.bookingDate == fdStr).toList();
    }

    if (searchQuery.isNotEmpty) {
      final q = searchQuery.toLowerCase();
      list = list.where((t) {
        return t.plate.toLowerCase().contains(q) ||
            t.model.toLowerCase().contains(q) ||
            t.bay.toLowerCase().contains(q);
      }).toList();
    }

    // Newest first by bookingDate then startTime
    list.sort((a, b) {
      final dateComp = (b.bookingDate ?? '').compareTo(a.bookingDate ?? '');
      if (dateComp != 0) return dateComp;
      return (b.startTime).compareTo(a.startTime);
    });
    return list;
  }

  TechTasksState copyWith({
    List<TechTaskModel>? allTasks,
    TechTaskStatus? currentFilter,
    int? currentTabIndex,
    String? searchQuery,
    DateTime? filterDate,
    bool clearFilterDate = false,
  }) {
    return TechTasksState(
      allTasks: allTasks ?? this.allTasks,
      currentFilter: currentFilter,
      currentTabIndex: currentTabIndex ?? this.currentTabIndex,
      searchQuery: searchQuery ?? this.searchQuery,
      filterDate: clearFilterDate ? null : (filterDate ?? this.filterDate),
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

  void setFilterDate(DateTime? date) {
    final current = state.value;
    if (current == null) return;
    if (date == null) {
      state = AsyncData(current.copyWith(clearFilterDate: true));
    } else {
      state = AsyncData(current.copyWith(filterDate: date));
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
