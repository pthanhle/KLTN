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

@JsonKey(name: 'booking_code') String get bookingCode;@JsonKey(name: 'task_id') String get taskId;@JsonKey(name: 'issue_title') String get issueTitle;@JsonKey(name: 'technician_note') String get technicianNote;@JsonKey(name: 'action_required') String get actionRequired;@JsonKey(name: 'evidence_media_urls') List<String> get evidenceMediaUrls; String get status;
/// Create a copy of SupplementRequestModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SupplementRequestModelCopyWith<SupplementRequestModel> get copyWith => _$SupplementRequestModelCopyWithImpl<SupplementRequestModel>(this as SupplementRequestModel, _$identity);

  /// Serializes this SupplementRequestModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SupplementRequestModel&&(identical(other.bookingCode, bookingCode) || other.bookingCode == bookingCode)&&(identical(other.taskId, taskId) || other.taskId == taskId)&&(identical(other.issueTitle, issueTitle) || other.issueTitle == issueTitle)&&(identical(other.technicianNote, technicianNote) || other.technicianNote == technicianNote)&&(identical(other.actionRequired, actionRequired) || other.actionRequired == actionRequired)&&const DeepCollectionEquality().equals(other.evidenceMediaUrls, evidenceMediaUrls)&&(identical(other.status, status) || other.status == status));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,bookingCode,taskId,issueTitle,technicianNote,actionRequired,const DeepCollectionEquality().hash(evidenceMediaUrls),status);

@override
String toString() {
  return 'SupplementRequestModel(bookingCode: $bookingCode, taskId: $taskId, issueTitle: $issueTitle, technicianNote: $technicianNote, actionRequired: $actionRequired, evidenceMediaUrls: $evidenceMediaUrls, status: $status)';
}


}

/// @nodoc
abstract mixin class $SupplementRequestModelCopyWith<$Res>  {
  factory $SupplementRequestModelCopyWith(SupplementRequestModel value, $Res Function(SupplementRequestModel) _then) = _$SupplementRequestModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'booking_code') String bookingCode,@JsonKey(name: 'task_id') String taskId,@JsonKey(name: 'issue_title') String issueTitle,@JsonKey(name: 'technician_note') String technicianNote,@JsonKey(name: 'action_required') String actionRequired,@JsonKey(name: 'evidence_media_urls') List<String> evidenceMediaUrls, String status
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
@pragma('vm:prefer-inline') @override $Res call({Object? bookingCode = null,Object? taskId = null,Object? issueTitle = null,Object? technicianNote = null,Object? actionRequired = null,Object? evidenceMediaUrls = null,Object? status = null,}) {
  return _then(_self.copyWith(
bookingCode: null == bookingCode ? _self.bookingCode : bookingCode // ignore: cast_nullable_to_non_nullable
as String,taskId: null == taskId ? _self.taskId : taskId // ignore: cast_nullable_to_non_nullable
as String,issueTitle: null == issueTitle ? _self.issueTitle : issueTitle // ignore: cast_nullable_to_non_nullable
as String,technicianNote: null == technicianNote ? _self.technicianNote : technicianNote // ignore: cast_nullable_to_non_nullable
as String,actionRequired: null == actionRequired ? _self.actionRequired : actionRequired // ignore: cast_nullable_to_non_nullable
as String,evidenceMediaUrls: null == evidenceMediaUrls ? _self.evidenceMediaUrls : evidenceMediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'booking_code')  String bookingCode, @JsonKey(name: 'task_id')  String taskId, @JsonKey(name: 'issue_title')  String issueTitle, @JsonKey(name: 'technician_note')  String technicianNote, @JsonKey(name: 'action_required')  String actionRequired, @JsonKey(name: 'evidence_media_urls')  List<String> evidenceMediaUrls,  String status)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
return $default(_that.bookingCode,_that.taskId,_that.issueTitle,_that.technicianNote,_that.actionRequired,_that.evidenceMediaUrls,_that.status);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'booking_code')  String bookingCode, @JsonKey(name: 'task_id')  String taskId, @JsonKey(name: 'issue_title')  String issueTitle, @JsonKey(name: 'technician_note')  String technicianNote, @JsonKey(name: 'action_required')  String actionRequired, @JsonKey(name: 'evidence_media_urls')  List<String> evidenceMediaUrls,  String status)  $default,) {final _that = this;
switch (_that) {
case _SupplementRequestModel():
return $default(_that.bookingCode,_that.taskId,_that.issueTitle,_that.technicianNote,_that.actionRequired,_that.evidenceMediaUrls,_that.status);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'booking_code')  String bookingCode, @JsonKey(name: 'task_id')  String taskId, @JsonKey(name: 'issue_title')  String issueTitle, @JsonKey(name: 'technician_note')  String technicianNote, @JsonKey(name: 'action_required')  String actionRequired, @JsonKey(name: 'evidence_media_urls')  List<String> evidenceMediaUrls,  String status)?  $default,) {final _that = this;
switch (_that) {
case _SupplementRequestModel() when $default != null:
return $default(_that.bookingCode,_that.taskId,_that.issueTitle,_that.technicianNote,_that.actionRequired,_that.evidenceMediaUrls,_that.status);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SupplementRequestModel extends SupplementRequestModel {
  const _SupplementRequestModel({@JsonKey(name: 'booking_code') required this.bookingCode, @JsonKey(name: 'task_id') required this.taskId, @JsonKey(name: 'issue_title') required this.issueTitle, @JsonKey(name: 'technician_note') required this.technicianNote, @JsonKey(name: 'action_required') required this.actionRequired, @JsonKey(name: 'evidence_media_urls') final  List<String> evidenceMediaUrls = const [], this.status = 'PENDING'}): _evidenceMediaUrls = evidenceMediaUrls,super._();
  factory _SupplementRequestModel.fromJson(Map<String, dynamic> json) => _$SupplementRequestModelFromJson(json);

@override@JsonKey(name: 'booking_code') final  String bookingCode;
@override@JsonKey(name: 'task_id') final  String taskId;
@override@JsonKey(name: 'issue_title') final  String issueTitle;
@override@JsonKey(name: 'technician_note') final  String technicianNote;
@override@JsonKey(name: 'action_required') final  String actionRequired;
 final  List<String> _evidenceMediaUrls;
@override@JsonKey(name: 'evidence_media_urls') List<String> get evidenceMediaUrls {
  if (_evidenceMediaUrls is EqualUnmodifiableListView) return _evidenceMediaUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_evidenceMediaUrls);
}

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
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SupplementRequestModel&&(identical(other.bookingCode, bookingCode) || other.bookingCode == bookingCode)&&(identical(other.taskId, taskId) || other.taskId == taskId)&&(identical(other.issueTitle, issueTitle) || other.issueTitle == issueTitle)&&(identical(other.technicianNote, technicianNote) || other.technicianNote == technicianNote)&&(identical(other.actionRequired, actionRequired) || other.actionRequired == actionRequired)&&const DeepCollectionEquality().equals(other._evidenceMediaUrls, _evidenceMediaUrls)&&(identical(other.status, status) || other.status == status));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,bookingCode,taskId,issueTitle,technicianNote,actionRequired,const DeepCollectionEquality().hash(_evidenceMediaUrls),status);

@override
String toString() {
  return 'SupplementRequestModel(bookingCode: $bookingCode, taskId: $taskId, issueTitle: $issueTitle, technicianNote: $technicianNote, actionRequired: $actionRequired, evidenceMediaUrls: $evidenceMediaUrls, status: $status)';
}


}

/// @nodoc
abstract mixin class _$SupplementRequestModelCopyWith<$Res> implements $SupplementRequestModelCopyWith<$Res> {
  factory _$SupplementRequestModelCopyWith(_SupplementRequestModel value, $Res Function(_SupplementRequestModel) _then) = __$SupplementRequestModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'booking_code') String bookingCode,@JsonKey(name: 'task_id') String taskId,@JsonKey(name: 'issue_title') String issueTitle,@JsonKey(name: 'technician_note') String technicianNote,@JsonKey(name: 'action_required') String actionRequired,@JsonKey(name: 'evidence_media_urls') List<String> evidenceMediaUrls, String status
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
@override @pragma('vm:prefer-inline') $Res call({Object? bookingCode = null,Object? taskId = null,Object? issueTitle = null,Object? technicianNote = null,Object? actionRequired = null,Object? evidenceMediaUrls = null,Object? status = null,}) {
  return _then(_SupplementRequestModel(
bookingCode: null == bookingCode ? _self.bookingCode : bookingCode // ignore: cast_nullable_to_non_nullable
as String,taskId: null == taskId ? _self.taskId : taskId // ignore: cast_nullable_to_non_nullable
as String,issueTitle: null == issueTitle ? _self.issueTitle : issueTitle // ignore: cast_nullable_to_non_nullable
as String,technicianNote: null == technicianNote ? _self.technicianNote : technicianNote // ignore: cast_nullable_to_non_nullable
as String,actionRequired: null == actionRequired ? _self.actionRequired : actionRequired // ignore: cast_nullable_to_non_nullable
as String,evidenceMediaUrls: null == evidenceMediaUrls ? _self._evidenceMediaUrls : evidenceMediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}

// dart format on
