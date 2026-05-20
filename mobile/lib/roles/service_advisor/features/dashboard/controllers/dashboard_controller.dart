import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/repair_order_model.dart';
import '../data/advisor_mock_data.dart';

class AdvisorDashboardState {
  final bool isLoading;
  final String advisorName;
  final List<RepairOrderModel> allRepairOrders;
  final ROStage selectedStage;
  
  AdvisorDashboardState({
    this.isLoading = true,
    this.advisorName = '',
    this.allRepairOrders = const [],
    this.selectedStage = ROStage.pending,
  });

  List<RepairOrderModel> get filteredOrders => 
      allRepairOrders.where((ro) => ro.stage == selectedStage).toList();

  AdvisorDashboardState copyWith({
    bool? isLoading,
    String? advisorName,
    List<RepairOrderModel>? allRepairOrders,
    ROStage? selectedStage,
  }) {
    return AdvisorDashboardState(
      isLoading: isLoading ?? this.isLoading,
      advisorName: advisorName ?? this.advisorName,
      allRepairOrders: allRepairOrders ?? this.allRepairOrders,
      selectedStage: selectedStage ?? this.selectedStage,
    );
  }
}

class AdvisorDashboardController extends Notifier<AdvisorDashboardState> {
  @override
  AdvisorDashboardState build() {
    Future.microtask(_loadDashboardData);
    return AdvisorDashboardState();
  }

  Future<void> _loadDashboardData() async {
    state = state.copyWith(isLoading: true);
    
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 800));
    
    state = state.copyWith(
      isLoading: false,
      advisorName: 'Nguyễn Hoàng Nam',
      allRepairOrders: mockRepairOrders,
    );
  }

  void selectStage(ROStage stage) {
    if (state.selectedStage == stage) return;
    state = state.copyWith(selectedStage: stage);
  }

  Future<void> refresh() async {
    await _loadDashboardData();
  }
}

final advisorDashboardProvider = NotifierProvider<AdvisorDashboardController, AdvisorDashboardState>(() {
  return AdvisorDashboardController();
});
