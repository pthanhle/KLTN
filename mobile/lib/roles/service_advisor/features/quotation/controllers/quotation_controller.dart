import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/quotation_model.dart';
import '../data/quotation_mock_data.dart';
import '../../../models/labor_item_model.dart';

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
        if (p.sku == partId) return CartPartItem(
          sku: p.sku,
          name: p.name,
          unitPrice: p.unitPrice,
          quantity: p.quantity,
          isBackorder: p.isBackorder,
          expectedDate: date,
        );
        return p;
      }).toList();
      state = AsyncData(state.value!.copyWith(parts: updatedParts));
    }
  }

  void addPart(CartPartItem part) {
    if (state.hasValue && state.value != null) {
      final currentParts = List<CartPartItem>.from(state.value!.parts);
      // Check if part already exists
      final existingIndex = currentParts.indexWhere((p) => p.sku == part.sku);
      if (existingIndex >= 0) {
        // Update quantity
        final existing = currentParts[existingIndex];
        currentParts[existingIndex] = CartPartItem(
          sku: existing.sku,
          name: existing.name,
          unitPrice: existing.unitPrice,
          quantity: existing.quantity + part.quantity,
          isBackorder: existing.isBackorder,
          expectedDate: existing.expectedDate,
        );
      } else {
        currentParts.add(part);
      }
      state = AsyncData(state.value!.copyWith(parts: currentParts));
    }
  }

  void addLabor(LaborItemModel labor) {
    if (state.hasValue && state.value != null) {
      final currentLabor = List<CartLaborItem>.from(state.value!.labor);
      
      final existingIndex = currentLabor.indexWhere((l) => l.laborCode == labor.laborCode);
      if (existingIndex < 0) {
        currentLabor.add(CartLaborItem(
          laborCode: labor.laborCode,
          name: labor.name,
          quantity: labor.estimatedHours ?? 1.0,
          unitPrice: (labor.estimatedHours ?? 1.0) > 0 ? labor.basePrice / (labor.estimatedHours ?? 1.0) : 0,
        ));
        state = AsyncData(state.value!.copyWith(labor: currentLabor));
      }
    }
  }
}

final quotationControllerProvider =
    NotifierProvider<QuotationController, AsyncValue<QuotationModel>>(() {
  return QuotationController();
});
