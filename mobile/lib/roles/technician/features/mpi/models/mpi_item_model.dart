import 'package:freezed_annotation/freezed_annotation.dart';

part 'mpi_item_model.freezed.dart';
part 'mpi_item_model.g.dart';

enum MpiItemStatus {
  @JsonValue('UNCHECKED')
  unchecked,
  @JsonValue('PASS')
  pass,
  @JsonValue('MONITOR')
  monitor,
  @JsonValue('FAIL')
  fail,
}

@freezed
abstract class MpiItemModel with _$MpiItemModel {
  const MpiItemModel._();

  const factory MpiItemModel({
    required String id,
    required String name,
    @Default(MpiItemStatus.unchecked) MpiItemStatus status,
    String? note,
    @Default([]) List<String> mediaUrls,
  }) = _MpiItemModel;

  factory MpiItemModel.fromJson(Map<String, dynamic> json) =>
      _$MpiItemModelFromJson(json);
}
