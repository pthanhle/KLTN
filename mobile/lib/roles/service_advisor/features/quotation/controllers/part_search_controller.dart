import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../../../models/part_item_model.dart';
import 'quotation_controller.dart';
import '../models/quotation_model.dart';

class PartSearchState {
  final List<PartItemModel> items;
  final String searchQuery;
  final bool isLoading;
  final String? error;

  const PartSearchState({
    this.items = const [],
    this.searchQuery = '',
    this.isLoading = false,
    this.error,
  });

  PartSearchState copyWith({
    List<PartItemModel>? items,
    String? searchQuery,
    bool? isLoading,
    String? error,
  }) {
    return PartSearchState(
      items: items ?? this.items,
      searchQuery: searchQuery ?? this.searchQuery,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class PartSearchController extends Notifier<PartSearchState> {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
  ));

  @override
  PartSearchState build() {
    _fetchParts('');
    return const PartSearchState(isLoading: true);
  }

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  Future<void> _fetchParts(String query) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final token = await _getToken();
      final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/catalog/parts';
      final response = await _dio.get(
        url,
        queryParameters: {
          if (query.isNotEmpty) 'search': query,
          'limit': 50,
        },
        options: Options(headers: {
          'Authorization': 'Bearer $token',
          'Accept': 'application/json',
        }),
      );

      final data = response.data;
      final List rawParts = data['parts'] ?? [];
      final parts = rawParts.map((p) => PartItemModel.fromJson(p as Map<String, dynamic>)).toList();

      state = state.copyWith(items: parts, isLoading: false, searchQuery: query);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: 'Không thể tải danh sách phụ tùng');
    }
  }

  void search(String query) {
    _fetchParts(query);
  }

  void addPartToQuotation(PartItemModel part, int quantity, {String? expectedDate}) {
    final quotationCtrl = ref.read(quotationControllerProvider.notifier);

    final cartItem = CartPartItem(
      id: part.id,
      sku: part.sku,
      name: part.name,
      price: part.price,
      quantity: quantity,
      isBackorder: part.availableStock == 0,
      expectedDate: expectedDate,
    );

    quotationCtrl.addPart(cartItem);
  }
}

final partSearchControllerProvider = NotifierProvider<PartSearchController, PartSearchState>(() {
  return PartSearchController();
});
