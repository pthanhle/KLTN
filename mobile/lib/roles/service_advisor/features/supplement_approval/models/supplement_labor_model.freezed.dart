// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'supplement_labor_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SupplementLaborModel {

 String get id;@JsonKey(name: 'labor_code') String get laborCode; String get description;@JsonKey(name: 'unit_price') double get unitPrice; double get quantity;
/// Create a copy of SupplementLaborModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SupplementLaborModelCopyWith<SupplementLaborModel> get copyWith => _$SupplementLaborModelCopyWithImpl<SupplementLaborModel>(this as SupplementLaborModel, _$identity);

  /// Serializes this SupplementLaborModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SupplementLaborModel&&(identical(other.id, id) || other.id == id)&&(identical(other.laborCode, laborCode) || other.laborCode == laborCode)&&(identical(other.description, description) || other.description == description)&&(identical(other.unitPrice, unitPrice) || other.unitPrice == unitPrice)&&(identical(other.quantity, quantity) || other.quantity == quantity));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,laborCode,description,unitPrice,quantity);

@override
String toString() {
  return 'SupplementLaborModel(id: $id, laborCode: $laborCode, description: $description, unitPrice: $unitPrice, quantity: $quantity)';
}


}

/// @nodoc
abstract mixin class $SupplementLaborModelCopyWith<$Res>  {
  factory $SupplementLaborModelCopyWith(SupplementLaborModel value, $Res Function(SupplementLaborModel) _then) = _$SupplementLaborModelCopyWithImpl;
@useResult
$Res call({
 String id,@JsonKey(name: 'labor_code') String laborCode, String description,@JsonKey(name: 'unit_price') double unitPrice, double quantity
});




}
/// @nodoc
class _$SupplementLaborModelCopyWithImpl<$Res>
    implements $SupplementLaborModelCopyWith<$Res> {
  _$SupplementLaborModelCopyWithImpl(this._self, this._then);

  final SupplementLaborModel _self;
  final $Res Function(SupplementLaborModel) _then;

/// Create a copy of SupplementLaborModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? laborCode = null,Object? description = null,Object? unitPrice = null,Object? quantity = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,laborCode: null == laborCode ? _self.laborCode : laborCode // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,unitPrice: null == unitPrice ? _self.unitPrice : unitPrice // ignore: cast_nullable_to_non_nullable
as double,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

}


/// Adds pattern-matching-related methods to [SupplementLaborModel].
extension SupplementLaborModelPatterns on SupplementLaborModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SupplementLaborModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SupplementLaborModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SupplementLaborModel value)  $default,){
final _that = this;
switch (_that) {
case _SupplementLaborModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SupplementLaborModel value)?  $default,){
final _that = this;
switch (_that) {
case _SupplementLaborModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String description, @JsonKey(name: 'unit_price')  double unitPrice,  double quantity)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SupplementLaborModel() when $default != null:
return $default(_that.id,_that.laborCode,_that.description,_that.unitPrice,_that.quantity);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String description, @JsonKey(name: 'unit_price')  double unitPrice,  double quantity)  $default,) {final _that = this;
switch (_that) {
case _SupplementLaborModel():
return $default(_that.id,_that.laborCode,_that.description,_that.unitPrice,_that.quantity);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id, @JsonKey(name: 'labor_code')  String laborCode,  String description, @JsonKey(name: 'unit_price')  double unitPrice,  double quantity)?  $default,) {final _that = this;
switch (_that) {
case _SupplementLaborModel() when $default != null:
return $default(_that.id,_that.laborCode,_that.description,_that.unitPrice,_that.quantity);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SupplementLaborModel implements SupplementLaborModel {
  const _SupplementLaborModel({required this.id, @JsonKey(name: 'labor_code') required this.laborCode, required this.description, @JsonKey(name: 'unit_price') required this.unitPrice, required this.quantity});
  factory _SupplementLaborModel.fromJson(Map<String, dynamic> json) => _$SupplementLaborModelFromJson(json);

@override final  String id;
@override@JsonKey(name: 'labor_code') final  String laborCode;
@override final  String description;
@override@JsonKey(name: 'unit_price') final  double unitPrice;
@override final  double quantity;

/// Create a copy of SupplementLaborModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SupplementLaborModelCopyWith<_SupplementLaborModel> get copyWith => __$SupplementLaborModelCopyWithImpl<_SupplementLaborModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SupplementLaborModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SupplementLaborModel&&(identical(other.id, id) || other.id == id)&&(identical(other.laborCode, laborCode) || other.laborCode == laborCode)&&(identical(other.description, description) || other.description == description)&&(identical(other.unitPrice, unitPrice) || other.unitPrice == unitPrice)&&(identical(other.quantity, quantity) || other.quantity == quantity));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,laborCode,description,unitPrice,quantity);

@override
String toString() {
  return 'SupplementLaborModel(id: $id, laborCode: $laborCode, description: $description, unitPrice: $unitPrice, quantity: $quantity)';
}


}

/// @nodoc
abstract mixin class _$SupplementLaborModelCopyWith<$Res> implements $SupplementLaborModelCopyWith<$Res> {
  factory _$SupplementLaborModelCopyWith(_SupplementLaborModel value, $Res Function(_SupplementLaborModel) _then) = __$SupplementLaborModelCopyWithImpl;
@override @useResult
$Res call({
 String id,@JsonKey(name: 'labor_code') String laborCode, String description,@JsonKey(name: 'unit_price') double unitPrice, double quantity
});




}
/// @nodoc
class __$SupplementLaborModelCopyWithImpl<$Res>
    implements _$SupplementLaborModelCopyWith<$Res> {
  __$SupplementLaborModelCopyWithImpl(this._self, this._then);

  final _SupplementLaborModel _self;
  final $Res Function(_SupplementLaborModel) _then;

/// Create a copy of SupplementLaborModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? laborCode = null,Object? description = null,Object? unitPrice = null,Object? quantity = null,}) {
  return _then(_SupplementLaborModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,laborCode: null == laborCode ? _self.laborCode : laborCode // ignore: cast_nullable_to_non_nullable
as String,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String,unitPrice: null == unitPrice ? _self.unitPrice : unitPrice // ignore: cast_nullable_to_non_nullable
as double,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as double,
  ));
}


}

// dart format on
