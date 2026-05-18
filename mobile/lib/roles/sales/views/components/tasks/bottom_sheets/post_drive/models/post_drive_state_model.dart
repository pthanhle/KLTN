class PostDriveStateModel {
  final int? interestLevelId;
  final String feedback;
  final bool isSubmitting;
  final bool isSuccess;
  final String? error;

  const PostDriveStateModel({
    this.interestLevelId,
    this.feedback = '',
    this.isSubmitting = false,
    this.isSuccess = false,
    this.error,
  });

  PostDriveStateModel copyWith({
    int? interestLevelId,
    String? feedback,
    bool? isSubmitting,
    bool? isSuccess,
    String? error,
  }) {
    return PostDriveStateModel(
      interestLevelId: interestLevelId ?? this.interestLevelId,
      feedback: feedback ?? this.feedback,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      isSuccess: isSuccess ?? this.isSuccess,
      error: error ?? this.error,
    );
  }

  // Payload structure for API integration
  Map<String, dynamic> toJson() {
    return {
      'interestLevelId': interestLevelId,
      'feedbackText': feedback.trim(),
    };
  }
}
