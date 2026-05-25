// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'supplement_request_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SupplementRequestModel {

 String get orderId; String get taskId; List<String> get evidenceUrls; String get description; String get proposedSolution; String get status;
/// Create a copy of SupplementRequestModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SupplementRequestModelCopyWith<SupplementRequestModel> get copyWith => _$SupplementRequestModelCopyWithImpl<SupplementRequestModel>(this as SupplementRequestModel, _$identity);

  /// Serializes this SupplementRequestModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SupplementRequestModel&&(identical(other.orderId, orderId) || other.orderId == orderId)&&(identical(other.taskId, taskId) || other.taskId == taskId)&&const DeepCollectionEquality().equals(other.evidenceUrls, evidenceUrls)&&(identical(other.description, description) || other.description == description)&&(identical(other.proposedSolution, proposedSolution) || other.proposedSolution == proposedSolution)&&(identical(other.status, status) || other.status == status));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,orderId,taskId,const DeepCollectionEquality().hash(evidenceUrls),description,proposedSolution,status);

@override
String toString() {
  return 'SupplementRequestModel(orderId: $orderId, taskId: $taskId, evidenceUrls: $evidenceUrls, description: $description, proposedSolution: $proposedSolution, status: $status)';
}


}

/// @nodoc
abstract mixin class $SupplementRequestModelCopyWith<$Res>  {
  factory $SupplementRequestModelCopyWith(SupplementRequestModel value, $Res Function(SupplementRequestModel) _then) = _$SupplementRequestModelCopyWithImpl;
@useResult
$Res call({
 String orderId, String taskId, List<String> evidenceUrls, String description, String proposedSolution, String status
});




}
/// @nodoc
class _$SupplementRequestModelCopyWithImpl<$Res>
    implements $SupplementRequestModelCopyWith<$Res> {
  _$SupplementRequestModelCopyWithImpl(this._self, this._then);

  final SupplementRequestModel _self;
  final $Res Function(SupplementRequestModel) _then;

/// Create a copy of SupplementRequestModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? orderId = null,Object? taskId = null,Object? evidenceUrls = null,Object? description = null,Object? proposedSolution = null,Object? status = null,}) {
  return _then(_self.copyWith(
orderId: null == orderId ? _self.orderId : orderId // ignore: cast_nullable_to_non_nullable
as String,taskId: null == taskId ? _self.taskId : taskId // ignore: cast_nullable_to_non_nullable
as String,evidenceUrls: null == evidenceUrls ? _self.evidenceUrls : evidenceUrls // ignore: cast_nullable_to_non_nullable
as List<String>,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,proposedSolution: null == proposedSolution ? _self.proposedSolution : proposedSolution // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [SupplementRequestModel].
extension SupplementRequestModelPatterns on SupplementRequestModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SupplementRequestModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SupplementRequestModel value)  $default,){
final _that = this;
switch (_that) {
case _SupplementRequestModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SupplementRequestModel value)?  $default,){
final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String orderId,  String taskId,  List<String> evidenceUrls,  String description,  String proposedSolution,  String status)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
return $default(_that.orderId,_that.taskId,_that.evidenceUrls,_that.description,_that.proposedSolution,_that.status);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String orderId,  String taskId,  List<String> evidenceUrls,  String description,  String proposedSolution,  String status)  $default,) {final _that = this;
switch (_that) {
case _SupplementRequestModel():
return $default(_that.orderId,_that.taskId,_that.evidenceUrls,_that.description,_that.proposedSolution,_that.status);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String orderId,  String taskId,  List<String> evidenceUrls,  String description,  String proposedSolution,  String status)?  $default,) {final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
return $default(_that.orderId,_that.taskId,_that.evidenceUrls,_that.description,_that.proposedSolution,_that.status);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SupplementRequestModel extends SupplementRequestModel {
  const _SupplementRequestModel({required this.orderId, required this.taskId, final  List<String> evidenceUrls = const [], required this.description, required this.proposedSolution, this.status = 'PENDING'}): _evidenceUrls = evidenceUrls,super._();
  factory _SupplementRequestModel.fromJson(Map<String, dynamic> json) => _$SupplementRequestModelFromJson(json);

@override final  String orderId;
@override final  String taskId;
 final  List<String> _evidenceUrls;
@override@JsonKey() List<String> get evidenceUrls {
  if (_evidenceUrls is EqualUnmodifiableListView) return _evidenceUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_evidenceUrls);
}

@override final  String description;
@override final  String proposedSolution;
@override@JsonKey() final  String status;

/// Create a copy of SupplementRequestModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SupplementRequestModelCopyWith<_SupplementRequestModel> get copyWith => __$SupplementRequestModelCopyWithImpl<_SupplementRequestModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SupplementRequestModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SupplementRequestModel&&(identical(other.orderId, orderId) || other.orderId == orderId)&&(identical(other.taskId, taskId) || other.taskId == taskId)&&const DeepCollectionEquality().equals(other._evidenceUrls, _evidenceUrls)&&(identical(other.description, description) || other.description == description)&&(identical(other.proposedSolution, proposedSolution) || other.proposedSolution == proposedSolution)&&(identical(other.status, status) || other.status == status));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,orderId,taskId,const DeepCollectionEquality().hash(_evidenceUrls),description,proposedSolution,status);

@override
String toString() {
  return 'SupplementRequestModel(orderId: $orderId, taskId: $taskId, evidenceUrls: $evidenceUrls, description: $description, proposedSolution: $proposedSolution, status: $status)';
}


}

/// @nodoc
abstract mixin class _$SupplementRequestModelCopyWith<$Res> implements $SupplementRequestModelCopyWith<$Res> {
  factory _$SupplementRequestModelCopyWith(_SupplementRequestModel value, $Res Function(_SupplementRequestModel) _then) = __$SupplementRequestModelCopyWithImpl;
@override @useResult
$Res call({
 String orderId, String taskId, List<String> evidenceUrls, String description, String proposedSolution, String status
});




}
/// @nodoc
class __$SupplementRequestModelCopyWithImpl<$Res>
    implements _$SupplementRequestModelCopyWith<$Res> {
  __$SupplementRequestModelCopyWithImpl(this._self, this._then);

  final _SupplementRequestModel _self;
  final $Res Function(_SupplementRequestModel) _then;

/// Create a copy of SupplementRequestModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? orderId = null,Object? taskId = null,Object? evidenceUrls = null,Object? description = null,Object? proposedSolution = null,Object? status = null,}) {
  return _then(_SupplementRequestModel(
orderId: null == orderId ? _self.orderId : orderId // ignore: cast_nullable_to_non_nullable
as String,taskId: null == taskId ? _self.taskId : taskId // ignore: cast_nullable_to_non_nullable
as String,evidenceUrls: null == evidenceUrls ? _self._evidenceUrls : evidenceUrls // ignore: cast_nullable_to_non_nullable
as List<String>,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,proposedSolution: null == proposedSolution ? _self.proposedSolution : proposedSolution // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
