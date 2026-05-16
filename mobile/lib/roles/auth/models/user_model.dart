import 'package:freezed_annotation/freezed_annotation.dart';
import 'performance_model.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
abstract class UserModel with _$UserModel {
  const UserModel._();

  const factory UserModel({
    required String id,
    required String employeeId,
    required String fullName,
    required String email,
    required String phone,
    String? avatarUrl,
    required String role,
    required String department,
    required String status,
    
    String? joinDate,
    double? baseSalary,
    String? kpiType,
    double? kpiValue,
    bool? isOvertimeEligible,
    String? accessLevel,
    String? lastLogin,
    
    PerformanceModel? performance,

    String? accessToken,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
