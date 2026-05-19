import 'package:freezed_annotation/freezed_annotation.dart';

part 'test_drive_booking.freezed.dart';
part 'test_drive_booking.g.dart';

@freezed
abstract class TestDriveBooking with _$TestDriveBooking {
  const factory TestDriveBooking({
    @JsonKey(name: '_id') required String id,
    required String fullName,
    required String phoneNumber,
    required String bookingType, // 'showroom', 'home', 'waitlist'
    String? showroomBranch,
    String? city,
    String? district,
    String? ward,
    String? addressDetail,
    String? selectedDate, // DD/MM/YYYY
    String? selectedTimeSlot,
    @Default(false) bool hasDriverLicense,
    String? note,
    required String status, // 'Pending', 'Confirmed', 'InProgress', 'Completed', 'Cancelled'
    String? targetCarSku,
    AssignedStaff? assignedStaff,
    List<RequestedStaff>? requestedStaff,
    String? createdAt,
  }) = _TestDriveBooking;

  factory TestDriveBooking.fromJson(Map<String, dynamic> json) =>
      _$TestDriveBookingFromJson(json);
}

@freezed
abstract class AssignedStaff with _$AssignedStaff {
  const factory AssignedStaff({
    @JsonKey(name: '_id') required String id,
    required String name,
    String? avatar,
  }) = _AssignedStaff;

  factory AssignedStaff.fromJson(Map<String, dynamic> json) =>
      _$AssignedStaffFromJson(json);
}

@freezed
abstract class RequestedStaff with _$RequestedStaff {
  const factory RequestedStaff({
    @JsonKey(name: '_id') required String id,
    required String fullName,
    String? avatarUrl,
  }) = _RequestedStaff;

  factory RequestedStaff.fromJson(Map<String, dynamic> json) =>
      _$RequestedStaffFromJson(json);
}
