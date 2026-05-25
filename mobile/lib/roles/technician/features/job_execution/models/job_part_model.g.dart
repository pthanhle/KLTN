// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'job_part_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_JobPartModel _$JobPartModelFromJson(Map<String, dynamic> json) =>
    _JobPartModel(
      id: json['id'] as String,
      name: json['name'] as String,
      quantity: (json['quantity'] as num).toInt(),
      icon: $enumDecode(_$JobPartIconEnumMap, json['icon']),
      status:
          $enumDecodeNullable(_$JobPartStatusEnumMap, json['status']) ??
          JobPartStatus.pending,
      etaTime: json['etaTime'] == null
          ? null
          : DateTime.parse(json['etaTime'] as String),
    );

Map<String, dynamic> _$JobPartModelToJson(_JobPartModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'quantity': instance.quantity,
      'icon': _$JobPartIconEnumMap[instance.icon]!,
      'status': _$JobPartStatusEnumMap[instance.status]!,
      'etaTime': instance.etaTime?.toIso8601String(),
    };

const _$JobPartIconEnumMap = {
  JobPartIcon.settings: 'settings',
  JobPartIcon.waterDrop: 'water_drop',
};

const _$JobPartStatusEnumMap = {
  JobPartStatus.pending: 'pending',
  JobPartStatus.backorder: 'backorder',
  JobPartStatus.installing: 'installing',
  JobPartStatus.completed: 'completed',
};
