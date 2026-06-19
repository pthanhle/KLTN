import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/contracts_api_service.dart';
import '../models/vehicle_contract_list_model.dart';

class ContractsState {
  final List<VehicleContractListModel> contracts;
  final bool isLoading;
  final bool isFetchingMore;
  final String statusFilter;
  final int currentPage;
  final int totalPages;
  final String? error;

  ContractsState({
    this.contracts = const [],
    this.isLoading = true,
    this.isFetchingMore = false,
    this.statusFilter = 'all',
    this.currentPage = 1,
    this.totalPages = 1,
    this.error,
  });

  ContractsState copyWith({
    List<VehicleContractListModel>? contracts,
    bool? isLoading,
    bool? isFetchingMore,
    String? statusFilter,
    int? currentPage,
    int? totalPages,
    String? error,
  }) {
    return ContractsState(
      contracts: contracts ?? this.contracts,
      isLoading: isLoading ?? this.isLoading,
      isFetchingMore: isFetchingMore ?? this.isFetchingMore,
      statusFilter: statusFilter ?? this.statusFilter,
      currentPage: currentPage ?? this.currentPage,
      totalPages: totalPages ?? this.totalPages,
      error: error,
    );
  }
}

class ContractsNotifier extends Notifier<ContractsState> {
  @override
  ContractsState build() {
    Future.microtask(() => fetchContracts());
    return ContractsState();
  }

  Future<void> fetchContracts({bool isRefresh = false}) async {
    if (isRefresh) {
      state = state.copyWith(isLoading: true, currentPage: 1, error: null);
    } else {
      state = state.copyWith(isLoading: true, error: null);
    }

    try {
      final result = await contractsApiService.fetchContracts(
        page: state.currentPage,
        status: state.statusFilter,
      );
      state = state.copyWith(
        contracts: result.contracts,
        totalPages: result.totalPages,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> fetchMore() async {
    if (state.isLoading || state.isFetchingMore || state.currentPage >= state.totalPages) {
      return;
    }

    state = state.copyWith(isFetchingMore: true, error: null);

    try {
      final nextPage = state.currentPage + 1;
      final result = await contractsApiService.fetchContracts(
        page: nextPage,
        status: state.statusFilter,
      );
      
      state = state.copyWith(
        contracts: [...state.contracts, ...result.contracts],
        currentPage: nextPage,
        totalPages: result.totalPages,
        isFetchingMore: false,
      );
    } catch (e) {
      state = state.copyWith(isFetchingMore: false, error: e.toString());
    }
  }

  void setFilter(String status) {
    if (state.statusFilter == status) return;
    state = state.copyWith(statusFilter: status, currentPage: 1);
    fetchContracts();
  }
}

final contractsProvider = NotifierProvider<ContractsNotifier, ContractsState>(ContractsNotifier.new);
