import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/shared/services/warehouse_api_service.dart';

class WarehouseDashboardState {
  final int urgentCount;
  final int packedCount;
  final int totalTarget;
  final int completed;
  final List<String> exceptions;
  final bool isLoading;

  const WarehouseDashboardState({
    this.urgentCount = 0,
    this.packedCount = 0,
    this.totalTarget = 0,
    this.completed = 0,
    this.exceptions = const [],
    this.isLoading = false,
  });

  WarehouseDashboardState copyWith({
    int? urgentCount,
    int? packedCount,
    int? totalTarget,
    int? completed,
    List<String>? exceptions,
    bool? isLoading,
  }) {
    return WarehouseDashboardState(
      urgentCount: urgentCount ?? this.urgentCount,
      packedCount: packedCount ?? this.packedCount,
      totalTarget: totalTarget ?? this.totalTarget,
      completed: completed ?? this.completed,
      exceptions: exceptions ?? this.exceptions,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class WarehouseDashboardController extends Notifier<WarehouseDashboardState> {
  @override
  WarehouseDashboardState build() {
    Future.microtask(_loadData);
    return const WarehouseDashboardState(isLoading: true);
  }

  Future<void> _loadData() async {
    state = state.copyWith(isLoading: true);
    try {
      final pickLists = await WarehouseApiService.fetchPickLists();
      final urgent = pickLists.where((o) => o['priority'] == 'urgent').length;
      final total = pickLists.length;

      state = state.copyWith(
        urgentCount: urgent,
        packedCount: 0,
        completed: 0,
        totalTarget: total,
        exceptions: const [],
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> refresh() async {
    await _loadData();
  }
}

final warehouseDashboardProvider = NotifierProvider<WarehouseDashboardController, WarehouseDashboardState>(() {
  return WarehouseDashboardController();
});
