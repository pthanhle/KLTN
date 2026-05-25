// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'supplement_request_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_SupplementRequestModel _$SupplementRequestModelFromJson(
  Map<String, dynamic> json,
) => _SupplementRequestModel(
  orderId: json['orderId'] as String,
  taskId: json['taskId'] as String,
  evidenceUrls:
      (json['evidenceUrls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const [],
  description: json['description'] as String,
  proposedSolution: json['proposedSolution'] as String,
  status: json['status'] as String? ?? 'PENDING',
);

Map<String, dynamic> _$SupplementRequestModelToJson(
  _SupplementRequestModel instance,
) => <String, dynamic>{
  'orderId': instance.orderId,
  'taskId': instance.taskId,
  'evidenceUrls': instance.evidenceUrls,
  'description': instance.description,
  'proposedSolution': instance.proposedSolution,
  'status': instance.status,
};
