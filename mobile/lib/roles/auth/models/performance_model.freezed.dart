// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'performance_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$PerformanceModel {

 KpiModel? get kpis; KanbanModel? get kanban;
/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PerformanceModelCopyWith<PerformanceModel> get copyWith => _$PerformanceModelCopyWithImpl<PerformanceModel>(this as PerformanceModel, _$identity);

  /// Serializes this PerformanceModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PerformanceModel&&(identical(other.kpis, kpis) || other.kpis == kpis)&&(identical(other.kanban, kanban) || other.kanban == kanban));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,kpis,kanban);

@override
String toString() {
  return 'PerformanceModel(kpis: $kpis, kanban: $kanban)';
}


}

/// @nodoc
abstract mixin class $PerformanceModelCopyWith<$Res>  {
  factory $PerformanceModelCopyWith(PerformanceModel value, $Res Function(PerformanceModel) _then) = _$PerformanceModelCopyWithImpl;
@useResult
$Res call({
 KpiModel? kpis, KanbanModel? kanban
});


$KpiModelCopyWith<$Res>? get kpis;$KanbanModelCopyWith<$Res>? get kanban;

}
/// @nodoc
class _$PerformanceModelCopyWithImpl<$Res>
    implements $PerformanceModelCopyWith<$Res> {
  _$PerformanceModelCopyWithImpl(this._self, this._then);

  final PerformanceModel _self;
  final $Res Function(PerformanceModel) _then;

/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? kpis = freezed,Object? kanban = freezed,}) {
  return _then(_self.copyWith(
kpis: freezed == kpis ? _self.kpis : kpis // ignore: cast_nullable_to_non_nullable
as KpiModel?,kanban: freezed == kanban ? _self.kanban : kanban // ignore: cast_nullable_to_non_nullable
as KanbanModel?,
  ));
}
/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$KpiModelCopyWith<$Res>? get kpis {
    if (_self.kpis == null) {
    return null;
  }

  return $KpiModelCopyWith<$Res>(_self.kpis!, (value) {
    return _then(_self.copyWith(kpis: value));
  });
}/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$KanbanModelCopyWith<$Res>? get kanban {
    if (_self.kanban == null) {
    return null;
  }

  return $KanbanModelCopyWith<$Res>(_self.kanban!, (value) {
    return _then(_self.copyWith(kanban: value));
  });
}
}


/// Adds pattern-matching-related methods to [PerformanceModel].
extension PerformanceModelPatterns on PerformanceModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _PerformanceModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _PerformanceModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _PerformanceModel value)  $default,){
final _that = this;
switch (_that) {
case _PerformanceModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _PerformanceModel value)?  $default,){
final _that = this;
switch (_that) {
case _PerformanceModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( KpiModel? kpis,  KanbanModel? kanban)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _PerformanceModel() when $default != null:
return $default(_that.kpis,_that.kanban);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( KpiModel? kpis,  KanbanModel? kanban)  $default,) {final _that = this;
switch (_that) {
case _PerformanceModel():
return $default(_that.kpis,_that.kanban);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( KpiModel? kpis,  KanbanModel? kanban)?  $default,) {final _that = this;
switch (_that) {
case _PerformanceModel() when $default != null:
return $default(_that.kpis,_that.kanban);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _PerformanceModel extends PerformanceModel {
  const _PerformanceModel({this.kpis, this.kanban}): super._();
  factory _PerformanceModel.fromJson(Map<String, dynamic> json) => _$PerformanceModelFromJson(json);

@override final  KpiModel? kpis;
@override final  KanbanModel? kanban;

/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PerformanceModelCopyWith<_PerformanceModel> get copyWith => __$PerformanceModelCopyWithImpl<_PerformanceModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PerformanceModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _PerformanceModel&&(identical(other.kpis, kpis) || other.kpis == kpis)&&(identical(other.kanban, kanban) || other.kanban == kanban));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,kpis,kanban);

@override
String toString() {
  return 'PerformanceModel(kpis: $kpis, kanban: $kanban)';
}


}

/// @nodoc
abstract mixin class _$PerformanceModelCopyWith<$Res> implements $PerformanceModelCopyWith<$Res> {
  factory _$PerformanceModelCopyWith(_PerformanceModel value, $Res Function(_PerformanceModel) _then) = __$PerformanceModelCopyWithImpl;
@override @useResult
$Res call({
 KpiModel? kpis, KanbanModel? kanban
});


@override $KpiModelCopyWith<$Res>? get kpis;@override $KanbanModelCopyWith<$Res>? get kanban;

}
/// @nodoc
class __$PerformanceModelCopyWithImpl<$Res>
    implements _$PerformanceModelCopyWith<$Res> {
  __$PerformanceModelCopyWithImpl(this._self, this._then);

  final _PerformanceModel _self;
  final $Res Function(_PerformanceModel) _then;

/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? kpis = freezed,Object? kanban = freezed,}) {
  return _then(_PerformanceModel(
kpis: freezed == kpis ? _self.kpis : kpis // ignore: cast_nullable_to_non_nullable
as KpiModel?,kanban: freezed == kanban ? _self.kanban : kanban // ignore: cast_nullable_to_non_nullable
as KanbanModel?,
  ));
}

/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$KpiModelCopyWith<$Res>? get kpis {
    if (_self.kpis == null) {
    return null;
  }

  return $KpiModelCopyWith<$Res>(_self.kpis!, (value) {
    return _then(_self.copyWith(kpis: value));
  });
}/// Create a copy of PerformanceModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$KanbanModelCopyWith<$Res>? get kanban {
    if (_self.kanban == null) {
    return null;
  }

  return $KanbanModelCopyWith<$Res>(_self.kanban!, (value) {
    return _then(_self.copyWith(kanban: value));
  });
}
}

// dart format on
