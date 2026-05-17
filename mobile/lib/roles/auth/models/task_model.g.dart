// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ChatLog _$ChatLogFromJson(Map<String, dynamic> json) => _ChatLog(
  sender: json['sender'] as String,
  time: json['time'] as String,
  text: json['text'] as String,
);

Map<String, dynamic> _$ChatLogToJson(_ChatLog instance) => <String, dynamic>{
  'sender': instance.sender,
  'time': instance.time,
  'text': instance.text,
};

_TaskModel _$TaskModelFromJson(Map<String, dynamic> json) => _TaskModel(
  id: json['id'] as String,
  title: json['title'] as String,
  priority: json['priority'] as String,
  status: json['status'] as String?,
  sla: json['sla'] as String?,
  progress: (json['progress'] as num?)?.toInt(),
  customerName: json['customerName'] as String?,
  licensePlate: json['licensePlate'] as String?,
  customerPhone: json['customerPhone'] as String?,
  vehicleModel: json['vehicleModel'] as String?,
  appointmentTime: json['appointmentTime'] as String?,
  description: json['description'] as String?,
  billed: json['billed'] as String?,
  taskType: json['taskType'] as String?,
  isBlinking: json['isBlinking'] as bool?,
  locationType: json['locationType'] as String?,
  address: json['address'] as String?,
  chatLogs: (json['chatLogs'] as List<dynamic>?)
      ?.map((e) => ChatLog.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$TaskModelToJson(_TaskModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'priority': instance.priority,
      'status': instance.status,
      'sla': instance.sla,
      'progress': instance.progress,
      'customerName': instance.customerName,
      'licensePlate': instance.licensePlate,
      'customerPhone': instance.customerPhone,
      'vehicleModel': instance.vehicleModel,
      'appointmentTime': instance.appointmentTime,
      'description': instance.description,
      'billed': instance.billed,
      'taskType': instance.taskType,
      'isBlinking': instance.isBlinking,
      'locationType': instance.locationType,
      'address': instance.address,
      'chatLogs': instance.chatLogs,
    };
