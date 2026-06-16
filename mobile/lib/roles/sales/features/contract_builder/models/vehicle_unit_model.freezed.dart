// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vehicle_unit_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$VehicleUnitModel {

@JsonKey(name: '_id') String get id;@JsonKey(readValue: _readCarId) String get carId; String? get vin;@JsonKey(name: 'engine_number') String? get engineNumber;@JsonKey(readValue: _readColor) String? get color;@JsonKey(name: 'model_year') int? get year; int? get odometer; String? get fuel; int? get seats; String get status; String? get condition;@JsonKey(readValue: _readSalePrice) num? get salePrice;@JsonKey(name: 'unit_code') String? get unitCode;
/// Create a copy of VehicleUnitModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VehicleUnitModelCopyWith<VehicleUnitModel> get copyWith => _$VehicleUnitModelCopyWithImpl<VehicleUnitModel>(this as VehicleUnitModel, _$identity);

  /// Serializes this VehicleUnitModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VehicleUnitModel&&(identical(other.id, id) || other.id == id)&&(identical(other.carId, carId) || other.carId == carId)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats)&&(identical(other.status, status) || other.status == status)&&(identical(other.condition, condition) || other.condition == condition)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.unitCode, unitCode) || other.unitCode == unitCode));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,carId,vin,engineNumber,color,year,odometer,fuel,seats,status,condition,salePrice,unitCode);

@override
String toString() {
  return 'VehicleUnitModel(id: $id, carId: $carId, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats, status: $status, condition: $condition, salePrice: $salePrice, unitCode: $unitCode)';
}


}

/// @nodoc
abstract mixin class $VehicleUnitModelCopyWith<$Res>  {
  factory $VehicleUnitModelCopyWith(VehicleUnitModel value, $Res Function(VehicleUnitModel) _then) = _$VehicleUnitModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: '_id') String id,@JsonKey(readValue: _readCarId) String carId, String? vin,@JsonKey(name: 'engine_number') String? engineNumber,@JsonKey(readValue: _readColor) String? color,@JsonKey(name: 'model_year') int? year, int? odometer, String? fuel, int? seats, String status, String? condition,@JsonKey(readValue: _readSalePrice) num? salePrice,@JsonKey(name: 'unit_code') String? unitCode
});




}
/// @nodoc
class _$VehicleUnitModelCopyWithImpl<$Res>
    implements $VehicleUnitModelCopyWith<$Res> {
  _$VehicleUnitModelCopyWithImpl(this._self, this._then);

  final VehicleUnitModel _self;
  final $Res Function(VehicleUnitModel) _then;

/// Create a copy of VehicleUnitModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? carId = null,Object? vin = freezed,Object? engineNumber = freezed,Object? color = freezed,Object? year = freezed,Object? odometer = freezed,Object? fuel = freezed,Object? seats = freezed,Object? status = null,Object? condition = freezed,Object? salePrice = freezed,Object? unitCode = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,carId: null == carId ? _self.carId : carId // ignore: cast_nullable_to_non_nullable
as String,vin: freezed == vin ? _self.vin : vin // ignore: cast_nullable_to_non_nullable
as String?,engineNumber: freezed == engineNumber ? _self.engineNumber : engineNumber // ignore: cast_nullable_to_non_nullable
as String?,color: freezed == color ? _self.color : color // ignore: cast_nullable_to_non_nullable
as String?,year: freezed == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int?,odometer: freezed == odometer ? _self.odometer : odometer // ignore: cast_nullable_to_non_nullable
as int?,fuel: freezed == fuel ? _self.fuel : fuel // ignore: cast_nullable_to_non_nullable
as String?,seats: freezed == seats ? _self.seats : seats // ignore: cast_nullable_to_non_nullable
as int?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,condition: freezed == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String?,salePrice: freezed == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num?,unitCode: freezed == unitCode ? _self.unitCode : unitCode // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [VehicleUnitModel].
extension VehicleUnitModelPatterns on VehicleUnitModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _VehicleUnitModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _VehicleUnitModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _VehicleUnitModel value)  $default,){
final _that = this;
switch (_that) {
case _VehicleUnitModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _VehicleUnitModel value)?  $default,){
final _that = this;
switch (_that) {
case _VehicleUnitModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id, @JsonKey(readValue: _readCarId)  String carId,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber, @JsonKey(readValue: _readColor)  String? color, @JsonKey(name: 'model_year')  int? year,  int? odometer,  String? fuel,  int? seats,  String status,  String? condition, @JsonKey(readValue: _readSalePrice)  num? salePrice, @JsonKey(name: 'unit_code')  String? unitCode)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _VehicleUnitModel() when $default != null:
return $default(_that.id,_that.carId,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats,_that.status,_that.condition,_that.salePrice,_that.unitCode);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id, @JsonKey(readValue: _readCarId)  String carId,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber, @JsonKey(readValue: _readColor)  String? color, @JsonKey(name: 'model_year')  int? year,  int? odometer,  String? fuel,  int? seats,  String status,  String? condition, @JsonKey(readValue: _readSalePrice)  num? salePrice, @JsonKey(name: 'unit_code')  String? unitCode)  $default,) {final _that = this;
switch (_that) {
case _VehicleUnitModel():
return $default(_that.id,_that.carId,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats,_that.status,_that.condition,_that.salePrice,_that.unitCode);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: '_id')  String id, @JsonKey(readValue: _readCarId)  String carId,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber, @JsonKey(readValue: _readColor)  String? color, @JsonKey(name: 'model_year')  int? year,  int? odometer,  String? fuel,  int? seats,  String status,  String? condition, @JsonKey(readValue: _readSalePrice)  num? salePrice, @JsonKey(name: 'unit_code')  String? unitCode)?  $default,) {final _that = this;
switch (_that) {
case _VehicleUnitModel() when $default != null:
return $default(_that.id,_that.carId,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats,_that.status,_that.condition,_that.salePrice,_that.unitCode);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _VehicleUnitModel extends VehicleUnitModel {
  const _VehicleUnitModel({@JsonKey(name: '_id') required this.id, @JsonKey(readValue: _readCarId) required this.carId, this.vin, @JsonKey(name: 'engine_number') this.engineNumber, @JsonKey(readValue: _readColor) this.color, @JsonKey(name: 'model_year') this.year, this.odometer, this.fuel, this.seats, required this.status, this.condition, @JsonKey(readValue: _readSalePrice) this.salePrice, @JsonKey(name: 'unit_code') this.unitCode}): super._();
  factory _VehicleUnitModel.fromJson(Map<String, dynamic> json) => _$VehicleUnitModelFromJson(json);

@override@JsonKey(name: '_id') final  String id;
@override@JsonKey(readValue: _readCarId) final  String carId;
@override final  String? vin;
@override@JsonKey(name: 'engine_number') final  String? engineNumber;
@override@JsonKey(readValue: _readColor) final  String? color;
@override@JsonKey(name: 'model_year') final  int? year;
@override final  int? odometer;
@override final  String? fuel;
@override final  int? seats;
@override final  String status;
@override final  String? condition;
@override@JsonKey(readValue: _readSalePrice) final  num? salePrice;
@override@JsonKey(name: 'unit_code') final  String? unitCode;

/// Create a copy of VehicleUnitModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$VehicleUnitModelCopyWith<_VehicleUnitModel> get copyWith => __$VehicleUnitModelCopyWithImpl<_VehicleUnitModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$VehicleUnitModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _VehicleUnitModel&&(identical(other.id, id) || other.id == id)&&(identical(other.carId, carId) || other.carId == carId)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats)&&(identical(other.status, status) || other.status == status)&&(identical(other.condition, condition) || other.condition == condition)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.unitCode, unitCode) || other.unitCode == unitCode));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,carId,vin,engineNumber,color,year,odometer,fuel,seats,status,condition,salePrice,unitCode);

@override
String toString() {
  return 'VehicleUnitModel(id: $id, carId: $carId, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats, status: $status, condition: $condition, salePrice: $salePrice, unitCode: $unitCode)';
}


}

/// @nodoc
abstract mixin class _$VehicleUnitModelCopyWith<$Res> implements $VehicleUnitModelCopyWith<$Res> {
  factory _$VehicleUnitModelCopyWith(_VehicleUnitModel value, $Res Function(_VehicleUnitModel) _then) = __$VehicleUnitModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: '_id') String id,@JsonKey(readValue: _readCarId) String carId, String? vin,@JsonKey(name: 'engine_number') String? engineNumber,@JsonKey(readValue: _readColor) String? color,@JsonKey(name: 'model_year') int? year, int? odometer, String? fuel, int? seats, String status, String? condition,@JsonKey(readValue: _readSalePrice) num? salePrice,@JsonKey(name: 'unit_code') String? unitCode
});




}
/// @nodoc
class __$VehicleUnitModelCopyWithImpl<$Res>
    implements _$VehicleUnitModelCopyWith<$Res> {
  __$VehicleUnitModelCopyWithImpl(this._self, this._then);

  final _VehicleUnitModel _self;
  final $Res Function(_VehicleUnitModel) _then;

/// Create a copy of VehicleUnitModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? carId = null,Object? vin = freezed,Object? engineNumber = freezed,Object? color = freezed,Object? year = freezed,Object? odometer = freezed,Object? fuel = freezed,Object? seats = freezed,Object? status = null,Object? condition = freezed,Object? salePrice = freezed,Object? unitCode = freezed,}) {
  return _then(_VehicleUnitModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,carId: null == carId ? _self.carId : carId // ignore: cast_nullable_to_non_nullable
as String,vin: freezed == vin ? _self.vin : vin // ignore: cast_nullable_to_non_nullable
as String?,engineNumber: freezed == engineNumber ? _self.engineNumber : engineNumber // ignore: cast_nullable_to_non_nullable
as String?,color: freezed == color ? _self.color : color // ignore: cast_nullable_to_non_nullable
as String?,year: freezed == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int?,odometer: freezed == odometer ? _self.odometer : odometer // ignore: cast_nullable_to_non_nullable
as int?,fuel: freezed == fuel ? _self.fuel : fuel // ignore: cast_nullable_to_non_nullable
as String?,seats: freezed == seats ? _self.seats : seats // ignore: cast_nullable_to_non_nullable
as int?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,condition: freezed == condition ? _self.condition : condition // ignore: cast_nullable_to_non_nullable
as String?,salePrice: freezed == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num?,unitCode: freezed == unitCode ? _self.unitCode : unitCode // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}

// dart format on
