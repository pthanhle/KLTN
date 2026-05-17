// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'kanban_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_KanbanModel _$KanbanModelFromJson(Map<String, dynamic> json) => _KanbanModel(
  tasks:
      (json['tasks'] as List<dynamic>?)
          ?.map((e) => TaskModel.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const [],
);

Map<String, dynamic> _$KanbanModelToJson(_KanbanModel instance) =>
    <String, dynamic>{'tasks': instance.tasks};
