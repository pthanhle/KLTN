import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/repair_order_model.dart';
import '../data/advisor_api_repository.dart';

class AdvisorDashboardState {
  final bool isLoading;
  final String advisorName;
  final List<RepairOrderModel> allRepairOrders;
  final ROStage selectedStage;
  final bool sessionExpired;
  final String searchQuery;
  final DateTime? filterDate;

  AdvisorDashboardState({
    this.isLoading = true,
    this.advisorName = '',
    this.allRepairOrders = const [],
    this.selectedStage = ROStage.pending,
    this.sessionExpired = false,
    this.searchQuery = '',
    this.filterDate,
  });

  List<RepairOrderModel> get filteredOrders {
    var list = allRepairOrders.where((ro) {
      if (ro.stage != selectedStage) return false;
      // "Phát Sinh" tab: only surface orders that have an unresolved supplement request
      if (selectedStage == ROStage.inProgress) {
        return ro.pendingSupplementId != null;
      }
      return true;
    }).toList();

    if (filterDate != null) {
      list = list.where((ro) {
        final d = ro.scheduledArrivalTime;
        return d.year == filterDate!.year &&
            d.month == filterDate!.month &&
            d.day == filterDate!.day;
      }).toList();
    }

    if (searchQuery.isNotEmpty) {
      final q = searchQuery.toLowerCase();
      list = list.where((ro) {
        return ro.vehicleInfo.licensePlate.toLowerCase().contains(q) ||
            ro.customerInfo.name.toLowerCase().contains(q) ||
            ro.bookingCode.toLowerCase().contains(q);
      }).toList();
    }

    list.sort((a, b) => b.scheduledArrivalTime.compareTo(a.scheduledArrivalTime));
    return list;
  }

  AdvisorDashboardState copyWith({
    bool? isLoading,
    String? advisorName,
    List<RepairOrderModel>? allRepairOrders,
    ROStage? selectedStage,
    bool? sessionExpired,
    String? searchQuery,
    DateTime? filterDate,
    bool clearFilterDate = false,
  }) {
    return AdvisorDashboardState(
      isLoading: isLoading ?? this.isLoading,
      advisorName: advisorName ?? this.advisorName,
      allRepairOrders: allRepairOrders ?? this.allRepairOrders,
      selectedStage: selectedStage ?? this.selectedStage,
      sessionExpired: sessionExpired ?? this.sessionExpired,
      searchQuery: searchQuery ?? this.searchQuery,
      filterDate: clearFilterDate ? null : (filterDate ?? this.filterDate),
    );
  }
}

class AdvisorDashboardController extends Notifier<AdvisorDashboardState> {
  final _repository = AdvisorApiRepository();

  @override
  AdvisorDashboardState build() {
    final timer = Timer.periodic(const Duration(seconds: 30), (_) => _loadDashboardData());
    ref.onDispose(timer.cancel);
    Future.microtask(_loadDashboardData);
    return AdvisorDashboardState();
  }

  Future<void> _loadDashboardData() async {
    state = state.copyWith(isLoading: true, sessionExpired: false);
    
    try {
      final repairOrders = await _repository.getRepairOrders();
      state = state.copyWith(
        isLoading: false,
        allRepairOrders: repairOrders,
      );
    } catch (e) {
      if (e.toString().contains('SESSION_EXPIRED')) {
        state = state.copyWith(isLoading: false, sessionExpired: true);
      } else {
        state = state.copyWith(isLoading: false);
        print('Error loading dashboard data: $e');
      }
    }
  }

  void selectStage(ROStage stage) {
    if (state.selectedStage == stage) return;
    state = state.copyWith(selectedStage: stage);
  }

  void updateSearch(String query) {
    state = state.copyWith(searchQuery: query);
  }

  void setFilterDate(DateTime? date) {
    if (date == null) {
      state = state.copyWith(clearFilterDate: true);
    } else {
      state = state.copyWith(filterDate: date);
    }
  }

  Future<void> refresh() async {
    await _loadDashboardData();
  }
}

final advisorDashboardProvider = NotifierProvider<AdvisorDashboardController, AdvisorDashboardState>(() {
  return AdvisorDashboardController();
});
