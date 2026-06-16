// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'tech_task_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$TechTaskModel {

 String get id; String get plate; String get model; String get bay; String get startTime; String get endTime; String get role; TechTaskUrgency get urgency; TechTaskStatus get status; String? get bookingDate; String? get bookingCode; int? get sequenceNumber;
/// Create a copy of TechTaskModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$TechTaskModelCopyWith<TechTaskModel> get copyWith => _$TechTaskModelCopyWithImpl<TechTaskModel>(this as TechTaskModel, _$identity);

  /// Serializes this TechTaskModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TechTaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.plate, plate) || other.plate == plate)&&(identical(other.model, model) || other.model == model)&&(identical(other.bay, bay) || other.bay == bay)&&(identical(other.startTime, startTime) || other.startTime == startTime)&&(identical(other.endTime, endTime) || other.endTime == endTime)&&(identical(other.role, role) || other.role == role)&&(identical(other.urgency, urgency) || other.urgency == urgency)&&(identical(other.status, status) || other.status == status)&&(identical(other.bookingDate, bookingDate) || other.bookingDate == bookingDate)&&(identical(other.bookingCode, bookingCode) || other.bookingCode == bookingCode)&&(identical(other.sequenceNumber, sequenceNumber) || other.sequenceNumber == sequenceNumber));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,plate,model,bay,startTime,endTime,role,urgency,status,bookingDate,bookingCode,sequenceNumber);

@override
String toString() {
  return 'TechTaskModel(id: $id, plate: $plate, model: $model, bay: $bay, startTime: $startTime, endTime: $endTime, role: $role, urgency: $urgency, status: $status, bookingDate: $bookingDate, bookingCode: $bookingCode, sequenceNumber: $sequenceNumber)';
}


}

/// @nodoc
abstract mixin class $TechTaskModelCopyWith<$Res>  {
  factory $TechTaskModelCopyWith(TechTaskModel value, $Res Function(TechTaskModel) _then) = _$TechTaskModelCopyWithImpl;
@useResult
$Res call({
 String id, String plate, String model, String bay, String startTime, String endTime, String role, TechTaskUrgency urgency, TechTaskStatus status, String? bookingDate, String? bookingCode, int? sequenceNumber
});




}
/// @nodoc
class _$TechTaskModelCopyWithImpl<$Res>
    implements $TechTaskModelCopyWith<$Res> {
  _$TechTaskModelCopyWithImpl(this._self, this._then);

  final TechTaskModel _self;
  final $Res Function(TechTaskModel) _then;

/// Create a copy of TechTaskModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? plate = null,Object? model = null,Object? bay = null,Object? startTime = null,Object? endTime = null,Object? role = null,Object? urgency = null,Object? status = null,Object? bookingDate = freezed,Object? bookingCode = freezed,Object? sequenceNumber = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,plate: null == plate ? _self.plate : plate // ignore: cast_nullable_to_non_nullable
as String,model: null == model ? _self.model : model // ignore: cast_nullable_to_non_nullable
as String,bay: null == bay ? _self.bay : bay // ignore: cast_nullable_to_non_nullable
as String,startTime: null == startTime ? _self.startTime : startTime // ignore: cast_nullable_to_non_nullable
as String,endTime: null == endTime ? _self.endTime : endTime // ignore: cast_nullable_to_non_nullable
as String,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,urgency: null == urgency ? _self.urgency : urgency // ignore: cast_nullable_to_non_nullable
as TechTaskUrgency,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as TechTaskStatus,bookingDate: freezed == bookingDate ? _self.bookingDate : bookingDate // ignore: cast_nullable_to_non_nullable
as String?,bookingCode: freezed == bookingCode ? _self.bookingCode : bookingCode // ignore: cast_nullable_to_non_nullable
as String?,sequenceNumber: freezed == sequenceNumber ? _self.sequenceNumber : sequenceNumber // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}

}


/// Adds pattern-matching-related methods to [TechTaskModel].
extension TechTaskModelPatterns on TechTaskModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _TechTaskModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _TechTaskModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _TechTaskModel value)  $default,){
final _that = this;
switch (_that) {
case _TechTaskModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _TechTaskModel value)?  $default,){
final _that = this;
switch (_that) {
case _TechTaskModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String plate,  String model,  String bay,  String startTime,  String endTime,  String role,  TechTaskUrgency urgency,  TechTaskStatus status,  String? bookingDate,  String? bookingCode,  int? sequenceNumber)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _TechTaskModel() when $default != null:
return $default(_that.id,_that.plate,_that.model,_that.bay,_that.startTime,_that.endTime,_that.role,_that.urgency,_that.status,_that.bookingDate,_that.bookingCode,_that.sequenceNumber);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String plate,  String model,  String bay,  String startTime,  String endTime,  String role,  TechTaskUrgency urgency,  TechTaskStatus status,  String? bookingDate,  String? bookingCode,  int? sequenceNumber)  $default,) {final _that = this;
switch (_that) {
case _TechTaskModel():
return $default(_that.id,_that.plate,_that.model,_that.bay,_that.startTime,_that.endTime,_that.role,_that.urgency,_that.status,_that.bookingDate,_that.bookingCode,_that.sequenceNumber);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String plate,  String model,  String bay,  String startTime,  String endTime,  String role,  TechTaskUrgency urgency,  TechTaskStatus status,  String? bookingDate,  String? bookingCode,  int? sequenceNumber)?  $default,) {final _that = this;
switch (_that) {
case _TechTaskModel() when $default != null:
return $default(_that.id,_that.plate,_that.model,_that.bay,_that.startTime,_that.endTime,_that.role,_that.urgency,_that.status,_that.bookingDate,_that.bookingCode,_that.sequenceNumber);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _TechTaskModel extends TechTaskModel {
  const _TechTaskModel({required this.id, required this.plate, required this.model, required this.bay, required this.startTime, required this.endTime, required this.role, required this.urgency, required this.status, this.bookingDate, this.bookingCode, this.sequenceNumber}): super._();
  factory _TechTaskModel.fromJson(Map<String, dynamic> json) => _$TechTaskModelFromJson(json);

@override final  String id;
@override final  String plate;
@override final  String model;
@override final  String bay;
@override final  String startTime;
@override final  String endTime;
@override final  String role;
@override final  TechTaskUrgency urgency;
@override final  TechTaskStatus status;
@override final  String? bookingDate;
@override final  String? bookingCode;
@override final  int? sequenceNumber;

/// Create a copy of TechTaskModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$TechTaskModelCopyWith<_TechTaskModel> get copyWith => __$TechTaskModelCopyWithImpl<_TechTaskModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$TechTaskModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _TechTaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.plate, plate) || other.plate == plate)&&(identical(other.model, model) || other.model == model)&&(identical(other.bay, bay) || other.bay == bay)&&(identical(other.startTime, startTime) || other.startTime == startTime)&&(identical(other.endTime, endTime) || other.endTime == endTime)&&(identical(other.role, role) || other.role == role)&&(identical(other.urgency, urgency) || other.urgency == urgency)&&(identical(other.status, status) || other.status == status)&&(identical(other.bookingDate, bookingDate) || other.bookingDate == bookingDate)&&(identical(other.bookingCode, bookingCode) || other.bookingCode == bookingCode)&&(identical(other.sequenceNumber, sequenceNumber) || other.sequenceNumber == sequenceNumber));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,plate,model,bay,startTime,endTime,role,urgency,status,bookingDate,bookingCode,sequenceNumber);

@override
String toString() {
  return 'TechTaskModel(id: $id, plate: $plate, model: $model, bay: $bay, startTime: $startTime, endTime: $endTime, role: $role, urgency: $urgency, status: $status, bookingDate: $bookingDate, bookingCode: $bookingCode, sequenceNumber: $sequenceNumber)';
}


}

/// @nodoc
abstract mixin class _$TechTaskModelCopyWith<$Res> implements $TechTaskModelCopyWith<$Res> {
  factory _$TechTaskModelCopyWith(_TechTaskModel value, $Res Function(_TechTaskModel) _then) = __$TechTaskModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String plate, String model, String bay, String startTime, String endTime, String role, TechTaskUrgency urgency, TechTaskStatus status, String? bookingDate, String? bookingCode, int? sequenceNumber
});




}
/// @nodoc
class __$TechTaskModelCopyWithImpl<$Res>
    implements _$TechTaskModelCopyWith<$Res> {
  __$TechTaskModelCopyWithImpl(this._self, this._then);

  final _TechTaskModel _self;
  final $Res Function(_TechTaskModel) _then;

/// Create a copy of TechTaskModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? plate = null,Object? model = null,Object? bay = null,Object? startTime = null,Object? endTime = null,Object? role = null,Object? urgency = null,Object? status = null,Object? bookingDate = freezed,Object? bookingCode = freezed,Object? sequenceNumber = freezed,}) {
  return _then(_TechTaskModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,plate: null == plate ? _self.plate : plate // ignore: cast_nullable_to_non_nullable
as String,model: null == model ? _self.model : model // ignore: cast_nullable_to_non_nullable
as String,bay: null == bay ? _self.bay : bay // ignore: cast_nullable_to_non_nullable
as String,startTime: null == startTime ? _self.startTime : startTime // ignore: cast_nullable_to_non_nullable
as String,endTime: null == endTime ? _self.endTime : endTime // ignore: cast_nullable_to_non_nullable
as String,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,urgency: null == urgency ? _self.urgency : urgency // ignore: cast_nullable_to_non_nullable
as TechTaskUrgency,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as TechTaskStatus,bookingDate: freezed == bookingDate ? _self.bookingDate : bookingDate // ignore: cast_nullable_to_non_nullable
as String?,bookingCode: freezed == bookingCode ? _self.bookingCode : bookingCode // ignore: cast_nullable_to_non_nullable
as String?,sequenceNumber: freezed == sequenceNumber ? _self.sequenceNumber : sequenceNumber // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}


}

// dart format on
