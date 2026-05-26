// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'supplement_labor_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SupplementLaborModel _$SupplementLaborModelFromJson(
  Map<String, dynamic> json,
) => _SupplementLaborModel(
  id: json['id'] as String,
  laborCode: json['labor_code'] as String,
  description: json['description'] as String,
  unitPrice: (json['unit_price'] as num).toDouble(),
  quantity: (json['quantity'] as num).toDouble(),
);

Map<String, dynamic> _$SupplementLaborModelToJson(
  _SupplementLaborModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'labor_code': instance.laborCode,
  'description': instance.description,
  'unit_price': instance.unitPrice,
  'quantity': instance.quantity,
};
