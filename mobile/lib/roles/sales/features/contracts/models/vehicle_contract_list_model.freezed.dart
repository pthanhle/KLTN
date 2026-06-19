// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vehicle_contract_list_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$VehicleContractListModel {

@JsonKey(name: '_id') String get id;@JsonKey(name: 'contract_number') String? get contractNumber; String get status;@JsonKey(name: 'customer_snapshot') CustomerSnapshot? get customerSnapshot;@JsonKey(name: 'vehicle_snapshot') VehicleSnapshot? get vehicleSnapshot;@JsonKey(name: 'pricing_snapshot') PricingSnapshot? get pricingSnapshot;@JsonKey(name: 'commission_snapshot') CommissionSnapshot? get commissionSnapshot; List<String>? get attachments; String? get note; DateTime? get createdAt; DateTime? get updatedAt;
/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VehicleContractListModelCopyWith<VehicleContractListModel> get copyWith => _$VehicleContractListModelCopyWithImpl<VehicleContractListModel>(this as VehicleContractListModel, _$identity);

  /// Serializes this VehicleContractListModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VehicleContractListModel&&(identical(other.id, id) || other.id == id)&&(identical(other.contractNumber, contractNumber) || other.contractNumber == contractNumber)&&(identical(other.status, status) || other.status == status)&&(identical(other.customerSnapshot, customerSnapshot) || other.customerSnapshot == customerSnapshot)&&(identical(other.vehicleSnapshot, vehicleSnapshot) || other.vehicleSnapshot == vehicleSnapshot)&&(identical(other.pricingSnapshot, pricingSnapshot) || other.pricingSnapshot == pricingSnapshot)&&(identical(other.commissionSnapshot, commissionSnapshot) || other.commissionSnapshot == commissionSnapshot)&&const DeepCollectionEquality().equals(other.attachments, attachments)&&(identical(other.note, note) || other.note == note)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,contractNumber,status,customerSnapshot,vehicleSnapshot,pricingSnapshot,commissionSnapshot,const DeepCollectionEquality().hash(attachments),note,createdAt,updatedAt);

@override
String toString() {
  return 'VehicleContractListModel(id: $id, contractNumber: $contractNumber, status: $status, customerSnapshot: $customerSnapshot, vehicleSnapshot: $vehicleSnapshot, pricingSnapshot: $pricingSnapshot, commissionSnapshot: $commissionSnapshot, attachments: $attachments, note: $note, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class $VehicleContractListModelCopyWith<$Res>  {
  factory $VehicleContractListModelCopyWith(VehicleContractListModel value, $Res Function(VehicleContractListModel) _then) = _$VehicleContractListModelCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: '_id') String id,@JsonKey(name: 'contract_number') String? contractNumber, String status,@JsonKey(name: 'customer_snapshot') CustomerSnapshot? customerSnapshot,@JsonKey(name: 'vehicle_snapshot') VehicleSnapshot? vehicleSnapshot,@JsonKey(name: 'pricing_snapshot') PricingSnapshot? pricingSnapshot,@JsonKey(name: 'commission_snapshot') CommissionSnapshot? commissionSnapshot, List<String>? attachments, String? note, DateTime? createdAt, DateTime? updatedAt
});


$CustomerSnapshotCopyWith<$Res>? get customerSnapshot;$VehicleSnapshotCopyWith<$Res>? get vehicleSnapshot;$PricingSnapshotCopyWith<$Res>? get pricingSnapshot;$CommissionSnapshotCopyWith<$Res>? get commissionSnapshot;

}
/// @nodoc
class _$VehicleContractListModelCopyWithImpl<$Res>
    implements $VehicleContractListModelCopyWith<$Res> {
  _$VehicleContractListModelCopyWithImpl(this._self, this._then);

  final VehicleContractListModel _self;
  final $Res Function(VehicleContractListModel) _then;

/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? contractNumber = freezed,Object? status = null,Object? customerSnapshot = freezed,Object? vehicleSnapshot = freezed,Object? pricingSnapshot = freezed,Object? commissionSnapshot = freezed,Object? attachments = freezed,Object? note = freezed,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,contractNumber: freezed == contractNumber ? _self.contractNumber : contractNumber // ignore: cast_nullable_to_non_nullable
as String?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,customerSnapshot: freezed == customerSnapshot ? _self.customerSnapshot : customerSnapshot // ignore: cast_nullable_to_non_nullable
as CustomerSnapshot?,vehicleSnapshot: freezed == vehicleSnapshot ? _self.vehicleSnapshot : vehicleSnapshot // ignore: cast_nullable_to_non_nullable
as VehicleSnapshot?,pricingSnapshot: freezed == pricingSnapshot ? _self.pricingSnapshot : pricingSnapshot // ignore: cast_nullable_to_non_nullable
as PricingSnapshot?,commissionSnapshot: freezed == commissionSnapshot ? _self.commissionSnapshot : commissionSnapshot // ignore: cast_nullable_to_non_nullable
as CommissionSnapshot?,attachments: freezed == attachments ? _self.attachments : attachments // ignore: cast_nullable_to_non_nullable
as List<String>?,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CustomerSnapshotCopyWith<$Res>? get customerSnapshot {
    if (_self.customerSnapshot == null) {
    return null;
  }

  return $CustomerSnapshotCopyWith<$Res>(_self.customerSnapshot!, (value) {
    return _then(_self.copyWith(customerSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$VehicleSnapshotCopyWith<$Res>? get vehicleSnapshot {
    if (_self.vehicleSnapshot == null) {
    return null;
  }

  return $VehicleSnapshotCopyWith<$Res>(_self.vehicleSnapshot!, (value) {
    return _then(_self.copyWith(vehicleSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PricingSnapshotCopyWith<$Res>? get pricingSnapshot {
    if (_self.pricingSnapshot == null) {
    return null;
  }

  return $PricingSnapshotCopyWith<$Res>(_self.pricingSnapshot!, (value) {
    return _then(_self.copyWith(pricingSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CommissionSnapshotCopyWith<$Res>? get commissionSnapshot {
    if (_self.commissionSnapshot == null) {
    return null;
  }

  return $CommissionSnapshotCopyWith<$Res>(_self.commissionSnapshot!, (value) {
    return _then(_self.copyWith(commissionSnapshot: value));
  });
}
}


/// Adds pattern-matching-related methods to [VehicleContractListModel].
extension VehicleContractListModelPatterns on VehicleContractListModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _VehicleContractListModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _VehicleContractListModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _VehicleContractListModel value)  $default,){
final _that = this;
switch (_that) {
case _VehicleContractListModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _VehicleContractListModel value)?  $default,){
final _that = this;
switch (_that) {
case _VehicleContractListModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id, @JsonKey(name: 'contract_number')  String? contractNumber,  String status, @JsonKey(name: 'customer_snapshot')  CustomerSnapshot? customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshot? vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  PricingSnapshot? pricingSnapshot, @JsonKey(name: 'commission_snapshot')  CommissionSnapshot? commissionSnapshot,  List<String>? attachments,  String? note,  DateTime? createdAt,  DateTime? updatedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _VehicleContractListModel() when $default != null:
return $default(_that.id,_that.contractNumber,_that.status,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.commissionSnapshot,_that.attachments,_that.note,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id, @JsonKey(name: 'contract_number')  String? contractNumber,  String status, @JsonKey(name: 'customer_snapshot')  CustomerSnapshot? customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshot? vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  PricingSnapshot? pricingSnapshot, @JsonKey(name: 'commission_snapshot')  CommissionSnapshot? commissionSnapshot,  List<String>? attachments,  String? note,  DateTime? createdAt,  DateTime? updatedAt)  $default,) {final _that = this;
switch (_that) {
case _VehicleContractListModel():
return $default(_that.id,_that.contractNumber,_that.status,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.commissionSnapshot,_that.attachments,_that.note,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: '_id')  String id, @JsonKey(name: 'contract_number')  String? contractNumber,  String status, @JsonKey(name: 'customer_snapshot')  CustomerSnapshot? customerSnapshot, @JsonKey(name: 'vehicle_snapshot')  VehicleSnapshot? vehicleSnapshot, @JsonKey(name: 'pricing_snapshot')  PricingSnapshot? pricingSnapshot, @JsonKey(name: 'commission_snapshot')  CommissionSnapshot? commissionSnapshot,  List<String>? attachments,  String? note,  DateTime? createdAt,  DateTime? updatedAt)?  $default,) {final _that = this;
switch (_that) {
case _VehicleContractListModel() when $default != null:
return $default(_that.id,_that.contractNumber,_that.status,_that.customerSnapshot,_that.vehicleSnapshot,_that.pricingSnapshot,_that.commissionSnapshot,_that.attachments,_that.note,_that.createdAt,_that.updatedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _VehicleContractListModel implements VehicleContractListModel {
  const _VehicleContractListModel({@JsonKey(name: '_id') required this.id, @JsonKey(name: 'contract_number') this.contractNumber, required this.status, @JsonKey(name: 'customer_snapshot') this.customerSnapshot, @JsonKey(name: 'vehicle_snapshot') this.vehicleSnapshot, @JsonKey(name: 'pricing_snapshot') this.pricingSnapshot, @JsonKey(name: 'commission_snapshot') this.commissionSnapshot, final  List<String>? attachments, this.note, this.createdAt, this.updatedAt}): _attachments = attachments;
  factory _VehicleContractListModel.fromJson(Map<String, dynamic> json) => _$VehicleContractListModelFromJson(json);

@override@JsonKey(name: '_id') final  String id;
@override@JsonKey(name: 'contract_number') final  String? contractNumber;
@override final  String status;
@override@JsonKey(name: 'customer_snapshot') final  CustomerSnapshot? customerSnapshot;
@override@JsonKey(name: 'vehicle_snapshot') final  VehicleSnapshot? vehicleSnapshot;
@override@JsonKey(name: 'pricing_snapshot') final  PricingSnapshot? pricingSnapshot;
@override@JsonKey(name: 'commission_snapshot') final  CommissionSnapshot? commissionSnapshot;
 final  List<String>? _attachments;
@override List<String>? get attachments {
  final value = _attachments;
  if (value == null) return null;
  if (_attachments is EqualUnmodifiableListView) return _attachments;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(value);
}

@override final  String? note;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;

/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$VehicleContractListModelCopyWith<_VehicleContractListModel> get copyWith => __$VehicleContractListModelCopyWithImpl<_VehicleContractListModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$VehicleContractListModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _VehicleContractListModel&&(identical(other.id, id) || other.id == id)&&(identical(other.contractNumber, contractNumber) || other.contractNumber == contractNumber)&&(identical(other.status, status) || other.status == status)&&(identical(other.customerSnapshot, customerSnapshot) || other.customerSnapshot == customerSnapshot)&&(identical(other.vehicleSnapshot, vehicleSnapshot) || other.vehicleSnapshot == vehicleSnapshot)&&(identical(other.pricingSnapshot, pricingSnapshot) || other.pricingSnapshot == pricingSnapshot)&&(identical(other.commissionSnapshot, commissionSnapshot) || other.commissionSnapshot == commissionSnapshot)&&const DeepCollectionEquality().equals(other._attachments, _attachments)&&(identical(other.note, note) || other.note == note)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,contractNumber,status,customerSnapshot,vehicleSnapshot,pricingSnapshot,commissionSnapshot,const DeepCollectionEquality().hash(_attachments),note,createdAt,updatedAt);

@override
String toString() {
  return 'VehicleContractListModel(id: $id, contractNumber: $contractNumber, status: $status, customerSnapshot: $customerSnapshot, vehicleSnapshot: $vehicleSnapshot, pricingSnapshot: $pricingSnapshot, commissionSnapshot: $commissionSnapshot, attachments: $attachments, note: $note, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class _$VehicleContractListModelCopyWith<$Res> implements $VehicleContractListModelCopyWith<$Res> {
  factory _$VehicleContractListModelCopyWith(_VehicleContractListModel value, $Res Function(_VehicleContractListModel) _then) = __$VehicleContractListModelCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: '_id') String id,@JsonKey(name: 'contract_number') String? contractNumber, String status,@JsonKey(name: 'customer_snapshot') CustomerSnapshot? customerSnapshot,@JsonKey(name: 'vehicle_snapshot') VehicleSnapshot? vehicleSnapshot,@JsonKey(name: 'pricing_snapshot') PricingSnapshot? pricingSnapshot,@JsonKey(name: 'commission_snapshot') CommissionSnapshot? commissionSnapshot, List<String>? attachments, String? note, DateTime? createdAt, DateTime? updatedAt
});


@override $CustomerSnapshotCopyWith<$Res>? get customerSnapshot;@override $VehicleSnapshotCopyWith<$Res>? get vehicleSnapshot;@override $PricingSnapshotCopyWith<$Res>? get pricingSnapshot;@override $CommissionSnapshotCopyWith<$Res>? get commissionSnapshot;

}
/// @nodoc
class __$VehicleContractListModelCopyWithImpl<$Res>
    implements _$VehicleContractListModelCopyWith<$Res> {
  __$VehicleContractListModelCopyWithImpl(this._self, this._then);

  final _VehicleContractListModel _self;
  final $Res Function(_VehicleContractListModel) _then;

/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? contractNumber = freezed,Object? status = null,Object? customerSnapshot = freezed,Object? vehicleSnapshot = freezed,Object? pricingSnapshot = freezed,Object? commissionSnapshot = freezed,Object? attachments = freezed,Object? note = freezed,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_VehicleContractListModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,contractNumber: freezed == contractNumber ? _self.contractNumber : contractNumber // ignore: cast_nullable_to_non_nullable
as String?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,customerSnapshot: freezed == customerSnapshot ? _self.customerSnapshot : customerSnapshot // ignore: cast_nullable_to_non_nullable
as CustomerSnapshot?,vehicleSnapshot: freezed == vehicleSnapshot ? _self.vehicleSnapshot : vehicleSnapshot // ignore: cast_nullable_to_non_nullable
as VehicleSnapshot?,pricingSnapshot: freezed == pricingSnapshot ? _self.pricingSnapshot : pricingSnapshot // ignore: cast_nullable_to_non_nullable
as PricingSnapshot?,commissionSnapshot: freezed == commissionSnapshot ? _self.commissionSnapshot : commissionSnapshot // ignore: cast_nullable_to_non_nullable
as CommissionSnapshot?,attachments: freezed == attachments ? _self._attachments : attachments // ignore: cast_nullable_to_non_nullable
as List<String>?,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CustomerSnapshotCopyWith<$Res>? get customerSnapshot {
    if (_self.customerSnapshot == null) {
    return null;
  }

  return $CustomerSnapshotCopyWith<$Res>(_self.customerSnapshot!, (value) {
    return _then(_self.copyWith(customerSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$VehicleSnapshotCopyWith<$Res>? get vehicleSnapshot {
    if (_self.vehicleSnapshot == null) {
    return null;
  }

  return $VehicleSnapshotCopyWith<$Res>(_self.vehicleSnapshot!, (value) {
    return _then(_self.copyWith(vehicleSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PricingSnapshotCopyWith<$Res>? get pricingSnapshot {
    if (_self.pricingSnapshot == null) {
    return null;
  }

  return $PricingSnapshotCopyWith<$Res>(_self.pricingSnapshot!, (value) {
    return _then(_self.copyWith(pricingSnapshot: value));
  });
}/// Create a copy of VehicleContractListModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$CommissionSnapshotCopyWith<$Res>? get commissionSnapshot {
    if (_self.commissionSnapshot == null) {
    return null;
  }

  return $CommissionSnapshotCopyWith<$Res>(_self.commissionSnapshot!, (value) {
    return _then(_self.copyWith(commissionSnapshot: value));
  });
}
}


/// @nodoc
mixin _$CustomerSnapshot {

@JsonKey(name: 'full_name') String? get fullName; String? get phone; String? get email; String? get address;@JsonKey(name: 'id_number') String? get idNumber;@JsonKey(name: 'tax_code') String? get taxCode;@JsonKey(name: 'company_name') String? get companyName;
/// Create a copy of CustomerSnapshot
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CustomerSnapshotCopyWith<CustomerSnapshot> get copyWith => _$CustomerSnapshotCopyWithImpl<CustomerSnapshot>(this as CustomerSnapshot, _$identity);

  /// Serializes this CustomerSnapshot to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CustomerSnapshot&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.idNumber, idNumber) || other.idNumber == idNumber)&&(identical(other.taxCode, taxCode) || other.taxCode == taxCode)&&(identical(other.companyName, companyName) || other.companyName == companyName));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,fullName,phone,email,address,idNumber,taxCode,companyName);

@override
String toString() {
  return 'CustomerSnapshot(fullName: $fullName, phone: $phone, email: $email, address: $address, idNumber: $idNumber, taxCode: $taxCode, companyName: $companyName)';
}


}

/// @nodoc
abstract mixin class $CustomerSnapshotCopyWith<$Res>  {
  factory $CustomerSnapshotCopyWith(CustomerSnapshot value, $Res Function(CustomerSnapshot) _then) = _$CustomerSnapshotCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'full_name') String? fullName, String? phone, String? email, String? address,@JsonKey(name: 'id_number') String? idNumber,@JsonKey(name: 'tax_code') String? taxCode,@JsonKey(name: 'company_name') String? companyName
});




}
/// @nodoc
class _$CustomerSnapshotCopyWithImpl<$Res>
    implements $CustomerSnapshotCopyWith<$Res> {
  _$CustomerSnapshotCopyWithImpl(this._self, this._then);

  final CustomerSnapshot _self;
  final $Res Function(CustomerSnapshot) _then;

/// Create a copy of CustomerSnapshot
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


/// Adds pattern-matching-related methods to [CustomerSnapshot].
extension CustomerSnapshotPatterns on CustomerSnapshot {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _CustomerSnapshot value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _CustomerSnapshot() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _CustomerSnapshot value)  $default,){
final _that = this;
switch (_that) {
case _CustomerSnapshot():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _CustomerSnapshot value)?  $default,){
final _that = this;
switch (_that) {
case _CustomerSnapshot() when $default != null:
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
case _CustomerSnapshot() when $default != null:
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
case _CustomerSnapshot():
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
case _CustomerSnapshot() when $default != null:
return $default(_that.fullName,_that.phone,_that.email,_that.address,_that.idNumber,_that.taxCode,_that.companyName);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _CustomerSnapshot implements CustomerSnapshot {
  const _CustomerSnapshot({@JsonKey(name: 'full_name') this.fullName, this.phone, this.email, this.address, @JsonKey(name: 'id_number') this.idNumber, @JsonKey(name: 'tax_code') this.taxCode, @JsonKey(name: 'company_name') this.companyName});
  factory _CustomerSnapshot.fromJson(Map<String, dynamic> json) => _$CustomerSnapshotFromJson(json);

@override@JsonKey(name: 'full_name') final  String? fullName;
@override final  String? phone;
@override final  String? email;
@override final  String? address;
@override@JsonKey(name: 'id_number') final  String? idNumber;
@override@JsonKey(name: 'tax_code') final  String? taxCode;
@override@JsonKey(name: 'company_name') final  String? companyName;

/// Create a copy of CustomerSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CustomerSnapshotCopyWith<_CustomerSnapshot> get copyWith => __$CustomerSnapshotCopyWithImpl<_CustomerSnapshot>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CustomerSnapshotToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _CustomerSnapshot&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.idNumber, idNumber) || other.idNumber == idNumber)&&(identical(other.taxCode, taxCode) || other.taxCode == taxCode)&&(identical(other.companyName, companyName) || other.companyName == companyName));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,fullName,phone,email,address,idNumber,taxCode,companyName);

@override
String toString() {
  return 'CustomerSnapshot(fullName: $fullName, phone: $phone, email: $email, address: $address, idNumber: $idNumber, taxCode: $taxCode, companyName: $companyName)';
}


}

/// @nodoc
abstract mixin class _$CustomerSnapshotCopyWith<$Res> implements $CustomerSnapshotCopyWith<$Res> {
  factory _$CustomerSnapshotCopyWith(_CustomerSnapshot value, $Res Function(_CustomerSnapshot) _then) = __$CustomerSnapshotCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'full_name') String? fullName, String? phone, String? email, String? address,@JsonKey(name: 'id_number') String? idNumber,@JsonKey(name: 'tax_code') String? taxCode,@JsonKey(name: 'company_name') String? companyName
});




}
/// @nodoc
class __$CustomerSnapshotCopyWithImpl<$Res>
    implements _$CustomerSnapshotCopyWith<$Res> {
  __$CustomerSnapshotCopyWithImpl(this._self, this._then);

  final _CustomerSnapshot _self;
  final $Res Function(_CustomerSnapshot) _then;

/// Create a copy of CustomerSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? fullName = freezed,Object? phone = freezed,Object? email = freezed,Object? address = freezed,Object? idNumber = freezed,Object? taxCode = freezed,Object? companyName = freezed,}) {
  return _then(_CustomerSnapshot(
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
mixin _$VehicleSnapshot {

 String? get name; String? get brandName; String? get sku; String? get vin;@JsonKey(name: 'engine_number') String? get engineNumber; String? get color; int? get year; int? get odometer; String? get fuel; int? get seats;
/// Create a copy of VehicleSnapshot
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$VehicleSnapshotCopyWith<VehicleSnapshot> get copyWith => _$VehicleSnapshotCopyWithImpl<VehicleSnapshot>(this as VehicleSnapshot, _$identity);

  /// Serializes this VehicleSnapshot to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is VehicleSnapshot&&(identical(other.name, name) || other.name == name)&&(identical(other.brandName, brandName) || other.brandName == brandName)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,brandName,sku,vin,engineNumber,color,year,odometer,fuel,seats);

@override
String toString() {
  return 'VehicleSnapshot(name: $name, brandName: $brandName, sku: $sku, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats)';
}


}

/// @nodoc
abstract mixin class $VehicleSnapshotCopyWith<$Res>  {
  factory $VehicleSnapshotCopyWith(VehicleSnapshot value, $Res Function(VehicleSnapshot) _then) = _$VehicleSnapshotCopyWithImpl;
@useResult
$Res call({
 String? name, String? brandName, String? sku, String? vin,@JsonKey(name: 'engine_number') String? engineNumber, String? color, int? year, int? odometer, String? fuel, int? seats
});




}
/// @nodoc
class _$VehicleSnapshotCopyWithImpl<$Res>
    implements $VehicleSnapshotCopyWith<$Res> {
  _$VehicleSnapshotCopyWithImpl(this._self, this._then);

  final VehicleSnapshot _self;
  final $Res Function(VehicleSnapshot) _then;

/// Create a copy of VehicleSnapshot
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


/// Adds pattern-matching-related methods to [VehicleSnapshot].
extension VehicleSnapshotPatterns on VehicleSnapshot {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _VehicleSnapshot value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _VehicleSnapshot() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _VehicleSnapshot value)  $default,){
final _that = this;
switch (_that) {
case _VehicleSnapshot():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _VehicleSnapshot value)?  $default,){
final _that = this;
switch (_that) {
case _VehicleSnapshot() when $default != null:
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
case _VehicleSnapshot() when $default != null:
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
case _VehicleSnapshot():
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
case _VehicleSnapshot() when $default != null:
return $default(_that.name,_that.brandName,_that.sku,_that.vin,_that.engineNumber,_that.color,_that.year,_that.odometer,_that.fuel,_that.seats);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _VehicleSnapshot implements VehicleSnapshot {
  const _VehicleSnapshot({this.name, this.brandName, this.sku, this.vin, @JsonKey(name: 'engine_number') this.engineNumber, this.color, this.year, this.odometer, this.fuel, this.seats});
  factory _VehicleSnapshot.fromJson(Map<String, dynamic> json) => _$VehicleSnapshotFromJson(json);

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

/// Create a copy of VehicleSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$VehicleSnapshotCopyWith<_VehicleSnapshot> get copyWith => __$VehicleSnapshotCopyWithImpl<_VehicleSnapshot>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$VehicleSnapshotToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _VehicleSnapshot&&(identical(other.name, name) || other.name == name)&&(identical(other.brandName, brandName) || other.brandName == brandName)&&(identical(other.sku, sku) || other.sku == sku)&&(identical(other.vin, vin) || other.vin == vin)&&(identical(other.engineNumber, engineNumber) || other.engineNumber == engineNumber)&&(identical(other.color, color) || other.color == color)&&(identical(other.year, year) || other.year == year)&&(identical(other.odometer, odometer) || other.odometer == odometer)&&(identical(other.fuel, fuel) || other.fuel == fuel)&&(identical(other.seats, seats) || other.seats == seats));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,brandName,sku,vin,engineNumber,color,year,odometer,fuel,seats);

@override
String toString() {
  return 'VehicleSnapshot(name: $name, brandName: $brandName, sku: $sku, vin: $vin, engineNumber: $engineNumber, color: $color, year: $year, odometer: $odometer, fuel: $fuel, seats: $seats)';
}


}

/// @nodoc
abstract mixin class _$VehicleSnapshotCopyWith<$Res> implements $VehicleSnapshotCopyWith<$Res> {
  factory _$VehicleSnapshotCopyWith(_VehicleSnapshot value, $Res Function(_VehicleSnapshot) _then) = __$VehicleSnapshotCopyWithImpl;
@override @useResult
$Res call({
 String? name, String? brandName, String? sku, String? vin,@JsonKey(name: 'engine_number') String? engineNumber, String? color, int? year, int? odometer, String? fuel, int? seats
});




}
/// @nodoc
class __$VehicleSnapshotCopyWithImpl<$Res>
    implements _$VehicleSnapshotCopyWith<$Res> {
  __$VehicleSnapshotCopyWithImpl(this._self, this._then);

  final _VehicleSnapshot _self;
  final $Res Function(_VehicleSnapshot) _then;

/// Create a copy of VehicleSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? name = freezed,Object? brandName = freezed,Object? sku = freezed,Object? vin = freezed,Object? engineNumber = freezed,Object? color = freezed,Object? year = freezed,Object? odometer = freezed,Object? fuel = freezed,Object? seats = freezed,}) {
  return _then(_VehicleSnapshot(
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
mixin _$PricingSnapshot {

@JsonKey(name: 'list_price') num? get listPrice;@JsonKey(name: 'sale_price') num? get salePrice; num? get discount; num? get vat;@JsonKey(name: 'registration_fee') num? get registrationFee;@JsonKey(name: 'insurance_fee') num? get insuranceFee;@JsonKey(name: 'other_fees') num? get otherFees;@JsonKey(name: 'grand_total') num? get grandTotal;
/// Create a copy of PricingSnapshot
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PricingSnapshotCopyWith<PricingSnapshot> get copyWith => _$PricingSnapshotCopyWithImpl<PricingSnapshot>(this as PricingSnapshot, _$identity);

  /// Serializes this PricingSnapshot to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PricingSnapshot&&(identical(other.listPrice, listPrice) || other.listPrice == listPrice)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.discount, discount) || other.discount == discount)&&(identical(other.vat, vat) || other.vat == vat)&&(identical(other.registrationFee, registrationFee) || other.registrationFee == registrationFee)&&(identical(other.insuranceFee, insuranceFee) || other.insuranceFee == insuranceFee)&&(identical(other.otherFees, otherFees) || other.otherFees == otherFees)&&(identical(other.grandTotal, grandTotal) || other.grandTotal == grandTotal));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,listPrice,salePrice,discount,vat,registrationFee,insuranceFee,otherFees,grandTotal);

@override
String toString() {
  return 'PricingSnapshot(listPrice: $listPrice, salePrice: $salePrice, discount: $discount, vat: $vat, registrationFee: $registrationFee, insuranceFee: $insuranceFee, otherFees: $otherFees, grandTotal: $grandTotal)';
}


}

/// @nodoc
abstract mixin class $PricingSnapshotCopyWith<$Res>  {
  factory $PricingSnapshotCopyWith(PricingSnapshot value, $Res Function(PricingSnapshot) _then) = _$PricingSnapshotCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'list_price') num? listPrice,@JsonKey(name: 'sale_price') num? salePrice, num? discount, num? vat,@JsonKey(name: 'registration_fee') num? registrationFee,@JsonKey(name: 'insurance_fee') num? insuranceFee,@JsonKey(name: 'other_fees') num? otherFees,@JsonKey(name: 'grand_total') num? grandTotal
});




}
/// @nodoc
class _$PricingSnapshotCopyWithImpl<$Res>
    implements $PricingSnapshotCopyWith<$Res> {
  _$PricingSnapshotCopyWithImpl(this._self, this._then);

  final PricingSnapshot _self;
  final $Res Function(PricingSnapshot) _then;

/// Create a copy of PricingSnapshot
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? listPrice = freezed,Object? salePrice = freezed,Object? discount = freezed,Object? vat = freezed,Object? registrationFee = freezed,Object? insuranceFee = freezed,Object? otherFees = freezed,Object? grandTotal = freezed,}) {
  return _then(_self.copyWith(
listPrice: freezed == listPrice ? _self.listPrice : listPrice // ignore: cast_nullable_to_non_nullable
as num?,salePrice: freezed == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num?,discount: freezed == discount ? _self.discount : discount // ignore: cast_nullable_to_non_nullable
as num?,vat: freezed == vat ? _self.vat : vat // ignore: cast_nullable_to_non_nullable
as num?,registrationFee: freezed == registrationFee ? _self.registrationFee : registrationFee // ignore: cast_nullable_to_non_nullable
as num?,insuranceFee: freezed == insuranceFee ? _self.insuranceFee : insuranceFee // ignore: cast_nullable_to_non_nullable
as num?,otherFees: freezed == otherFees ? _self.otherFees : otherFees // ignore: cast_nullable_to_non_nullable
as num?,grandTotal: freezed == grandTotal ? _self.grandTotal : grandTotal // ignore: cast_nullable_to_non_nullable
as num?,
  ));
}

}


/// Adds pattern-matching-related methods to [PricingSnapshot].
extension PricingSnapshotPatterns on PricingSnapshot {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _PricingSnapshot value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _PricingSnapshot() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _PricingSnapshot value)  $default,){
final _that = this;
switch (_that) {
case _PricingSnapshot():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _PricingSnapshot value)?  $default,){
final _that = this;
switch (_that) {
case _PricingSnapshot() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'list_price')  num? listPrice, @JsonKey(name: 'sale_price')  num? salePrice,  num? discount,  num? vat, @JsonKey(name: 'registration_fee')  num? registrationFee, @JsonKey(name: 'insurance_fee')  num? insuranceFee, @JsonKey(name: 'other_fees')  num? otherFees, @JsonKey(name: 'grand_total')  num? grandTotal)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _PricingSnapshot() when $default != null:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'list_price')  num? listPrice, @JsonKey(name: 'sale_price')  num? salePrice,  num? discount,  num? vat, @JsonKey(name: 'registration_fee')  num? registrationFee, @JsonKey(name: 'insurance_fee')  num? insuranceFee, @JsonKey(name: 'other_fees')  num? otherFees, @JsonKey(name: 'grand_total')  num? grandTotal)  $default,) {final _that = this;
switch (_that) {
case _PricingSnapshot():
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'list_price')  num? listPrice, @JsonKey(name: 'sale_price')  num? salePrice,  num? discount,  num? vat, @JsonKey(name: 'registration_fee')  num? registrationFee, @JsonKey(name: 'insurance_fee')  num? insuranceFee, @JsonKey(name: 'other_fees')  num? otherFees, @JsonKey(name: 'grand_total')  num? grandTotal)?  $default,) {final _that = this;
switch (_that) {
case _PricingSnapshot() when $default != null:
return $default(_that.listPrice,_that.salePrice,_that.discount,_that.vat,_that.registrationFee,_that.insuranceFee,_that.otherFees,_that.grandTotal);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _PricingSnapshot implements PricingSnapshot {
  const _PricingSnapshot({@JsonKey(name: 'list_price') this.listPrice, @JsonKey(name: 'sale_price') this.salePrice, this.discount, this.vat, @JsonKey(name: 'registration_fee') this.registrationFee, @JsonKey(name: 'insurance_fee') this.insuranceFee, @JsonKey(name: 'other_fees') this.otherFees, @JsonKey(name: 'grand_total') this.grandTotal});
  factory _PricingSnapshot.fromJson(Map<String, dynamic> json) => _$PricingSnapshotFromJson(json);

@override@JsonKey(name: 'list_price') final  num? listPrice;
@override@JsonKey(name: 'sale_price') final  num? salePrice;
@override final  num? discount;
@override final  num? vat;
@override@JsonKey(name: 'registration_fee') final  num? registrationFee;
@override@JsonKey(name: 'insurance_fee') final  num? insuranceFee;
@override@JsonKey(name: 'other_fees') final  num? otherFees;
@override@JsonKey(name: 'grand_total') final  num? grandTotal;

/// Create a copy of PricingSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PricingSnapshotCopyWith<_PricingSnapshot> get copyWith => __$PricingSnapshotCopyWithImpl<_PricingSnapshot>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PricingSnapshotToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _PricingSnapshot&&(identical(other.listPrice, listPrice) || other.listPrice == listPrice)&&(identical(other.salePrice, salePrice) || other.salePrice == salePrice)&&(identical(other.discount, discount) || other.discount == discount)&&(identical(other.vat, vat) || other.vat == vat)&&(identical(other.registrationFee, registrationFee) || other.registrationFee == registrationFee)&&(identical(other.insuranceFee, insuranceFee) || other.insuranceFee == insuranceFee)&&(identical(other.otherFees, otherFees) || other.otherFees == otherFees)&&(identical(other.grandTotal, grandTotal) || other.grandTotal == grandTotal));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,listPrice,salePrice,discount,vat,registrationFee,insuranceFee,otherFees,grandTotal);

@override
String toString() {
  return 'PricingSnapshot(listPrice: $listPrice, salePrice: $salePrice, discount: $discount, vat: $vat, registrationFee: $registrationFee, insuranceFee: $insuranceFee, otherFees: $otherFees, grandTotal: $grandTotal)';
}


}

/// @nodoc
abstract mixin class _$PricingSnapshotCopyWith<$Res> implements $PricingSnapshotCopyWith<$Res> {
  factory _$PricingSnapshotCopyWith(_PricingSnapshot value, $Res Function(_PricingSnapshot) _then) = __$PricingSnapshotCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'list_price') num? listPrice,@JsonKey(name: 'sale_price') num? salePrice, num? discount, num? vat,@JsonKey(name: 'registration_fee') num? registrationFee,@JsonKey(name: 'insurance_fee') num? insuranceFee,@JsonKey(name: 'other_fees') num? otherFees,@JsonKey(name: 'grand_total') num? grandTotal
});




}
/// @nodoc
class __$PricingSnapshotCopyWithImpl<$Res>
    implements _$PricingSnapshotCopyWith<$Res> {
  __$PricingSnapshotCopyWithImpl(this._self, this._then);

  final _PricingSnapshot _self;
  final $Res Function(_PricingSnapshot) _then;

/// Create a copy of PricingSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? listPrice = freezed,Object? salePrice = freezed,Object? discount = freezed,Object? vat = freezed,Object? registrationFee = freezed,Object? insuranceFee = freezed,Object? otherFees = freezed,Object? grandTotal = freezed,}) {
  return _then(_PricingSnapshot(
listPrice: freezed == listPrice ? _self.listPrice : listPrice // ignore: cast_nullable_to_non_nullable
as num?,salePrice: freezed == salePrice ? _self.salePrice : salePrice // ignore: cast_nullable_to_non_nullable
as num?,discount: freezed == discount ? _self.discount : discount // ignore: cast_nullable_to_non_nullable
as num?,vat: freezed == vat ? _self.vat : vat // ignore: cast_nullable_to_non_nullable
as num?,registrationFee: freezed == registrationFee ? _self.registrationFee : registrationFee // ignore: cast_nullable_to_non_nullable
as num?,insuranceFee: freezed == insuranceFee ? _self.insuranceFee : insuranceFee // ignore: cast_nullable_to_non_nullable
as num?,otherFees: freezed == otherFees ? _self.otherFees : otherFees // ignore: cast_nullable_to_non_nullable
as num?,grandTotal: freezed == grandTotal ? _self.grandTotal : grandTotal // ignore: cast_nullable_to_non_nullable
as num?,
  ));
}


}


/// @nodoc
mixin _$CommissionSnapshot {

@JsonKey(name: 'policy_code') String? get policyCode;@JsonKey(name: 'basis_amount') num? get basisAmount; num? get rate; num? get amount;
/// Create a copy of CommissionSnapshot
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CommissionSnapshotCopyWith<CommissionSnapshot> get copyWith => _$CommissionSnapshotCopyWithImpl<CommissionSnapshot>(this as CommissionSnapshot, _$identity);

  /// Serializes this CommissionSnapshot to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is CommissionSnapshot&&(identical(other.policyCode, policyCode) || other.policyCode == policyCode)&&(identical(other.basisAmount, basisAmount) || other.basisAmount == basisAmount)&&(identical(other.rate, rate) || other.rate == rate)&&(identical(other.amount, amount) || other.amount == amount));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,policyCode,basisAmount,rate,amount);

@override
String toString() {
  return 'CommissionSnapshot(policyCode: $policyCode, basisAmount: $basisAmount, rate: $rate, amount: $amount)';
}


}

/// @nodoc
abstract mixin class $CommissionSnapshotCopyWith<$Res>  {
  factory $CommissionSnapshotCopyWith(CommissionSnapshot value, $Res Function(CommissionSnapshot) _then) = _$CommissionSnapshotCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: 'policy_code') String? policyCode,@JsonKey(name: 'basis_amount') num? basisAmount, num? rate, num? amount
});




}
/// @nodoc
class _$CommissionSnapshotCopyWithImpl<$Res>
    implements $CommissionSnapshotCopyWith<$Res> {
  _$CommissionSnapshotCopyWithImpl(this._self, this._then);

  final CommissionSnapshot _self;
  final $Res Function(CommissionSnapshot) _then;

/// Create a copy of CommissionSnapshot
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? policyCode = freezed,Object? basisAmount = freezed,Object? rate = freezed,Object? amount = freezed,}) {
  return _then(_self.copyWith(
policyCode: freezed == policyCode ? _self.policyCode : policyCode // ignore: cast_nullable_to_non_nullable
as String?,basisAmount: freezed == basisAmount ? _self.basisAmount : basisAmount // ignore: cast_nullable_to_non_nullable
as num?,rate: freezed == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as num?,amount: freezed == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as num?,
  ));
}

}


/// Adds pattern-matching-related methods to [CommissionSnapshot].
extension CommissionSnapshotPatterns on CommissionSnapshot {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _CommissionSnapshot value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _CommissionSnapshot() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _CommissionSnapshot value)  $default,){
final _that = this;
switch (_that) {
case _CommissionSnapshot():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _CommissionSnapshot value)?  $default,){
final _that = this;
switch (_that) {
case _CommissionSnapshot() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: 'policy_code')  String? policyCode, @JsonKey(name: 'basis_amount')  num? basisAmount,  num? rate,  num? amount)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _CommissionSnapshot() when $default != null:
return $default(_that.policyCode,_that.basisAmount,_that.rate,_that.amount);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: 'policy_code')  String? policyCode, @JsonKey(name: 'basis_amount')  num? basisAmount,  num? rate,  num? amount)  $default,) {final _that = this;
switch (_that) {
case _CommissionSnapshot():
return $default(_that.policyCode,_that.basisAmount,_that.rate,_that.amount);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: 'policy_code')  String? policyCode, @JsonKey(name: 'basis_amount')  num? basisAmount,  num? rate,  num? amount)?  $default,) {final _that = this;
switch (_that) {
case _CommissionSnapshot() when $default != null:
return $default(_that.policyCode,_that.basisAmount,_that.rate,_that.amount);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _CommissionSnapshot implements CommissionSnapshot {
  const _CommissionSnapshot({@JsonKey(name: 'policy_code') this.policyCode, @JsonKey(name: 'basis_amount') this.basisAmount, this.rate, this.amount});
  factory _CommissionSnapshot.fromJson(Map<String, dynamic> json) => _$CommissionSnapshotFromJson(json);

@override@JsonKey(name: 'policy_code') final  String? policyCode;
@override@JsonKey(name: 'basis_amount') final  num? basisAmount;
@override final  num? rate;
@override final  num? amount;

/// Create a copy of CommissionSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CommissionSnapshotCopyWith<_CommissionSnapshot> get copyWith => __$CommissionSnapshotCopyWithImpl<_CommissionSnapshot>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CommissionSnapshotToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _CommissionSnapshot&&(identical(other.policyCode, policyCode) || other.policyCode == policyCode)&&(identical(other.basisAmount, basisAmount) || other.basisAmount == basisAmount)&&(identical(other.rate, rate) || other.rate == rate)&&(identical(other.amount, amount) || other.amount == amount));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,policyCode,basisAmount,rate,amount);

@override
String toString() {
  return 'CommissionSnapshot(policyCode: $policyCode, basisAmount: $basisAmount, rate: $rate, amount: $amount)';
}


}

/// @nodoc
abstract mixin class _$CommissionSnapshotCopyWith<$Res> implements $CommissionSnapshotCopyWith<$Res> {
  factory _$CommissionSnapshotCopyWith(_CommissionSnapshot value, $Res Function(_CommissionSnapshot) _then) = __$CommissionSnapshotCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: 'policy_code') String? policyCode,@JsonKey(name: 'basis_amount') num? basisAmount, num? rate, num? amount
});




}
/// @nodoc
class __$CommissionSnapshotCopyWithImpl<$Res>
    implements _$CommissionSnapshotCopyWith<$Res> {
  __$CommissionSnapshotCopyWithImpl(this._self, this._then);

  final _CommissionSnapshot _self;
  final $Res Function(_CommissionSnapshot) _then;

/// Create a copy of CommissionSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? policyCode = freezed,Object? basisAmount = freezed,Object? rate = freezed,Object? amount = freezed,}) {
  return _then(_CommissionSnapshot(
policyCode: freezed == policyCode ? _self.policyCode : policyCode // ignore: cast_nullable_to_non_nullable
as String?,basisAmount: freezed == basisAmount ? _self.basisAmount : basisAmount // ignore: cast_nullable_to_non_nullable
as num?,rate: freezed == rate ? _self.rate : rate // ignore: cast_nullable_to_non_nullable
as num?,amount: freezed == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as num?,
  ));
}


}

// dart format on
