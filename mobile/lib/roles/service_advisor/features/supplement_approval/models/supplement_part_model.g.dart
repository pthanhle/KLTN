// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'supplement_part_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SupplementPartModel _$SupplementPartModelFromJson(Map<String, dynamic> json) =>
    _SupplementPartModel(
      id: json['id'] as String,
      sku: json['sku'] as String,
      name: json['name'] as String,
      unitPrice: (json['unit_price'] as num).toDouble(),
      quantity: (json['quantity'] as num).toInt(),
      stockOnHand: (json['stock_on_hand'] as num?)?.toInt() ?? 0,
      estimatedArrivalDate: json['estimated_arrival_date'] == null
          ? null
          : DateTime.parse(json['estimated_arrival_date'] as String),
    );

Map<String, dynamic> _$SupplementPartModelToJson(
  _SupplementPartModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'sku': instance.sku,
  'name': instance.name,
  'unit_price': instance.unitPrice,
  'quantity': instance.quantity,
  'stock_on_hand': instance.stockOnHand,
  'estimated_arrival_date': instance.estimatedArrivalDate?.toIso8601String(),
};
