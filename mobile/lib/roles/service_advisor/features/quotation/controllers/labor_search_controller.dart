import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../../../models/labor_item_model.dart';
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

class LaborSearchController extends Notifier<LaborSearchState> {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
  ));

  List<LaborItemModel> _allItems = [];

  @override
  LaborSearchState build() {
    _fetchServiceItems('');
    return const LaborSearchState(isLoading: true);
  }

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  Future<void> _fetchServiceItems(String query) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final token = await _getToken();
      final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/catalog/service-items';
      final response = await _dio.get(
        url,
        queryParameters: {
          if (query.isNotEmpty) 'search': query,
          'limit': 100,
        },
        options: Options(headers: {
          'Authorization': 'Bearer $token',
          'Accept': 'application/json',
        }),
      );

      final data = response.data;
      final List rawItems = data['serviceItems'] ?? [];
      final items = rawItems.map((item) => LaborItemModel.fromJson({
        'id': item['id']?.toString() ?? '',
        'category': item['category']?.toString() ?? '',
        'name': item['name']?.toString() ?? '',
        'price': (item['price'] as num?)?.toDouble() ?? 0.0,
        'estimated_hours': (item['estimated_hours'] as num?)?.toDouble() ?? 1.0,
      })).toList();

      _allItems = items;
      state = state.copyWith(
        items: _filterItems(items, state.selectedCategory, query),
        isLoading: false,
        searchQuery: query,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: 'Không thể tải danh sách dịch vụ');
    }
  }

  List<LaborItemModel> _filterItems(List<LaborItemModel> source, String category, String query) {
    final lowerQuery = query.toLowerCase();
    return source.where((item) {
      final matchCategory = category == 'Tất cả' || item.category == category;
      final matchQuery = query.isEmpty ||
          item.name.toLowerCase().contains(lowerQuery) ||
          item.id.toLowerCase().contains(lowerQuery);
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
    state = state.copyWith(searchQuery: query);
    _fetchServiceItems(query);
  }

  List<String> getCategories() {
    final categories = _allItems.map((e) => e.category).toSet().toList();
    categories.insert(0, 'Tất cả');
    return categories;
  }

  void confirmSelection() {
    final quotationController = ref.read(quotationControllerProvider.notifier);
    final selectedLabors = _allItems
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
