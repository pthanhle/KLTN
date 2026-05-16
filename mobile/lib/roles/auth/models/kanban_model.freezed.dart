// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'kanban_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$KanbanModel {

 List<TaskModel> get todo; List<TaskModel> get inProgress; List<TaskModel> get done;
/// Create a copy of KanbanModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$KanbanModelCopyWith<KanbanModel> get copyWith => _$KanbanModelCopyWithImpl<KanbanModel>(this as KanbanModel, _$identity);

  /// Serializes this KanbanModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is KanbanModel&&const DeepCollectionEquality().equals(other.todo, todo)&&const DeepCollectionEquality().equals(other.inProgress, inProgress)&&const DeepCollectionEquality().equals(other.done, done));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(todo),const DeepCollectionEquality().hash(inProgress),const DeepCollectionEquality().hash(done));

@override
String toString() {
  return 'KanbanModel(todo: $todo, inProgress: $inProgress, done: $done)';
}


}

/// @nodoc
abstract mixin class $KanbanModelCopyWith<$Res>  {
  factory $KanbanModelCopyWith(KanbanModel value, $Res Function(KanbanModel) _then) = _$KanbanModelCopyWithImpl;
@useResult
$Res call({
 List<TaskModel> todo, List<TaskModel> inProgress, List<TaskModel> done
});




}
/// @nodoc
class _$KanbanModelCopyWithImpl<$Res>
    implements $KanbanModelCopyWith<$Res> {
  _$KanbanModelCopyWithImpl(this._self, this._then);

  final KanbanModel _self;
  final $Res Function(KanbanModel) _then;

/// Create a copy of KanbanModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? todo = null,Object? inProgress = null,Object? done = null,}) {
  return _then(_self.copyWith(
todo: null == todo ? _self.todo : todo // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,inProgress: null == inProgress ? _self.inProgress : inProgress // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,done: null == done ? _self.done : done // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,
  ));
}

}


/// Adds pattern-matching-related methods to [KanbanModel].
extension KanbanModelPatterns on KanbanModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _KanbanModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _KanbanModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _KanbanModel value)  $default,){
final _that = this;
switch (_that) {
case _KanbanModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _KanbanModel value)?  $default,){
final _that = this;
switch (_that) {
case _KanbanModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( List<TaskModel> todo,  List<TaskModel> inProgress,  List<TaskModel> done)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _KanbanModel() when $default != null:
return $default(_that.todo,_that.inProgress,_that.done);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( List<TaskModel> todo,  List<TaskModel> inProgress,  List<TaskModel> done)  $default,) {final _that = this;
switch (_that) {
case _KanbanModel():
return $default(_that.todo,_that.inProgress,_that.done);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( List<TaskModel> todo,  List<TaskModel> inProgress,  List<TaskModel> done)?  $default,) {final _that = this;
switch (_that) {
case _KanbanModel() when $default != null:
return $default(_that.todo,_that.inProgress,_that.done);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _KanbanModel extends KanbanModel {
  const _KanbanModel({final  List<TaskModel> todo = const [], final  List<TaskModel> inProgress = const [], final  List<TaskModel> done = const []}): _todo = todo,_inProgress = inProgress,_done = done,super._();
  factory _KanbanModel.fromJson(Map<String, dynamic> json) => _$KanbanModelFromJson(json);

 final  List<TaskModel> _todo;
@override@JsonKey() List<TaskModel> get todo {
  if (_todo is EqualUnmodifiableListView) return _todo;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_todo);
}

 final  List<TaskModel> _inProgress;
@override@JsonKey() List<TaskModel> get inProgress {
  if (_inProgress is EqualUnmodifiableListView) return _inProgress;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_inProgress);
}

 final  List<TaskModel> _done;
@override@JsonKey() List<TaskModel> get done {
  if (_done is EqualUnmodifiableListView) return _done;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_done);
}


/// Create a copy of KanbanModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$KanbanModelCopyWith<_KanbanModel> get copyWith => __$KanbanModelCopyWithImpl<_KanbanModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$KanbanModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _KanbanModel&&const DeepCollectionEquality().equals(other._todo, _todo)&&const DeepCollectionEquality().equals(other._inProgress, _inProgress)&&const DeepCollectionEquality().equals(other._done, _done));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_todo),const DeepCollectionEquality().hash(_inProgress),const DeepCollectionEquality().hash(_done));

@override
String toString() {
  return 'KanbanModel(todo: $todo, inProgress: $inProgress, done: $done)';
}


}

/// @nodoc
abstract mixin class _$KanbanModelCopyWith<$Res> implements $KanbanModelCopyWith<$Res> {
  factory _$KanbanModelCopyWith(_KanbanModel value, $Res Function(_KanbanModel) _then) = __$KanbanModelCopyWithImpl;
@override @useResult
$Res call({
 List<TaskModel> todo, List<TaskModel> inProgress, List<TaskModel> done
});




}
/// @nodoc
class __$KanbanModelCopyWithImpl<$Res>
    implements _$KanbanModelCopyWith<$Res> {
  __$KanbanModelCopyWithImpl(this._self, this._then);

  final _KanbanModel _self;
  final $Res Function(_KanbanModel) _then;

/// Create a copy of KanbanModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? todo = null,Object? inProgress = null,Object? done = null,}) {
  return _then(_KanbanModel(
todo: null == todo ? _self._todo : todo // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,inProgress: null == inProgress ? _self._inProgress : inProgress // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,done: null == done ? _self._done : done // ignore: cast_nullable_to_non_nullable
as List<TaskModel>,
  ));
}


}

// dart format on
