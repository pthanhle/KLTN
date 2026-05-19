class DailyProgressModel {
  final int completed;
  final int totalTarget;
  final String date;

  const DailyProgressModel({
    required this.completed,
    required this.totalTarget,
    required this.date,
  });

  factory DailyProgressModel.fromJson(Map<String, dynamic> json) {
    return DailyProgressModel(
      completed: json['completed'] as int,
      totalTarget: json['totalTarget'] as int,
      date: json['date'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'completed': completed,
      'totalTarget': totalTarget,
      'date': date,
    };
  }
}
