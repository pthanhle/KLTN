import 'package:freezed_annotation/freezed_annotation.dart';

part 'supplement_request_model.freezed.dart';
part 'supplement_request_model.g.dart';

@freezed
abstract class SupplementRequestModel with _$SupplementRequestModel {
  const SupplementRequestModel._();
  const factory SupplementRequestModel({
    @JsonKey(name: 'booking_code') required String bookingCode,
    @JsonKey(name: 'task_id') required String taskId,
    @JsonKey(name: 'issue_title') required String issueTitle,
    @JsonKey(name: 'technician_note') required String technicianNote,
    @JsonKey(name: 'action_required') required String actionRequired,
    @JsonKey(name: 'evidence_media_urls') @Default([]) List<String> evidenceMediaUrls,
    @Default('PENDING') String status,
  }) = _SupplementRequestModel;

  factory SupplementRequestModel.fromJson(Map<String, dynamic> json) =>
      _$SupplementRequestModelFromJson(json);
}
