// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'tech_task_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_TechTaskModel _$TechTaskModelFromJson(Map<String, dynamic> json) =>
    _TechTaskModel(
      id: json['id'] as String,
      plate: json['plate'] as String,
      model: json['model'] as String,
      bay: json['bay'] as String,
      startTime: json['startTime'] as String,
      endTime: json['endTime'] as String,
      role: json['role'] as String,
      urgency: $enumDecode(_$TechTaskUrgencyEnumMap, json['urgency']),
      status: $enumDecode(_$TechTaskStatusEnumMap, json['status']),
    );

Map<String, dynamic> _$TechTaskModelToJson(_TechTaskModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'plate': instance.plate,
      'model': instance.model,
      'bay': instance.bay,
      'startTime': instance.startTime,
      'endTime': instance.endTime,
      'role': instance.role,
      'urgency': _$TechTaskUrgencyEnumMap[instance.urgency]!,
      'status': _$TechTaskStatusEnumMap[instance.status]!,
    };

const _$TechTaskUrgencyEnumMap = {
  TechTaskUrgency.urgent: 'urgent',
  TechTaskUrgency.standard: 'standard',
  TechTaskUrgency.completed: 'completed',
};

const _$TechTaskStatusEnumMap = {
  TechTaskStatus.diagnosing: 'diagnosing',
  TechTaskStatus.waitingParts: 'waitingParts',
  TechTaskStatus.inProgress: 'inProgress',
  TechTaskStatus.completed: 'completed',
};
