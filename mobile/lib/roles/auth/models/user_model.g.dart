// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_UserModel _$UserModelFromJson(Map<String, dynamic> json) => _UserModel(
  id: json['id'] as String,
  employeeId: json['employeeId'] as String,
  fullName: json['fullName'] as String,
  email: json['email'] as String,
  phone: json['phone'] as String,
  avatarUrl: json['avatarUrl'] as String?,
  role: json['role'] as String,
  department: json['department'] as String,
  status: json['status'] as String,
  joinDate: json['joinDate'] as String?,
  baseSalary: (json['baseSalary'] as num?)?.toDouble(),
  kpiType: json['kpiType'] as String?,
  kpiValue: (json['kpiValue'] as num?)?.toDouble(),
  isOvertimeEligible: json['isOvertimeEligible'] as bool?,
  accessLevel: json['accessLevel'] as String?,
  lastLogin: json['lastLogin'] as String?,
  performance: json['performance'] == null
      ? null
      : PerformanceModel.fromJson(json['performance'] as Map<String, dynamic>),
  accessToken: json['accessToken'] as String?,
);

Map<String, dynamic> _$UserModelToJson(_UserModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'employeeId': instance.employeeId,
      'fullName': instance.fullName,
      'email': instance.email,
      'phone': instance.phone,
      'avatarUrl': instance.avatarUrl,
      'role': instance.role,
      'department': instance.department,
      'status': instance.status,
      'joinDate': instance.joinDate,
      'baseSalary': instance.baseSalary,
      'kpiType': instance.kpiType,
      'kpiValue': instance.kpiValue,
      'isOvertimeEligible': instance.isOvertimeEligible,
      'accessLevel': instance.accessLevel,
      'lastLogin': instance.lastLogin,
      'performance': instance.performance,
      'accessToken': instance.accessToken,
    };
