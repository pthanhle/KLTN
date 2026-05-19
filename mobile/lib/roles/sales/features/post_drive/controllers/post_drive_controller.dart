import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/sales/features/post_drive/models/post_drive_state_model.dart';

class PostDriveController extends Notifier<PostDriveStateModel> {
  @override
  PostDriveStateModel build() {
    return const PostDriveStateModel();
  }

  void setInterestLevel(int id) {
    state = state.copyWith(interestLevelId: id);
  }

  void setFeedback(String text) {
    state = state.copyWith(feedback: text);
  }

  bool get isValid => state.interestLevelId != null;

  Future<void> submitPostDriveData(String taskId) async {
    if (!isValid) return;

    state = state.copyWith(isSubmitting: true, error: null);

    try {
      // Print payload to verify BE integration readiness
      print('Submitting post-drive for $taskId with payload: ${state.toJson()}');
      
      // Mock API delay
      await Future.delayed(const Duration(milliseconds: 1200)); 
      
      state = state.copyWith(isSubmitting: false, isSuccess: true);
    } catch (e) {
      state = state.copyWith(isSubmitting: false, error: e.toString());
    }
  }
}

final postDriveControllerProvider = NotifierProvider<PostDriveController, PostDriveStateModel>(() {
  return PostDriveController();
});
