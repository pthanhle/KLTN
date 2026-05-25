import 'package:freezed_annotation/freezed_annotation.dart';

part 'tech_task_model.freezed.dart';
part 'tech_task_model.g.dart';

enum TechTaskUrgency {
  urgent,
  standard,
  completed
}

enum TechTaskStatus {
  diagnosing,
  waitingParts,
  inProgress,
  completed
}

@freezed
abstract class TechTaskModel with _$TechTaskModel {
  const TechTaskModel._();

  const factory TechTaskModel({
    required String id,
    required String plate,
    required String model,
    required String bay,
    required String startTime,
    required String endTime,
    required String role,
    required TechTaskUrgency urgency,
    required TechTaskStatus status,
  }) = _TechTaskModel;

  factory TechTaskModel.fromJson(Map<String, dynamic> json) =>
      _$TechTaskModelFromJson(json);
}
