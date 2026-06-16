import 'package:freezed_annotation/freezed_annotation.dart';

part 'vehicle_unit_model.freezed.dart';
part 'vehicle_unit_model.g.dart';

@freezed
abstract class VehicleUnitModel with _$VehicleUnitModel {
  const VehicleUnitModel._();

  const factory VehicleUnitModel({
    @JsonKey(name: '_id') required String id,
    @JsonKey(readValue: _readCarId) required String carId,
    String? vin,
    @JsonKey(name: 'engine_number') String? engineNumber,
    @JsonKey(readValue: _readColor) String? color,
    @JsonKey(name: 'model_year') int? year,
    int? odometer,
    String? fuel,
    int? seats,
    required String status,
    String? condition,
    @JsonKey(readValue: _readSalePrice) num? salePrice,
    @JsonKey(name: 'unit_code') String? unitCode,
  }) = _VehicleUnitModel;

  factory VehicleUnitModel.fromJson(Map<String, dynamic> json) =>
      _$VehicleUnitModelFromJson(json);
}

Object? _readColor(Map<dynamic, dynamic> json, String key) {
  if (json['color'] is Map) {
    return json['color']['name'];
  }
  return json['color'];
}

Object? _readSalePrice(Map<dynamic, dynamic> json, String key) {
  if (json['pricing_snapshot'] is Map) {
    return json['pricing_snapshot']['sale_price'] ?? json['pricing_snapshot']['listed_price'];
  }
  return null;
}

Object? _readCarId(Map<dynamic, dynamic> json, String key) {
  if (json['car_id'] is Map) {
    return json['car_id']['_id'];
  }
  return json['car_id'];
}
