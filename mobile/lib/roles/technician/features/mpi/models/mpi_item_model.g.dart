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
      note: json['action_required'] as String?,
      mediaUrls:
          (json['evidence_media_urls'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
    );

Map<String, dynamic> _$MpiItemModelToJson(_MpiItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'status': _$MpiItemStatusEnumMap[instance.status]!,
      'action_required': instance.note,
      'evidence_media_urls': instance.mediaUrls,
    };

const _$MpiItemStatusEnumMap = {
  MpiItemStatus.unchecked: 'UNCHECKED',
  MpiItemStatus.pass: 'normal',
  MpiItemStatus.monitor: 'warning',
  MpiItemStatus.fail: 'critical',
};
