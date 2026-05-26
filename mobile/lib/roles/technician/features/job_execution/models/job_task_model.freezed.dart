// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'job_task_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$JobTaskModel {

 String get id;@JsonKey(name: 'labor_code') String get laborCode; String get name; String get description; JobTaskIcon get icon; JobTaskStatus get status; List<String> get mediaUrls; DateTime? get startedAt; DateTime? get completedAt;
/// Create a copy of JobTaskModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$JobTaskModelCopyWith<JobTaskModel> get copyWith => _$JobTaskModelCopyWithImpl<JobTaskModel>(this as JobTaskModel, _$identity);

  /// Serializes this JobTaskModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is JobTaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.laborCode, laborCode) || other.laborCode == laborCode)&&(identical(other.name, name) || other.name == name)&&(identical(other.description, description) || other.description == description)&&(identical(other.icon, icon) || other.icon == icon)&&(identical(other.status, status) || other.status == status)&&const DeepCollectionEquality().equals(other.mediaUrls, mediaUrls)&&(identical(other.startedAt, startedAt) || other.startedAt == startedAt)&&(identical(other.completedAt, completedAt) || other.completedAt == completedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,laborCode,name,description,icon,status,const DeepCollectionEquality().hash(mediaUrls),startedAt,completedAt);

@override
String toString() {
  return 'JobTaskModel(id: $id, laborCode: $laborCode, name: $name, description: $description, icon: $icon, status: $status, mediaUrls: $mediaUrls, startedAt: $startedAt, completedAt: $completedAt)';
}


}

/// @nodoc
abstract mixin class $JobTaskModelCopyWith<$Res>  {
  factory $JobTaskModelCopyWith(JobTaskModel value, $Res Function(JobTaskModel) _then) = _$JobTaskModelCopyWithImpl;
@useResult
$Res call({
 String id,@JsonKey(name: 'labor_code') String laborCode, String name, String description, JobTaskIcon icon, JobTaskStatus status, List<String> mediaUrls, DateTime? startedAt, DateTime? completedAt
});




}
/// @nodoc
class _$JobTaskModelCopyWithImpl<$Res>
    implements $JobTaskModelCopyWith<$Res> {
  _$JobTaskModelCopyWithImpl(this._self, this._then);

  final JobTaskModel _self;
  final $Res Function(JobTaskModel) _then;

/// Create a copy of JobTaskModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? laborCode = null,Object? name = null,Object? description = null,Object? icon = null,Object? status = null,Object? mediaUrls = null,Object? startedAt = freezed,Object? completedAt = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,laborCode: null == laborCode ? _self.laborCode : laborCode // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as JobTaskIcon,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as JobTaskStatus,mediaUrls: null == mediaUrls ? _self.mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,completedAt: freezed == completedAt ? _self.completedAt : completedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [JobTaskModel].
extension JobTaskModelPatterns on JobTaskModel {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _JobTaskModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _JobTaskModel() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _JobTaskModel value)  $default,){
final _that = this;
switch (_that) {
case _JobTaskModel():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _JobTaskModel value)?  $default,){
final _that = this;
switch (_that) {
case _JobTaskModel() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String name,  String description,  JobTaskIcon icon,  JobTaskStatus status,  List<String> mediaUrls,  DateTime? startedAt,  DateTime? completedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _JobTaskModel() when $default != null:
return $default(_that.id,_that.laborCode,_that.name,_that.description,_that.icon,_that.status,_that.mediaUrls,_that.startedAt,_that.completedAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String name,  String description,  JobTaskIcon icon,  JobTaskStatus status,  List<String> mediaUrls,  DateTime? startedAt,  DateTime? completedAt)  $default,) {final _that = this;
switch (_that) {
case _JobTaskModel():
return $default(_that.id,_that.laborCode,_that.name,_that.description,_that.icon,_that.status,_that.mediaUrls,_that.startedAt,_that.completedAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String name,  String description,  JobTaskIcon icon,  JobTaskStatus status,  List<String> mediaUrls,  DateTime? startedAt,  DateTime? completedAt)?  $default,) {final _that = this;
switch (_that) {
case _JobTaskModel() when $default != null:
return $default(_that.id,_that.laborCode,_that.name,_that.description,_that.icon,_that.status,_that.mediaUrls,_that.startedAt,_that.completedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _JobTaskModel extends JobTaskModel {
  const _JobTaskModel({required this.id, @JsonKey(name: 'labor_code') required this.laborCode, required this.name, required this.description, required this.icon, this.status = JobTaskStatus.pending, final  List<String> mediaUrls = const [], this.startedAt, this.completedAt}): _mediaUrls = mediaUrls,super._();
  factory _JobTaskModel.fromJson(Map<String, dynamic> json) => _$JobTaskModelFromJson(json);

@override final  String id;
@override@JsonKey(name: 'labor_code') final  String laborCode;
@override final  String name;
@override final  String description;
@override final  JobTaskIcon icon;
@override@JsonKey() final  JobTaskStatus status;
 final  List<String> _mediaUrls;
@override@JsonKey() List<String> get mediaUrls {
  if (_mediaUrls is EqualUnmodifiableListView) return _mediaUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_mediaUrls);
}

@override final  DateTime? startedAt;
@override final  DateTime? completedAt;

/// Create a copy of JobTaskModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$JobTaskModelCopyWith<_JobTaskModel> get copyWith => __$JobTaskModelCopyWithImpl<_JobTaskModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$JobTaskModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _JobTaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.laborCode, laborCode) || other.laborCode == laborCode)&&(identical(other.name, name) || other.name == name)&&(identical(other.description, description) || other.description == description)&&(identical(other.icon, icon) || other.icon == icon)&&(identical(other.status, status) || other.status == status)&&const DeepCollectionEquality().equals(other._mediaUrls, _mediaUrls)&&(identical(other.startedAt, startedAt) || other.startedAt == startedAt)&&(identical(other.completedAt, completedAt) || other.completedAt == completedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,laborCode,name,description,icon,status,const DeepCollectionEquality().hash(_mediaUrls),startedAt,completedAt);

@override
String toString() {
  return 'JobTaskModel(id: $id, laborCode: $laborCode, name: $name, description: $description, icon: $icon, status: $status, mediaUrls: $mediaUrls, startedAt: $startedAt, completedAt: $completedAt)';
}


}

/// @nodoc
abstract mixin class _$JobTaskModelCopyWith<$Res> implements $JobTaskModelCopyWith<$Res> {
  factory _$JobTaskModelCopyWith(_JobTaskModel value, $Res Function(_JobTaskModel) _then) = __$JobTaskModelCopyWithImpl;
@override @useResult
$Res call({
 String id,@JsonKey(name: 'labor_code') String laborCode, String name, String description, JobTaskIcon icon, JobTaskStatus status, List<String> mediaUrls, DateTime? startedAt, DateTime? completedAt
});




}
/// @nodoc
class __$JobTaskModelCopyWithImpl<$Res>
    implements _$JobTaskModelCopyWith<$Res> {
  __$JobTaskModelCopyWithImpl(this._self, this._then);

  final _JobTaskModel _self;
  final $Res Function(_JobTaskModel) _then;

/// Create a copy of JobTaskModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? laborCode = null,Object? name = null,Object? description = null,Object? icon = null,Object? status = null,Object? mediaUrls = null,Object? startedAt = freezed,Object? completedAt = freezed,}) {
  return _then(_JobTaskModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,laborCode: null == laborCode ? _self.laborCode : laborCode // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as JobTaskIcon,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as JobTaskStatus,mediaUrls: null == mediaUrls ? _self._mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,completedAt: freezed == completedAt ? _self.completedAt : completedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
