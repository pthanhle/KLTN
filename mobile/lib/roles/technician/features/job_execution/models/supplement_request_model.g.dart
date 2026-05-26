// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'supplement_request_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SupplementRequestModel _$SupplementRequestModelFromJson(
  Map<String, dynamic> json,
) => _SupplementRequestModel(
  bookingCode: json['booking_code'] as String,
  taskId: json['task_id'] as String,
  issueTitle: json['issue_title'] as String,
  technicianNote: json['technician_note'] as String,
  actionRequired: json['action_required'] as String,
  evidenceMediaUrls:
      (json['evidence_media_urls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
  status: json['status'] as String? ?? 'PENDING',
);

Map<String, dynamic> _$SupplementRequestModelToJson(
  _SupplementRequestModel instance,
) => <String, dynamic>{
  'booking_code': instance.bookingCode,
  'task_id': instance.taskId,
  'issue_title': instance.issueTitle,
  'technician_note': instance.technicianNote,
  'action_required': instance.actionRequired,
  'evidence_media_urls': instance.evidenceMediaUrls,
  'status': instance.status,
};
