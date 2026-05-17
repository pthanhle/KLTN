import 'package:freezed_annotation/freezed_annotation.dart';
import 'kpi_model.dart';
import 'kanban_model.dart';

part 'performance_model.freezed.dart';
part 'performance_model.g.dart';

@freezed
abstract class PerformanceModel with _$PerformanceModel {
  const PerformanceModel._();

  const factory PerformanceModel({
    KpiModel? kpis,
    KanbanModel? kanban,
  }) = _PerformanceModel;

  factory PerformanceModel.fromJson(Map<String, dynamic> json) =>
      _$PerformanceModelFromJson(json);
}
