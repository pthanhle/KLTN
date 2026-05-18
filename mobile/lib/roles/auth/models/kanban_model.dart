import 'package:freezed_annotation/freezed_annotation.dart';
import 'task_model.dart';

part 'kanban_model.freezed.dart';
part 'kanban_model.g.dart';

@freezed
abstract class KanbanModel with _$KanbanModel {
  const KanbanModel._();

  const factory KanbanModel({
    @Default([]) List<TaskModel> tasks,
  }) = _KanbanModel;

  factory KanbanModel.fromJson(Map<String, dynamic> json) =>
      _$KanbanModelFromJson(json);
}
