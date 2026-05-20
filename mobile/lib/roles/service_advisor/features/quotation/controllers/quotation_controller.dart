import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/quotation_model.dart';
import '../data/quotation_mock_data.dart';

class QuotationController extends Notifier<AsyncValue<QuotationModel>> {
  @override
  AsyncValue<QuotationModel> build() {
    _init();
    return const AsyncLoading();
  }

  Future<void> _init() async {
    // Simulate API load for Skeleton testing
    await Future.delayed(const Duration(milliseconds: 1500));
    state = AsyncData(mockQuotationData);
  }

  void updateAdvisorNote(String note) {
    if (state.hasValue && state.value != null) {
      state = AsyncData(state.value!.copyWith(advisorNote: note));
    }
  }

  void applyPromoCode(String code) {
    if (state.hasValue && state.value != null) {
      state = AsyncData(state.value!.copyWith(promoCode: code));
    }
  }

  void updateExpectedDate(String partId, String date) {
    if (state.hasValue && state.value != null) {
      final updatedParts = state.value!.parts.map((p) {
        if (p.id == partId) return CartPartItem(
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          isBackorder: p.isBackorder,
          expectedDate: date,
        );
        return p;
      }).toList();
      state = AsyncData(state.value!.copyWith(parts: updatedParts));
    }
  }
}

final quotationControllerProvider =
    NotifierProvider<QuotationController, AsyncValue<QuotationModel>>(() {
  return QuotationController();
});
