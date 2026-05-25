import 'package:freezed_annotation/freezed_annotation.dart';

part 'supplement_request_model.freezed.dart';
part 'supplement_request_model.g.dart';

@freezed
abstract class SupplementRequestModel with _$SupplementRequestModel {
  const SupplementRequestModel._();
  const factory SupplementRequestModel({
    required String orderId,
    required String taskId,
    @Default([]) List<String> evidenceUrls,
    required String description,
    required String proposedSolution,
    @Default('PENDING') String status,
  }) = _SupplementRequestModel;

  factory SupplementRequestModel.fromJson(Map<String, dynamic> json) =>
      _$SupplementRequestModelFromJson(json);
}
