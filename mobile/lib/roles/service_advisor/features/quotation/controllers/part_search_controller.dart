import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../data/mocks/part_mock_data.dart';
import '../../../models/part_item_model.dart';
import 'quotation_controller.dart';
import '../models/quotation_model.dart';

class PartSearchState {
  final List<PartItemModel> items;
  final String searchQuery;
  final bool isLoading;
  final void Function(PartItemModel, int, {String? expectedDate})? onAddOverride;

  const PartSearchState({
    this.items = const [],
    this.searchQuery = '',
    this.isLoading = false,
    this.onAddOverride,
  });

  PartSearchState copyWith({
    List<PartItemModel>? items,
    String? searchQuery,
    bool? isLoading,
    void Function(PartItemModel, int, {String? expectedDate})? onAddOverride,
  }) {
    return PartSearchState(
      items: items ?? this.items,
      searchQuery: searchQuery ?? this.searchQuery,
      isLoading: isLoading ?? this.isLoading,
      onAddOverride: onAddOverride ?? this.onAddOverride,
    );
  }
}

class PartSearchController extends Notifier<PartSearchState> {
  @override
  PartSearchState build() {
    _loadInitialData();
    return const PartSearchState(isLoading: true);
  }

  void _loadInitialData() {
    Future.delayed(const Duration(milliseconds: 600), () {
      state = state.copyWith(
        items: mockPartApiData,
        isLoading: false,
      );
    });
  }

  void search(String query) {
    state = state.copyWith(searchQuery: query);
    
    if (query.isEmpty) {
      state = state.copyWith(items: mockPartApiData);
      return;
    }

    final lowerQuery = query.toLowerCase();
    final filtered = mockPartApiData.where((part) {
      return part.name.toLowerCase().contains(lowerQuery) || 
             part.sku.toLowerCase().contains(lowerQuery);
    }).toList();

    state = state.copyWith(items: filtered);
  }

  void addPartToQuotation(PartItemModel part, int quantity, {String? expectedDate}) {
    // If an override callback is set (e.g. from Supplement context), use it
    if (state.onAddOverride != null) {
      state.onAddOverride!(part, quantity, expectedDate: expectedDate);
      return;
    }
    // Default: dispatch to quotation controller
    final quotationCtrl = ref.read(quotationControllerProvider.notifier);
    
    final cartItem = CartPartItem(
      sku: part.sku,
      name: part.name,
      unitPrice: part.price,
      quantity: quantity,
      isBackorder: part.availableStock == 0,
      expectedDate: expectedDate,
    );

    quotationCtrl.addPart(cartItem);
  }

  /// Called by Supplement page to redirect adds into supplementController
  void setAddOverride(void Function(PartItemModel, int, {String? expectedDate})? fn) {
    state = state.copyWith(onAddOverride: fn);
  }
}

final partSearchControllerProvider = NotifierProvider<PartSearchController, PartSearchState>(() {
  return PartSearchController();
});
