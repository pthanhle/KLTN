import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/mpi_category_model.dart';
import '../models/mpi_item_model.dart';
import '../data/constants/mpi_master_data.dart';
import '../../tasks/data/tech_api_repository.dart';

class TechMpiState {
  final List<MpiCategoryModel> categories;
  final String generalConclusion;
  final bool isLocked;

  TechMpiState({
    required this.categories,
    this.generalConclusion = '',
    this.isLocked = false,
  });

  TechMpiState copyWith({
    List<MpiCategoryModel>? categories,
    String? generalConclusion,
    bool? isLocked,
  }) {
    return TechMpiState(
      categories: categories ?? this.categories,
      generalConclusion: generalConclusion ?? this.generalConclusion,
      isLocked: isLocked ?? this.isLocked,
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
    return TechMpiState(categories: MpiMasterData.categories);
  }

  Future<void> init(String progressId) async {
    state = const AsyncLoading();
    try {
      final data = await techApiRepository.fetchRepairProgressDetail(progressId);
      final progressStatus = data['status']?.toString() ?? 'DIAGNOSING';
      final isLocked = progressStatus != 'DIAGNOSING';

      final timeline = data['timeline'] as List<dynamic>? ?? [];
      final diagEntry = timeline
          .cast<Map<String, dynamic>>()
          .where((t) => t['step'] == 'DIAGNOSING')
          .fold<Map<String, dynamic>?>( null, (_, t) => t); // last DIAGNOSING entry

      final savedDiagnostics =
          diagEntry?['diagnostics'] as List<dynamic>? ?? [];
      final savedConclusion = diagEntry?['notes']?.toString() ?? '';

      final categories =
          _restoreCategories(MpiMasterData.categories, savedDiagnostics);

      state = AsyncData(TechMpiState(
        categories: categories,
        generalConclusion: savedConclusion,
        isLocked: isLocked,
      ));
    } catch (e) {
      state = AsyncError(e, StackTrace.current);
    }
  }

  List<MpiCategoryModel> _restoreCategories(
    List<MpiCategoryModel> master,
    List<dynamic> savedDiagnostics,
  ) {
    if (savedDiagnostics.isEmpty) return master;

    final catLookup = <String, Map<String, Map<String, dynamic>>>{};
    for (final cat in savedDiagnostics.cast<Map<String, dynamic>>()) {
      final catId = cat['id']?.toString() ?? '';
      final itemMap = <String, Map<String, dynamic>>{};
      for (final item
          in (cat['items'] as List<dynamic>? ?? []).cast<Map<String, dynamic>>()) {
        itemMap[item['name']?.toString() ?? ''] = item;
      }
      catLookup[catId] = itemMap;
    }

    return master.map((category) {
      final itemLookup = catLookup[category.id] ?? {};
      final restoredItems = category.items.map((item) {
        final saved = itemLookup[item.name];
        if (saved == null) return item;
        final rawStatus = saved['status']?.toString() ?? 'normal';
        final status = switch (rawStatus) {
          'warning' => MpiItemStatus.monitor,
          'critical' => MpiItemStatus.fail,
          _ => MpiItemStatus.pass,
        };
        return item.copyWith(
          status: status,
          note: saved['action_required']?.toString(),
          mediaUrls: (saved['media_urls'] as List<dynamic>?)
                  ?.cast<String>() ??
              item.mediaUrls,
        );
      }).toList();
      return category.copyWith(items: restoredItems);
    }).toList();
  }

  void changeItemStatus(String categoryId, String itemId, MpiItemStatus status) {
    final currentState = state.value;
    if (currentState == null || currentState.isLocked) return;

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
    if (currentState == null || currentState.isLocked) return;

    final updatedCategories = currentState.categories.map((category) {
      if (category.id != categoryId) return category;
      final isAllPassed =
          category.items.every((item) => item.status == MpiItemStatus.pass);
      final updatedItems = category.items.map((item) {
        if (isAllPassed) return item.copyWith(status: MpiItemStatus.unchecked);
        if (item.status == MpiItemStatus.unchecked) {
          return item.copyWith(status: MpiItemStatus.pass);
        }
        return item;
      }).toList();
      return category.copyWith(items: updatedItems);
    }).toList();

    state = AsyncData(currentState.copyWith(categories: updatedCategories));
  }

  void updateItemNoteAndMedia(
      String categoryId, String itemId, String note, List<String> mediaUrls) {
    final currentState = state.value;
    if (currentState == null || currentState.isLocked) return;

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
    if (currentState == null || currentState.isLocked) return;
    state = AsyncData(currentState.copyWith(generalConclusion: conclusion));
  }
}
