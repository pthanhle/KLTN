class CancelReasonModel {
  final int id;
  final String translationKey;

  const CancelReasonModel({
    required this.id,
    required this.translationKey,
  });

  factory CancelReasonModel.fromJson(Map<String, dynamic> json) {
    return CancelReasonModel(
      id: json['id'] as int,
      translationKey: json['translationKey'] as String,
    );
  }
}
