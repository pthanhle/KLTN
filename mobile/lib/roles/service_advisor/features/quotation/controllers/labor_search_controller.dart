import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../models/labor_item_model.dart';
import '../../../data/mocks/labor_master_data.dart';
import 'quotation_controller.dart';

class LaborSearchState {
  final List<LaborItemModel> items;
  final String searchQuery;
  final String selectedCategory;
  final Set<String> selectedLaborIds;
  final bool isLoading;

  const LaborSearchState({
    this.items = const [],
    this.searchQuery = '',
    this.selectedCategory = 'Tất cả',
    this.selectedLaborIds = const {},
    this.isLoading = false,
  });

  LaborSearchState copyWith({
    List<LaborItemModel>? items,
    String? searchQuery,
    String? selectedCategory,
    Set<String>? selectedLaborIds,
    bool? isLoading,
  }) {
    return LaborSearchState(
      items: items ?? this.items,
      searchQuery: searchQuery ?? this.searchQuery,
      selectedCategory: selectedCategory ?? this.selectedCategory,
      selectedLaborIds: selectedLaborIds ?? this.selectedLaborIds,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class LaborSearchController extends Notifier<LaborSearchState> {
  @override
  LaborSearchState build() {
    _loadInitialData();
    return const LaborSearchState(isLoading: true);
  }

  void _loadInitialData() {
    Future.delayed(const Duration(milliseconds: 600), () {
      state = state.copyWith(
        items: mockLaborMasterData,
        isLoading: false,
      );
    });
  }

  void toggleSelection(String id) {
    final newSet = Set<String>.from(state.selectedLaborIds);
    if (newSet.contains(id)) {
      newSet.remove(id);
    } else {
      newSet.add(id);
    }
    state = state.copyWith(selectedLaborIds: newSet);
  }

  void setCategory(String category) {
    state = state.copyWith(selectedCategory: category, isLoading: true);

    Future.delayed(const Duration(milliseconds: 300), () {
      _applyFilters(category: category, query: state.searchQuery);
    });
  }

  void search(String query) {
    state = state.copyWith(searchQuery: query);
    _applyFilters(category: state.selectedCategory, query: query);
  }

  void _applyFilters({required String category, required String query}) {
    final lowerQuery = query.toLowerCase();
    final filtered = mockLaborMasterData.where((labor) {
      final matchCategory = category == 'Tất cả' || labor.category == category;
      final matchQuery = query.isEmpty ||
          labor.name.toLowerCase().contains(lowerQuery) ||
          labor.id.toLowerCase().contains(lowerQuery);
      return matchCategory && matchQuery;
    }).toList();

    state = state.copyWith(items: filtered, isLoading: false);
  }

  List<String> getCategories() {
    final categories = mockLaborMasterData.map((e) => e.category).toSet().toList();
    categories.insert(0, 'Tất cả');
    return categories;
  }

  void confirmSelection() {
    final quotationController = ref.read(quotationControllerProvider.notifier);

    final selectedLabors = mockLaborMasterData
        .where((labor) => state.selectedLaborIds.contains(labor.id))
        .toList();

    for (final labor in selectedLabors) {
      quotationController.addLabor(labor);
    }

    state = state.copyWith(selectedLaborIds: const {});
  }
}

final laborSearchControllerProvider =
    NotifierProvider<LaborSearchController, LaborSearchState>(
        LaborSearchController.new);
