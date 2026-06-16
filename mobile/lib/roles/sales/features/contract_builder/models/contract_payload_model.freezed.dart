// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'contract_payload_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$CustomerSnapshotModel {

@JsonKey(name: 'full_name') String? get fullName; String? get phone; String? get email; String? get address;@JsonKey(name: 'id_number') String? get idNumber;@JsonKey(name: 'tax_code') String? get taxCode;@JsonKey(name: 'company_name') String? get companyName;
/// Create a copy of CustomerSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CustomerSnapshotModelCopyWith<CustomerSnapshotModel> get copyWith => _$CustomerSnapshotModelCopyWithImpl<CustomerSnapshotModel>(this as CustomerSnapshotModel, _$identity);

  /// Serializes this CustomerSnapshotModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CustomerSnapshotModel&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.idNumber, idNumber) || other.idNumber == idNumber)&&(identical(other.taxCode, taxCode) || other.taxCode == taxCode)&&(identical(other.companyName, companyName) || other.companyName == companyName));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,fullName,phone,email,address,idNumber,taxCode,companyName);

@override
String toString() {
  return 'CustomerSnapshotModel(fullName: $fullName, phone: $phone, email: $email, address: $address, idNumber: $idNumber, taxCode: $taxCode, companyName: $companyName)';
}


}

/// @nodoc
abstract mixin class $CustomerSnapshotModelCopyWith<$Res>  {
  factory $CustomerSnapshotModelCopyWith(CustomerSnapshotModel value, $Res Function(CustomerSnapshotModel) _then) = _$CustomerSnapshotModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'full_name') String? fullName, String? phone, String? email, String? address,@JsonKey(name: 'id_number') String? idNumber,@JsonKey(name: 'tax_code') String? taxCode,@JsonKey(name: 'company_name') String? companyName
});




}
/// @nodoc
class _$CustomerSnapshotModelCopyWithImpl<$Res>
    implements $CustomerSnapshotModelCopyWith<$Res> {
  _$CustomerSnapshotModelCopyWithImpl(this._self, this._then);

  final CustomerSnapshotModel _self;
  final $Res Function(CustomerSnapshotModel) _then;

/// Create a copy of CustomerSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? fullName = freezed,Object? phone = freezed,Object? email = freezed,Object? address = freezed,Object? idNumber = freezed,Object? taxCode = freezed,Object? companyName = freezed,}) {
  return _then(_self.copyWith(
fullName: freezed == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String?,phone: freezed == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String?,email: freezed == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String?,address: freezed == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as String?,idNumber: freezed == idNumber ? _self.idNumber : idNumber // ignore: cast_nullable_to_non_nullable
as String?,taxCode: freezed == taxCode ? _self.taxCode : taxCode // ignore: cast_nullable_to_non_nullable
as String?,companyName: freezed == companyName ? _self.companyName : companyName // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [CustomerSnapshotModel].
extension CustomerSnapshotModelPatterns on CustomerSnapshotModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _CustomerSnapshotModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _CustomerSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _CustomerSnapshotModel value)  $default,){
final _that = this;
switch (_that) {
case _CustomerSnapshotModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _CustomerSnapshotModel value)?  $default,){
final _that = this;
switch (_that) {
case _CustomerSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'full_name')  String? fullName,  String? phone,  String? email,  String? address, @JsonKey(name: 'id_number')  String? idNumber, @JsonKey(name: 'tax_code')  String? taxCode, @JsonKey(name: 'company_name')  String? companyName)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _CustomerSnapshotModel() when $default != null:
return $default(_that.fullName,_that.phone,_that.email,_that.address,_that.idNumber,_that.taxCode,_that.companyName);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'full_name')  String? fullName,  String? phone,  String? email,  String? address, @JsonKey(name: 'id_number')  String? idNumber, @JsonKey(name: 'tax_code')  String? taxCode, @JsonKey(name: 'company_name')  String? companyName)  $default,) {final _that = this;
switch (_that) {
case _CustomerSnapshotModel():
return $default(_that.fullName,_that.phone,_that.email,_that.address,_that.idNumber,_that.taxCode,_that.companyName);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'full_name')  String? fullName,  String? phone,  String? email,  String? address, @JsonKey(name: 'id_number')  String? idNumber, @JsonKey(name: 'tax_code')  String? taxCode, @JsonKey(name: 'company_name')  String? companyName)?  $default,) {final _that = this;
switch (_that) {
case _CustomerSnapshotModel() when $default != null:
return $default(_that.fullName,_that.phone,_that.email,_that.address,_that.idNumber,_that.taxCode,_that.companyName);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _CustomerSnapshotModel extends CustomerSnapshotModel {
  const _CustomerSnapshotModel({@JsonKey(name: 'full_name') this.fullName, this.phone, this.email, this.address, @JsonKey(name: 'id_number') this.idNumber, @JsonKey(name: 'tax_code') this.taxCode, @JsonKey(name: 'company_name') this.companyName}): super._();
  factory _CustomerSnapshotModel.fromJson(Map<String, dynamic> json) => _$CustomerSnapshotModelFromJson(json);

@override@JsonKey(name: 'full_name') final  String? fullName;
@override final  String? phone;
@override final  String? email;
@override final  String? address;
@override@JsonKey(name: 'id_number') final  String? idNumber;
@override@JsonKey(name: 'tax_code') final  String? taxCode;
@override@JsonKey(name: 'company_name') final  String? companyName;

/// Create a copy of CustomerSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CustomerSnapshotModelCopyWith<_CustomerSnapshotModel> get copyWith => __$CustomerSnapshotModelCopyWithImpl<_CustomerSnapshotModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CustomerSnapshotModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _CustomerSnapshotModel&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.idNumber, idNumber) || other.idNumber == idNumber)&&(identical(other.taxCode, taxCode) || other.taxCode == taxCode)&&(identical(other.companyName, companyName) || other.companyName == companyName));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,fullName,phone,email,address,idNumber,taxCode,companyName);

@override
String toString() {
  return 'CustomerSnapshotModel(fullName: $fullName, phone: $phone, email: $email, address: $address, idNumber: $idNumber, taxCode: $taxCode, companyName: $companyName)';
}


}

/// @nodoc
abstract mixin class _$CustomerSnapshotModelCopyWith<$Res> implements $CustomerSnapshotModelCopyWith<$Res> {
  factory _$CustomerSnapshotModelCopyWith(_CustomerSnapshotModel value, $Res Function(_CustomerSnapshotModel) _then) = __$CustomerSnapshotModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'full_name') String? fullName, String? phone, String? email, String? address,@JsonKey(name: 'id_number') String? idNumber,@JsonKey(name: 'tax_code') String? taxCode,@JsonKey(name: 'company_name') String? companyName
});




}
/// @nodoc
class __$CustomerSnapshotModelCopyWithImpl<$Res>
    implements _$CustomerSnapshotModelCopyWith<$Res> {
  __$CustomerSnapshotModelCopyWithImpl(this._self, this._then);

  final _CustomerSnapshotModel _self;
  final $Res Function(_CustomerSnapshotModel) _then;

/// Create a copy of CustomerSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? fullName = freezed,Object? phone = freezed,Object? email = freezed,Object? address = freezed,Object? idNumber = freezed,Object? taxCode = freezed,Object? companyName = freezed,}) {
  return _then(_CustomerSnapshotModel(
fullName: freezed == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String?,phone: freezed == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String?,email: freezed == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String?,address: freezed == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as String?,idNumber: freezed == idNumber ? _self.idNumber : idNumber // ignore: cast_nullable_to_non_nullable
as String?,taxCode: freezed == taxCode ? _self.taxCode : taxCode // ignore: cast_nullable_to_non_nullable
as String?,companyName: freezed == companyName ? _self.companyName : companyName // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}


/// @nodoc
mixin _$VehicleSnapshotModel {

 String? get name; String? get brandName; String? get sku; String? get vin;@JsonKey(name: 'engine_number') String? get engineNumber; String? get color; int? get year; int? get odometer; String? get fuel; int? get seats;
/// Create a copy of VehicleSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VehicleSnapshotModelCopyWith<VehicleSnapshotModel> get copyWith => _$VehicleSnapshotModelCopyWithImpl<VehicleSnapshotModel>(this as VehicleSnapshotModel, _$identity);

  /// Serializes this VehicleSnapshotModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VehicleSnapshotModel&&(identical(other.name, name) || other.name == name)&&(identical(other.brandName, brandName) || other.brandName == brandName)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,brandName,sku,vin,engineNumber,color,year,odometer,fuel,seats);

@override
String toString() {
  return 'VehicleSnapshotModel(name: $name, brandName: $brandName, sku: $sku, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats)';
}


}

/// @nodoc
abstract mixin class $VehicleSnapshotModelCopyWith<$Res>  {
  factory $VehicleSnapshotModelCopyWith(VehicleSnapshotModel value, $Res Function(VehicleSnapshotModel) _then) = _$VehicleSnapshotModelCopyWithImpl;
@useResult
$Res call({
 String? name, String? brandName, String? sku, String? vin,@JsonKey(name: 'engine_number') String? engineNumber, String? color, int? year, int? odometer, String? fuel, int? seats
});




}
/// @nodoc
class _$VehicleSnapshotModelCopyWithImpl<$Res>
    implements $VehicleSnapshotModelCopyWith<$Res> {
  _$VehicleSnapshotModelCopyWithImpl(this._self, this._then);

  final VehicleSnapshotModel _self;
  final $Res Function(VehicleSnapshotModel) _then;

/// Create a copy of VehicleSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? name = freezed,Object? brandName = freezed,Object? sku = freezed,Object? vin = freezed,Object? engineNumber = freezed,Object? color = freezed,Object? year = freezed,Object? odometer = freezed,Object? fuel = freezed,Object? seats = freezed,}) {
  return _then(_self.copyWith(
name: freezed == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String?,brandName: freezed == brandName ? _self.brandName : brandName // ignore: cast_nullable_to_non_nullable
as String?,sku: freezed == sku ? _self.sku : sku // ignore: cast_nullable_to_non_nullable
as String?,vin: freezed == vin ? _self.vin : vin // ignore: cast_nullable_to_non_nullable
as String?,engineNumber: freezed == engineNumber ? _self.engineNumber : engineNumber // ignore: cast_nullable_to_non_nullable
as String?,color: freezed == color ? _self.color : color // ignore: cast_nullable_to_non_nullable
as String?,year: freezed == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int?,odometer: freezed == odometer ? _self.odometer : odometer // ignore: cast_nullable_to_non_nullable
as int?,fuel: freezed == fuel ? _self.fuel : fuel // ignore: cast_nullable_to_non_nullable
as String?,seats: freezed == seats ? _self.seats : seats // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}

}


/// Adds pattern-matching-related methods to [VehicleSnapshotModel].
extension VehicleSnapshotModelPatterns on VehicleSnapshotModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _VehicleSnapshotModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _VehicleSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _VehicleSnapshotModel value)  $default,){
final _that = this;
switch (_that) {
case _VehicleSnapshotModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _VehicleSnapshotModel value)?  $default,){
final _that = this;
switch (_that) {
case _VehicleSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String? name,  String? brandName,  String? sku,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber,  String? color,  int? year,  int? odometer,  String? fuel,  int? seats)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _VehicleSnapshotModel() when $default != null:
return $default(_that.name,_that.brandName,_that.sku,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String? name,  String? brandName,  String? sku,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber,  String? color,  int? year,  int? odometer,  String? fuel,  int? seats)  $default,) {final _that = this;
switch (_that) {
case _VehicleSnapshotModel():
return $default(_that.name,_that.brandName,_that.sku,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String? name,  String? brandName,  String? sku,  String? vin, @JsonKey(name: 'engine_number')  String? engineNumber,  String? color,  int? year,  int? odometer,  String? fuel,  int? seats)?  $default,) {final _that = this;
switch (_that) {
case _VehicleSnapshotModel() when $default != null:
return $default(_that.name,_that.brandName,_that.sku,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _VehicleSnapshotModel extends VehicleSnapshotModel {
  const _VehicleSnapshotModel({this.name, this.brandName, this.sku, this.vin, @JsonKey(name: 'engine_number') this.engineNumber, this.color, this.year, this.odometer, this.fuel, this.seats}): super._();
  factory _VehicleSnapshotModel.fromJson(Map<String, dynamic> json) => _$VehicleSnapshotModelFromJson(json);

@override final  String? name;
@override final  String? brandName;
@override final  String? sku;
@override final  String? vin;
@override@JsonKey(name: 'engine_number') final  String? engineNumber;
@override final  String? color;
@override final  int? year;
@override final  int? odometer;
@override final  String? fuel;
@override final  int? seats;

/// Create a copy of VehicleSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$VehicleSnapshotModelCopyWith<_VehicleSnapshotModel> get copyWith => __$VehicleSnapshotModelCopyWithImpl<_VehicleSnapshotModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$VehicleSnapshotModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _VehicleSnapshotModel&&(identical(other.name, name) || other.name == name)&&(identical(other.brandName, brandName) || other.brandName == brandName)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,brandName,sku,vin,engineNumber,color,year,odometer,fuel,seats);

@override
String toString() {
  return 'VehicleSnapshotModel(name: $name, brandName: $brandName, sku: $sku, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats)';
}


}

/// @nodoc
abstract mixin class _$VehicleSnapshotModelCopyWith<$Res> implements $VehicleSnapshotModelCopyWith<$Res> {
  factory _$VehicleSnapshotModelCopyWith(_VehicleSnapshotModel value, $Res Function(_VehicleSnapshotModel) _then) = __$VehicleSnapshotModelCopyWithImpl;
@override @useResult
$Res call({
 String? name, String? brandName, String? sku, String? vin,@JsonKey(name: 'engine_number') String? engineNumber, String? color, int? year, int? odometer, String? fuel, int? seats
});




}
/// @nodoc
class __$VehicleSnapshotModelCopyWithImpl<$Res>
    implements _$VehicleSnapshotModelCopyWith<$Res> {
  __$VehicleSnapshotModelCopyWithImpl(this._self, this._then);

  final _VehicleSnapshotModel _self;
  final $Res Function(_VehicleSnapshotModel) _then;

/// Create a copy of VehicleSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? name = freezed,Object? brandName = freezed,Object? sku = freezed,Object? vin = freezed,Object? engineNumber = freezed,Object? color = freezed,Object? year = freezed,Object? odometer = freezed,Object? fuel = freezed,Object? seats = freezed,}) {
  return _then(_VehicleSnapshotModel(
name: freezed == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String?,brandName: freezed == brandName ? _self.brandName : brandName // ignore: cast_nullable_to_non_nullable
as String?,sku: freezed == sku ? _self.sku : sku // ignore: cast_nullable_to_non_nullable
as String?,vin: freezed == vin ? _self.vin : vin // ignore: cast_nullable_to_non_nullable
as String?,engineNumber: freezed == engineNumber ? _self.engineNumber : engineNumber // ignore: cast_nullable_to_non_nullable
as String?,color: freezed == color ? _self.color : color // ignore: cast_nullable_to_non_nullable
as String?,year: freezed == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as int?,odometer: freezed == odometer ? _self.odometer : odometer // ignore: cast_nullable_to_non_nullable
as int?,fuel: freezed == fuel ? _self.fuel : fuel // ignore: cast_nullable_to_non_nullable
as String?,seats: freezed == seats ? _self.seats : seats // ignore: cast_nullable_to_non_nullable
as int?,
  ));
}


}


/// @nodoc
mixin _$ContractPricingSnapshotModel {

@JsonKey(name: 'list_price') num get listPrice;@JsonKey(name: 'sale_price') num get salePrice; num get discount; num get vat;@JsonKey(name: 'registration_fee') num get registrationFee;@JsonKey(name: 'insurance_fee') num get insuranceFee;@JsonKey(name: 'other_fees') num get otherFees;@JsonKey(name: 'grand_total') num get grandTotal;
/// Create a copy of ContractPricingSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ContractPricingSnapshotModelCopyWith<ContractPricingSnapshotModel> get copyWith => _$ContractPricingSnapshotModelCopyWithImpl<ContractPricingSnapshotModel>(this as ContractPricingSnapshotModel, _$identity);

  /// Serializes this ContractPricingSnapshotModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ContractPricingSnapshotModel&&(identical(other.listPrice, listPrice) || other.listPrice == listPrice)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.discount, discount) || other.discount == discount)&&(identical(other.vat, vat) || other.vat == vat)&&(identical(other.registrationFee, registrationFee) || other.registrationFee == registrationFee)&&(identical(other.insuranceFee, insuranceFee) || other.insuranceFee == insuranceFee)&&(identical(other.otherFees, otherFees) || other.otherFees == otherFees)&&(identical(other.grandTotal, grandTotal) || other.grandTotal == grandTotal));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,listPrice,salePrice,discount,vat,registrationFee,insuranceFee,otherFees,grandTotal);

@override
String toString() {
  return 'ContractPricingSnapshotModel(listPrice: $listPrice, salePrice: $salePrice, discount: $discount, vat: $vat, registrationFee: $registrationFee, insuranceFee: $insuranceFee, otherFees: $otherFees, grandTotal: $grandTotal)';
}


}

/// @nodoc
abstract mixin class $ContractPricingSnapshotModelCopyWith<$Res>  {
  factory $ContractPricingSnapshotModelCopyWith(ContractPricingSnapshotModel value, $Res Function(ContractPricingSnapshotModel) _then) = _$ContractPricingSnapshotModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'list_price') num listPrice,@JsonKey(name: 'sale_price') num salePrice, num discount, num vat,@JsonKey(name: 'registration_fee') num registrationFee,@JsonKey(name: 'insurance_fee') num insuranceFee,@JsonKey(name: 'other_fees') num otherFees,@JsonKey(name: 'grand_total') num grandTotal
});




}
/// @nodoc
class _$ContractPricingSnapshotModelCopyWithImpl<$Res>
    implements $ContractPricingSnapshotModelCopyWith<$Res> {
  _$ContractPricingSnapshotModelCopyWithImpl(this._self, this._then);

  final ContractPricingSnapshotModel _self;
  final $Res Function(ContractPricingSnapshotModel) _then;

/// Create a copy of ContractPricingSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? listPrice = null,Object? salePrice = null,Object? discount = null,Object? vat = null,Object? registrationFee = null,Object? insuranceFee = null,Object? otherFees = null,Object? grandTotal = null,}) {
  return _then(_self.copyWith(
listPrice: null == listPrice ? _self.listPrice : listPrice // ignore: cast_nullable_to_non_nullable
as num,salePrice: null == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num,discount: null == discount ? _self.discount : discount // ignore: cast_nullable_to_non_nullable
as num,vat: null == vat ? _self.vat : vat // ignore: cast_nullable_to_non_nullable
as num,registrationFee: null == registrationFee ? _self.registrationFee : registrationFee // ignore: cast_nullable_to_non_nullable
as num,insuranceFee: null == insuranceFee ? _self.insuranceFee : insuranceFee // ignore: cast_nullable_to_non_nullable
as num,otherFees: null == otherFees ? _self.otherFees : otherFees // ignore: cast_nullable_to_non_nullable
as num,grandTotal: null == grandTotal ? _self.grandTotal : grandTotal // ignore: cast_nullable_to_non_nullable
as num,
  ));
}

}


/// Adds pattern-matching-related methods to [ContractPricingSnapshotModel].
extension ContractPricingSnapshotModelPatterns on ContractPricingSnapshotModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ContractPricingSnapshotModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ContractPricingSnapshotModel value)  $default,){
final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ContractPricingSnapshotModel value)?  $default,){
final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'list_price')  num listPrice, @JsonKey(name: 'sale_price')  num salePrice,  num discount,  num vat, @JsonKey(name: 'registration_fee')  num registrationFee, @JsonKey(name: 'insurance_fee')  num insuranceFee, @JsonKey(name: 'other_fees')  num otherFees, @JsonKey(name: 'grand_total')  num grandTotal)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel() when $default != null:
return $default(_that.listPrice,_that.salePrice,_that.discount,_that.vat,_that.registrationFee,_that.insuranceFee,_that.otherFees,_that.grandTotal);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'list_price')  num listPrice, @JsonKey(name: 'sale_price')  num salePrice,  num discount,  num vat, @JsonKey(name: 'registration_fee')  num registrationFee, @JsonKey(name: 'insurance_fee')  num insuranceFee, @JsonKey(name: 'other_fees')  num otherFees, @JsonKey(name: 'grand_total')  num grandTotal)  $default,) {final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel():
return $default(_that.listPrice,_that.salePrice,_that.discount,_that.vat,_that.registrationFee,_that.insuranceFee,_that.otherFees,_that.grandTotal);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'list_price')  num listPrice, @JsonKey(name: 'sale_price')  num salePrice,  num discount,  num vat, @JsonKey(name: 'registration_fee')  num registrationFee, @JsonKey(name: 'insurance_fee')  num insuranceFee, @JsonKey(name: 'other_fees')  num otherFees, @JsonKey(name: 'grand_total')  num grandTotal)?  $default,) {final _that = this;
switch (_that) {
case _ContractPricingSnapshotModel() when $default != null:
return $default(_that.listPrice,_that.salePrice,_that.discount,_that.vat,_that.registrationFee,_that.insuranceFee,_that.otherFees,_that.grandTotal);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ContractPricingSnapshotModel extends ContractPricingSnapshotModel {
  const _ContractPricingSnapshotModel({@JsonKey(name: 'list_price') this.listPrice = 0, @JsonKey(name: 'sale_price') this.salePrice = 0, this.discount = 0, this.vat = 0, @JsonKey(name: 'registration_fee') this.registrationFee = 0, @JsonKey(name: 'insurance_fee') this.insuranceFee = 0, @JsonKey(name: 'other_fees') this.otherFees = 0, @JsonKey(name: 'grand_total') this.grandTotal = 0}): super._();
  factory _ContractPricingSnapshotModel.fromJson(Map<String, dynamic> json) => _$ContractPricingSnapshotModelFromJson(json);

@override@JsonKey(name: 'list_price') final  num listPrice;
@override@JsonKey(name: 'sale_price') final  num salePrice;
@override@JsonKey() final  num discount;
@override@JsonKey() final  num vat;
@override@JsonKey(name: 'registration_fee') final  num registrationFee;
@override@JsonKey(name: 'insurance_fee') final  num insuranceFee;
@override@JsonKey(name: 'other_fees') final  num otherFees;
@override@JsonKey(name: 'grand_total') final  num grandTotal;

/// Create a copy of ContractPricingSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ContractPricingSnapshotModelCopyWith<_ContractPricingSnapshotModel> get copyWith => __$ContractPricingSnapshotModelCopyWithImpl<_ContractPricingSnapshotModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ContractPricingSnapshotModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ContractPricingSnapshotModel&&(identical(other.listPrice, listPrice) || other.listPrice == listPrice)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.discount, discount) || other.discount == discount)&&(identical(other.vat, vat) || other.vat == vat)&&(identical(other.registrationFee, registrationFee) || other.registrationFee == registrationFee)&&(identical(other.insuranceFee, insuranceFee) || other.insuranceFee == insuranceFee)&&(identical(other.otherFees, otherFees) || other.otherFees == otherFees)&&(identical(other.grandTotal, grandTotal) || other.grandTotal == grandTotal));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,listPrice,salePrice,discount,vat,registrationFee,insuranceFee,otherFees,grandTotal);

@override
String toString() {
  return 'ContractPricingSnapshotModel(listPrice: $listPrice, salePrice: $salePrice, discount: $discount, vat: $vat, registrationFee: $registrationFee, insuranceFee: $insuranceFee, otherFees: $otherFees, grandTotal: $grandTotal)';
}


}

/// @nodoc
abstract mixin class _$ContractPricingSnapshotModelCopyWith<$Res> implements $ContractPricingSnapshotModelCopyWith<$Res> {
  factory _$ContractPricingSnapshotModelCopyWith(_ContractPricingSnapshotModel value, $Res Function(_ContractPricingSnapshotModel) _then) = __$ContractPricingSnapshotModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'list_price') num listPrice,@JsonKey(name: 'sale_price') num salePrice, num discount, num vat,@JsonKey(name: 'registration_fee') num registrationFee,@JsonKey(name: 'insurance_fee') num insuranceFee,@JsonKey(name: 'other_fees') num otherFees,@JsonKey(name: 'grand_total') num grandTotal
});




}
/// @nodoc
class __$ContractPricingSnapshotModelCopyWithImpl<$Res>
    implements _$ContractPricingSnapshotModelCopyWith<$Res> {
  __$ContractPricingSnapshotModelCopyWithImpl(this._self, this._then);

  final _ContractPricingSnapshotModel _self;
  final $Res Function(_ContractPricingSnapshotModel) _then;

/// Create a copy of ContractPricingSnapshotModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? listPrice = null,Object? salePrice = null,Object? discount = null,Object? vat = null,Object? registrationFee = null,Object? insuranceFee = null,Object? otherFees = null,Object? grandTotal = null,}) {
  return _then(_ContractPricingSnapshotModel(
listPrice: null == listPrice ? _self.listPrice : listPrice // ignore: cast_nullable_to_non_nullable
as num,salePrice: null == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num,discount: null == discount ? _self.discount : discount // ignore: cast_nullable_to_non_nullable
as num,vat: null == vat ? _self.vat : vat // ignore: cast_nullable_to_non_nullable
as num,registrationFee: null == registrationFee ? _self.registrationFee : registrationFee // ignore: cast_nullable_to_non_nullable
as num,insuranceFee: null == insuranceFee ? _self.insuranceFee : insuranceFee // ignore: cast_nullable_to_non_nullable
as num,otherFees: null == otherFees ? _self.otherFees : otherFees // ignore: cast_nullable_to_non_nullable
as num,grandTotal: null == grandTotal ? _self.grandTotal : grandTotal // ignore: cast_nullable_to_non_nullable
as num,
  ));
}


}


/// @nodoc
mixin _$ContractPayloadModel {

@JsonKey(name: 'customer_id') String get customerId;@JsonKey(name: 'car_id') String get carId;@JsonKey(name: 'vehicle_unit_id') String get vehicleUnitId;@JsonKey(name: 'sales_id') String? get salesId;@JsonKey(name: 'test_drive_booking_id') String? get testDriveBookingId;@JsonKey(name: 'customer_snapshot') CustomerSnapshotModel get customerSnapshot;@JsonKey(name: 'vehicle_snapshot') VehicleSnapshotModel get vehicleSnapshot;@JsonKey(name: 'pricing_snapshot') ContractPricingSnapshotModel get pricingSnapshot; String? get note;
/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ContractPayloadModelCopyWith<ContractPayloadModel> get copyWith => _$ContractPayloadModelCopyWithImpl<ContractPayloadModel>(this as ContractPayloadModel, _$identity);

  /// Serializes this ContractPayloadModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ContractPayloadModel&&(identical(other.customerId, customerId) || other.customerId == customerId)&&(identical(other.carId, carId) || other.carId == carId)&&(identical(other.vehicleUnitId, vehicleUnitId) || other.vehicleUnitId == vehicleUnitId)&&(identical(other.salesId, salesId) || other.salesId == salesId)&&(identical(other.testDriveBookingId, testDriveBookingId) || other.testDriveBookingId == testDriveBookingId)&&(identical(other.customerSnapshot, customerSnapshot) || other.customerSnapshot == customerSnapshot)&&(identical(other.vehicleSnapshot, vehicleSnapshot) || other.vehicleSnapshot == vehicleSnapshot)&&(identical(other.pricingSnapshot, pricingSnapshot) || other.pricingSnapshot == pricingSnapshot)&&(identical(other.note, note) || other.note == note));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,customerId,carId,vehicleUnitId,salesId,testDriveBookingId,customerSnapshot,vehicleSnapshot,pricingSnapshot,note);

@override
String toString() {
  return 'ContractPayloadModel(customerId: $customerId, carId: $carId, vehicleUnitId: $vehicleUnitId, salesId: $salesId, testDriveBookingId: $testDriveBookingId, customerSnapshot: $customerSnapshot, vehicleSnapshot: $vehicleSnapshot, pricingSnapshot: $pricingSnapshot, note: $note)';
}


}

/// @nodoc
abstract mixin class $ContractPayloadModelCopyWith<$Res>  {
  factory $ContractPayloadModelCopyWith(ContractPayloadModel value, $Res Function(ContractPayloadModel) _then) = _$ContractPayloadModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'customer_id') String customerId,@JsonKey(name: 'car_id') String carId,@JsonKey(name: 'vehicle_unit_id') String vehicleUnitId,@JsonKey(name: 'sales_id') String? salesId,@JsonKey(name: 'test_drive_booking_id') String? testDriveBookingId,@JsonKey(name: 'customer_snapshot') CustomerSnapshotModel customerSnapshot,@JsonKey(name: 'vehicle_snapshot') VehicleSnapshotModel vehicleSnapshot,@JsonKey(name: 'pricing_snapshot') ContractPricingSnapshotModel pricingSnapshot, String? note
});


$CustomerSnapshotModelCopyWith<$Res> get customerSnapshot;$VehicleSnapshotModelCopyWith<$Res> get vehicleSnapshot;$ContractPricingSnapshotModelCopyWith<$Res> get pricingSnapshot;

}
/// @nodoc
class _$ContractPayloadModelCopyWithImpl<$Res>
    implements $ContractPayloadModelCopyWith<$Res> {
  _$ContractPayloadModelCopyWithImpl(this._self, this._then);

  final ContractPayloadModel _self;
  final $Res Function(ContractPayloadModel) _then;

/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? customerId = null,Object? carId = null,Object? vehicleUnitId = null,Object? salesId = freezed,Object? testDriveBookingId = freezed,Object? customerSnapshot = null,Object? vehicleSnapshot = null,Object? pricingSnapshot = null,Object? note = freezed,}) {
  return _then(_self.copyWith(
customerId: null == customerId ? _self.customerId : customerId // ignore: cast_nullable_to_non_nullable
as String,carId: null == carId ? _self.carId : carId // ignore: cast_nullable_to_non_nullable
as String,vehicleUnitId: null == vehicleUnitId ? _self.vehicleUnitId : vehicleUnitId // ignore: cast_nullable_to_non_nullable
as String,salesId: freezed == salesId ? _self.salesId : salesId // ignore: cast_nullable_to_non_nullable
as String?,testDriveBookingId: freezed == testDriveBookingId ? _self.testDriveBookingId : testDriveBookingId // ignore: cast_nullable_to_non_nullable
as String?,customerSnapshot: null == customerSnapshot ? _self.customerSnapshot : customerSnapshot // ignore: cast_nullable_to_non_nullable
as CustomerSnapshotModel,vehicleSnapshot: null == vehicleSnapshot ? _self.vehicleSnapshot : vehicleSnapshot // ignore: cast_nullable_to_non_nullable
as VehicleSnapshotModel,pricingSnapshot: null == pricingSnapshot ? _self.pricingSnapshot : pricingSnapshot // ignore: cast_nullable_to_non_nullable
as ContractPricingSnapshotModel,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CustomerSnapshotModelCopyWith<$Res> get customerSnapshot {
  
  return $CustomerSnapshotModelCopyWith<$Res>(_self.customerSnapshot, (value) {
    return _then(_self.copyWith(customerSnapshot: value));
  });
}/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$VehicleSnapshotModelCopyWith<$Res> get vehicleSnapshot {
  
  return $VehicleSnapshotModelCopyWith<$Res>(_self.vehicleSnapshot, (value) {
    return _then(_self.copyWith(vehicleSnapshot: value));
  });
}/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContractPricingSnapshotModelCopyWith<$Res> get pricingSnapshot {
  
  return $ContractPricingSnapshotModelCopyWith<$Res>(_self.pricingSnapshot, (value) {
    return _then(_self.copyWith(pricingSnapshot: value));
  });
}
}


/// Adds pattern-matching-related methods to [ContractPayloadModel].
extension ContractPayloadModelPatterns on ContractPayloadModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ContractPayloadModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ContractPayloadModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ContractPayloadModel value)  $default,){
final _that = this;
switch (_that) {
case _ContractPayloadModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ContractPayloadModel value)?  $default,){
final _that = this;
switch (_that) {
case _ContractPayloadModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'customer_id')  String customerId, @JsonKey(name: 'car_id')  String carId, @JsonKey(name: 'vehicle_unit_id')  String vehicleUnitId, @JsonKey(name: 'sales_id')  String? salesId, @JsonKey(name: 'test_drive_booking_id')  String? testDriveBookingId, @JsonKey(name: 'customer_snapshot')  CustomerSnapshotModel customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshotModel vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  ContractPricingSnapshotModel pricingSnapshot,  String? note)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ContractPayloadModel() when $default != null:
return $default(_that.customerId,_that.carId,_that.vehicleUnitId,_that.salesId,_that.testDriveBookingId,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.note);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'customer_id')  String customerId, @JsonKey(name: 'car_id')  String carId, @JsonKey(name: 'vehicle_unit_id')  String vehicleUnitId, @JsonKey(name: 'sales_id')  String? salesId, @JsonKey(name: 'test_drive_booking_id')  String? testDriveBookingId, @JsonKey(name: 'customer_snapshot')  CustomerSnapshotModel customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshotModel vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  ContractPricingSnapshotModel pricingSnapshot,  String? note)  $default,) {final _that = this;
switch (_that) {
case _ContractPayloadModel():
return $default(_that.customerId,_that.carId,_that.vehicleUnitId,_that.salesId,_that.testDriveBookingId,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.note);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'customer_id')  String customerId, @JsonKey(name: 'car_id')  String carId, @JsonKey(name: 'vehicle_unit_id')  String vehicleUnitId, @JsonKey(name: 'sales_id')  String? salesId, @JsonKey(name: 'test_drive_booking_id')  String? testDriveBookingId, @JsonKey(name: 'customer_snapshot')  CustomerSnapshotModel customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshotModel vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  ContractPricingSnapshotModel pricingSnapshot,  String? note)?  $default,) {final _that = this;
switch (_that) {
case _ContractPayloadModel() when $default != null:
return $default(_that.customerId,_that.carId,_that.vehicleUnitId,_that.salesId,_that.testDriveBookingId,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.note);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ContractPayloadModel extends ContractPayloadModel {
  const _ContractPayloadModel({@JsonKey(name: 'customer_id') required this.customerId, @JsonKey(name: 'car_id') required this.carId, @JsonKey(name: 'vehicle_unit_id') required this.vehicleUnitId, @JsonKey(name: 'sales_id') this.salesId, @JsonKey(name: 'test_drive_booking_id') this.testDriveBookingId, @JsonKey(name: 'customer_snapshot') this.customerSnapshot = const CustomerSnapshotModel(), @JsonKey(name: 'vehicle_snapshot') this.vehicleSnapshot = const VehicleSnapshotModel(), @JsonKey(name: 'pricing_snapshot') this.pricingSnapshot = const ContractPricingSnapshotModel(), this.note}): super._();
  factory _ContractPayloadModel.fromJson(Map<String, dynamic> json) => _$ContractPayloadModelFromJson(json);

@override@JsonKey(name: 'customer_id') final  String customerId;
@override@JsonKey(name: 'car_id') final  String carId;
@override@JsonKey(name: 'vehicle_unit_id') final  String vehicleUnitId;
@override@JsonKey(name: 'sales_id') final  String? salesId;
@override@JsonKey(name: 'test_drive_booking_id') final  String? testDriveBookingId;
@override@JsonKey(name: 'customer_snapshot') final  CustomerSnapshotModel customerSnapshot;
@override@JsonKey(name: 'vehicle_snapshot') final  VehicleSnapshotModel vehicleSnapshot;
@override@JsonKey(name: 'pricing_snapshot') final  ContractPricingSnapshotModel pricingSnapshot;
@override final  String? note;

/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ContractPayloadModelCopyWith<_ContractPayloadModel> get copyWith => __$ContractPayloadModelCopyWithImpl<_ContractPayloadModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ContractPayloadModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ContractPayloadModel&&(identical(other.customerId, customerId) || other.customerId == customerId)&&(identical(other.carId, carId) || other.carId == carId)&&(identical(other.vehicleUnitId, vehicleUnitId) || other.vehicleUnitId == vehicleUnitId)&&(identical(other.salesId, salesId) || other.salesId == salesId)&&(identical(other.testDriveBookingId, testDriveBookingId) || other.testDriveBookingId == testDriveBookingId)&&(identical(other.customerSnapshot, customerSnapshot) || other.customerSnapshot == customerSnapshot)&&(identical(other.vehicleSnapshot, vehicleSnapshot) || other.vehicleSnapshot == vehicleSnapshot)&&(identical(other.pricingSnapshot, pricingSnapshot) || other.pricingSnapshot == pricingSnapshot)&&(identical(other.note, note) || other.note == note));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,customerId,carId,vehicleUnitId,salesId,testDriveBookingId,customerSnapshot,vehicleSnapshot,pricingSnapshot,note);

@override
String toString() {
  return 'ContractPayloadModel(customerId: $customerId, carId: $carId, vehicleUnitId: $vehicleUnitId, salesId: $salesId, testDriveBookingId: $testDriveBookingId, customerSnapshot: $customerSnapshot, vehicleSnapshot: $vehicleSnapshot, pricingSnapshot: $pricingSnapshot, note: $note)';
}


}

/// @nodoc
abstract mixin class _$ContractPayloadModelCopyWith<$Res> implements $ContractPayloadModelCopyWith<$Res> {
  factory _$ContractPayloadModelCopyWith(_ContractPayloadModel value, $Res Function(_ContractPayloadModel) _then) = __$ContractPayloadModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'customer_id') String customerId,@JsonKey(name: 'car_id') String carId,@JsonKey(name: 'vehicle_unit_id') String vehicleUnitId,@JsonKey(name: 'sales_id') String? salesId,@JsonKey(name: 'test_drive_booking_id') String? testDriveBookingId,@JsonKey(name: 'customer_snapshot') CustomerSnapshotModel customerSnapshot,@JsonKey(name: 'vehicle_snapshot') VehicleSnapshotModel vehicleSnapshot,@JsonKey(name: 'pricing_snapshot') ContractPricingSnapshotModel pricingSnapshot, String? note
});


@override $CustomerSnapshotModelCopyWith<$Res> get customerSnapshot;@override $VehicleSnapshotModelCopyWith<$Res> get vehicleSnapshot;@override $ContractPricingSnapshotModelCopyWith<$Res> get pricingSnapshot;

}
/// @nodoc
class __$ContractPayloadModelCopyWithImpl<$Res>
    implements _$ContractPayloadModelCopyWith<$Res> {
  __$ContractPayloadModelCopyWithImpl(this._self, this._then);

  final _ContractPayloadModel _self;
  final $Res Function(_ContractPayloadModel) _then;

/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? customerId = null,Object? carId = null,Object? vehicleUnitId = null,Object? salesId = freezed,Object? testDriveBookingId = freezed,Object? customerSnapshot = null,Object? vehicleSnapshot = null,Object? pricingSnapshot = null,Object? note = freezed,}) {
  return _then(_ContractPayloadModel(
customerId: null == customerId ? _self.customerId : customerId // ignore: cast_nullable_to_non_nullable
as String,carId: null == carId ? _self.carId : carId // ignore: cast_nullable_to_non_nullable
as String,vehicleUnitId: null == vehicleUnitId ? _self.vehicleUnitId : vehicleUnitId // ignore: cast_nullable_to_non_nullable
as String,salesId: freezed == salesId ? _self.salesId : salesId // ignore: cast_nullable_to_non_nullable
as String?,testDriveBookingId: freezed == testDriveBookingId ? _self.testDriveBookingId : testDriveBookingId // ignore: cast_nullable_to_non_nullable
as String?,customerSnapshot: null == customerSnapshot ? _self.customerSnapshot : customerSnapshot // ignore: cast_nullable_to_non_nullable
as CustomerSnapshotModel,vehicleSnapshot: null == vehicleSnapshot ? _self.vehicleSnapshot : vehicleSnapshot // ignore: cast_nullable_to_non_nullable
as VehicleSnapshotModel,pricingSnapshot: null == pricingSnapshot ? _self.pricingSnapshot : pricingSnapshot // ignore: cast_nullable_to_non_nullable
as ContractPricingSnapshotModel,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CustomerSnapshotModelCopyWith<$Res> get customerSnapshot {
  
  return $CustomerSnapshotModelCopyWith<$Res>(_self.customerSnapshot, (value) {
    return _then(_self.copyWith(customerSnapshot: value));
  });
}/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$VehicleSnapshotModelCopyWith<$Res> get vehicleSnapshot {
  
  return $VehicleSnapshotModelCopyWith<$Res>(_self.vehicleSnapshot, (value) {
    return _then(_self.copyWith(vehicleSnapshot: value));
  });
}/// Create a copy of ContractPayloadModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContractPricingSnapshotModelCopyWith<$Res> get pricingSnapshot {
  
  return $ContractPricingSnapshotModelCopyWith<$Res>(_self.pricingSnapshot, (value) {
    return _then(_self.copyWith(pricingSnapshot: value));
  });
}
}

// dart format on
