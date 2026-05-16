// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'kanban_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_KanbanModel _$KanbanModelFromJson(Map<String, dynamic> json) => _KanbanModel(
  todo:
      (json['todo'] as List<dynamic>?)
          ?.map((e) => TaskModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  inProgress:
      (json['inProgress'] as List<dynamic>?)
          ?.map((e) => TaskModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
  done:
      (json['done'] as List<dynamic>?)
          ?.map((e) => TaskModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$KanbanModelToJson(_KanbanModel instance) =>
    <String, dynamic>{
      'todo': instance.todo,
      'inProgress': instance.inProgress,
      'done': instance.done,
    };
