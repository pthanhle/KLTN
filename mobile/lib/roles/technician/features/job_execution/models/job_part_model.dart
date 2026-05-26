import 'package:freezed_annotation/freezed_annotation.dart';

part 'job_part_model.freezed.dart';
part 'job_part_model.g.dart';

enum JobPartIcon {
  @JsonValue('settings')
  settings,
  @JsonValue('water_drop')
  waterDrop,
}

enum JobPartStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('backorder')
  backorder,
  @JsonValue('installing')
  installing,
  @JsonValue('completed')
  completed,
}

@freezed
abstract class JobPartModel with _$JobPartModel {
  const JobPartModel._();

  const factory JobPartModel({
    required String id,
    @JsonKey(name: 'sku') required String sku,
    required String name,
    required int quantity,
    required JobPartIcon icon,
    @Default(JobPartStatus.pending) JobPartStatus status,
    DateTime? etaTime,
  }) = _JobPartModel;

  factory JobPartModel.fromJson(Map<String, dynamic> json) =>
      _$JobPartModelFromJson(json);
}
