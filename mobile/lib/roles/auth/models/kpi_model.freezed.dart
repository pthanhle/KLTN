// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'kpi_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$RevenueMetric {

 double get current; double get target;
/// Create a copy of RevenueMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$RevenueMetricCopyWith<RevenueMetric> get copyWith => _$RevenueMetricCopyWithImpl<RevenueMetric>(this as RevenueMetric, _$identity);

  /// Serializes this RevenueMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is RevenueMetric&&(identical(other.current, current) || other.current == current)&&(identical(other.target, target) || other.target == target));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,current,target);

@override
String toString() {
  return 'RevenueMetric(current: $current, target: $target)';
}


}

/// @nodoc
abstract mixin class $RevenueMetricCopyWith<$Res>  {
  factory $RevenueMetricCopyWith(RevenueMetric value, $Res Function(RevenueMetric) _then) = _$RevenueMetricCopyWithImpl;
@useResult
$Res call({
 double current, double target
});




}
/// @nodoc
class _$RevenueMetricCopyWithImpl<$Res>
    implements $RevenueMetricCopyWith<$Res> {
  _$RevenueMetricCopyWithImpl(this._self, this._then);

  final RevenueMetric _self;
  final $Res Function(RevenueMetric) _then;

/// Create a copy of RevenueMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? current = null,Object? target = null,}) {
  return _then(_self.copyWith(
current: null == current ? _self.current : current // ignore: cast_nullable_to_non_nullable
as double,target: null == target ? _self.target : target // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [RevenueMetric].
extension RevenueMetricPatterns on RevenueMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _RevenueMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _RevenueMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _RevenueMetric value)  $default,){
final _that = this;
switch (_that) {
case _RevenueMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _RevenueMetric value)?  $default,){
final _that = this;
switch (_that) {
case _RevenueMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double current,  double target)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _RevenueMetric() when $default != null:
return $default(_that.current,_that.target);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double current,  double target)  $default,) {final _that = this;
switch (_that) {
case _RevenueMetric():
return $default(_that.current,_that.target);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double current,  double target)?  $default,) {final _that = this;
switch (_that) {
case _RevenueMetric() when $default != null:
return $default(_that.current,_that.target);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _RevenueMetric implements RevenueMetric {
  const _RevenueMetric({required this.current, required this.target});
  factory _RevenueMetric.fromJson(Map<String, dynamic> json) => _$RevenueMetricFromJson(json);

@override final  double current;
@override final  double target;

/// Create a copy of RevenueMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$RevenueMetricCopyWith<_RevenueMetric> get copyWith => __$RevenueMetricCopyWithImpl<_RevenueMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$RevenueMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _RevenueMetric&&(identical(other.current, current) || other.current == current)&&(identical(other.target, target) || other.target == target));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,current,target);

@override
String toString() {
  return 'RevenueMetric(current: $current, target: $target)';
}


}

/// @nodoc
abstract mixin class _$RevenueMetricCopyWith<$Res> implements $RevenueMetricCopyWith<$Res> {
  factory _$RevenueMetricCopyWith(_RevenueMetric value, $Res Function(_RevenueMetric) _then) = __$RevenueMetricCopyWithImpl;
@override @useResult
$Res call({
 double current, double target
});




}
/// @nodoc
class __$RevenueMetricCopyWithImpl<$Res>
    implements _$RevenueMetricCopyWith<$Res> {
  __$RevenueMetricCopyWithImpl(this._self, this._then);

  final _RevenueMetric _self;
  final $Res Function(_RevenueMetric) _then;

/// Create a copy of RevenueMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? current = null,Object? target = null,}) {
  return _then(_RevenueMetric(
current: null == current ? _self.current : current // ignore: cast_nullable_to_non_nullable
as double,target: null == target ? _self.target : target // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$CsatMetric {

 double get score; int get totalReviews; String? get percentile;
/// Create a copy of CsatMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CsatMetricCopyWith<CsatMetric> get copyWith => _$CsatMetricCopyWithImpl<CsatMetric>(this as CsatMetric, _$identity);

  /// Serializes this CsatMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CsatMetric&&(identical(other.score, score) || other.score == score)&&(identical(other.totalReviews, totalReviews) || other.totalReviews == totalReviews)&&(identical(other.percentile, percentile) || other.percentile == percentile));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,score,totalReviews,percentile);

@override
String toString() {
  return 'CsatMetric(score: $score, totalReviews: $totalReviews, percentile: $percentile)';
}


}

/// @nodoc
abstract mixin class $CsatMetricCopyWith<$Res>  {
  factory $CsatMetricCopyWith(CsatMetric value, $Res Function(CsatMetric) _then) = _$CsatMetricCopyWithImpl;
@useResult
$Res call({
 double score, int totalReviews, String? percentile
});




}
/// @nodoc
class _$CsatMetricCopyWithImpl<$Res>
    implements $CsatMetricCopyWith<$Res> {
  _$CsatMetricCopyWithImpl(this._self, this._then);

  final CsatMetric _self;
  final $Res Function(CsatMetric) _then;

/// Create a copy of CsatMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? score = null,Object? totalReviews = null,Object? percentile = freezed,}) {
  return _then(_self.copyWith(
score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,totalReviews: null == totalReviews ? _self.totalReviews : totalReviews // ignore: cast_nullable_to_non_nullable
as int,percentile: freezed == percentile ? _self.percentile : percentile // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [CsatMetric].
extension CsatMetricPatterns on CsatMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _CsatMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _CsatMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _CsatMetric value)  $default,){
final _that = this;
switch (_that) {
case _CsatMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _CsatMetric value)?  $default,){
final _that = this;
switch (_that) {
case _CsatMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double score,  int totalReviews,  String? percentile)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _CsatMetric() when $default != null:
return $default(_that.score,_that.totalReviews,_that.percentile);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double score,  int totalReviews,  String? percentile)  $default,) {final _that = this;
switch (_that) {
case _CsatMetric():
return $default(_that.score,_that.totalReviews,_that.percentile);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double score,  int totalReviews,  String? percentile)?  $default,) {final _that = this;
switch (_that) {
case _CsatMetric() when $default != null:
return $default(_that.score,_that.totalReviews,_that.percentile);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _CsatMetric implements CsatMetric {
  const _CsatMetric({required this.score, required this.totalReviews, this.percentile});
  factory _CsatMetric.fromJson(Map<String, dynamic> json) => _$CsatMetricFromJson(json);

@override final  double score;
@override final  int totalReviews;
@override final  String? percentile;

/// Create a copy of CsatMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CsatMetricCopyWith<_CsatMetric> get copyWith => __$CsatMetricCopyWithImpl<_CsatMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CsatMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _CsatMetric&&(identical(other.score, score) || other.score == score)&&(identical(other.totalReviews, totalReviews) || other.totalReviews == totalReviews)&&(identical(other.percentile, percentile) || other.percentile == percentile));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,score,totalReviews,percentile);

@override
String toString() {
  return 'CsatMetric(score: $score, totalReviews: $totalReviews, percentile: $percentile)';
}


}

/// @nodoc
abstract mixin class _$CsatMetricCopyWith<$Res> implements $CsatMetricCopyWith<$Res> {
  factory _$CsatMetricCopyWith(_CsatMetric value, $Res Function(_CsatMetric) _then) = __$CsatMetricCopyWithImpl;
@override @useResult
$Res call({
 double score, int totalReviews, String? percentile
});




}
/// @nodoc
class __$CsatMetricCopyWithImpl<$Res>
    implements _$CsatMetricCopyWith<$Res> {
  __$CsatMetricCopyWithImpl(this._self, this._then);

  final _CsatMetric _self;
  final $Res Function(_CsatMetric) _then;

/// Create a copy of CsatMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? score = null,Object? totalReviews = null,Object? percentile = freezed,}) {
  return _then(_CsatMetric(
score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,totalReviews: null == totalReviews ? _self.totalReviews : totalReviews // ignore: cast_nullable_to_non_nullable
as int,percentile: freezed == percentile ? _self.percentile : percentile // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}


/// @nodoc
mixin _$EfficiencyMetric {

 double get billed; double get clocked; double get rate;
/// Create a copy of EfficiencyMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$EfficiencyMetricCopyWith<EfficiencyMetric> get copyWith => _$EfficiencyMetricCopyWithImpl<EfficiencyMetric>(this as EfficiencyMetric, _$identity);

  /// Serializes this EfficiencyMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is EfficiencyMetric&&(identical(other.billed, billed) || other.billed == billed)&&(identical(other.clocked, clocked) || other.clocked == clocked)&&(identical(other.rate, rate) || other.rate == rate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,billed,clocked,rate);

@override
String toString() {
  return 'EfficiencyMetric(billed: $billed, clocked: $clocked, rate: $rate)';
}


}

/// @nodoc
abstract mixin class $EfficiencyMetricCopyWith<$Res>  {
  factory $EfficiencyMetricCopyWith(EfficiencyMetric value, $Res Function(EfficiencyMetric) _then) = _$EfficiencyMetricCopyWithImpl;
@useResult
$Res call({
 double billed, double clocked, double rate
});




}
/// @nodoc
class _$EfficiencyMetricCopyWithImpl<$Res>
    implements $EfficiencyMetricCopyWith<$Res> {
  _$EfficiencyMetricCopyWithImpl(this._self, this._then);

  final EfficiencyMetric _self;
  final $Res Function(EfficiencyMetric) _then;

/// Create a copy of EfficiencyMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? billed = null,Object? clocked = null,Object? rate = null,}) {
  return _then(_self.copyWith(
billed: null == billed ? _self.billed : billed // ignore: cast_nullable_to_non_nullable
as double,clocked: null == clocked ? _self.clocked : clocked // ignore: cast_nullable_to_non_nullable
as double,rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [EfficiencyMetric].
extension EfficiencyMetricPatterns on EfficiencyMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _EfficiencyMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _EfficiencyMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _EfficiencyMetric value)  $default,){
final _that = this;
switch (_that) {
case _EfficiencyMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _EfficiencyMetric value)?  $default,){
final _that = this;
switch (_that) {
case _EfficiencyMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double billed,  double clocked,  double rate)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _EfficiencyMetric() when $default != null:
return $default(_that.billed,_that.clocked,_that.rate);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double billed,  double clocked,  double rate)  $default,) {final _that = this;
switch (_that) {
case _EfficiencyMetric():
return $default(_that.billed,_that.clocked,_that.rate);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double billed,  double clocked,  double rate)?  $default,) {final _that = this;
switch (_that) {
case _EfficiencyMetric() when $default != null:
return $default(_that.billed,_that.clocked,_that.rate);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _EfficiencyMetric implements EfficiencyMetric {
  const _EfficiencyMetric({required this.billed, required this.clocked, required this.rate});
  factory _EfficiencyMetric.fromJson(Map<String, dynamic> json) => _$EfficiencyMetricFromJson(json);

@override final  double billed;
@override final  double clocked;
@override final  double rate;

/// Create a copy of EfficiencyMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$EfficiencyMetricCopyWith<_EfficiencyMetric> get copyWith => __$EfficiencyMetricCopyWithImpl<_EfficiencyMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$EfficiencyMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _EfficiencyMetric&&(identical(other.billed, billed) || other.billed == billed)&&(identical(other.clocked, clocked) || other.clocked == clocked)&&(identical(other.rate, rate) || other.rate == rate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,billed,clocked,rate);

@override
String toString() {
  return 'EfficiencyMetric(billed: $billed, clocked: $clocked, rate: $rate)';
}


}

/// @nodoc
abstract mixin class _$EfficiencyMetricCopyWith<$Res> implements $EfficiencyMetricCopyWith<$Res> {
  factory _$EfficiencyMetricCopyWith(_EfficiencyMetric value, $Res Function(_EfficiencyMetric) _then) = __$EfficiencyMetricCopyWithImpl;
@override @useResult
$Res call({
 double billed, double clocked, double rate
});




}
/// @nodoc
class __$EfficiencyMetricCopyWithImpl<$Res>
    implements _$EfficiencyMetricCopyWith<$Res> {
  __$EfficiencyMetricCopyWithImpl(this._self, this._then);

  final _EfficiencyMetric _self;
  final $Res Function(_EfficiencyMetric) _then;

/// Create a copy of EfficiencyMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? billed = null,Object? clocked = null,Object? rate = null,}) {
  return _then(_EfficiencyMetric(
billed: null == billed ? _self.billed : billed // ignore: cast_nullable_to_non_nullable
as double,clocked: null == clocked ? _self.clocked : clocked // ignore: cast_nullable_to_non_nullable
as double,rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$ReworkMetric {

 double get rate; double get trend;
/// Create a copy of ReworkMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ReworkMetricCopyWith<ReworkMetric> get copyWith => _$ReworkMetricCopyWithImpl<ReworkMetric>(this as ReworkMetric, _$identity);

  /// Serializes this ReworkMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ReworkMetric&&(identical(other.rate, rate) || other.rate == rate)&&(identical(other.trend, trend) || other.trend == trend));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rate,trend);

@override
String toString() {
  return 'ReworkMetric(rate: $rate, trend: $trend)';
}


}

/// @nodoc
abstract mixin class $ReworkMetricCopyWith<$Res>  {
  factory $ReworkMetricCopyWith(ReworkMetric value, $Res Function(ReworkMetric) _then) = _$ReworkMetricCopyWithImpl;
@useResult
$Res call({
 double rate, double trend
});




}
/// @nodoc
class _$ReworkMetricCopyWithImpl<$Res>
    implements $ReworkMetricCopyWith<$Res> {
  _$ReworkMetricCopyWithImpl(this._self, this._then);

  final ReworkMetric _self;
  final $Res Function(ReworkMetric) _then;

/// Create a copy of ReworkMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? rate = null,Object? trend = null,}) {
  return _then(_self.copyWith(
rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,trend: null == trend ? _self.trend : trend // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [ReworkMetric].
extension ReworkMetricPatterns on ReworkMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ReworkMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ReworkMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ReworkMetric value)  $default,){
final _that = this;
switch (_that) {
case _ReworkMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ReworkMetric value)?  $default,){
final _that = this;
switch (_that) {
case _ReworkMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double rate,  double trend)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ReworkMetric() when $default != null:
return $default(_that.rate,_that.trend);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double rate,  double trend)  $default,) {final _that = this;
switch (_that) {
case _ReworkMetric():
return $default(_that.rate,_that.trend);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double rate,  double trend)?  $default,) {final _that = this;
switch (_that) {
case _ReworkMetric() when $default != null:
return $default(_that.rate,_that.trend);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ReworkMetric implements ReworkMetric {
  const _ReworkMetric({required this.rate, required this.trend});
  factory _ReworkMetric.fromJson(Map<String, dynamic> json) => _$ReworkMetricFromJson(json);

@override final  double rate;
@override final  double trend;

/// Create a copy of ReworkMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ReworkMetricCopyWith<_ReworkMetric> get copyWith => __$ReworkMetricCopyWithImpl<_ReworkMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ReworkMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ReworkMetric&&(identical(other.rate, rate) || other.rate == rate)&&(identical(other.trend, trend) || other.trend == trend));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rate,trend);

@override
String toString() {
  return 'ReworkMetric(rate: $rate, trend: $trend)';
}


}

/// @nodoc
abstract mixin class _$ReworkMetricCopyWith<$Res> implements $ReworkMetricCopyWith<$Res> {
  factory _$ReworkMetricCopyWith(_ReworkMetric value, $Res Function(_ReworkMetric) _then) = __$ReworkMetricCopyWithImpl;
@override @useResult
$Res call({
 double rate, double trend
});




}
/// @nodoc
class __$ReworkMetricCopyWithImpl<$Res>
    implements _$ReworkMetricCopyWith<$Res> {
  __$ReworkMetricCopyWithImpl(this._self, this._then);

  final _ReworkMetric _self;
  final $Res Function(_ReworkMetric) _then;

/// Create a copy of ReworkMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? rate = null,Object? trend = null,}) {
  return _then(_ReworkMetric(
rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,trend: null == trend ? _self.trend : trend // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$ValueMetric {

 double get score; double get target;
/// Create a copy of ValueMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ValueMetricCopyWith<ValueMetric> get copyWith => _$ValueMetricCopyWithImpl<ValueMetric>(this as ValueMetric, _$identity);

  /// Serializes this ValueMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ValueMetric&&(identical(other.score, score) || other.score == score)&&(identical(other.target, target) || other.target == target));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,score,target);

@override
String toString() {
  return 'ValueMetric(score: $score, target: $target)';
}


}

/// @nodoc
abstract mixin class $ValueMetricCopyWith<$Res>  {
  factory $ValueMetricCopyWith(ValueMetric value, $Res Function(ValueMetric) _then) = _$ValueMetricCopyWithImpl;
@useResult
$Res call({
 double score, double target
});




}
/// @nodoc
class _$ValueMetricCopyWithImpl<$Res>
    implements $ValueMetricCopyWith<$Res> {
  _$ValueMetricCopyWithImpl(this._self, this._then);

  final ValueMetric _self;
  final $Res Function(ValueMetric) _then;

/// Create a copy of ValueMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? score = null,Object? target = null,}) {
  return _then(_self.copyWith(
score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,target: null == target ? _self.target : target // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [ValueMetric].
extension ValueMetricPatterns on ValueMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ValueMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ValueMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ValueMetric value)  $default,){
final _that = this;
switch (_that) {
case _ValueMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ValueMetric value)?  $default,){
final _that = this;
switch (_that) {
case _ValueMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double score,  double target)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ValueMetric() when $default != null:
return $default(_that.score,_that.target);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double score,  double target)  $default,) {final _that = this;
switch (_that) {
case _ValueMetric():
return $default(_that.score,_that.target);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double score,  double target)?  $default,) {final _that = this;
switch (_that) {
case _ValueMetric() when $default != null:
return $default(_that.score,_that.target);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ValueMetric implements ValueMetric {
  const _ValueMetric({required this.score, required this.target});
  factory _ValueMetric.fromJson(Map<String, dynamic> json) => _$ValueMetricFromJson(json);

@override final  double score;
@override final  double target;

/// Create a copy of ValueMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ValueMetricCopyWith<_ValueMetric> get copyWith => __$ValueMetricCopyWithImpl<_ValueMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ValueMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ValueMetric&&(identical(other.score, score) || other.score == score)&&(identical(other.target, target) || other.target == target));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,score,target);

@override
String toString() {
  return 'ValueMetric(score: $score, target: $target)';
}


}

/// @nodoc
abstract mixin class _$ValueMetricCopyWith<$Res> implements $ValueMetricCopyWith<$Res> {
  factory _$ValueMetricCopyWith(_ValueMetric value, $Res Function(_ValueMetric) _then) = __$ValueMetricCopyWithImpl;
@override @useResult
$Res call({
 double score, double target
});




}
/// @nodoc
class __$ValueMetricCopyWithImpl<$Res>
    implements _$ValueMetricCopyWith<$Res> {
  __$ValueMetricCopyWithImpl(this._self, this._then);

  final _ValueMetric _self;
  final $Res Function(_ValueMetric) _then;

/// Create a copy of ValueMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? score = null,Object? target = null,}) {
  return _then(_ValueMetric(
score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,target: null == target ? _self.target : target // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$TimeMetric {

 double get time; String get unit;
/// Create a copy of TimeMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$TimeMetricCopyWith<TimeMetric> get copyWith => _$TimeMetricCopyWithImpl<TimeMetric>(this as TimeMetric, _$identity);

  /// Serializes this TimeMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TimeMetric&&(identical(other.time, time) || other.time == time)&&(identical(other.unit, unit) || other.unit == unit));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,time,unit);

@override
String toString() {
  return 'TimeMetric(time: $time, unit: $unit)';
}


}

/// @nodoc
abstract mixin class $TimeMetricCopyWith<$Res>  {
  factory $TimeMetricCopyWith(TimeMetric value, $Res Function(TimeMetric) _then) = _$TimeMetricCopyWithImpl;
@useResult
$Res call({
 double time, String unit
});




}
/// @nodoc
class _$TimeMetricCopyWithImpl<$Res>
    implements $TimeMetricCopyWith<$Res> {
  _$TimeMetricCopyWithImpl(this._self, this._then);

  final TimeMetric _self;
  final $Res Function(TimeMetric) _then;

/// Create a copy of TimeMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? time = null,Object? unit = null,}) {
  return _then(_self.copyWith(
time: null == time ? _self.time : time // ignore: cast_nullable_to_non_nullable
as double,unit: null == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [TimeMetric].
extension TimeMetricPatterns on TimeMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _TimeMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _TimeMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _TimeMetric value)  $default,){
final _that = this;
switch (_that) {
case _TimeMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _TimeMetric value)?  $default,){
final _that = this;
switch (_that) {
case _TimeMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double time,  String unit)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _TimeMetric() when $default != null:
return $default(_that.time,_that.unit);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double time,  String unit)  $default,) {final _that = this;
switch (_that) {
case _TimeMetric():
return $default(_that.time,_that.unit);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double time,  String unit)?  $default,) {final _that = this;
switch (_that) {
case _TimeMetric() when $default != null:
return $default(_that.time,_that.unit);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _TimeMetric implements TimeMetric {
  const _TimeMetric({required this.time, required this.unit});
  factory _TimeMetric.fromJson(Map<String, dynamic> json) => _$TimeMetricFromJson(json);

@override final  double time;
@override final  String unit;

/// Create a copy of TimeMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$TimeMetricCopyWith<_TimeMetric> get copyWith => __$TimeMetricCopyWithImpl<_TimeMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$TimeMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _TimeMetric&&(identical(other.time, time) || other.time == time)&&(identical(other.unit, unit) || other.unit == unit));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,time,unit);

@override
String toString() {
  return 'TimeMetric(time: $time, unit: $unit)';
}


}

/// @nodoc
abstract mixin class _$TimeMetricCopyWith<$Res> implements $TimeMetricCopyWith<$Res> {
  factory _$TimeMetricCopyWith(_TimeMetric value, $Res Function(_TimeMetric) _then) = __$TimeMetricCopyWithImpl;
@override @useResult
$Res call({
 double time, String unit
});




}
/// @nodoc
class __$TimeMetricCopyWithImpl<$Res>
    implements _$TimeMetricCopyWith<$Res> {
  __$TimeMetricCopyWithImpl(this._self, this._then);

  final _TimeMetric _self;
  final $Res Function(_TimeMetric) _then;

/// Create a copy of TimeMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? time = null,Object? unit = null,}) {
  return _then(_TimeMetric(
time: null == time ? _self.time : time // ignore: cast_nullable_to_non_nullable
as double,unit: null == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$RateMetric {

 double get rate;
/// Create a copy of RateMetric
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$RateMetricCopyWith<RateMetric> get copyWith => _$RateMetricCopyWithImpl<RateMetric>(this as RateMetric, _$identity);

  /// Serializes this RateMetric to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is RateMetric&&(identical(other.rate, rate) || other.rate == rate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rate);

@override
String toString() {
  return 'RateMetric(rate: $rate)';
}


}

/// @nodoc
abstract mixin class $RateMetricCopyWith<$Res>  {
  factory $RateMetricCopyWith(RateMetric value, $Res Function(RateMetric) _then) = _$RateMetricCopyWithImpl;
@useResult
$Res call({
 double rate
});




}
/// @nodoc
class _$RateMetricCopyWithImpl<$Res>
    implements $RateMetricCopyWith<$Res> {
  _$RateMetricCopyWithImpl(this._self, this._then);

  final RateMetric _self;
  final $Res Function(RateMetric) _then;

/// Create a copy of RateMetric
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? rate = null,}) {
  return _then(_self.copyWith(
rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [RateMetric].
extension RateMetricPatterns on RateMetric {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _RateMetric value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _RateMetric() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _RateMetric value)  $default,){
final _that = this;
switch (_that) {
case _RateMetric():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _RateMetric value)?  $default,){
final _that = this;
switch (_that) {
case _RateMetric() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( double rate)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _RateMetric() when $default != null:
return $default(_that.rate);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( double rate)  $default,) {final _that = this;
switch (_that) {
case _RateMetric():
return $default(_that.rate);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( double rate)?  $default,) {final _that = this;
switch (_that) {
case _RateMetric() when $default != null:
return $default(_that.rate);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _RateMetric implements RateMetric {
  const _RateMetric({required this.rate});
  factory _RateMetric.fromJson(Map<String, dynamic> json) => _$RateMetricFromJson(json);

@override final  double rate;

/// Create a copy of RateMetric
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$RateMetricCopyWith<_RateMetric> get copyWith => __$RateMetricCopyWithImpl<_RateMetric>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$RateMetricToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _RateMetric&&(identical(other.rate, rate) || other.rate == rate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,rate);

@override
String toString() {
  return 'RateMetric(rate: $rate)';
}


}

/// @nodoc
abstract mixin class _$RateMetricCopyWith<$Res> implements $RateMetricCopyWith<$Res> {
  factory _$RateMetricCopyWith(_RateMetric value, $Res Function(_RateMetric) _then) = __$RateMetricCopyWithImpl;
@override @useResult
$Res call({
 double rate
});




}
/// @nodoc
class __$RateMetricCopyWithImpl<$Res>
    implements _$RateMetricCopyWith<$Res> {
  __$RateMetricCopyWithImpl(this._self, this._then);

  final _RateMetric _self;
  final $Res Function(_RateMetric) _then;

/// Create a copy of RateMetric
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? rate = null,}) {
  return _then(_RateMetric(
rate: null == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}


/// @nodoc
mixin _$KpiModel {

 RevenueMetric? get revenue; CsatMetric? get csat; EfficiencyMetric? get efficiency; ReworkMetric? get rework; ValueMetric? get inventoryAccuracy; TimeMetric? get avgSla; TimeMetric? get transactionTime; RateMetric? get errorRate;
/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$KpiModelCopyWith<KpiModel> get copyWith => _$KpiModelCopyWithImpl<KpiModel>(this as KpiModel, _$identity);

  /// Serializes this KpiModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is KpiModel&&(identical(other.revenue, revenue) || other.revenue == revenue)&&(identical(other.csat, csat) || other.csat == csat)&&(identical(other.efficiency, efficiency) || other.efficiency == efficiency)&&(identical(other.rework, rework) || other.rework == rework)&&(identical(other.inventoryAccuracy, inventoryAccuracy) || other.inventoryAccuracy == inventoryAccuracy)&&(identical(other.avgSla, avgSla) || other.avgSla == avgSla)&&(identical(other.transactionTime, transactionTime) || other.transactionTime == transactionTime)&&(identical(other.errorRate, errorRate) || other.errorRate == errorRate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,revenue,csat,efficiency,rework,inventoryAccuracy,avgSla,transactionTime,errorRate);

@override
String toString() {
  return 'KpiModel(revenue: $revenue, csat: $csat, efficiency: $efficiency, rework: $rework, inventoryAccuracy: $inventoryAccuracy, avgSla: $avgSla, transactionTime: $transactionTime, errorRate: $errorRate)';
}


}

/// @nodoc
abstract mixin class $KpiModelCopyWith<$Res>  {
  factory $KpiModelCopyWith(KpiModel value, $Res Function(KpiModel) _then) = _$KpiModelCopyWithImpl;
@useResult
$Res call({
 RevenueMetric? revenue, CsatMetric? csat, EfficiencyMetric? efficiency, ReworkMetric? rework, ValueMetric? inventoryAccuracy, TimeMetric? avgSla, TimeMetric? transactionTime, RateMetric? errorRate
});


$RevenueMetricCopyWith<$Res>? get revenue;$CsatMetricCopyWith<$Res>? get csat;$EfficiencyMetricCopyWith<$Res>? get efficiency;$ReworkMetricCopyWith<$Res>? get rework;$ValueMetricCopyWith<$Res>? get inventoryAccuracy;$TimeMetricCopyWith<$Res>? get avgSla;$TimeMetricCopyWith<$Res>? get transactionTime;$RateMetricCopyWith<$Res>? get errorRate;

}
/// @nodoc
class _$KpiModelCopyWithImpl<$Res>
    implements $KpiModelCopyWith<$Res> {
  _$KpiModelCopyWithImpl(this._self, this._then);

  final KpiModel _self;
  final $Res Function(KpiModel) _then;

/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? revenue = freezed,Object? csat = freezed,Object? efficiency = freezed,Object? rework = freezed,Object? inventoryAccuracy = freezed,Object? avgSla = freezed,Object? transactionTime = freezed,Object? errorRate = freezed,}) {
  return _then(_self.copyWith(
revenue: freezed == revenue ? _self.revenue : revenue // ignore: cast_nullable_to_non_nullable
as RevenueMetric?,csat: freezed == csat ? _self.csat : csat // ignore: cast_nullable_to_non_nullable
as CsatMetric?,efficiency: freezed == efficiency ? _self.efficiency : efficiency // ignore: cast_nullable_to_non_nullable
as EfficiencyMetric?,rework: freezed == rework ? _self.rework : rework // ignore: cast_nullable_to_non_nullable
as ReworkMetric?,inventoryAccuracy: freezed == inventoryAccuracy ? _self.inventoryAccuracy : inventoryAccuracy // ignore: cast_nullable_to_non_nullable
as ValueMetric?,avgSla: freezed == avgSla ? _self.avgSla : avgSla // ignore: cast_nullable_to_non_nullable
as TimeMetric?,transactionTime: freezed == transactionTime ? _self.transactionTime : transactionTime // ignore: cast_nullable_to_non_nullable
as TimeMetric?,errorRate: freezed == errorRate ? _self.errorRate : errorRate // ignore: cast_nullable_to_non_nullable
as RateMetric?,
  ));
}
/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$RevenueMetricCopyWith<$Res>? get revenue {
    if (_self.revenue == null) {
    return null;
  }

  return $RevenueMetricCopyWith<$Res>(_self.revenue!, (value) {
    return _then(_self.copyWith(revenue: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CsatMetricCopyWith<$Res>? get csat {
    if (_self.csat == null) {
    return null;
  }

  return $CsatMetricCopyWith<$Res>(_self.csat!, (value) {
    return _then(_self.copyWith(csat: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$EfficiencyMetricCopyWith<$Res>? get efficiency {
    if (_self.efficiency == null) {
    return null;
  }

  return $EfficiencyMetricCopyWith<$Res>(_self.efficiency!, (value) {
    return _then(_self.copyWith(efficiency: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ReworkMetricCopyWith<$Res>? get rework {
    if (_self.rework == null) {
    return null;
  }

  return $ReworkMetricCopyWith<$Res>(_self.rework!, (value) {
    return _then(_self.copyWith(rework: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ValueMetricCopyWith<$Res>? get inventoryAccuracy {
    if (_self.inventoryAccuracy == null) {
    return null;
  }

  return $ValueMetricCopyWith<$Res>(_self.inventoryAccuracy!, (value) {
    return _then(_self.copyWith(inventoryAccuracy: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TimeMetricCopyWith<$Res>? get avgSla {
    if (_self.avgSla == null) {
    return null;
  }

  return $TimeMetricCopyWith<$Res>(_self.avgSla!, (value) {
    return _then(_self.copyWith(avgSla: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TimeMetricCopyWith<$Res>? get transactionTime {
    if (_self.transactionTime == null) {
    return null;
  }

  return $TimeMetricCopyWith<$Res>(_self.transactionTime!, (value) {
    return _then(_self.copyWith(transactionTime: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$RateMetricCopyWith<$Res>? get errorRate {
    if (_self.errorRate == null) {
    return null;
  }

  return $RateMetricCopyWith<$Res>(_self.errorRate!, (value) {
    return _then(_self.copyWith(errorRate: value));
  });
}
}


/// Adds pattern-matching-related methods to [KpiModel].
extension KpiModelPatterns on KpiModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _KpiModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _KpiModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _KpiModel value)  $default,){
final _that = this;
switch (_that) {
case _KpiModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _KpiModel value)?  $default,){
final _that = this;
switch (_that) {
case _KpiModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( RevenueMetric? revenue,  CsatMetric? csat,  EfficiencyMetric? efficiency,  ReworkMetric? rework,  ValueMetric? inventoryAccuracy,  TimeMetric? avgSla,  TimeMetric? transactionTime,  RateMetric? errorRate)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _KpiModel() when $default != null:
return $default(_that.revenue,_that.csat,_that.efficiency,_that.rework,_that.inventoryAccuracy,_that.avgSla,_that.transactionTime,_that.errorRate);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( RevenueMetric? revenue,  CsatMetric? csat,  EfficiencyMetric? efficiency,  ReworkMetric? rework,  ValueMetric? inventoryAccuracy,  TimeMetric? avgSla,  TimeMetric? transactionTime,  RateMetric? errorRate)  $default,) {final _that = this;
switch (_that) {
case _KpiModel():
return $default(_that.revenue,_that.csat,_that.efficiency,_that.rework,_that.inventoryAccuracy,_that.avgSla,_that.transactionTime,_that.errorRate);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( RevenueMetric? revenue,  CsatMetric? csat,  EfficiencyMetric? efficiency,  ReworkMetric? rework,  ValueMetric? inventoryAccuracy,  TimeMetric? avgSla,  TimeMetric? transactionTime,  RateMetric? errorRate)?  $default,) {final _that = this;
switch (_that) {
case _KpiModel() when $default != null:
return $default(_that.revenue,_that.csat,_that.efficiency,_that.rework,_that.inventoryAccuracy,_that.avgSla,_that.transactionTime,_that.errorRate);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _KpiModel extends KpiModel {
  const _KpiModel({this.revenue, this.csat, this.efficiency, this.rework, this.inventoryAccuracy, this.avgSla, this.transactionTime, this.errorRate}): super._();
  factory _KpiModel.fromJson(Map<String, dynamic> json) => _$KpiModelFromJson(json);

@override final  RevenueMetric? revenue;
@override final  CsatMetric? csat;
@override final  EfficiencyMetric? efficiency;
@override final  ReworkMetric? rework;
@override final  ValueMetric? inventoryAccuracy;
@override final  TimeMetric? avgSla;
@override final  TimeMetric? transactionTime;
@override final  RateMetric? errorRate;

/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$KpiModelCopyWith<_KpiModel> get copyWith => __$KpiModelCopyWithImpl<_KpiModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$KpiModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _KpiModel&&(identical(other.revenue, revenue) || other.revenue == revenue)&&(identical(other.csat, csat) || other.csat == csat)&&(identical(other.efficiency, efficiency) || other.efficiency == efficiency)&&(identical(other.rework, rework) || other.rework == rework)&&(identical(other.inventoryAccuracy, inventoryAccuracy) || other.inventoryAccuracy == inventoryAccuracy)&&(identical(other.avgSla, avgSla) || other.avgSla == avgSla)&&(identical(other.transactionTime, transactionTime) || other.transactionTime == transactionTime)&&(identical(other.errorRate, errorRate) || other.errorRate == errorRate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,revenue,csat,efficiency,rework,inventoryAccuracy,avgSla,transactionTime,errorRate);

@override
String toString() {
  return 'KpiModel(revenue: $revenue, csat: $csat, efficiency: $efficiency, rework: $rework, inventoryAccuracy: $inventoryAccuracy, avgSla: $avgSla, transactionTime: $transactionTime, errorRate: $errorRate)';
}


}

/// @nodoc
abstract mixin class _$KpiModelCopyWith<$Res> implements $KpiModelCopyWith<$Res> {
  factory _$KpiModelCopyWith(_KpiModel value, $Res Function(_KpiModel) _then) = __$KpiModelCopyWithImpl;
@override @useResult
$Res call({
 RevenueMetric? revenue, CsatMetric? csat, EfficiencyMetric? efficiency, ReworkMetric? rework, ValueMetric? inventoryAccuracy, TimeMetric? avgSla, TimeMetric? transactionTime, RateMetric? errorRate
});


@override $RevenueMetricCopyWith<$Res>? get revenue;@override $CsatMetricCopyWith<$Res>? get csat;@override $EfficiencyMetricCopyWith<$Res>? get efficiency;@override $ReworkMetricCopyWith<$Res>? get rework;@override $ValueMetricCopyWith<$Res>? get inventoryAccuracy;@override $TimeMetricCopyWith<$Res>? get avgSla;@override $TimeMetricCopyWith<$Res>? get transactionTime;@override $RateMetricCopyWith<$Res>? get errorRate;

}
/// @nodoc
class __$KpiModelCopyWithImpl<$Res>
    implements _$KpiModelCopyWith<$Res> {
  __$KpiModelCopyWithImpl(this._self, this._then);

  final _KpiModel _self;
  final $Res Function(_KpiModel) _then;

/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? revenue = freezed,Object? csat = freezed,Object? efficiency = freezed,Object? rework = freezed,Object? inventoryAccuracy = freezed,Object? avgSla = freezed,Object? transactionTime = freezed,Object? errorRate = freezed,}) {
  return _then(_KpiModel(
revenue: freezed == revenue ? _self.revenue : revenue // ignore: cast_nullable_to_non_nullable
as RevenueMetric?,csat: freezed == csat ? _self.csat : csat // ignore: cast_nullable_to_non_nullable
as CsatMetric?,efficiency: freezed == efficiency ? _self.efficiency : efficiency // ignore: cast_nullable_to_non_nullable
as EfficiencyMetric?,rework: freezed == rework ? _self.rework : rework // ignore: cast_nullable_to_non_nullable
as ReworkMetric?,inventoryAccuracy: freezed == inventoryAccuracy ? _self.inventoryAccuracy : inventoryAccuracy // ignore: cast_nullable_to_non_nullable
as ValueMetric?,avgSla: freezed == avgSla ? _self.avgSla : avgSla // ignore: cast_nullable_to_non_nullable
as TimeMetric?,transactionTime: freezed == transactionTime ? _self.transactionTime : transactionTime // ignore: cast_nullable_to_non_nullable
as TimeMetric?,errorRate: freezed == errorRate ? _self.errorRate : errorRate // ignore: cast_nullable_to_non_nullable
as RateMetric?,
  ));
}

/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$RevenueMetricCopyWith<$Res>? get revenue {
    if (_self.revenue == null) {
    return null;
  }

  return $RevenueMetricCopyWith<$Res>(_self.revenue!, (value) {
    return _then(_self.copyWith(revenue: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CsatMetricCopyWith<$Res>? get csat {
    if (_self.csat == null) {
    return null;
  }

  return $CsatMetricCopyWith<$Res>(_self.csat!, (value) {
    return _then(_self.copyWith(csat: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$EfficiencyMetricCopyWith<$Res>? get efficiency {
    if (_self.efficiency == null) {
    return null;
  }

  return $EfficiencyMetricCopyWith<$Res>(_self.efficiency!, (value) {
    return _then(_self.copyWith(efficiency: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ReworkMetricCopyWith<$Res>? get rework {
    if (_self.rework == null) {
    return null;
  }

  return $ReworkMetricCopyWith<$Res>(_self.rework!, (value) {
    return _then(_self.copyWith(rework: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ValueMetricCopyWith<$Res>? get inventoryAccuracy {
    if (_self.inventoryAccuracy == null) {
    return null;
  }

  return $ValueMetricCopyWith<$Res>(_self.inventoryAccuracy!, (value) {
    return _then(_self.copyWith(inventoryAccuracy: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TimeMetricCopyWith<$Res>? get avgSla {
    if (_self.avgSla == null) {
    return null;
  }

  return $TimeMetricCopyWith<$Res>(_self.avgSla!, (value) {
    return _then(_self.copyWith(avgSla: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TimeMetricCopyWith<$Res>? get transactionTime {
    if (_self.transactionTime == null) {
    return null;
  }

  return $TimeMetricCopyWith<$Res>(_self.transactionTime!, (value) {
    return _then(_self.copyWith(transactionTime: value));
  });
}/// Create a copy of KpiModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$RateMetricCopyWith<$Res>? get errorRate {
    if (_self.errorRate == null) {
    return null;
  }

  return $RateMetricCopyWith<$Res>(_self.errorRate!, (value) {
    return _then(_self.copyWith(errorRate: value));
  });
}
}

// dart format on
