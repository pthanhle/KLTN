// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'job_task_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_JobTaskModel _$JobTaskModelFromJson(Map<String, dynamic> json) =>
    _JobTaskModel(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      icon: $enumDecode(_$JobTaskIconEnumMap, json['icon']),
      status:
          $enumDecodeNullable(_$JobTaskStatusEnumMap, json['status']) ??
          JobTaskStatus.pending,
      mediaUrls:
          (json['mediaUrls'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      startedAt: json['startedAt'] == null
          ? null
          : DateTime.parse(json['startedAt'] as String),
      completedAt: json['completedAt'] == null
          ? null
          : DateTime.parse(json['completedAt'] as String),
    );

Map<String, dynamic> _$JobTaskModelToJson(_JobTaskModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'icon': _$JobTaskIconEnumMap[instance.icon]!,
      'status': _$JobTaskStatusEnumMap[instance.status]!,
      'mediaUrls': instance.mediaUrls,
      'startedAt': instance.startedAt?.toIso8601String(),
      'completedAt': instance.completedAt?.toIso8601String(),
    };

const _$JobTaskIconEnumMap = {
  JobTaskIcon.build: 'build',
  JobTaskIcon.cleaningServices: 'cleaning_services',
  JobTaskIcon.checkCircle: 'check_circle',
};

const _$JobTaskStatusEnumMap = {
  JobTaskStatus.pending: 'pending',
  JobTaskStatus.inProgress: 'in_progress',
  JobTaskStatus.completed: 'completed',
};
