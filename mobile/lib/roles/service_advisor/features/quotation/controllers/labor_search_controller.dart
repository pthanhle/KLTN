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
  final String? error;

  const LaborSearchState({
    this.items = const [],
    this.searchQuery = '',
    this.selectedCategory = 'Tất cả',
    this.selectedLaborIds = const {},
    this.isLoading = false,
    this.error,
  });

  LaborSearchState copyWith({
    List<LaborItemModel>? items,
    String? searchQuery,
    String? selectedCategory,
    Set<String>? selectedLaborIds,
    bool? isLoading,
    String? error,
  }) {
    return LaborSearchState(
      items: items ?? this.items,
      searchQuery: searchQuery ?? this.searchQuery,
      selectedCategory: selectedCategory ?? this.selectedCategory,
      selectedLaborIds: selectedLaborIds ?? this.selectedLaborIds,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

typedef LaborConfirmOverride = void Function(List<LaborItemModel> labors);

class LaborSearchController extends Notifier<LaborSearchState> {
  // Danh mục tiền công dùng dữ liệu chuẩn (master data) cố định, đảm bảo
  // các hạng mục báo giá luôn khớp 1-1 với "Hạng mục thi công" bên role kỹ thuật.
  final List<LaborItemModel> _allItems = mockLaborMasterData;
  LaborConfirmOverride? _confirmOverride;

  @override
  LaborSearchState build() {
    return LaborSearchState(items: _allItems);
  }

  void _loadItems(String query) {
    state = state.copyWith(
      items: _filterItems(_allItems, state.selectedCategory, query),
      searchQuery: query,
    );
  }

  List<LaborItemModel> _filterItems(List<LaborItemModel> source, String category, String query) {
    final lowerQuery = query.toLowerCase();
    return source.where((item) {
      final matchCategory = category == 'Tất cả' || item.category == category;
      final matchQuery = query.isEmpty ||
          item.name.toLowerCase().contains(lowerQuery) ||
          item.laborCode.toLowerCase().contains(lowerQuery);
      return matchCategory && matchQuery;
    }).toList();
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
    state = state.copyWith(
      selectedCategory: category,
      items: _filterItems(_allItems, category, state.searchQuery),
    );
  }

  void search(String query) {
    _loadItems(query);
  }

  List<String> getCategories() {
    final categories = _allItems.map((e) => e.category).toSet().toList();
    categories.insert(0, 'Tất cả');
    return categories;
  }

  void setConfirmOverride(LaborConfirmOverride? override) {
    _confirmOverride = override;
  }

  void confirmSelection() {
    final selectedLabors = _allItems
        .where((labor) => state.selectedLaborIds.contains(labor.laborCode))
        .toList();

    if (_confirmOverride != null) {
      _confirmOverride!(selectedLabors);
    } else {
      final quotationController = ref.read(quotationControllerProvider.notifier);
      for (final labor in selectedLabors) {
        quotationController.addLabor(labor);
      }
    }

    state = state.copyWith(selectedLaborIds: const {});
  }
}

final laborSearchControllerProvider =
    NotifierProvider<LaborSearchController, LaborSearchState>(
        LaborSearchController.new);
