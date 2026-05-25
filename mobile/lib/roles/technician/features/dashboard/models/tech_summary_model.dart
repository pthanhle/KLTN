class TechSummaryModel {
  final int activeJobs;
  final int completedJobs;
  final int waitingPartsJobs;

  TechSummaryModel({
    required this.activeJobs,
    required this.completedJobs,
    required this.waitingPartsJobs,
  });

  factory TechSummaryModel.fromJson(Map<String, dynamic> json) {
    return TechSummaryModel(
      activeJobs: json['activeJobs'] as int,
      completedJobs: json['completedJobs'] as int,
      waitingPartsJobs: json['waitingPartsJobs'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'activeJobs': activeJobs,
      'completedJobs': completedJobs,
      'waitingPartsJobs': waitingPartsJobs,
    };
  }
}
