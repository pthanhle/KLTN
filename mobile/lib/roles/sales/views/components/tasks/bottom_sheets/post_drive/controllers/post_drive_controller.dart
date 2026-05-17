import 'package:flutter_riverpod/flutter_riverpod.dart';

class PostDriveState {
  final int selectedInterestLevelId;
  final String feedback;

  const PostDriveState({
    this.selectedInterestLevelId = -1,
    this.feedback = '',
  });

  PostDriveState copyWith({
    int? selectedInterestLevelId,
    String? feedback,
  }) {
    return PostDriveState(
      selectedInterestLevelId: selectedInterestLevelId ?? this.selectedInterestLevelId,
      feedback: feedback ?? this.feedback,
    );
  }
}

class PostDriveController extends Notifier<PostDriveState> {
  @override
  PostDriveState build() {
    return const PostDriveState();
  }

  void setInterestLevel(int id) {
    state = state.copyWith(selectedInterestLevelId: id);
  }

  void setFeedback(String text) {
    state = state.copyWith(feedback: text);
  }

  Future<void> submitPostDriveData(String taskId) async {
    // This is a placeholder for actual API integration later
    // e.g. await apiService.submitTestDriveDebrief(taskId, state.selectedInterestLevelId, state.feedback);
    await Future.delayed(const Duration(milliseconds: 500)); 
  }
}

final postDriveControllerProvider = NotifierProvider<PostDriveController, PostDriveState>(() {
  return PostDriveController();
});
