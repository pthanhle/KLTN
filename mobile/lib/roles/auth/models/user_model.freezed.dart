// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$UserModel {

 String get id; String get employeeId; String get fullName; String get email; String get phone; String? get avatarUrl; String get role; String get department; String get status; String? get joinDate; double? get baseSalary; String? get kpiType; double? get kpiValue; bool? get isOvertimeEligible; String? get accessLevel; String? get lastLogin; PerformanceModel? get performance; String? get accessToken;
/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$UserModelCopyWith<UserModel> get copyWith => _$UserModelCopyWithImpl<UserModel>(this as UserModel, _$identity);

  /// Serializes this UserModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is UserModel&&(identical(other.id, id) || other.id == id)&&(identical(other.employeeId, employeeId) || other.employeeId == employeeId)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.email, email) || other.email == email)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.avatarUrl, avatarUrl) || other.avatarUrl == avatarUrl)&&(identical(other.role, role) || other.role == role)&&(identical(other.department, department) || other.department == department)&&(identical(other.status, status) || other.status == status)&&(identical(other.joinDate, joinDate) || other.joinDate == joinDate)&&(identical(other.baseSalary, baseSalary) || other.baseSalary == baseSalary)&&(identical(other.kpiType, kpiType) || other.kpiType == kpiType)&&(identical(other.kpiValue, kpiValue) || other.kpiValue == kpiValue)&&(identical(other.isOvertimeEligible, isOvertimeEligible) || other.isOvertimeEligible == isOvertimeEligible)&&(identical(other.accessLevel, accessLevel) || other.accessLevel == accessLevel)&&(identical(other.lastLogin, lastLogin) || other.lastLogin == lastLogin)&&(identical(other.performance, performance) || other.performance == performance)&&(identical(other.accessToken, accessToken) || other.accessToken == accessToken));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,employeeId,fullName,email,phone,avatarUrl,role,department,status,joinDate,baseSalary,kpiType,kpiValue,isOvertimeEligible,accessLevel,lastLogin,performance,accessToken);

@override
String toString() {
  return 'UserModel(id: $id, employeeId: $employeeId, fullName: $fullName, email: $email, phone: $phone, avatarUrl: $avatarUrl, role: $role, department: $department, status: $status, joinDate: $joinDate, baseSalary: $baseSalary, kpiType: $kpiType, kpiValue: $kpiValue, isOvertimeEligible: $isOvertimeEligible, accessLevel: $accessLevel, lastLogin: $lastLogin, performance: $performance, accessToken: $accessToken)';
}


}

/// @nodoc
abstract mixin class $UserModelCopyWith<$Res>  {
  factory $UserModelCopyWith(UserModel value, $Res Function(UserModel) _then) = _$UserModelCopyWithImpl;
@useResult
$Res call({
 String id, String employeeId, String fullName, String email, String phone, String? avatarUrl, String role, String department, String status, String? joinDate, double? baseSalary, String? kpiType, double? kpiValue, bool? isOvertimeEligible, String? accessLevel, String? lastLogin, PerformanceModel? performance, String? accessToken
});


$PerformanceModelCopyWith<$Res>? get performance;

}
/// @nodoc
class _$UserModelCopyWithImpl<$Res>
    implements $UserModelCopyWith<$Res> {
  _$UserModelCopyWithImpl(this._self, this._then);

  final UserModel _self;
  final $Res Function(UserModel) _then;

/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? employeeId = null,Object? fullName = null,Object? email = null,Object? phone = null,Object? avatarUrl = freezed,Object? role = null,Object? department = null,Object? status = null,Object? joinDate = freezed,Object? baseSalary = freezed,Object? kpiType = freezed,Object? kpiValue = freezed,Object? isOvertimeEligible = freezed,Object? accessLevel = freezed,Object? lastLogin = freezed,Object? performance = freezed,Object? accessToken = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,employeeId: null == employeeId ? _self.employeeId : employeeId // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,avatarUrl: freezed == avatarUrl ? _self.avatarUrl : avatarUrl // ignore: cast_nullable_to_non_nullable
as String?,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,department: null == department ? _self.department : department // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,joinDate: freezed == joinDate ? _self.joinDate : joinDate // ignore: cast_nullable_to_non_nullable
as String?,baseSalary: freezed == baseSalary ? _self.baseSalary : baseSalary // ignore: cast_nullable_to_non_nullable
as double?,kpiType: freezed == kpiType ? _self.kpiType : kpiType // ignore: cast_nullable_to_non_nullable
as String?,kpiValue: freezed == kpiValue ? _self.kpiValue : kpiValue // ignore: cast_nullable_to_non_nullable
as double?,isOvertimeEligible: freezed == isOvertimeEligible ? _self.isOvertimeEligible : isOvertimeEligible // ignore: cast_nullable_to_non_nullable
as bool?,accessLevel: freezed == accessLevel ? _self.accessLevel : accessLevel // ignore: cast_nullable_to_non_nullable
as String?,lastLogin: freezed == lastLogin ? _self.lastLogin : lastLogin // ignore: cast_nullable_to_non_nullable
as String?,performance: freezed == performance ? _self.performance : performance // ignore: cast_nullable_to_non_nullable
as PerformanceModel?,accessToken: freezed == accessToken ? _self.accessToken : accessToken // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PerformanceModelCopyWith<$Res>? get performance {
    if (_self.performance == null) {
    return null;
  }

  return $PerformanceModelCopyWith<$Res>(_self.performance!, (value) {
    return _then(_self.copyWith(performance: value));
  });
}
}


/// Adds pattern-matching-related methods to [UserModel].
extension UserModelPatterns on UserModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _UserModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _UserModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _UserModel value)  $default,){
final _that = this;
switch (_that) {
case _UserModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _UserModel value)?  $default,){
final _that = this;
switch (_that) {
case _UserModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String employeeId,  String fullName,  String email,  String phone,  String? avatarUrl,  String role,  String department,  String status,  String? joinDate,  double? baseSalary,  String? kpiType,  double? kpiValue,  bool? isOvertimeEligible,  String? accessLevel,  String? lastLogin,  PerformanceModel? performance,  String? accessToken)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _UserModel() when $default != null:
return $default(_that.id,_that.employeeId,_that.fullName,_that.email,_that.phone,_that.avatarUrl,_that.role,_that.department,_that.status,_that.joinDate,_that.baseSalary,_that.kpiType,_that.kpiValue,_that.isOvertimeEligible,_that.accessLevel,_that.lastLogin,_that.performance,_that.accessToken);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String employeeId,  String fullName,  String email,  String phone,  String? avatarUrl,  String role,  String department,  String status,  String? joinDate,  double? baseSalary,  String? kpiType,  double? kpiValue,  bool? isOvertimeEligible,  String? accessLevel,  String? lastLogin,  PerformanceModel? performance,  String? accessToken)  $default,) {final _that = this;
switch (_that) {
case _UserModel():
return $default(_that.id,_that.employeeId,_that.fullName,_that.email,_that.phone,_that.avatarUrl,_that.role,_that.department,_that.status,_that.joinDate,_that.baseSalary,_that.kpiType,_that.kpiValue,_that.isOvertimeEligible,_that.accessLevel,_that.lastLogin,_that.performance,_that.accessToken);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String employeeId,  String fullName,  String email,  String phone,  String? avatarUrl,  String role,  String department,  String status,  String? joinDate,  double? baseSalary,  String? kpiType,  double? kpiValue,  bool? isOvertimeEligible,  String? accessLevel,  String? lastLogin,  PerformanceModel? performance,  String? accessToken)?  $default,) {final _that = this;
switch (_that) {
case _UserModel() when $default != null:
return $default(_that.id,_that.employeeId,_that.fullName,_that.email,_that.phone,_that.avatarUrl,_that.role,_that.department,_that.status,_that.joinDate,_that.baseSalary,_that.kpiType,_that.kpiValue,_that.isOvertimeEligible,_that.accessLevel,_that.lastLogin,_that.performance,_that.accessToken);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _UserModel extends UserModel {
  const _UserModel({required this.id, required this.employeeId, required this.fullName, required this.email, required this.phone, this.avatarUrl, required this.role, required this.department, required this.status, this.joinDate, this.baseSalary, this.kpiType, this.kpiValue, this.isOvertimeEligible, this.accessLevel, this.lastLogin, this.performance, this.accessToken}): super._();
  factory _UserModel.fromJson(Map<String, dynamic> json) => _$UserModelFromJson(json);

@override final  String id;
@override final  String employeeId;
@override final  String fullName;
@override final  String email;
@override final  String phone;
@override final  String? avatarUrl;
@override final  String role;
@override final  String department;
@override final  String status;
@override final  String? joinDate;
@override final  double? baseSalary;
@override final  String? kpiType;
@override final  double? kpiValue;
@override final  bool? isOvertimeEligible;
@override final  String? accessLevel;
@override final  String? lastLogin;
@override final  PerformanceModel? performance;
@override final  String? accessToken;

/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$UserModelCopyWith<_UserModel> get copyWith => __$UserModelCopyWithImpl<_UserModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$UserModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _UserModel&&(identical(other.id, id) || other.id == id)&&(identical(other.employeeId, employeeId) || other.employeeId == employeeId)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.email, email) || other.email == email)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.avatarUrl, avatarUrl) || other.avatarUrl == avatarUrl)&&(identical(other.role, role) || other.role == role)&&(identical(other.department, department) || other.department == department)&&(identical(other.status, status) || other.status == status)&&(identical(other.joinDate, joinDate) || other.joinDate == joinDate)&&(identical(other.baseSalary, baseSalary) || other.baseSalary == baseSalary)&&(identical(other.kpiType, kpiType) || other.kpiType == kpiType)&&(identical(other.kpiValue, kpiValue) || other.kpiValue == kpiValue)&&(identical(other.isOvertimeEligible, isOvertimeEligible) || other.isOvertimeEligible == isOvertimeEligible)&&(identical(other.accessLevel, accessLevel) || other.accessLevel == accessLevel)&&(identical(other.lastLogin, lastLogin) || other.lastLogin == lastLogin)&&(identical(other.performance, performance) || other.performance == performance)&&(identical(other.accessToken, accessToken) || other.accessToken == accessToken));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,employeeId,fullName,email,phone,avatarUrl,role,department,status,joinDate,baseSalary,kpiType,kpiValue,isOvertimeEligible,accessLevel,lastLogin,performance,accessToken);

@override
String toString() {
  return 'UserModel(id: $id, employeeId: $employeeId, fullName: $fullName, email: $email, phone: $phone, avatarUrl: $avatarUrl, role: $role, department: $department, status: $status, joinDate: $joinDate, baseSalary: $baseSalary, kpiType: $kpiType, kpiValue: $kpiValue, isOvertimeEligible: $isOvertimeEligible, accessLevel: $accessLevel, lastLogin: $lastLogin, performance: $performance, accessToken: $accessToken)';
}


}

/// @nodoc
abstract mixin class _$UserModelCopyWith<$Res> implements $UserModelCopyWith<$Res> {
  factory _$UserModelCopyWith(_UserModel value, $Res Function(_UserModel) _then) = __$UserModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String employeeId, String fullName, String email, String phone, String? avatarUrl, String role, String department, String status, String? joinDate, double? baseSalary, String? kpiType, double? kpiValue, bool? isOvertimeEligible, String? accessLevel, String? lastLogin, PerformanceModel? performance, String? accessToken
});


@override $PerformanceModelCopyWith<$Res>? get performance;

}
/// @nodoc
class __$UserModelCopyWithImpl<$Res>
    implements _$UserModelCopyWith<$Res> {
  __$UserModelCopyWithImpl(this._self, this._then);

  final _UserModel _self;
  final $Res Function(_UserModel) _then;

/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? employeeId = null,Object? fullName = null,Object? email = null,Object? phone = null,Object? avatarUrl = freezed,Object? role = null,Object? department = null,Object? status = null,Object? joinDate = freezed,Object? baseSalary = freezed,Object? kpiType = freezed,Object? kpiValue = freezed,Object? isOvertimeEligible = freezed,Object? accessLevel = freezed,Object? lastLogin = freezed,Object? performance = freezed,Object? accessToken = freezed,}) {
  return _then(_UserModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,employeeId: null == employeeId ? _self.employeeId : employeeId // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,avatarUrl: freezed == avatarUrl ? _self.avatarUrl : avatarUrl // ignore: cast_nullable_to_non_nullable
as String?,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,department: null == department ? _self.department : department // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,joinDate: freezed == joinDate ? _self.joinDate : joinDate // ignore: cast_nullable_to_non_nullable
as String?,baseSalary: freezed == baseSalary ? _self.baseSalary : baseSalary // ignore: cast_nullable_to_non_nullable
as double?,kpiType: freezed == kpiType ? _self.kpiType : kpiType // ignore: cast_nullable_to_non_nullable
as String?,kpiValue: freezed == kpiValue ? _self.kpiValue : kpiValue // ignore: cast_nullable_to_non_nullable
as double?,isOvertimeEligible: freezed == isOvertimeEligible ? _self.isOvertimeEligible : isOvertimeEligible // ignore: cast_nullable_to_non_nullable
as bool?,accessLevel: freezed == accessLevel ? _self.accessLevel : accessLevel // ignore: cast_nullable_to_non_nullable
as String?,lastLogin: freezed == lastLogin ? _self.lastLogin : lastLogin // ignore: cast_nullable_to_non_nullable
as String?,performance: freezed == performance ? _self.performance : performance // ignore: cast_nullable_to_non_nullable
as PerformanceModel?,accessToken: freezed == accessToken ? _self.accessToken : accessToken // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of UserModel
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PerformanceModelCopyWith<$Res>? get performance {
    if (_self.performance == null) {
    return null;
  }

  return $PerformanceModelCopyWith<$Res>(_self.performance!, (value) {
    return _then(_self.copyWith(performance: value));
  });
}
}

// dart format on
