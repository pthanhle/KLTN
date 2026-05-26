// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'supplement_part_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$SupplementPartModel {

 String get id;@JsonKey(name: 'sku') String get sku; String get name;@JsonKey(name: 'unit_price') double get unitPrice; int get quantity;@JsonKey(name: 'stock_on_hand') int get stockOnHand;@JsonKey(name: 'estimated_arrival_date') DateTime? get estimatedArrivalDate;
/// Create a copy of SupplementPartModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SupplementPartModelCopyWith<SupplementPartModel> get copyWith => _$SupplementPartModelCopyWithImpl<SupplementPartModel>(this as SupplementPartModel, _$identity);

  /// Serializes this SupplementPartModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SupplementPartModel&&(identical(other.id, id) || other.id == id)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.name, name) || other.name == name)&&(identical(other.unitPrice, unitPrice) || other.unitPrice == unitPrice)&&(identical(other.quantity, quantity) || other.quantity == quantity)&&(identical(other.stockOnHand, stockOnHand) || other.stockOnHand == stockOnHand)&&(identical(other.estimatedArrivalDate, estimatedArrivalDate) || other.estimatedArrivalDate == estimatedArrivalDate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,sku,name,unitPrice,quantity,stockOnHand,estimatedArrivalDate);

@override
String toString() {
  return 'SupplementPartModel(id: $id, sku: $sku, name: $name, unitPrice: $unitPrice, quantity: $quantity, stockOnHand: $stockOnHand, estimatedArrivalDate: $estimatedArrivalDate)';
}


}

/// @nodoc
abstract mixin class $SupplementPartModelCopyWith<$Res>  {
  factory $SupplementPartModelCopyWith(SupplementPartModel value, $Res Function(SupplementPartModel) _then) = _$SupplementPartModelCopyWithImpl;
@useResult
$Res call({
 String id,@JsonKey(name: 'sku') String sku, String name,@JsonKey(name: 'unit_price') double unitPrice, int quantity,@JsonKey(name: 'stock_on_hand') int stockOnHand,@JsonKey(name: 'estimated_arrival_date') DateTime? estimatedArrivalDate
});




}
/// @nodoc
class _$SupplementPartModelCopyWithImpl<$Res>
    implements $SupplementPartModelCopyWith<$Res> {
  _$SupplementPartModelCopyWithImpl(this._self, this._then);

  final SupplementPartModel _self;
  final $Res Function(SupplementPartModel) _then;

/// Create a copy of SupplementPartModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? sku = null,Object? name = null,Object? unitPrice = null,Object? quantity = null,Object? stockOnHand = null,Object? estimatedArrivalDate = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,sku: null == sku ? _self.sku : sku // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,unitPrice: null == unitPrice ? _self.unitPrice : unitPrice // ignore: cast_nullable_to_non_nullable
as double,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as int,stockOnHand: null == stockOnHand ? _self.stockOnHand : stockOnHand // ignore: cast_nullable_to_non_nullable
as int,estimatedArrivalDate: freezed == estimatedArrivalDate ? _self.estimatedArrivalDate : estimatedArrivalDate // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [SupplementPartModel].
extension SupplementPartModelPatterns on SupplementPartModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SupplementPartModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SupplementPartModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SupplementPartModel value)  $default,){
final _that = this;
switch (_that) {
case _SupplementPartModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SupplementPartModel value)?  $default,){
final _that = this;
switch (_that) {
case _SupplementPartModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'sku')  String sku,  String name, @JsonKey(name: 'unit_price')  double unitPrice,  int quantity, @JsonKey(name: 'stock_on_hand')  int stockOnHand, @JsonKey(name: 'estimated_arrival_date')  DateTime? estimatedArrivalDate)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SupplementPartModel() when $default != null:
return $default(_that.id,_that.sku,_that.name,_that.unitPrice,_that.quantity,_that.stockOnHand,_that.estimatedArrivalDate);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id, @JsonKey(name: 'sku')  String sku,  String name, @JsonKey(name: 'unit_price')  double unitPrice,  int quantity, @JsonKey(name: 'stock_on_hand')  int stockOnHand, @JsonKey(name: 'estimated_arrival_date')  DateTime? estimatedArrivalDate)  $default,) {final _that = this;
switch (_that) {
case _SupplementPartModel():
return $default(_that.id,_that.sku,_that.name,_that.unitPrice,_that.quantity,_that.stockOnHand,_that.estimatedArrivalDate);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id, @JsonKey(name: 'sku')  String sku,  String name, @JsonKey(name: 'unit_price')  double unitPrice,  int quantity, @JsonKey(name: 'stock_on_hand')  int stockOnHand, @JsonKey(name: 'estimated_arrival_date')  DateTime? estimatedArrivalDate)?  $default,) {final _that = this;
switch (_that) {
case _SupplementPartModel() when $default != null:
return $default(_that.id,_that.sku,_that.name,_that.unitPrice,_that.quantity,_that.stockOnHand,_that.estimatedArrivalDate);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SupplementPartModel implements SupplementPartModel {
  const _SupplementPartModel({required this.id, @JsonKey(name: 'sku') required this.sku, required this.name, @JsonKey(name: 'unit_price') required this.unitPrice, required this.quantity, @JsonKey(name: 'stock_on_hand') this.stockOnHand = 0, @JsonKey(name: 'estimated_arrival_date') this.estimatedArrivalDate});
  factory _SupplementPartModel.fromJson(Map<String, dynamic> json) => _$SupplementPartModelFromJson(json);

@override final  String id;
@override@JsonKey(name: 'sku') final  String sku;
@override final  String name;
@override@JsonKey(name: 'unit_price') final  double unitPrice;
@override final  int quantity;
@override@JsonKey(name: 'stock_on_hand') final  int stockOnHand;
@override@JsonKey(name: 'estimated_arrival_date') final  DateTime? estimatedArrivalDate;

/// Create a copy of SupplementPartModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SupplementPartModelCopyWith<_SupplementPartModel> get copyWith => __$SupplementPartModelCopyWithImpl<_SupplementPartModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SupplementPartModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SupplementPartModel&&(identical(other.id, id) || other.id == id)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.name, name) || other.name == name)&&(identical(other.unitPrice, unitPrice) || other.unitPrice == unitPrice)&&(identical(other.quantity, quantity) || other.quantity == quantity)&&(identical(other.stockOnHand, stockOnHand) || other.stockOnHand == stockOnHand)&&(identical(other.estimatedArrivalDate, estimatedArrivalDate) || other.estimatedArrivalDate == estimatedArrivalDate));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,sku,name,unitPrice,quantity,stockOnHand,estimatedArrivalDate);

@override
String toString() {
  return 'SupplementPartModel(id: $id, sku: $sku, name: $name, unitPrice: $unitPrice, quantity: $quantity, stockOnHand: $stockOnHand, estimatedArrivalDate: $estimatedArrivalDate)';
}


}

/// @nodoc
abstract mixin class _$SupplementPartModelCopyWith<$Res> implements $SupplementPartModelCopyWith<$Res> {
  factory _$SupplementPartModelCopyWith(_SupplementPartModel value, $Res Function(_SupplementPartModel) _then) = __$SupplementPartModelCopyWithImpl;
@override @useResult
$Res call({
 String id,@JsonKey(name: 'sku') String sku, String name,@JsonKey(name: 'unit_price') double unitPrice, int quantity,@JsonKey(name: 'stock_on_hand') int stockOnHand,@JsonKey(name: 'estimated_arrival_date') DateTime? estimatedArrivalDate
});




}
/// @nodoc
class __$SupplementPartModelCopyWithImpl<$Res>
    implements _$SupplementPartModelCopyWith<$Res> {
  __$SupplementPartModelCopyWithImpl(this._self, this._then);

  final _SupplementPartModel _self;
  final $Res Function(_SupplementPartModel) _then;

/// Create a copy of SupplementPartModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? sku = null,Object? name = null,Object? unitPrice = null,Object? quantity = null,Object? stockOnHand = null,Object? estimatedArrivalDate = freezed,}) {
  return _then(_SupplementPartModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,sku: null == sku ? _self.sku : sku // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,unitPrice: null == unitPrice ? _self.unitPrice : unitPrice // ignore: cast_nullable_to_non_nullable
as double,quantity: null == quantity ? _self.quantity : quantity // ignore: cast_nullable_to_non_nullable
as int,stockOnHand: null == stockOnHand ? _self.stockOnHand : stockOnHand // ignore: cast_nullable_to_non_nullable
as int,estimatedArrivalDate: freezed == estimatedArrivalDate ? _self.estimatedArrivalDate : estimatedArrivalDate // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
