import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/mpi_category_model.dart';
import '../models/mpi_item_model.dart';
import '../data/constants/mpi_master_data.dart';

class TechMpiState {
  final List<MpiCategoryModel> categories;
  final String generalConclusion;

  TechMpiState({
    required this.categories,
    this.generalConclusion = '',
  });

  TechMpiState copyWith({
    List<MpiCategoryModel>? categories,
    String? generalConclusion,
  }) {
    return TechMpiState(
      categories: categories ?? this.categories,
      generalConclusion: generalConclusion ?? this.generalConclusion,
    );
  }
}

final techMpiControllerProvider =
    AsyncNotifierProvider<TechMpiController, TechMpiState>(
  () => TechMpiController(),
);

class TechMpiController extends AsyncNotifier<TechMpiState> {
  @override
  Future<TechMpiState> build() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return TechMpiState(categories: MpiMasterData.categories);
  }

  void changeItemStatus(String categoryId, String itemId, MpiItemStatus status) {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedCategories = currentState.categories.map((category) {
      if (category.id != categoryId) return category;

      final updatedItems = category.items.map((item) {
        if (item.id != itemId) return item;
        return item.copyWith(status: status);
      }).toList();

      return category.copyWith(items: updatedItems);
    }).toList();

    state = AsyncData(currentState.copyWith(categories: updatedCategories));
  }

  void togglePassAllCategory(String categoryId) {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedCategories = currentState.categories.map((category) {
      if (category.id != categoryId) return category;

      final isAllPassed = category.items.every((item) => item.status == MpiItemStatus.pass);

      final updatedItems = category.items.map((item) {
        if (isAllPassed) {
          return item.copyWith(status: MpiItemStatus.unchecked);
        } else {
          if (item.status == MpiItemStatus.unchecked) {
            return item.copyWith(status: MpiItemStatus.pass);
          }
          return item;
        }
      }).toList();

      return category.copyWith(items: updatedItems);
    }).toList();

    state = AsyncData(currentState.copyWith(categories: updatedCategories));
  }

  void updateItemNoteAndMedia(String categoryId, String itemId, String note, List<String> mediaUrls) {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedCategories = currentState.categories.map((category) {
      if (category.id != categoryId) return category;

      final updatedItems = category.items.map((item) {
        if (item.id != itemId) return item;
        return item.copyWith(note: note, mediaUrls: mediaUrls);
      }).toList();

      return category.copyWith(items: updatedItems);
    }).toList();

    state = AsyncData(currentState.copyWith(categories: updatedCategories));
  }

  void updateGeneralConclusion(String conclusion) {
    final currentState = state.value;
    if (currentState == null) return;
    state = AsyncData(currentState.copyWith(generalConclusion: conclusion));
  }
}
