// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'performance_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_PerformanceModel _$PerformanceModelFromJson(Map<String, dynamic> json) =>
    _PerformanceModel(
      kpis: json['kpis'] == null
          ? null
          : KpiModel.fromJson(json['kpis'] as Map<String, dynamic>),
      kanban: json['kanban'] == null
          ? null
          : KanbanModel.fromJson(json['kanban'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$PerformanceModelToJson(_PerformanceModel instance) =>
    <String, dynamic>{'kpis': instance.kpis, 'kanban': instance.kanban};
