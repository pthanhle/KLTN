// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'job_part_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$JobPartModel {

 String get id; String get name; int get quantity; JobPartIcon get icon; JobPartStatus get status; DateTime? get etaTime;
/// Create a copy of JobPartModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$JobPartModelCopyWith<JobPartModel> get copyWith => _$JobPartModelCopyWithImpl<JobPartModel>(this as JobPartModel, _$identity);

  /// Serializes this JobPartModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is JobPartModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.quantity, quantity) || other.quantity == quantity)&&(identical(other.icon, icon) || other.icon == icon)&&(identical(other.status, status) || other.status == status)&&(identical(other.etaTime, etaTime) || other.etaTime == etaTime));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,quantity,icon,status,etaTime);

@override
String toString() {
  return 'JobPartModel(id: $id, name: $name, quantity: $quantity, icon: $icon, status: $status, etaTime: $etaTime)';
}


}

/// @nodoc
abstract mixin class $JobPartModelCopyWith<$Res>  {
  factory $JobPartModelCopyWith(JobPartModel value, $Res Function(JobPartModel) _then) = _$JobPartModelCopyWithImpl;
@useResult
$Res call({
 String id, String name, int quantity, JobPartIcon icon, JobPartStatus status, DateTime? etaTime
});




}
/// @nodoc
class _$JobPartModelCopyWithImpl<$Res>
    implements $JobPartModelCopyWith<$Res> {
  _$JobPartModelCopyWithImpl(this._self, this._then);

  final JobPartModel _self;
  final $Res Function(JobPartModel) _then;

/// Create a copy of JobPartModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? quantity = null,Object? icon = null,Object? status = null,Object? etaTime = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as int,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as JobPartIcon,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as JobPartStatus,etaTime: freezed == etaTime ? _self.etaTime : etaTime // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [JobPartModel].
extension JobPartModelPatterns on JobPartModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _JobPartModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _JobPartModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _JobPartModel value)  $default,){
final _that = this;
switch (_that) {
case _JobPartModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _JobPartModel value)?  $default,){
final _that = this;
switch (_that) {
case _JobPartModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  int quantity,  JobPartIcon icon,  JobPartStatus status,  DateTime? etaTime)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _JobPartModel() when $default != null:
return $default(_that.id,_that.name,_that.quantity,_that.icon,_that.status,_that.etaTime);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  int quantity,  JobPartIcon icon,  JobPartStatus status,  DateTime? etaTime)  $default,) {final _that = this;
switch (_that) {
case _JobPartModel():
return $default(_that.id,_that.name,_that.quantity,_that.icon,_that.status,_that.etaTime);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  int quantity,  JobPartIcon icon,  JobPartStatus status,  DateTime? etaTime)?  $default,) {final _that = this;
switch (_that) {
case _JobPartModel() when $default != null:
return $default(_that.id,_that.name,_that.quantity,_that.icon,_that.status,_that.etaTime);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _JobPartModel extends JobPartModel {
  const _JobPartModel({required this.id, required this.name, required this.quantity, required this.icon, this.status = JobPartStatus.pending, this.etaTime}): super._();
  factory _JobPartModel.fromJson(Map<String, dynamic> json) => _$JobPartModelFromJson(json);

@override final  String id;
@override final  String name;
@override final  int quantity;
@override final  JobPartIcon icon;
@override@JsonKey() final  JobPartStatus status;
@override final  DateTime? etaTime;

/// Create a copy of JobPartModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$JobPartModelCopyWith<_JobPartModel> get copyWith => __$JobPartModelCopyWithImpl<_JobPartModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$JobPartModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _JobPartModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.quantity, quantity) || other.quantity == quantity)&&(identical(other.icon, icon) || other.icon == icon)&&(identical(other.status, status) || other.status == status)&&(identical(other.etaTime, etaTime) || other.etaTime == etaTime));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,quantity,icon,status,etaTime);

@override
String toString() {
  return 'JobPartModel(id: $id, name: $name, quantity: $quantity, icon: $icon, status: $status, etaTime: $etaTime)';
}


}

/// @nodoc
abstract mixin class _$JobPartModelCopyWith<$Res> implements $JobPartModelCopyWith<$Res> {
  factory _$JobPartModelCopyWith(_JobPartModel value, $Res Function(_JobPartModel) _then) = __$JobPartModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, int quantity, JobPartIcon icon, JobPartStatus status, DateTime? etaTime
});




}
/// @nodoc
class __$JobPartModelCopyWithImpl<$Res>
    implements _$JobPartModelCopyWith<$Res> {
  __$JobPartModelCopyWithImpl(this._self, this._then);

  final _JobPartModel _self;
  final $Res Function(_JobPartModel) _then;

/// Create a copy of JobPartModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? quantity = null,Object? icon = null,Object? status = null,Object? etaTime = freezed,}) {
  return _then(_JobPartModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as int,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as JobPartIcon,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as JobPartStatus,etaTime: freezed == etaTime ? _self.etaTime : etaTime // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
