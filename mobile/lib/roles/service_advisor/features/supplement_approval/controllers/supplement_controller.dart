import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/supplement_model.dart';
import '../data/supplement_mock_data.dart';

class SupplementController extends Notifier<AsyncValue<SupplementModel>> {
  @override
  AsyncValue<SupplementModel> build() {
    _init();
    return const AsyncLoading();
  }

  Future<void> _init() async {
    // Simulate API load
    await Future.delayed(const Duration(milliseconds: 1500));
    state = AsyncData(mockSupplementData);
  }

  Future<void> submitApproval() async {
    if (state.value == null) return;
    
    // Set loading state but keep data
    state = AsyncData(state.value!);
    
    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));
    
    // Cập nhật trạng thái
    state = AsyncData(SupplementModel(
      id: state.value!.id,
      orderId: state.value!.orderId,
      issueTitle: state.value!.issueTitle,
      issueDescription: state.value!.issueDescription,
      proposedFix: state.value!.proposedFix,
      mechanicName: state.value!.mechanicName,
      mechanicRole: state.value!.mechanicRole,
      evidenceMediaUrls: state.value!.evidenceMediaUrls,
      oldCost: state.value!.oldCost,
      newCost: state.value!.newCost,
      oldDeliveryTime: state.value!.oldDeliveryTime,
      newDeliveryTime: state.value!.newDeliveryTime,
      delayReason: state.value!.delayReason,
      status: SupplementStatus.approved,
    ));
  }
}

final supplementControllerProvider =
    NotifierProvider<SupplementController, AsyncValue<SupplementModel>>(() {
  return SupplementController();
});
