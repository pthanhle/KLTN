// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'contract_builder_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;
/// @nodoc
mixin _$ContractBuilderState {

 bool get isLoading; bool get isSubmitting; bool get isSuccess; String? get errorMessage; TaskModel? get sourceTask; List<VehicleUnitModel> get availableVehicleUnits; ContractPayloadModel? get payload; String? get customerCity; String? get customerDistrict; String? get customerWard; String? get customerStreet; String? get selectedShowroomId;
/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ContractBuilderStateCopyWith<ContractBuilderState> get copyWith => _$ContractBuilderStateCopyWithImpl<ContractBuilderState>(this as ContractBuilderState, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ContractBuilderState&&(identical(other.isLoading, isLoading) || other.isLoading == isLoading)&&(identical(other.isSubmitting, isSubmitting) || other.isSubmitting == isSubmitting)&&(identical(other.isSuccess, isSuccess) || other.isSuccess == isSuccess)&&(identical(other.errorMessage, errorMessage) || other.errorMessage == errorMessage)&&(identical(other.sourceTask, sourceTask) || other.sourceTask == sourceTask)&&const DeepCollectionEquality().equals(other.availableVehicleUnits, availableVehicleUnits)&&(identical(other.payload, payload) || other.payload == payload)&&(identical(other.customerCity, customerCity) || other.customerCity == customerCity)&&(identical(other.customerDistrict, customerDistrict) || other.customerDistrict == customerDistrict)&&(identical(other.customerWard, customerWard) || other.customerWard == customerWard)&&(identical(other.customerStreet, customerStreet) || other.customerStreet == customerStreet)&&(identical(other.selectedShowroomId, selectedShowroomId) || other.selectedShowroomId == selectedShowroomId));
}


@override
int get hashCode => Object.hash(runtimeType,isLoading,isSubmitting,isSuccess,errorMessage,sourceTask,const DeepCollectionEquality().hash(availableVehicleUnits),payload,customerCity,customerDistrict,customerWard,customerStreet,selectedShowroomId);

@override
String toString() {
  return 'ContractBuilderState(isLoading: $isLoading, isSubmitting: $isSubmitting, isSuccess: $isSuccess, errorMessage: $errorMessage, sourceTask: $sourceTask, availableVehicleUnits: $availableVehicleUnits, payload: $payload, customerCity: $customerCity, customerDistrict: $customerDistrict, customerWard: $customerWard, customerStreet: $customerStreet, selectedShowroomId: $selectedShowroomId)';
}


}

/// @nodoc
abstract mixin class $ContractBuilderStateCopyWith<$Res>  {
  factory $ContractBuilderStateCopyWith(ContractBuilderState value, $Res Function(ContractBuilderState) _then) = _$ContractBuilderStateCopyWithImpl;
@useResult
$Res call({
 bool isLoading, bool isSubmitting, bool isSuccess, String? errorMessage, TaskModel? sourceTask, List<VehicleUnitModel> availableVehicleUnits, ContractPayloadModel? payload, String? customerCity, String? customerDistrict, String? customerWard, String? customerStreet, String? selectedShowroomId
});


$TaskModelCopyWith<$Res>? get sourceTask;$ContractPayloadModelCopyWith<$Res>? get payload;

}
/// @nodoc
class _$ContractBuilderStateCopyWithImpl<$Res>
    implements $ContractBuilderStateCopyWith<$Res> {
  _$ContractBuilderStateCopyWithImpl(this._self, this._then);

  final ContractBuilderState _self;
  final $Res Function(ContractBuilderState) _then;

/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? isLoading = null,Object? isSubmitting = null,Object? isSuccess = null,Object? errorMessage = freezed,Object? sourceTask = freezed,Object? availableVehicleUnits = null,Object? payload = freezed,Object? customerCity = freezed,Object? customerDistrict = freezed,Object? customerWard = freezed,Object? customerStreet = freezed,Object? selectedShowroomId = freezed,}) {
  return _then(_self.copyWith(
isLoading: null == isLoading ? _self.isLoading : isLoading // ignore: cast_nullable_to_non_nullable
as bool,isSubmitting: null == isSubmitting ? _self.isSubmitting : isSubmitting // ignore: cast_nullable_to_non_nullable
as bool,isSuccess: null == isSuccess ? _self.isSuccess : isSuccess // ignore: cast_nullable_to_non_nullable
as bool,errorMessage: freezed == errorMessage ? _self.errorMessage : errorMessage // ignore: cast_nullable_to_non_nullable
as String?,sourceTask: freezed == sourceTask ? _self.sourceTask : sourceTask // ignore: cast_nullable_to_non_nullable
as TaskModel?,availableVehicleUnits: null == availableVehicleUnits ? _self.availableVehicleUnits : availableVehicleUnits // ignore: cast_nullable_to_non_nullable
as List<VehicleUnitModel>,payload: freezed == payload ? _self.payload : payload // ignore: cast_nullable_to_non_nullable
as ContractPayloadModel?,customerCity: freezed == customerCity ? _self.customerCity : customerCity // ignore: cast_nullable_to_non_nullable
as String?,customerDistrict: freezed == customerDistrict ? _self.customerDistrict : customerDistrict // ignore: cast_nullable_to_non_nullable
as String?,customerWard: freezed == customerWard ? _self.customerWard : customerWard // ignore: cast_nullable_to_non_nullable
as String?,customerStreet: freezed == customerStreet ? _self.customerStreet : customerStreet // ignore: cast_nullable_to_non_nullable
as String?,selectedShowroomId: freezed == selectedShowroomId ? _self.selectedShowroomId : selectedShowroomId // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TaskModelCopyWith<$Res>? get sourceTask {
    if (_self.sourceTask == null) {
    return null;
  }

  return $TaskModelCopyWith<$Res>(_self.sourceTask!, (value) {
    return _then(_self.copyWith(sourceTask: value));
  });
}/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContractPayloadModelCopyWith<$Res>? get payload {
    if (_self.payload == null) {
    return null;
  }

  return $ContractPayloadModelCopyWith<$Res>(_self.payload!, (value) {
    return _then(_self.copyWith(payload: value));
  });
}
}


/// Adds pattern-matching-related methods to [ContractBuilderState].
extension ContractBuilderStatePatterns on ContractBuilderState {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ContractBuilderState value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ContractBuilderState() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ContractBuilderState value)  $default,){
final _that = this;
switch (_that) {
case _ContractBuilderState():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ContractBuilderState value)?  $default,){
final _that = this;
switch (_that) {
case _ContractBuilderState() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( bool isLoading,  bool isSubmitting,  bool isSuccess,  String? errorMessage,  TaskModel? sourceTask,  List<VehicleUnitModel> availableVehicleUnits,  ContractPayloadModel? payload,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? selectedShowroomId)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ContractBuilderState() when $default != null:
return $default(_that.isLoading,_that.isSubmitting,_that.isSuccess,_that.errorMessage,_that.sourceTask,_that.availableVehicleUnits,_that.payload,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.selectedShowroomId);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( bool isLoading,  bool isSubmitting,  bool isSuccess,  String? errorMessage,  TaskModel? sourceTask,  List<VehicleUnitModel> availableVehicleUnits,  ContractPayloadModel? payload,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? selectedShowroomId)  $default,) {final _that = this;
switch (_that) {
case _ContractBuilderState():
return $default(_that.isLoading,_that.isSubmitting,_that.isSuccess,_that.errorMessage,_that.sourceTask,_that.availableVehicleUnits,_that.payload,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.selectedShowroomId);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( bool isLoading,  bool isSubmitting,  bool isSuccess,  String? errorMessage,  TaskModel? sourceTask,  List<VehicleUnitModel> availableVehicleUnits,  ContractPayloadModel? payload,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? selectedShowroomId)?  $default,) {final _that = this;
switch (_that) {
case _ContractBuilderState() when $default != null:
return $default(_that.isLoading,_that.isSubmitting,_that.isSuccess,_that.errorMessage,_that.sourceTask,_that.availableVehicleUnits,_that.payload,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.selectedShowroomId);case _:
  return null;

}
}

}

/// @nodoc


class _ContractBuilderState extends ContractBuilderState {
  const _ContractBuilderState({this.isLoading = false, this.isSubmitting = false, this.isSuccess = false, this.errorMessage, this.sourceTask, final  List<VehicleUnitModel> availableVehicleUnits = const [], this.payload, this.customerCity, this.customerDistrict, this.customerWard, this.customerStreet, this.selectedShowroomId}): _availableVehicleUnits = availableVehicleUnits,super._();
  

@override@JsonKey() final  bool isLoading;
@override@JsonKey() final  bool isSubmitting;
@override@JsonKey() final  bool isSuccess;
@override final  String? errorMessage;
@override final  TaskModel? sourceTask;
 final  List<VehicleUnitModel> _availableVehicleUnits;
@override@JsonKey() List<VehicleUnitModel> get availableVehicleUnits {
  if (_availableVehicleUnits is EqualUnmodifiableListView) return _availableVehicleUnits;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_availableVehicleUnits);
}

@override final  ContractPayloadModel? payload;
@override final  String? customerCity;
@override final  String? customerDistrict;
@override final  String? customerWard;
@override final  String? customerStreet;
@override final  String? selectedShowroomId;

/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ContractBuilderStateCopyWith<_ContractBuilderState> get copyWith => __$ContractBuilderStateCopyWithImpl<_ContractBuilderState>(this, _$identity);



@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ContractBuilderState&&(identical(other.isLoading, isLoading) || other.isLoading == isLoading)&&(identical(other.isSubmitting, isSubmitting) || other.isSubmitting == isSubmitting)&&(identical(other.isSuccess, isSuccess) || other.isSuccess == isSuccess)&&(identical(other.errorMessage, errorMessage) || other.errorMessage == errorMessage)&&(identical(other.sourceTask, sourceTask) || other.sourceTask == sourceTask)&&const DeepCollectionEquality().equals(other._availableVehicleUnits, _availableVehicleUnits)&&(identical(other.payload, payload) || other.payload == payload)&&(identical(other.customerCity, customerCity) || other.customerCity == customerCity)&&(identical(other.customerDistrict, customerDistrict) || other.customerDistrict == customerDistrict)&&(identical(other.customerWard, customerWard) || other.customerWard == customerWard)&&(identical(other.customerStreet, customerStreet) || other.customerStreet == customerStreet)&&(identical(other.selectedShowroomId, selectedShowroomId) || other.selectedShowroomId == selectedShowroomId));
}


@override
int get hashCode => Object.hash(runtimeType,isLoading,isSubmitting,isSuccess,errorMessage,sourceTask,const DeepCollectionEquality().hash(_availableVehicleUnits),payload,customerCity,customerDistrict,customerWard,customerStreet,selectedShowroomId);

@override
String toString() {
  return 'ContractBuilderState(isLoading: $isLoading, isSubmitting: $isSubmitting, isSuccess: $isSuccess, errorMessage: $errorMessage, sourceTask: $sourceTask, availableVehicleUnits: $availableVehicleUnits, payload: $payload, customerCity: $customerCity, customerDistrict: $customerDistrict, customerWard: $customerWard, customerStreet: $customerStreet, selectedShowroomId: $selectedShowroomId)';
}


}

/// @nodoc
abstract mixin class _$ContractBuilderStateCopyWith<$Res> implements $ContractBuilderStateCopyWith<$Res> {
  factory _$ContractBuilderStateCopyWith(_ContractBuilderState value, $Res Function(_ContractBuilderState) _then) = __$ContractBuilderStateCopyWithImpl;
@override @useResult
$Res call({
 bool isLoading, bool isSubmitting, bool isSuccess, String? errorMessage, TaskModel? sourceTask, List<VehicleUnitModel> availableVehicleUnits, ContractPayloadModel? payload, String? customerCity, String? customerDistrict, String? customerWard, String? customerStreet, String? selectedShowroomId
});


@override $TaskModelCopyWith<$Res>? get sourceTask;@override $ContractPayloadModelCopyWith<$Res>? get payload;

}
/// @nodoc
class __$ContractBuilderStateCopyWithImpl<$Res>
    implements _$ContractBuilderStateCopyWith<$Res> {
  __$ContractBuilderStateCopyWithImpl(this._self, this._then);

  final _ContractBuilderState _self;
  final $Res Function(_ContractBuilderState) _then;

/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? isLoading = null,Object? isSubmitting = null,Object? isSuccess = null,Object? errorMessage = freezed,Object? sourceTask = freezed,Object? availableVehicleUnits = null,Object? payload = freezed,Object? customerCity = freezed,Object? customerDistrict = freezed,Object? customerWard = freezed,Object? customerStreet = freezed,Object? selectedShowroomId = freezed,}) {
  return _then(_ContractBuilderState(
isLoading: null == isLoading ? _self.isLoading : isLoading // ignore: cast_nullable_to_non_nullable
as bool,isSubmitting: null == isSubmitting ? _self.isSubmitting : isSubmitting // ignore: cast_nullable_to_non_nullable
as bool,isSuccess: null == isSuccess ? _self.isSuccess : isSuccess // ignore: cast_nullable_to_non_nullable
as bool,errorMessage: freezed == errorMessage ? _self.errorMessage : errorMessage // ignore: cast_nullable_to_non_nullable
as String?,sourceTask: freezed == sourceTask ? _self.sourceTask : sourceTask // ignore: cast_nullable_to_non_nullable
as TaskModel?,availableVehicleUnits: null == availableVehicleUnits ? _self._availableVehicleUnits : availableVehicleUnits // ignore: cast_nullable_to_non_nullable
as List<VehicleUnitModel>,payload: freezed == payload ? _self.payload : payload // ignore: cast_nullable_to_non_nullable
as ContractPayloadModel?,customerCity: freezed == customerCity ? _self.customerCity : customerCity // ignore: cast_nullable_to_non_nullable
as String?,customerDistrict: freezed == customerDistrict ? _self.customerDistrict : customerDistrict // ignore: cast_nullable_to_non_nullable
as String?,customerWard: freezed == customerWard ? _self.customerWard : customerWard // ignore: cast_nullable_to_non_nullable
as String?,customerStreet: freezed == customerStreet ? _self.customerStreet : customerStreet // ignore: cast_nullable_to_non_nullable
as String?,selectedShowroomId: freezed == selectedShowroomId ? _self.selectedShowroomId : selectedShowroomId // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$TaskModelCopyWith<$Res>? get sourceTask {
    if (_self.sourceTask == null) {
    return null;
  }

  return $TaskModelCopyWith<$Res>(_self.sourceTask!, (value) {
    return _then(_self.copyWith(sourceTask: value));
  });
}/// Create a copy of ContractBuilderState
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ContractPayloadModelCopyWith<$Res>? get payload {
    if (_self.payload == null) {
    return null;
  }

  return $ContractPayloadModelCopyWith<$Res>(_self.payload!, (value) {
    return _then(_self.copyWith(payload: value));
  });
}
}

// dart format on
