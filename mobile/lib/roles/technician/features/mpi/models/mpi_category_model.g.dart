// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mpi_category_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_MpiCategoryModel _$MpiCategoryModelFromJson(Map<String, dynamic> json) =>
    _MpiCategoryModel(
      id: json['id'] as String,
      name: json['title'] as String,
      technicianNote: json['technician_note'] as String?,
      items: (json['items'] as List<dynamic>)
          .map((e) => MpiItemModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$MpiCategoryModelToJson(_MpiCategoryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.name,
      'technician_note': instance.technicianNote,
      'items': instance.items,
    };
