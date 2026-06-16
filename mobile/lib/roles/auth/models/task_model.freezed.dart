// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'task_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ChatLog {

 String get sender; String get time; String get text;
/// Create a copy of ChatLog
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ChatLogCopyWith<ChatLog> get copyWith => _$ChatLogCopyWithImpl<ChatLog>(this as ChatLog, _$identity);

  /// Serializes this ChatLog to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ChatLog&&(identical(other.sender, sender) || other.sender == sender)&&(identical(other.time, time) || other.time == time)&&(identical(other.text, text) || other.text == text));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,sender,time,text);

@override
String toString() {
  return 'ChatLog(sender: $sender, time: $time, text: $text)';
}


}

/// @nodoc
abstract mixin class $ChatLogCopyWith<$Res>  {
  factory $ChatLogCopyWith(ChatLog value, $Res Function(ChatLog) _then) = _$ChatLogCopyWithImpl;
@useResult
$Res call({
 String sender, String time, String text
});




}
/// @nodoc
class _$ChatLogCopyWithImpl<$Res>
    implements $ChatLogCopyWith<$Res> {
  _$ChatLogCopyWithImpl(this._self, this._then);

  final ChatLog _self;
  final $Res Function(ChatLog) _then;

/// Create a copy of ChatLog
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? sender = null,Object? time = null,Object? text = null,}) {
  return _then(_self.copyWith(
sender: null == sender ? _self.sender : sender // ignore: cast_nullable_to_non_nullable
as String,time: null == time ? _self.time : time // ignore: cast_nullable_to_non_nullable
as String,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [ChatLog].
extension ChatLogPatterns on ChatLog {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ChatLog value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ChatLog() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ChatLog value)  $default,){
final _that = this;
switch (_that) {
case _ChatLog():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ChatLog value)?  $default,){
final _that = this;
switch (_that) {
case _ChatLog() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String sender,  String time,  String text)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ChatLog() when $default != null:
return $default(_that.sender,_that.time,_that.text);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String sender,  String time,  String text)  $default,) {final _that = this;
switch (_that) {
case _ChatLog():
return $default(_that.sender,_that.time,_that.text);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String sender,  String time,  String text)?  $default,) {final _that = this;
switch (_that) {
case _ChatLog() when $default != null:
return $default(_that.sender,_that.time,_that.text);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ChatLog extends ChatLog {
  const _ChatLog({required this.sender, required this.time, required this.text}): super._();
  factory _ChatLog.fromJson(Map<String, dynamic> json) => _$ChatLogFromJson(json);

@override final  String sender;
@override final  String time;
@override final  String text;

/// Create a copy of ChatLog
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ChatLogCopyWith<_ChatLog> get copyWith => __$ChatLogCopyWithImpl<_ChatLog>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ChatLogToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ChatLog&&(identical(other.sender, sender) || other.sender == sender)&&(identical(other.time, time) || other.time == time)&&(identical(other.text, text) || other.text == text));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,sender,time,text);

@override
String toString() {
  return 'ChatLog(sender: $sender, time: $time, text: $text)';
}


}

/// @nodoc
abstract mixin class _$ChatLogCopyWith<$Res> implements $ChatLogCopyWith<$Res> {
  factory _$ChatLogCopyWith(_ChatLog value, $Res Function(_ChatLog) _then) = __$ChatLogCopyWithImpl;
@override @useResult
$Res call({
 String sender, String time, String text
});




}
/// @nodoc
class __$ChatLogCopyWithImpl<$Res>
    implements _$ChatLogCopyWith<$Res> {
  __$ChatLogCopyWithImpl(this._self, this._then);

  final _ChatLog _self;
  final $Res Function(_ChatLog) _then;

/// Create a copy of ChatLog
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? sender = null,Object? time = null,Object? text = null,}) {
  return _then(_ChatLog(
sender: null == sender ? _self.sender : sender // ignore: cast_nullable_to_non_nullable
as String,time: null == time ? _self.time : time // ignore: cast_nullable_to_non_nullable
as String,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$TaskModel {

 String get id; String get title; String get priority; String? get status; String? get sla; int? get progress; String? get customerId; String? get productId; String? get customerName; String? get customerPhone; String? get customerEmail; String? get customerTaxCode; String? get customerCompanyName; String? get customerCity; String? get customerDistrict; String? get customerWard; String? get customerStreet; String? get licensePlate; String? get vehicleModel; String? get appointmentTime; String? get description; String? get billed; String? get taskType; bool? get isBlinking; String? get locationType; String? get address; List<ChatLog>? get chatLogs;
/// Create a copy of TaskModel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$TaskModelCopyWith<TaskModel> get copyWith => _$TaskModelCopyWithImpl<TaskModel>(this as TaskModel, _$identity);

  /// Serializes this TaskModel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.priority, priority) || other.priority == priority)&&(identical(other.status, status) || other.status == status)&&(identical(other.sla, sla) || other.sla == sla)&&(identical(other.progress, progress) || other.progress == progress)&&(identical(other.customerId, customerId) || other.customerId == customerId)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.customerName, customerName) || other.customerName == customerName)&&(identical(other.customerPhone, customerPhone) || other.customerPhone == customerPhone)&&(identical(other.customerEmail, customerEmail) || other.customerEmail == customerEmail)&&(identical(other.customerTaxCode, customerTaxCode) || other.customerTaxCode == customerTaxCode)&&(identical(other.customerCompanyName, customerCompanyName) || other.customerCompanyName == customerCompanyName)&&(identical(other.customerCity, customerCity) || other.customerCity == customerCity)&&(identical(other.customerDistrict, customerDistrict) || other.customerDistrict == customerDistrict)&&(identical(other.customerWard, customerWard) || other.customerWard == customerWard)&&(identical(other.customerStreet, customerStreet) || other.customerStreet == customerStreet)&&(identical(other.licensePlate, licensePlate) || other.licensePlate == licensePlate)&&(identical(other.vehicleModel, vehicleModel) || other.vehicleModel == vehicleModel)&&(identical(other.appointmentTime, appointmentTime) || other.appointmentTime == appointmentTime)&&(identical(other.description, description) || other.description == description)&&(identical(other.billed, billed) || other.billed == billed)&&(identical(other.taskType, taskType) || other.taskType == taskType)&&(identical(other.isBlinking, isBlinking) || other.isBlinking == isBlinking)&&(identical(other.locationType, locationType) || other.locationType == locationType)&&(identical(other.address, address) || other.address == address)&&const DeepCollectionEquality().equals(other.chatLogs, chatLogs));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,id,title,priority,status,sla,progress,customerId,productId,customerName,customerPhone,customerEmail,customerTaxCode,customerCompanyName,customerCity,customerDistrict,customerWard,customerStreet,licensePlate,vehicleModel,appointmentTime,description,billed,taskType,isBlinking,locationType,address,const DeepCollectionEquality().hash(chatLogs)]);

@override
String toString() {
  return 'TaskModel(id: $id, title: $title, priority: $priority, status: $status, sla: $sla, progress: $progress, customerId: $customerId, productId: $productId, customerName: $customerName, customerPhone: $customerPhone, customerEmail: $customerEmail, customerTaxCode: $customerTaxCode, customerCompanyName: $customerCompanyName, customerCity: $customerCity, customerDistrict: $customerDistrict, customerWard: $customerWard, customerStreet: $customerStreet, licensePlate: $licensePlate, vehicleModel: $vehicleModel, appointmentTime: $appointmentTime, description: $description, billed: $billed, taskType: $taskType, isBlinking: $isBlinking, locationType: $locationType, address: $address, chatLogs: $chatLogs)';
}


}

/// @nodoc
abstract mixin class $TaskModelCopyWith<$Res>  {
  factory $TaskModelCopyWith(TaskModel value, $Res Function(TaskModel) _then) = _$TaskModelCopyWithImpl;
@useResult
$Res call({
 String id, String title, String priority, String? status, String? sla, int? progress, String? customerId, String? productId, String? customerName, String? customerPhone, String? customerEmail, String? customerTaxCode, String? customerCompanyName, String? customerCity, String? customerDistrict, String? customerWard, String? customerStreet, String? licensePlate, String? vehicleModel, String? appointmentTime, String? description, String? billed, String? taskType, bool? isBlinking, String? locationType, String? address, List<ChatLog>? chatLogs
});




}
/// @nodoc
class _$TaskModelCopyWithImpl<$Res>
    implements $TaskModelCopyWith<$Res> {
  _$TaskModelCopyWithImpl(this._self, this._then);

  final TaskModel _self;
  final $Res Function(TaskModel) _then;

/// Create a copy of TaskModel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? title = null,Object? priority = null,Object? status = freezed,Object? sla = freezed,Object? progress = freezed,Object? customerId = freezed,Object? productId = freezed,Object? customerName = freezed,Object? customerPhone = freezed,Object? customerEmail = freezed,Object? customerTaxCode = freezed,Object? customerCompanyName = freezed,Object? customerCity = freezed,Object? customerDistrict = freezed,Object? customerWard = freezed,Object? customerStreet = freezed,Object? licensePlate = freezed,Object? vehicleModel = freezed,Object? appointmentTime = freezed,Object? description = freezed,Object? billed = freezed,Object? taskType = freezed,Object? isBlinking = freezed,Object? locationType = freezed,Object? address = freezed,Object? chatLogs = freezed,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,priority: null == priority ? _self.priority : priority // ignore: cast_nullable_to_non_nullable
as String,status: freezed == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String?,sla: freezed == sla ? _self.sla : sla // ignore: cast_nullable_to_non_nullable
as String?,progress: freezed == progress ? _self.progress : progress // ignore: cast_nullable_to_non_nullable
as int?,customerId: freezed == customerId ? _self.customerId : customerId // ignore: cast_nullable_to_non_nullable
as String?,productId: freezed == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String?,customerName: freezed == customerName ? _self.customerName : customerName // ignore: cast_nullable_to_non_nullable
as String?,customerPhone: freezed == customerPhone ? _self.customerPhone : customerPhone // ignore: cast_nullable_to_non_nullable
as String?,customerEmail: freezed == customerEmail ? _self.customerEmail : customerEmail // ignore: cast_nullable_to_non_nullable
as String?,customerTaxCode: freezed == customerTaxCode ? _self.customerTaxCode : customerTaxCode // ignore: cast_nullable_to_non_nullable
as String?,customerCompanyName: freezed == customerCompanyName ? _self.customerCompanyName : customerCompanyName // ignore: cast_nullable_to_non_nullable
as String?,customerCity: freezed == customerCity ? _self.customerCity : customerCity // ignore: cast_nullable_to_non_nullable
as String?,customerDistrict: freezed == customerDistrict ? _self.customerDistrict : customerDistrict // ignore: cast_nullable_to_non_nullable
as String?,customerWard: freezed == customerWard ? _self.customerWard : customerWard // ignore: cast_nullable_to_non_nullable
as String?,customerStreet: freezed == customerStreet ? _self.customerStreet : customerStreet // ignore: cast_nullable_to_non_nullable
as String?,licensePlate: freezed == licensePlate ? _self.licensePlate : licensePlate // ignore: cast_nullable_to_non_nullable
as String?,vehicleModel: freezed == vehicleModel ? _self.vehicleModel : vehicleModel // ignore: cast_nullable_to_non_nullable
as String?,appointmentTime: freezed == appointmentTime ? _self.appointmentTime : appointmentTime // ignore: cast_nullable_to_non_nullable
as String?,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,billed: freezed == billed ? _self.billed : billed // ignore: cast_nullable_to_non_nullable
as String?,taskType: freezed == taskType ? _self.taskType : taskType // ignore: cast_nullable_to_non_nullable
as String?,isBlinking: freezed == isBlinking ? _self.isBlinking : isBlinking // ignore: cast_nullable_to_non_nullable
as bool?,locationType: freezed == locationType ? _self.locationType : locationType // ignore: cast_nullable_to_non_nullable
as String?,address: freezed == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as String?,chatLogs: freezed == chatLogs ? _self.chatLogs : chatLogs // ignore: cast_nullable_to_non_nullable
as List<ChatLog>?,
  ));
}

}


/// Adds pattern-matching-related methods to [TaskModel].
extension TaskModelPatterns on TaskModel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _TaskModel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _TaskModel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _TaskModel value)  $default,){
final _that = this;
switch (_that) {
case _TaskModel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _TaskModel value)?  $default,){
final _that = this;
switch (_that) {
case _TaskModel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String title,  String priority,  String? status,  String? sla,  int? progress,  String? customerId,  String? productId,  String? customerName,  String? customerPhone,  String? customerEmail,  String? customerTaxCode,  String? customerCompanyName,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? licensePlate,  String? vehicleModel,  String? appointmentTime,  String? description,  String? billed,  String? taskType,  bool? isBlinking,  String? locationType,  String? address,  List<ChatLog>? chatLogs)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _TaskModel() when $default != null:
return $default(_that.id,_that.title,_that.priority,_that.status,_that.sla,_that.progress,_that.customerId,_that.productId,_that.customerName,_that.customerPhone,_that.customerEmail,_that.customerTaxCode,_that.customerCompanyName,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.licensePlate,_that.vehicleModel,_that.appointmentTime,_that.description,_that.billed,_that.taskType,_that.isBlinking,_that.locationType,_that.address,_that.chatLogs);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String title,  String priority,  String? status,  String? sla,  int? progress,  String? customerId,  String? productId,  String? customerName,  String? customerPhone,  String? customerEmail,  String? customerTaxCode,  String? customerCompanyName,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? licensePlate,  String? vehicleModel,  String? appointmentTime,  String? description,  String? billed,  String? taskType,  bool? isBlinking,  String? locationType,  String? address,  List<ChatLog>? chatLogs)  $default,) {final _that = this;
switch (_that) {
case _TaskModel():
return $default(_that.id,_that.title,_that.priority,_that.status,_that.sla,_that.progress,_that.customerId,_that.productId,_that.customerName,_that.customerPhone,_that.customerEmail,_that.customerTaxCode,_that.customerCompanyName,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.licensePlate,_that.vehicleModel,_that.appointmentTime,_that.description,_that.billed,_that.taskType,_that.isBlinking,_that.locationType,_that.address,_that.chatLogs);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String title,  String priority,  String? status,  String? sla,  int? progress,  String? customerId,  String? productId,  String? customerName,  String? customerPhone,  String? customerEmail,  String? customerTaxCode,  String? customerCompanyName,  String? customerCity,  String? customerDistrict,  String? customerWard,  String? customerStreet,  String? licensePlate,  String? vehicleModel,  String? appointmentTime,  String? description,  String? billed,  String? taskType,  bool? isBlinking,  String? locationType,  String? address,  List<ChatLog>? chatLogs)?  $default,) {final _that = this;
switch (_that) {
case _TaskModel() when $default != null:
return $default(_that.id,_that.title,_that.priority,_that.status,_that.sla,_that.progress,_that.customerId,_that.productId,_that.customerName,_that.customerPhone,_that.customerEmail,_that.customerTaxCode,_that.customerCompanyName,_that.customerCity,_that.customerDistrict,_that.customerWard,_that.customerStreet,_that.licensePlate,_that.vehicleModel,_that.appointmentTime,_that.description,_that.billed,_that.taskType,_that.isBlinking,_that.locationType,_that.address,_that.chatLogs);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _TaskModel extends TaskModel {
  const _TaskModel({required this.id, required this.title, required this.priority, this.status, this.sla, this.progress, this.customerId, this.productId, this.customerName, this.customerPhone, this.customerEmail, this.customerTaxCode, this.customerCompanyName, this.customerCity, this.customerDistrict, this.customerWard, this.customerStreet, this.licensePlate, this.vehicleModel, this.appointmentTime, this.description, this.billed, this.taskType, this.isBlinking, this.locationType, this.address, final  List<ChatLog>? chatLogs}): _chatLogs = chatLogs,super._();
  factory _TaskModel.fromJson(Map<String, dynamic> json) => _$TaskModelFromJson(json);

@override final  String id;
@override final  String title;
@override final  String priority;
@override final  String? status;
@override final  String? sla;
@override final  int? progress;
@override final  String? customerId;
@override final  String? productId;
@override final  String? customerName;
@override final  String? customerPhone;
@override final  String? customerEmail;
@override final  String? customerTaxCode;
@override final  String? customerCompanyName;
@override final  String? customerCity;
@override final  String? customerDistrict;
@override final  String? customerWard;
@override final  String? customerStreet;
@override final  String? licensePlate;
@override final  String? vehicleModel;
@override final  String? appointmentTime;
@override final  String? description;
@override final  String? billed;
@override final  String? taskType;
@override final  bool? isBlinking;
@override final  String? locationType;
@override final  String? address;
 final  List<ChatLog>? _chatLogs;
@override List<ChatLog>? get chatLogs {
  final value = _chatLogs;
  if (value == null) return null;
  if (_chatLogs is EqualUnmodifiableListView) return _chatLogs;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(value);
}


/// Create a copy of TaskModel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$TaskModelCopyWith<_TaskModel> get copyWith => __$TaskModelCopyWithImpl<_TaskModel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$TaskModelToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _TaskModel&&(identical(other.id, id) || other.id == id)&&(identical(other.title, title) || other.title == title)&&(identical(other.priority, priority) || other.priority == priority)&&(identical(other.status, status) || other.status == status)&&(identical(other.sla, sla) || other.sla == sla)&&(identical(other.progress, progress) || other.progress == progress)&&(identical(other.customerId, customerId) || other.customerId == customerId)&&(identical(other.productId, productId) || other.productId == productId)&&(identical(other.customerName, customerName) || other.customerName == customerName)&&(identical(other.customerPhone, customerPhone) || other.customerPhone == customerPhone)&&(identical(other.customerEmail, customerEmail) || other.customerEmail == customerEmail)&&(identical(other.customerTaxCode, customerTaxCode) || other.customerTaxCode == customerTaxCode)&&(identical(other.customerCompanyName, customerCompanyName) || other.customerCompanyName == customerCompanyName)&&(identical(other.customerCity, customerCity) || other.customerCity == customerCity)&&(identical(other.customerDistrict, customerDistrict) || other.customerDistrict == customerDistrict)&&(identical(other.customerWard, customerWard) || other.customerWard == customerWard)&&(identical(other.customerStreet, customerStreet) || other.customerStreet == customerStreet)&&(identical(other.licensePlate, licensePlate) || other.licensePlate == licensePlate)&&(identical(other.vehicleModel, vehicleModel) || other.vehicleModel == vehicleModel)&&(identical(other.appointmentTime, appointmentTime) || other.appointmentTime == appointmentTime)&&(identical(other.description, description) || other.description == description)&&(identical(other.billed, billed) || other.billed == billed)&&(identical(other.taskType, taskType) || other.taskType == taskType)&&(identical(other.isBlinking, isBlinking) || other.isBlinking == isBlinking)&&(identical(other.locationType, locationType) || other.locationType == locationType)&&(identical(other.address, address) || other.address == address)&&const DeepCollectionEquality().equals(other._chatLogs, _chatLogs));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,id,title,priority,status,sla,progress,customerId,productId,customerName,customerPhone,customerEmail,customerTaxCode,customerCompanyName,customerCity,customerDistrict,customerWard,customerStreet,licensePlate,vehicleModel,appointmentTime,description,billed,taskType,isBlinking,locationType,address,const DeepCollectionEquality().hash(_chatLogs)]);

@override
String toString() {
  return 'TaskModel(id: $id, title: $title, priority: $priority, status: $status, sla: $sla, progress: $progress, customerId: $customerId, productId: $productId, customerName: $customerName, customerPhone: $customerPhone, customerEmail: $customerEmail, customerTaxCode: $customerTaxCode, customerCompanyName: $customerCompanyName, customerCity: $customerCity, customerDistrict: $customerDistrict, customerWard: $customerWard, customerStreet: $customerStreet, licensePlate: $licensePlate, vehicleModel: $vehicleModel, appointmentTime: $appointmentTime, description: $description, billed: $billed, taskType: $taskType, isBlinking: $isBlinking, locationType: $locationType, address: $address, chatLogs: $chatLogs)';
}


}

/// @nodoc
abstract mixin class _$TaskModelCopyWith<$Res> implements $TaskModelCopyWith<$Res> {
  factory _$TaskModelCopyWith(_TaskModel value, $Res Function(_TaskModel) _then) = __$TaskModelCopyWithImpl;
@override @useResult
$Res call({
 String id, String title, String priority, String? status, String? sla, int? progress, String? customerId, String? productId, String? customerName, String? customerPhone, String? customerEmail, String? customerTaxCode, String? customerCompanyName, String? customerCity, String? customerDistrict, String? customerWard, String? customerStreet, String? licensePlate, String? vehicleModel, String? appointmentTime, String? description, String? billed, String? taskType, bool? isBlinking, String? locationType, String? address, List<ChatLog>? chatLogs
});




}
/// @nodoc
class __$TaskModelCopyWithImpl<$Res>
    implements _$TaskModelCopyWith<$Res> {
  __$TaskModelCopyWithImpl(this._self, this._then);

  final _TaskModel _self;
  final $Res Function(_TaskModel) _then;

/// Create a copy of TaskModel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? title = null,Object? priority = null,Object? status = freezed,Object? sla = freezed,Object? progress = freezed,Object? customerId = freezed,Object? productId = freezed,Object? customerName = freezed,Object? customerPhone = freezed,Object? customerEmail = freezed,Object? customerTaxCode = freezed,Object? customerCompanyName = freezed,Object? customerCity = freezed,Object? customerDistrict = freezed,Object? customerWard = freezed,Object? customerStreet = freezed,Object? licensePlate = freezed,Object? vehicleModel = freezed,Object? appointmentTime = freezed,Object? description = freezed,Object? billed = freezed,Object? taskType = freezed,Object? isBlinking = freezed,Object? locationType = freezed,Object? address = freezed,Object? chatLogs = freezed,}) {
  return _then(_TaskModel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String,priority: null == priority ? _self.priority : priority // ignore: cast_nullable_to_non_nullable
as String,status: freezed == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String?,sla: freezed == sla ? _self.sla : sla // ignore: cast_nullable_to_non_nullable
as String?,progress: freezed == progress ? _self.progress : progress // ignore: cast_nullable_to_non_nullable
as int?,customerId: freezed == customerId ? _self.customerId : customerId // ignore: cast_nullable_to_non_nullable
as String?,productId: freezed == productId ? _self.productId : productId // ignore: cast_nullable_to_non_nullable
as String?,customerName: freezed == customerName ? _self.customerName : customerName // ignore: cast_nullable_to_non_nullable
as String?,customerPhone: freezed == customerPhone ? _self.customerPhone : customerPhone // ignore: cast_nullable_to_non_nullable
as String?,customerEmail: freezed == customerEmail ? _self.customerEmail : customerEmail // ignore: cast_nullable_to_non_nullable
as String?,customerTaxCode: freezed == customerTaxCode ? _self.customerTaxCode : customerTaxCode // ignore: cast_nullable_to_non_nullable
as String?,customerCompanyName: freezed == customerCompanyName ? _self.customerCompanyName : customerCompanyName // ignore: cast_nullable_to_non_nullable
as String?,customerCity: freezed == customerCity ? _self.customerCity : customerCity // ignore: cast_nullable_to_non_nullable
as String?,customerDistrict: freezed == customerDistrict ? _self.customerDistrict : customerDistrict // ignore: cast_nullable_to_non_nullable
as String?,customerWard: freezed == customerWard ? _self.customerWard : customerWard // ignore: cast_nullable_to_non_nullable
as String?,customerStreet: freezed == customerStreet ? _self.customerStreet : customerStreet // ignore: cast_nullable_to_non_nullable
as String?,licensePlate: freezed == licensePlate ? _self.licensePlate : licensePlate // ignore: cast_nullable_to_non_nullable
as String?,vehicleModel: freezed == vehicleModel ? _self.vehicleModel : vehicleModel // ignore: cast_nullable_to_non_nullable
as String?,appointmentTime: freezed == appointmentTime ? _self.appointmentTime : appointmentTime // ignore: cast_nullable_to_non_nullable
as String?,description: freezed == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as String?,billed: freezed == billed ? _self.billed : billed // ignore: cast_nullable_to_non_nullable
as String?,taskType: freezed == taskType ? _self.taskType : taskType // ignore: cast_nullable_to_non_nullable
as String?,isBlinking: freezed == isBlinking ? _self.isBlinking : isBlinking // ignore: cast_nullable_to_non_nullable
as bool?,locationType: freezed == locationType ? _self.locationType : locationType // ignore: cast_nullable_to_non_nullable
as String?,address: freezed == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as String?,chatLogs: freezed == chatLogs ? _self._chatLogs : chatLogs // ignore: cast_nullable_to_non_nullable
as List<ChatLog>?,
  ));
}


}

// dart format on
