import 'package:freezed_annotation/freezed_annotation.dart';
import 'mpi_item_model.dart';

part 'mpi_category_model.freezed.dart';
part 'mpi_category_model.g.dart';

@freezed
abstract class MpiCategoryModel with _$MpiCategoryModel {
  const MpiCategoryModel._();

  const factory MpiCategoryModel({
    required String id,
    required String name,
    required List<MpiItemModel> items,
  }) = _MpiCategoryModel;

  factory MpiCategoryModel.fromJson(Map<String, dynamic> json) =>
      _$MpiCategoryModelFromJson(json);
}
