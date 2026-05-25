// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mpi_item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_MpiItemModel _$MpiItemModelFromJson(Map<String, dynamic> json) =>
    _MpiItemModel(
      id: json['id'] as String,
      name: json['name'] as String,
      status:
          $enumDecodeNullable(_$MpiItemStatusEnumMap, json['status']) ??
          MpiItemStatus.unchecked,
      note: json['note'] as String?,
      mediaUrls:
          (json['mediaUrls'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
    );

Map<String, dynamic> _$MpiItemModelToJson(_MpiItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'status': _$MpiItemStatusEnumMap[instance.status]!,
      'note': instance.note,
      'mediaUrls': instance.mediaUrls,
    };

const _$MpiItemStatusEnumMap = {
  MpiItemStatus.unchecked: 'UNCHECKED',
  MpiItemStatus.pass: 'PASS',
  MpiItemStatus.monitor: 'MONITOR',
  MpiItemStatus.fail: 'FAIL',
};
