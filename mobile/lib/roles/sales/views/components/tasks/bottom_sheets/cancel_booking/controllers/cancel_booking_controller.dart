import 'package:flutter_riverpod/flutter_riverpod.dart';

class CancelBookingState {
  final int selectedReasonId;
  final String cancelNote;
  final bool isSubmitting;
  final bool isSuccess;
  final String? error;

  const CancelBookingState({
    this.selectedReasonId = -1,
    this.cancelNote = '',
    this.isSubmitting = false,
    this.isSuccess = false,
    this.error,
  });

  CancelBookingState copyWith({
    int? selectedReasonId,
    String? cancelNote,
    bool? isSubmitting,
    bool? isSuccess,
    String? error,
  }) {
    return CancelBookingState(
      selectedReasonId: selectedReasonId ?? this.selectedReasonId,
      cancelNote: cancelNote ?? this.cancelNote,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      isSuccess: isSuccess ?? this.isSuccess,
      error: error ?? this.error,
    );
  }
}

class CancelBookingController extends Notifier<CancelBookingState> {
  @override
  CancelBookingState build() {
    return const CancelBookingState();
  }

  void selectReason(int reasonId) {
    state = state.copyWith(selectedReasonId: reasonId);
  }

  void updateNote(String note) {
    state = state.copyWith(cancelNote: note);
  }

  bool get isValid {
    if (state.selectedReasonId == -1) return false;
    // Require note if reason is "Lý do khác" (ID 4)
    if (state.selectedReasonId == 4 && state.cancelNote.trim().isEmpty) {
      return false;
    }
    return true;
  }

  Future<void> submitCancelBooking(String taskId) async {
    if (!isValid) return;

    state = state.copyWith(isSubmitting: true, error: null);

    try {
      // TODO: Call API to submit cancellation
      await Future.delayed(const Duration(milliseconds: 600)); // Mock API delay

      state = state.copyWith(isSubmitting: false, isSuccess: true);
    } catch (e) {
      state = state.copyWith(isSubmitting: false, error: e.toString());
    }
  }
}

final cancelBookingControllerProvider = NotifierProvider<CancelBookingController, CancelBookingState>(() {
  return CancelBookingController();
});
