import 'package:freezed_annotation/freezed_annotation.dart';

part 'job_task_model.freezed.dart';
part 'job_task_model.g.dart';

enum JobTaskStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('in_progress')
  inProgress,
  @JsonValue('completed')
  completed,
}

enum JobTaskIcon {
  @JsonValue('build')
  build,
  @JsonValue('cleaning_services')
  cleaningServices,
  @JsonValue('check_circle')
  checkCircle,
}

@freezed
abstract class JobTaskModel with _$JobTaskModel {
  const JobTaskModel._();

  const factory JobTaskModel({
    required String id,
    required String name,
    required String description,
    required JobTaskIcon icon,
    @Default(JobTaskStatus.pending) JobTaskStatus status,
    @Default([]) List<String> mediaUrls,
    DateTime? startedAt,
    DateTime? completedAt,
  }) = _JobTaskModel;

  factory JobTaskModel.fromJson(Map<String, dynamic> json) =>
      _$JobTaskModelFromJson(json);
}
