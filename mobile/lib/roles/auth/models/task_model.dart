import 'package:freezed_annotation/freezed_annotation.dart';

part 'task_model.freezed.dart';
part 'task_model.g.dart';

@freezed
abstract class ChatLog with _$ChatLog {
  const ChatLog._();

  const factory ChatLog({
    required String sender,
    required String time,
    required String text,
  }) = _ChatLog;

  factory ChatLog.fromJson(Map<String, dynamic> json) =>
      _$ChatLogFromJson(json);
}

@freezed
abstract class TaskModel with _$TaskModel {
  const TaskModel._();

  const factory TaskModel({
    required String id,
    required String title,
    required String priority,
    String? status,
    String? sla,
    int? progress,
    String? customerName,
    String? licensePlate,
    String? customerPhone,
    String? vehicleModel,
    String? appointmentTime,
    String? description,
    String? billed,
    String? taskType,
    bool? isBlinking,
    String? locationType,
    String? address,
    List<ChatLog>? chatLogs,
  }) = _TaskModel;

  factory TaskModel.fromJson(Map<String, dynamic> json) =>
      _$TaskModelFromJson(json);
}
