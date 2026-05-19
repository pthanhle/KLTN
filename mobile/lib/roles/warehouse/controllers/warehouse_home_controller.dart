import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/warehouse_mock_data.dart';

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
    this.totalTarget = 50,
    this.completed = 45,
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
    
    await Future.delayed(const Duration(milliseconds: 800));

    int urgent = mockWarehouseOrders.where((o) => o['is_urgent'] == true && o['order_status'] == 'PROCESSING').length;
    int packed = mockWarehouseOrders.where((o) => o['order_status'] == 'PACKED').length;

    state = state.copyWith(
      urgentCount: urgent,
      packedCount: packed,
      completed: mockShiftTarget['completed'],
      totalTarget: mockShiftTarget['total_target'],
      exceptions: List<String>.from(mockShiftTarget['exceptions']),
      isLoading: false,
    );
  }

  Future<void> refresh() async {
    await _loadData();
  }
}

final warehouseDashboardProvider = NotifierProvider<WarehouseDashboardController, WarehouseDashboardState>(() {
  return WarehouseDashboardController();
});
