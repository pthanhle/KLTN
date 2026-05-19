class ReportReasonModel {
  final String id;
  final String titleKey;
  final String subtitleKey;
  final String? iconName;

  const ReportReasonModel({
    required this.id,
    required this.titleKey,
    required this.subtitleKey,
    this.iconName,
  });

  factory ReportReasonModel.fromJson(Map<String, dynamic> json) {
    return ReportReasonModel(
      id: json['id'] as String,
      titleKey: json['titleKey'] as String,
      subtitleKey: json['subtitleKey'] as String,
      iconName: json['iconName'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'titleKey': titleKey,
      'subtitleKey': subtitleKey,
      'iconName': iconName,
    };
  }
}
