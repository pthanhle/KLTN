class TechAssignmentModel {
  final String teamLeaderName;
  final String shiftTime;
  final String workingBay;

  const TechAssignmentModel({
    required this.teamLeaderName,
    required this.shiftTime,
    required this.workingBay,
  });

  factory TechAssignmentModel.fromJson(Map<String, dynamic> json) {
    return TechAssignmentModel(
      teamLeaderName: json['team_leader_name'] as String,
      shiftTime: json['shift_time'] as String,
      workingBay: json['working_bay'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
        'team_leader_name': teamLeaderName,
        'shift_time': shiftTime,
        'working_bay': workingBay,
      };
}
