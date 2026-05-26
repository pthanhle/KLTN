import 'package:freezed_annotation/freezed_annotation.dart';

part 'mpi_item_model.freezed.dart';
part 'mpi_item_model.g.dart';

enum MpiItemStatus {
  @JsonValue('UNCHECKED')
  unchecked,
  @JsonValue('normal')
  pass,
  @JsonValue('warning')
  monitor,
  @JsonValue('critical')
  fail,
}

@freezed
abstract class MpiItemModel with _$MpiItemModel {
  const MpiItemModel._();

  const factory MpiItemModel({
    required String id,
    required String name,
    @Default(MpiItemStatus.unchecked) MpiItemStatus status,
    @JsonKey(name: 'action_required') String? note,
    @JsonKey(name: 'evidence_media_urls') @Default([]) List<String> mediaUrls,
  }) = _MpiItemModel;

  factory MpiItemModel.fromJson(Map<String, dynamic> json) =>
      _$MpiItemModelFromJson(json);
}
