import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/supplement_request_model.dart';
import '../utils/supplement_validators.dart';

class SupplementController extends AsyncNotifier<SupplementRequestModel?> {
  @override
  FutureOr<SupplementRequestModel?> build() {
    return null;
  }

  Future<void> submitRequest({
    required String orderId,
    required String taskId,
    required String description,
    required String proposedSolution,
    required List<String> evidenceUrls,
  }) async {
    final descError = SupplementValidators.validateDescription(description);
    if (descError != null) throw Exception(descError);

    final solError = SupplementValidators.validateSolution(proposedSolution);
    if (solError != null) throw Exception(solError);

    final mediaError = SupplementValidators.validateMedia(evidenceUrls);
    if (mediaError != null) throw Exception(mediaError);

    state = const AsyncLoading();

    try {
      await Future.delayed(const Duration(seconds: 1));

      final request = SupplementRequestModel(
        orderId: orderId,
        taskId: taskId,
        description: description,
        proposedSolution: proposedSolution,
        evidenceUrls: evidenceUrls,
        status: 'PAUSED_FOR_SUPPLEMENT',
      );

      state = AsyncData(request);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }
}

final supplementControllerProvider = AsyncNotifierProvider<SupplementController, SupplementRequestModel?>(
  () => SupplementController(),
);
