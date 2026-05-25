// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'mpi_item_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$MpiItemModel {

 String get id; String get name; MpiItemStatus get status; String? get note; List<String> get mediaUrls;
/// Create a copy of MpiItemModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$MpiItemModelCopyWith<MpiItemModel> get copyWith => _$MpiItemModelCopyWithImpl<MpiItemModel>(this as MpiItemModel, _$identity);

  /// Serializes this MpiItemModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is MpiItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.status, status) || other.status == status)&&(identical(other.note, note) || other.note == note)&&const DeepCollectionEquality().equals(other.mediaUrls, mediaUrls));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,status,note,const DeepCollectionEquality().hash(mediaUrls));

@override
String toString() {
  return 'MpiItemModel(id: $id, name: $name, status: $status, note: $note, mediaUrls: $mediaUrls)';
}


}

/// @nodoc
abstract mixin class $MpiItemModelCopyWith<$Res>  {
  factory $MpiItemModelCopyWith(MpiItemModel value, $Res Function(MpiItemModel) _then) = _$MpiItemModelCopyWithImpl;
@useResult
$Res call({
 String id, String name, MpiItemStatus status, String? note, List<String> mediaUrls
});




}
/// @nodoc
class _$MpiItemModelCopyWithImpl<$Res>
    implements $MpiItemModelCopyWith<$Res> {
  _$MpiItemModelCopyWithImpl(this._self, this._then);

  final MpiItemModel _self;
  final $Res Function(MpiItemModel) _then;

/// Create a copy of MpiItemModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? status = null,Object? note = freezed,Object? mediaUrls = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as MpiItemStatus,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,mediaUrls: null == mediaUrls ? _self.mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}

}


/// Adds pattern-matching-related methods to [MpiItemModel].
extension MpiItemModelPatterns on MpiItemModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _MpiItemModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _MpiItemModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _MpiItemModel value)  $default,){
final _that = this;
switch (_that) {
case _MpiItemModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _MpiItemModel value)?  $default,){
final _that = this;
switch (_that) {
case _MpiItemModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  MpiItemStatus status,  String? note,  List<String> mediaUrls)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _MpiItemModel() when $default != null:
return $default(_that.id,_that.name,_that.status,_that.note,_that.mediaUrls);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  MpiItemStatus status,  String? note,  List<String> mediaUrls)  $default,) {final _that = this;
switch (_that) {
case _MpiItemModel():
return $default(_that.id,_that.name,_that.status,_that.note,_that.mediaUrls);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  MpiItemStatus status,  String? note,  List<String> mediaUrls)?  $default,) {final _that = this;
switch (_that) {
case _MpiItemModel() when $default != null:
return $default(_that.id,_that.name,_that.status,_that.note,_that.mediaUrls);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _MpiItemModel extends MpiItemModel {
  const _MpiItemModel({required this.id, required this.name, this.status = MpiItemStatus.unchecked, this.note, final  List<String> mediaUrls = const []}): _mediaUrls = mediaUrls,super._();
  factory _MpiItemModel.fromJson(Map<String, dynamic> json) => _$MpiItemModelFromJson(json);

@override final  String id;
@override final  String name;
@override@JsonKey() final  MpiItemStatus status;
@override final  String? note;
 final  List<String> _mediaUrls;
@override@JsonKey() List<String> get mediaUrls {
  if (_mediaUrls is EqualUnmodifiableListView) return _mediaUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_mediaUrls);
}


/// Create a copy of MpiItemModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$MpiItemModelCopyWith<_MpiItemModel> get copyWith => __$MpiItemModelCopyWithImpl<_MpiItemModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$MpiItemModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _MpiItemModel&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.status, status) || other.status == status)&&(identical(other.note, note) || other.note == note)&&const DeepCollectionEquality().equals(other._mediaUrls, _mediaUrls));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,status,note,const DeepCollectionEquality().hash(_mediaUrls));

@override
String toString() {
  return 'MpiItemModel(id: $id, name: $name, status: $status, note: $note, mediaUrls: $mediaUrls)';
}


}

/// @nodoc
abstract mixin class _$MpiItemModelCopyWith<$Res> implements $MpiItemModelCopyWith<$Res> {
  factory _$MpiItemModelCopyWith(_MpiItemModel value, $Res Function(_MpiItemModel) _then) = __$MpiItemModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, MpiItemStatus status, String? note, List<String> mediaUrls
});




}
/// @nodoc
class __$MpiItemModelCopyWithImpl<$Res>
    implements _$MpiItemModelCopyWith<$Res> {
  __$MpiItemModelCopyWithImpl(this._self, this._then);

  final _MpiItemModel _self;
  final $Res Function(_MpiItemModel) _then;

/// Create a copy of MpiItemModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? status = null,Object? note = freezed,Object? mediaUrls = null,}) {
  return _then(_MpiItemModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as MpiItemStatus,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,mediaUrls: null == mediaUrls ? _self._mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}


}

// dart format on
