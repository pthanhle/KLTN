import 'package:freezed_annotation/freezed_annotation.dart';

part 'supplement_part_model.freezed.dart';
part 'supplement_part_model.g.dart';

@freezed
abstract class SupplementPartModel with _$SupplementPartModel {
  const factory SupplementPartModel({
    required String id,
    @JsonKey(name: 'sku') required String sku,
    required String name,
    @JsonKey(name: 'unit_price') required double unitPrice,
    required int quantity,
    @JsonKey(name: 'stock_on_hand') @Default(0) int stockOnHand,
    @JsonKey(name: 'estimated_arrival_date') DateTime? estimatedArrivalDate,
  }) = _SupplementPartModel;

  factory SupplementPartModel.fromJson(Map<String, dynamic> json) =>
      _$SupplementPartModelFromJson(json);
}

extension SupplementPartModelX on SupplementPartModel {
  double get total => unitPrice * quantity;
  bool get isBackordered => stockOnHand == 0;
}
