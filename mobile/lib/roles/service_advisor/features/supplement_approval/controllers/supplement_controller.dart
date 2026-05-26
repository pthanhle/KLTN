import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/supplement_model.dart';
import '../models/supplement_part_model.dart';
import '../models/supplement_labor_model.dart';
import '../data/supplement_mock_data.dart';
import '../../../../../../roles/service_advisor/models/part_item_model.dart';
import '../../../../../../roles/service_advisor/models/labor_item_model.dart';

class SupplementController extends AsyncNotifier<SupplementModel> {
  @override
  Future<SupplementModel> build() async {
    await Future.delayed(const Duration(milliseconds: 1500));
    return mockSupplementData;
  }

  void addPart(SupplementPartModel part) {
    if (state.value == null) return;
    final current = state.value!;
    
    final existingIndex = current.addedParts.indexWhere((p) => p.id == part.id);
    if (existingIndex >= 0) {
      final updatedParts = List<SupplementPartModel>.from(current.addedParts);
      final existingPart = updatedParts[existingIndex];
      updatedParts[existingIndex] = existingPart.copyWith(
        quantity: existingPart.quantity + 1,
      );
      state = AsyncData(current.copyWith(addedParts: updatedParts));
    } else {
      state = AsyncData(current.copyWith(
        addedParts: [...current.addedParts, part.copyWith(quantity: 1)],
      ));
    }
  }

  void removePart(String id) {
    if (state.value == null) return;
    final current = state.value!;
    state = AsyncData(current.copyWith(
      addedParts: current.addedParts.where((p) => p.id != id).toList(),
    ));
  }

  void updatePartQuantity(String id, int quantity) {
    if (state.value == null) return;
    if (quantity <= 0) {
      removePart(id);
      return;
    }

    final current = state.value!;
    final updatedParts = current.addedParts.map((p) {
      if (p.id == id) {
        return p.copyWith(quantity: quantity);
      }
      return p;
    }).toList();
    
    state = AsyncData(current.copyWith(addedParts: updatedParts));
  }

  void addLabor(SupplementLaborModel labor) {
    if (state.value == null) return;
    final current = state.value!;
    
    final existingIndex = current.addedLabors.indexWhere((l) => l.id == labor.id);
    if (existingIndex < 0) {
      state = AsyncData(current.copyWith(
        addedLabors: [...current.addedLabors, labor],
      ));
    }
  }

  /// Bridge: called by PartSearchModal when opened from Supplement context.
  /// Converts shared PartItemModel → SupplementPartModel and adds to supplement.
  void addPartFromSearch(PartItemModel part, int quantity, {String? expectedDate}) {
    final supplementPart = SupplementPartModel(
      id: part.id,
      sku: part.sku,
      name: part.name,
      unitPrice: part.price,
      quantity: quantity,
      stockOnHand: part.availableStock,
      estimatedArrivalDate: expectedDate != null ? DateTime.tryParse(expectedDate) : null,
    );
    addPart(supplementPart);
  }

  /// Bridge: called by LaborSearchModal when opened from Supplement context.
  /// Converts shared LaborItemModel list → SupplementLaborModel and adds each.
  void addLaborsFromSearch(List<LaborItemModel> labors) {
    for (final labor in labors) {
      final supplementLabor = SupplementLaborModel(
        id: labor.laborCode,
        laborCode: labor.laborCode,
        description: labor.name,
        unitPrice: labor.basePrice,
        quantity: labor.estimatedHours,
      );
      addLabor(supplementLabor);
    }
  }

  void removeLabor(String id) {
    if (state.value == null) return;
    final current = state.value!;
    state = AsyncData(current.copyWith(
      addedLabors: current.addedLabors.where((l) => l.id != id).toList(),
    ));
  }

  Future<void> submitApproval() async {
    if (state.value == null) return;
    
    // Set loading state but keep data
    state = AsyncLoading<SupplementModel>().copyWithPrevious(AsyncData(state.value!));
    
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    
    // Cập nhật trạng thái
    final current = state.value!;
    state = AsyncData(current.copyWith(
      status: SupplementStatus.approved,
    ));
  }
}

final supplementControllerProvider =
    AsyncNotifierProvider<SupplementController, SupplementModel>(() {
  return SupplementController();
});
