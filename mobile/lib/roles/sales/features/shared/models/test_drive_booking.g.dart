// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'test_drive_booking.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_TestDriveBooking _$TestDriveBookingFromJson(Map<String, dynamic> json) =>
    _TestDriveBooking(
      id: json['_id'] as String,
      fullName: json['fullName'] as String,
      phoneNumber: json['phoneNumber'] as String,
      bookingType: json['bookingType'] as String,
      showroomBranch: json['showroomBranch'] as String?,
      city: json['city'] as String?,
      district: json['district'] as String?,
      ward: json['ward'] as String?,
      addressDetail: json['addressDetail'] as String?,
      selectedDate: json['selectedDate'] as String?,
      selectedTimeSlot: json['selectedTimeSlot'] as String?,
      hasDriverLicense: json['hasDriverLicense'] as bool? ?? false,
      note: json['note'] as String?,
      status: json['status'] as String,
      targetCarSku: json['targetCarSku'] as String?,
      assignedStaff: json['assignedStaff'] == null
          ? null
          : AssignedStaff.fromJson(
              json['assignedStaff'] as Map<String, dynamic>,
            ),
      requestedStaff: (json['requestedStaff'] as List<dynamic>?)
          ?.map((e) => RequestedStaff.fromJson(e as Map<String, dynamic>))
          .toList(),
      createdAt: json['createdAt'] as String?,
    );

Map<String, dynamic> _$TestDriveBookingToJson(_TestDriveBooking instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'fullName': instance.fullName,
      'phoneNumber': instance.phoneNumber,
      'bookingType': instance.bookingType,
      'showroomBranch': instance.showroomBranch,
      'city': instance.city,
      'district': instance.district,
      'ward': instance.ward,
      'addressDetail': instance.addressDetail,
      'selectedDate': instance.selectedDate,
      'selectedTimeSlot': instance.selectedTimeSlot,
      'hasDriverLicense': instance.hasDriverLicense,
      'note': instance.note,
      'status': instance.status,
      'targetCarSku': instance.targetCarSku,
      'assignedStaff': instance.assignedStaff,
      'requestedStaff': instance.requestedStaff,
      'createdAt': instance.createdAt,
    };

_AssignedStaff _$AssignedStaffFromJson(Map<String, dynamic> json) =>
    _AssignedStaff(
      id: json['_id'] as String,
      name: json['name'] as String,
      avatar: json['avatar'] as String?,
    );

Map<String, dynamic> _$AssignedStaffToJson(_AssignedStaff instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
      'avatar': instance.avatar,
    };

_RequestedStaff _$RequestedStaffFromJson(Map<String, dynamic> json) =>
    _RequestedStaff(
      id: json['_id'] as String,
      fullName: json['fullName'] as String,
      avatarUrl: json['avatarUrl'] as String?,
    );

Map<String, dynamic> _$RequestedStaffToJson(_RequestedStaff instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'fullName': instance.fullName,
      'avatarUrl': instance.avatarUrl,
    };
