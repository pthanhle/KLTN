// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vehicle_unit_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_VehicleUnitModel _$VehicleUnitModelFromJson(Map<String, dynamic> json) =>
    _VehicleUnitModel(
      id: json['_id'] as String,
      carId: _readCarId(json, 'carId') as String,
      vin: json['vin'] as String?,
      engineNumber: json['engine_number'] as String?,
      color: _readColor(json, 'color') as String?,
      year: (json['model_year'] as num?)?.toInt(),
      odometer: (json['odometer'] as num?)?.toInt(),
      fuel: json['fuel'] as String?,
      seats: (json['seats'] as num?)?.toInt(),
      status: json['status'] as String,
      condition: json['condition'] as String?,
      salePrice: _readSalePrice(json, 'salePrice') as num?,
      unitCode: json['unit_code'] as String?,
    );

Map<String, dynamic> _$VehicleUnitModelToJson(_VehicleUnitModel instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'carId': instance.carId,
      'vin': instance.vin,
      'engine_number': instance.engineNumber,
      'color': instance.color,
      'model_year': instance.year,
      'odometer': instance.odometer,
      'fuel': instance.fuel,
      'seats': instance.seats,
      'status': instance.status,
      'condition': instance.condition,
      'salePrice': instance.salePrice,
      'unit_code': instance.unitCode,
    };
