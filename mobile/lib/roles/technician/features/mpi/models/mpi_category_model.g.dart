// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mpi_category_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_MpiCategoryModel _$MpiCategoryModelFromJson(Map<String, dynamic> json) =>
    _MpiCategoryModel(
      id: json['id'] as String,
      name: json['name'] as String,
      items: (json['items'] as List<dynamic>)
          .map((e) => MpiItemModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$MpiCategoryModelToJson(_MpiCategoryModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'items': instance.items,
    };
