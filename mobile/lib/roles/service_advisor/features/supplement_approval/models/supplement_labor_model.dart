import 'package:freezed_annotation/freezed_annotation.dart';

part 'supplement_labor_model.freezed.dart';
part 'supplement_labor_model.g.dart';

@freezed
abstract class SupplementLaborModel with _$SupplementLaborModel {
  const factory SupplementLaborModel({
    required String id,
    @JsonKey(name: 'labor_code') required String laborCode,
    required String description,
    @JsonKey(name: 'unit_price') required double unitPrice,
    required double quantity,
  }) = _SupplementLaborModel;

  factory SupplementLaborModel.fromJson(Map<String, dynamic> json) =>
      _$SupplementLaborModelFromJson(json);
}

extension SupplementLaborModelX on SupplementLaborModel {
  double get total => unitPrice * quantity;
}
