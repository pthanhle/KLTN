// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'test_drive_booking.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$TestDriveBooking {

@JsonKey(name: '_id') String get id; String get fullName; String get phoneNumber; String get bookingType;// 'showroom', 'home', 'waitlist'
 String? get showroomBranch; String? get city; String? get district; String? get ward; String? get addressDetail; String? get selectedDate;// DD/MM/YYYY
 String? get selectedTimeSlot; bool get hasDriverLicense; String? get note; String get status;// 'Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled'
 String? get targetCarSku; AssignedStaff? get assignedStaff; List<RequestedStaff>? get requestedStaff; String? get createdAt;
/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$TestDriveBookingCopyWith<TestDriveBooking> get copyWith => _$TestDriveBookingCopyWithImpl<TestDriveBooking>(this as TestDriveBooking, _$identity);

  /// Serializes this TestDriveBooking to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TestDriveBooking&&(identical(other.id, id) || other.id == id)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phoneNumber, phoneNumber) || other.phoneNumber == phoneNumber)&&(identical(other.bookingType, bookingType) || other.bookingType == bookingType)&&(identical(other.showroomBranch, showroomBranch) || other.showroomBranch == showroomBranch)&&(identical(other.city, city) || other.city == city)&&(identical(other.district, district) || other.district == district)&&(identical(other.ward, ward) || other.ward == ward)&&(identical(other.addressDetail, addressDetail) || other.addressDetail == addressDetail)&&(identical(other.selectedDate, selectedDate) || other.selectedDate == selectedDate)&&(identical(other.selectedTimeSlot, selectedTimeSlot) || other.selectedTimeSlot == selectedTimeSlot)&&(identical(other.hasDriverLicense, hasDriverLicense) || other.hasDriverLicense == hasDriverLicense)&&(identical(other.note, note) || other.note == note)&&(identical(other.status, status) || other.status == status)&&(identical(other.targetCarSku, targetCarSku) || other.targetCarSku == targetCarSku)&&(identical(other.assignedStaff, assignedStaff) || other.assignedStaff == assignedStaff)&&const DeepCollectionEquality().equals(other.requestedStaff, requestedStaff)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,fullName,phoneNumber,bookingType,showroomBranch,city,district,ward,addressDetail,selectedDate,selectedTimeSlot,hasDriverLicense,note,status,targetCarSku,assignedStaff,const DeepCollectionEquality().hash(requestedStaff),createdAt);

@override
String toString() {
  return 'TestDriveBooking(id: $id, fullName: $fullName, phoneNumber: $phoneNumber, bookingType: $bookingType, showroomBranch: $showroomBranch, city: $city, district: $district, ward: $ward, addressDetail: $addressDetail, selectedDate: $selectedDate, selectedTimeSlot: $selectedTimeSlot, hasDriverLicense: $hasDriverLicense, note: $note, status: $status, targetCarSku: $targetCarSku, assignedStaff: $assignedStaff, requestedStaff: $requestedStaff, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class $TestDriveBookingCopyWith<$Res>  {
  factory $TestDriveBookingCopyWith(TestDriveBooking value, $Res Function(TestDriveBooking) _then) = _$TestDriveBookingCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: '_id') String id, String fullName, String phoneNumber, String bookingType, String? showroomBranch, String? city, String? district, String? ward, String? addressDetail, String? selectedDate, String? selectedTimeSlot, bool hasDriverLicense, String? note, String status, String? targetCarSku, AssignedStaff? assignedStaff, List<RequestedStaff>? requestedStaff, String? createdAt
});


$AssignedStaffCopyWith<$Res>? get assignedStaff;

}
/// @nodoc
class _$TestDriveBookingCopyWithImpl<$Res>
    implements $TestDriveBookingCopyWith<$Res> {
  _$TestDriveBookingCopyWithImpl(this._self, this._then);

  final TestDriveBooking _self;
  final $Res Function(TestDriveBooking) _then;

/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? fullName = null,Object? phoneNumber = null,Object? bookingType = null,Object? showroomBranch = freezed,Object? city = freezed,Object? district = freezed,Object? ward = freezed,Object? addressDetail = freezed,Object? selectedDate = freezed,Object? selectedTimeSlot = freezed,Object? hasDriverLicense = null,Object? note = freezed,Object? status = null,Object? targetCarSku = freezed,Object? assignedStaff = freezed,Object? requestedStaff = freezed,Object? createdAt = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,phoneNumber: null == phoneNumber ? _self.phoneNumber : phoneNumber // ignore: cast_nullable_to_non_nullable
as String,bookingType: null == bookingType ? _self.bookingType : bookingType // ignore: cast_nullable_to_non_nullable
as String,showroomBranch: freezed == showroomBranch ? _self.showroomBranch : showroomBranch // ignore: cast_nullable_to_non_nullable
as String?,city: freezed == city ? _self.city : city // ignore: cast_nullable_to_non_nullable
as String?,district: freezed == district ? _self.district : district // ignore: cast_nullable_to_non_nullable
as String?,ward: freezed == ward ? _self.ward : ward // ignore: cast_nullable_to_non_nullable
as String?,addressDetail: freezed == addressDetail ? _self.addressDetail : addressDetail // ignore: cast_nullable_to_non_nullable
as String?,selectedDate: freezed == selectedDate ? _self.selectedDate : selectedDate // ignore: cast_nullable_to_non_nullable
as String?,selectedTimeSlot: freezed == selectedTimeSlot ? _self.selectedTimeSlot : selectedTimeSlot // ignore: cast_nullable_to_non_nullable
as String?,hasDriverLicense: null == hasDriverLicense ? _self.hasDriverLicense : hasDriverLicense // ignore: cast_nullable_to_non_nullable
as bool,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,targetCarSku: freezed == targetCarSku ? _self.targetCarSku : targetCarSku // ignore: cast_nullable_to_non_nullable
as String?,assignedStaff: freezed == assignedStaff ? _self.assignedStaff : assignedStaff // ignore: cast_nullable_to_non_nullable
as AssignedStaff?,requestedStaff: freezed == requestedStaff ? _self.requestedStaff : requestedStaff // ignore: cast_nullable_to_non_nullable
as List<RequestedStaff>?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AssignedStaffCopyWith<$Res>? get assignedStaff {
    if (_self.assignedStaff == null) {
    return null;
  }

  return $AssignedStaffCopyWith<$Res>(_self.assignedStaff!, (value) {
    return _then(_self.copyWith(assignedStaff: value));
  });
}
}


/// Adds pattern-matching-related methods to [TestDriveBooking].
extension TestDriveBookingPatterns on TestDriveBooking {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _TestDriveBooking value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _TestDriveBooking() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _TestDriveBooking value)  $default,){
final _that = this;
switch (_that) {
case _TestDriveBooking():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _TestDriveBooking value)?  $default,){
final _that = this;
switch (_that) {
case _TestDriveBooking() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String fullName,  String phoneNumber,  String bookingType,  String? showroomBranch,  String? city,  String? district,  String? ward,  String? addressDetail,  String? selectedDate,  String? selectedTimeSlot,  bool hasDriverLicense,  String? note,  String status,  String? targetCarSku,  AssignedStaff? assignedStaff,  List<RequestedStaff>? requestedStaff,  String? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _TestDriveBooking() when $default != null:
return $default(_that.id,_that.fullName,_that.phoneNumber,_that.bookingType,_that.showroomBranch,_that.city,_that.district,_that.ward,_that.addressDetail,_that.selectedDate,_that.selectedTimeSlot,_that.hasDriverLicense,_that.note,_that.status,_that.targetCarSku,_that.assignedStaff,_that.requestedStaff,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String fullName,  String phoneNumber,  String bookingType,  String? showroomBranch,  String? city,  String? district,  String? ward,  String? addressDetail,  String? selectedDate,  String? selectedTimeSlot,  bool hasDriverLicense,  String? note,  String status,  String? targetCarSku,  AssignedStaff? assignedStaff,  List<RequestedStaff>? requestedStaff,  String? createdAt)  $default,) {final _that = this;
switch (_that) {
case _TestDriveBooking():
return $default(_that.id,_that.fullName,_that.phoneNumber,_that.bookingType,_that.showroomBranch,_that.city,_that.district,_that.ward,_that.addressDetail,_that.selectedDate,_that.selectedTimeSlot,_that.hasDriverLicense,_that.note,_that.status,_that.targetCarSku,_that.assignedStaff,_that.requestedStaff,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: '_id')  String id,  String fullName,  String phoneNumber,  String bookingType,  String? showroomBranch,  String? city,  String? district,  String? ward,  String? addressDetail,  String? selectedDate,  String? selectedTimeSlot,  bool hasDriverLicense,  String? note,  String status,  String? targetCarSku,  AssignedStaff? assignedStaff,  List<RequestedStaff>? requestedStaff,  String? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _TestDriveBooking() when $default != null:
return $default(_that.id,_that.fullName,_that.phoneNumber,_that.bookingType,_that.showroomBranch,_that.city,_that.district,_that.ward,_that.addressDetail,_that.selectedDate,_that.selectedTimeSlot,_that.hasDriverLicense,_that.note,_that.status,_that.targetCarSku,_that.assignedStaff,_that.requestedStaff,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _TestDriveBooking implements TestDriveBooking {
  const _TestDriveBooking({@JsonKey(name: '_id') required this.id, required this.fullName, required this.phoneNumber, required this.bookingType, this.showroomBranch, this.city, this.district, this.ward, this.addressDetail, this.selectedDate, this.selectedTimeSlot, this.hasDriverLicense = false, this.note, required this.status, this.targetCarSku, this.assignedStaff, final  List<RequestedStaff>? requestedStaff, this.createdAt}): _requestedStaff = requestedStaff;
  factory _TestDriveBooking.fromJson(Map<String, dynamic> json) => _$TestDriveBookingFromJson(json);

@override@JsonKey(name: '_id') final  String id;
@override final  String fullName;
@override final  String phoneNumber;
@override final  String bookingType;
// 'showroom', 'home', 'waitlist'
@override final  String? showroomBranch;
@override final  String? city;
@override final  String? district;
@override final  String? ward;
@override final  String? addressDetail;
@override final  String? selectedDate;
// DD/MM/YYYY
@override final  String? selectedTimeSlot;
@override@JsonKey() final  bool hasDriverLicense;
@override final  String? note;
@override final  String status;
// 'Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled'
@override final  String? targetCarSku;
@override final  AssignedStaff? assignedStaff;
 final  List<RequestedStaff>? _requestedStaff;
@override List<RequestedStaff>? get requestedStaff {
  final value = _requestedStaff;
  if (value == null) return null;
  if (_requestedStaff is EqualUnmodifiableListView) return _requestedStaff;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(value);
}

@override final  String? createdAt;

/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$TestDriveBookingCopyWith<_TestDriveBooking> get copyWith => __$TestDriveBookingCopyWithImpl<_TestDriveBooking>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$TestDriveBookingToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _TestDriveBooking&&(identical(other.id, id) || other.id == id)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.phoneNumber, phoneNumber) || other.phoneNumber == phoneNumber)&&(identical(other.bookingType, bookingType) || other.bookingType == bookingType)&&(identical(other.showroomBranch, showroomBranch) || other.showroomBranch == showroomBranch)&&(identical(other.city, city) || other.city == city)&&(identical(other.district, district) || other.district == district)&&(identical(other.ward, ward) || other.ward == ward)&&(identical(other.addressDetail, addressDetail) || other.addressDetail == addressDetail)&&(identical(other.selectedDate, selectedDate) || other.selectedDate == selectedDate)&&(identical(other.selectedTimeSlot, selectedTimeSlot) || other.selectedTimeSlot == selectedTimeSlot)&&(identical(other.hasDriverLicense, hasDriverLicense) || other.hasDriverLicense == hasDriverLicense)&&(identical(other.note, note) || other.note == note)&&(identical(other.status, status) || other.status == status)&&(identical(other.targetCarSku, targetCarSku) || other.targetCarSku == targetCarSku)&&(identical(other.assignedStaff, assignedStaff) || other.assignedStaff == assignedStaff)&&const DeepCollectionEquality().equals(other._requestedStaff, _requestedStaff)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,fullName,phoneNumber,bookingType,showroomBranch,city,district,ward,addressDetail,selectedDate,selectedTimeSlot,hasDriverLicense,note,status,targetCarSku,assignedStaff,const DeepCollectionEquality().hash(_requestedStaff),createdAt);

@override
String toString() {
  return 'TestDriveBooking(id: $id, fullName: $fullName, phoneNumber: $phoneNumber, bookingType: $bookingType, showroomBranch: $showroomBranch, city: $city, district: $district, ward: $ward, addressDetail: $addressDetail, selectedDate: $selectedDate, selectedTimeSlot: $selectedTimeSlot, hasDriverLicense: $hasDriverLicense, note: $note, status: $status, targetCarSku: $targetCarSku, assignedStaff: $assignedStaff, requestedStaff: $requestedStaff, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$TestDriveBookingCopyWith<$Res> implements $TestDriveBookingCopyWith<$Res> {
  factory _$TestDriveBookingCopyWith(_TestDriveBooking value, $Res Function(_TestDriveBooking) _then) = __$TestDriveBookingCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: '_id') String id, String fullName, String phoneNumber, String bookingType, String? showroomBranch, String? city, String? district, String? ward, String? addressDetail, String? selectedDate, String? selectedTimeSlot, bool hasDriverLicense, String? note, String status, String? targetCarSku, AssignedStaff? assignedStaff, List<RequestedStaff>? requestedStaff, String? createdAt
});


@override $AssignedStaffCopyWith<$Res>? get assignedStaff;

}
/// @nodoc
class __$TestDriveBookingCopyWithImpl<$Res>
    implements _$TestDriveBookingCopyWith<$Res> {
  __$TestDriveBookingCopyWithImpl(this._self, this._then);

  final _TestDriveBooking _self;
  final $Res Function(_TestDriveBooking) _then;

/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? fullName = null,Object? phoneNumber = null,Object? bookingType = null,Object? showroomBranch = freezed,Object? city = freezed,Object? district = freezed,Object? ward = freezed,Object? addressDetail = freezed,Object? selectedDate = freezed,Object? selectedTimeSlot = freezed,Object? hasDriverLicense = null,Object? note = freezed,Object? status = null,Object? targetCarSku = freezed,Object? assignedStaff = freezed,Object? requestedStaff = freezed,Object? createdAt = freezed,}) {
  return _then(_TestDriveBooking(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,phoneNumber: null == phoneNumber ? _self.phoneNumber : phoneNumber // ignore: cast_nullable_to_non_nullable
as String,bookingType: null == bookingType ? _self.bookingType : bookingType // ignore: cast_nullable_to_non_nullable
as String,showroomBranch: freezed == showroomBranch ? _self.showroomBranch : showroomBranch // ignore: cast_nullable_to_non_nullable
as String?,city: freezed == city ? _self.city : city // ignore: cast_nullable_to_non_nullable
as String?,district: freezed == district ? _self.district : district // ignore: cast_nullable_to_non_nullable
as String?,ward: freezed == ward ? _self.ward : ward // ignore: cast_nullable_to_non_nullable
as String?,addressDetail: freezed == addressDetail ? _self.addressDetail : addressDetail // ignore: cast_nullable_to_non_nullable
as String?,selectedDate: freezed == selectedDate ? _self.selectedDate : selectedDate // ignore: cast_nullable_to_non_nullable
as String?,selectedTimeSlot: freezed == selectedTimeSlot ? _self.selectedTimeSlot : selectedTimeSlot // ignore: cast_nullable_to_non_nullable
as String?,hasDriverLicense: null == hasDriverLicense ? _self.hasDriverLicense : hasDriverLicense // ignore: cast_nullable_to_non_nullable
as bool,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,targetCarSku: freezed == targetCarSku ? _self.targetCarSku : targetCarSku // ignore: cast_nullable_to_non_nullable
as String?,assignedStaff: freezed == assignedStaff ? _self.assignedStaff : assignedStaff // ignore: cast_nullable_to_non_nullable
as AssignedStaff?,requestedStaff: freezed == requestedStaff ? _self._requestedStaff : requestedStaff // ignore: cast_nullable_to_non_nullable
as List<RequestedStaff>?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of TestDriveBooking
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AssignedStaffCopyWith<$Res>? get assignedStaff {
    if (_self.assignedStaff == null) {
    return null;
  }

  return $AssignedStaffCopyWith<$Res>(_self.assignedStaff!, (value) {
    return _then(_self.copyWith(assignedStaff: value));
  });
}
}


/// @nodoc
mixin _$AssignedStaff {

@JsonKey(name: '_id') String get id; String get name; String? get avatar;
/// Create a copy of AssignedStaff
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AssignedStaffCopyWith<AssignedStaff> get copyWith => _$AssignedStaffCopyWithImpl<AssignedStaff>(this as AssignedStaff, _$identity);

  /// Serializes this AssignedStaff to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AssignedStaff&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.avatar, avatar) || other.avatar == avatar));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,avatar);

@override
String toString() {
  return 'AssignedStaff(id: $id, name: $name, avatar: $avatar)';
}


}

/// @nodoc
abstract mixin class $AssignedStaffCopyWith<$Res>  {
  factory $AssignedStaffCopyWith(AssignedStaff value, $Res Function(AssignedStaff) _then) = _$AssignedStaffCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: '_id') String id, String name, String? avatar
});




}
/// @nodoc
class _$AssignedStaffCopyWithImpl<$Res>
    implements $AssignedStaffCopyWith<$Res> {
  _$AssignedStaffCopyWithImpl(this._self, this._then);

  final AssignedStaff _self;
  final $Res Function(AssignedStaff) _then;

/// Create a copy of AssignedStaff
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? avatar = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,avatar: freezed == avatar ? _self.avatar : avatar // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [AssignedStaff].
extension AssignedStaffPatterns on AssignedStaff {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AssignedStaff value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AssignedStaff() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AssignedStaff value)  $default,){
final _that = this;
switch (_that) {
case _AssignedStaff():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AssignedStaff value)?  $default,){
final _that = this;
switch (_that) {
case _AssignedStaff() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String name,  String? avatar)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AssignedStaff() when $default != null:
return $default(_that.id,_that.name,_that.avatar);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String name,  String? avatar)  $default,) {final _that = this;
switch (_that) {
case _AssignedStaff():
return $default(_that.id,_that.name,_that.avatar);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: '_id')  String id,  String name,  String? avatar)?  $default,) {final _that = this;
switch (_that) {
case _AssignedStaff() when $default != null:
return $default(_that.id,_that.name,_that.avatar);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AssignedStaff implements AssignedStaff {
  const _AssignedStaff({@JsonKey(name: '_id') required this.id, required this.name, this.avatar});
  factory _AssignedStaff.fromJson(Map<String, dynamic> json) => _$AssignedStaffFromJson(json);

@override@JsonKey(name: '_id') final  String id;
@override final  String name;
@override final  String? avatar;

/// Create a copy of AssignedStaff
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AssignedStaffCopyWith<_AssignedStaff> get copyWith => __$AssignedStaffCopyWithImpl<_AssignedStaff>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AssignedStaffToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AssignedStaff&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.avatar, avatar) || other.avatar == avatar));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,avatar);

@override
String toString() {
  return 'AssignedStaff(id: $id, name: $name, avatar: $avatar)';
}


}

/// @nodoc
abstract mixin class _$AssignedStaffCopyWith<$Res> implements $AssignedStaffCopyWith<$Res> {
  factory _$AssignedStaffCopyWith(_AssignedStaff value, $Res Function(_AssignedStaff) _then) = __$AssignedStaffCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: '_id') String id, String name, String? avatar
});




}
/// @nodoc
class __$AssignedStaffCopyWithImpl<$Res>
    implements _$AssignedStaffCopyWith<$Res> {
  __$AssignedStaffCopyWithImpl(this._self, this._then);

  final _AssignedStaff _self;
  final $Res Function(_AssignedStaff) _then;

/// Create a copy of AssignedStaff
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? avatar = freezed,}) {
  return _then(_AssignedStaff(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,avatar: freezed == avatar ? _self.avatar : avatar // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}


/// @nodoc
mixin _$RequestedStaff {

@JsonKey(name: '_id') String get id; String get fullName; String? get avatarUrl;
/// Create a copy of RequestedStaff
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$RequestedStaffCopyWith<RequestedStaff> get copyWith => _$RequestedStaffCopyWithImpl<RequestedStaff>(this as RequestedStaff, _$identity);

  /// Serializes this RequestedStaff to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is RequestedStaff&&(identical(other.id, id) || other.id == id)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.avatarUrl, avatarUrl) || other.avatarUrl == avatarUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,fullName,avatarUrl);

@override
String toString() {
  return 'RequestedStaff(id: $id, fullName: $fullName, avatarUrl: $avatarUrl)';
}


}

/// @nodoc
abstract mixin class $RequestedStaffCopyWith<$Res>  {
  factory $RequestedStaffCopyWith(RequestedStaff value, $Res Function(RequestedStaff) _then) = _$RequestedStaffCopyWithImpl;
@useResult
$Res call({
@JsonKey(name: '_id') String id, String fullName, String? avatarUrl
});




}
/// @nodoc
class _$RequestedStaffCopyWithImpl<$Res>
    implements $RequestedStaffCopyWith<$Res> {
  _$RequestedStaffCopyWithImpl(this._self, this._then);

  final RequestedStaff _self;
  final $Res Function(RequestedStaff) _then;

/// Create a copy of RequestedStaff
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? fullName = null,Object? avatarUrl = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,avatarUrl: freezed == avatarUrl ? _self.avatarUrl : avatarUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

}


/// Adds pattern-matching-related methods to [RequestedStaff].
extension RequestedStaffPatterns on RequestedStaff {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _RequestedStaff value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _RequestedStaff() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _RequestedStaff value)  $default,){
final _that = this;
switch (_that) {
case _RequestedStaff():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _RequestedStaff value)?  $default,){
final _that = this;
switch (_that) {
case _RequestedStaff() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String fullName,  String? avatarUrl)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _RequestedStaff() when $default != null:
return $default(_that.id,_that.fullName,_that.avatarUrl);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function(@JsonKey(name: '_id')  String id,  String fullName,  String? avatarUrl)  $default,) {final _that = this;
switch (_that) {
case _RequestedStaff():
return $default(_that.id,_that.fullName,_that.avatarUrl);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function(@JsonKey(name: '_id')  String id,  String fullName,  String? avatarUrl)?  $default,) {final _that = this;
switch (_that) {
case _RequestedStaff() when $default != null:
return $default(_that.id,_that.fullName,_that.avatarUrl);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _RequestedStaff implements RequestedStaff {
  const _RequestedStaff({@JsonKey(name: '_id') required this.id, required this.fullName, this.avatarUrl});
  factory _RequestedStaff.fromJson(Map<String, dynamic> json) => _$RequestedStaffFromJson(json);

@override@JsonKey(name: '_id') final  String id;
@override final  String fullName;
@override final  String? avatarUrl;

/// Create a copy of RequestedStaff
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$RequestedStaffCopyWith<_RequestedStaff> get copyWith => __$RequestedStaffCopyWithImpl<_RequestedStaff>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$RequestedStaffToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _RequestedStaff&&(identical(other.id, id) || other.id == id)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.avatarUrl, avatarUrl) || other.avatarUrl == avatarUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,fullName,avatarUrl);

@override
String toString() {
  return 'RequestedStaff(id: $id, fullName: $fullName, avatarUrl: $avatarUrl)';
}


}

/// @nodoc
abstract mixin class _$RequestedStaffCopyWith<$Res> implements $RequestedStaffCopyWith<$Res> {
  factory _$RequestedStaffCopyWith(_RequestedStaff value, $Res Function(_RequestedStaff) _then) = __$RequestedStaffCopyWithImpl;
@override @useResult
$Res call({
@JsonKey(name: '_id') String id, String fullName, String? avatarUrl
});




}
/// @nodoc
class __$RequestedStaffCopyWithImpl<$Res>
    implements _$RequestedStaffCopyWith<$Res> {
  __$RequestedStaffCopyWithImpl(this._self, this._then);

  final _RequestedStaff _self;
  final $Res Function(_RequestedStaff) _then;

/// Create a copy of RequestedStaff
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? fullName = null,Object? avatarUrl = freezed,}) {
  return _then(_RequestedStaff(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,avatarUrl: freezed == avatarUrl ? _self.avatarUrl : avatarUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}


}

// dart format on
