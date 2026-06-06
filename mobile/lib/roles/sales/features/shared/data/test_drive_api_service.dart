import 'dart:convert';
import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import '../models/test_drive_booking.dart';

class TestDriveApiService {
  Dio _buildDio(String? token) {
    return Dio(BaseOptions(
      connectTimeout:
          Duration(milliseconds: ApiConfig.connectTimeout),
      receiveTimeout:
          Duration(milliseconds: ApiConfig.receiveTimeout),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        if (token != null) 'Authorization': 'Bearer $token',
      },
    ));
  }

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  // GET /staff/sale/appointments/pool — bookings chưa được phân công
  Future<List<TestDriveBooking>> fetchPool() async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/appointments/pool';
    final response = await dio.get(url);
    final List<dynamic> data = response.data as List<dynamic>;
    return data
        .map((e) => TestDriveBooking.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  // GET /staff/sale/appointments — bookings đã được phân công cho tôi
  Future<List<TaskModel>> fetchMyTasks() async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/appointments';
    final response = await dio.get(url);
    final Map<String, dynamic> body =
        response.data as Map<String, dynamic>;
    final List<dynamic> tasksJson =
        body['tasks'] as List<dynamic>? ?? [];
    return tasksJson
        .map((e) => TaskModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  // GET /staff/sale/appointments — cũng trả về bookings cho dashboard "hôm nay"
  Future<List<TestDriveBooking>> fetchMyBookings() async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/appointments';
    final response = await dio.get(url);
    final Map<String, dynamic> body =
        response.data as Map<String, dynamic>;
    final List<dynamic> bookingsJson =
        body['bookings'] as List<dynamic>? ?? [];
    return bookingsJson
        .map((e) =>
            TestDriveBooking.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  // POST /staff/sale/appointments/:id/request
  Future<void> requestJob(String bookingId) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url =
        '${ApiConfig.baseUrl}/staff/sale/appointments/$bookingId/request';
    await dio.post(url);
  }

  // PUT /staff/sale/appointments/:id
  Future<void> updateStatus(String bookingId, String status,
      {String? note}) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url =
        '${ApiConfig.baseUrl}/staff/sale/appointments/$bookingId';
    await dio.put(url, data: {
      'status': status,
      if (note != null && note.isNotEmpty) 'note': note,
    });
  }

  // POST /staff/sale/appointments/:id/checkin
  Future<void> submitCheckin(
      String bookingId, Uint8List? licenseImageBytes, Uint8List? signatureBytes) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/appointments/$bookingId/checkin';

    final String? licenseBase64 =
        licenseImageBytes != null ? base64Encode(licenseImageBytes) : null;
    final String? signatureBase64 =
        signatureBytes != null ? base64Encode(signatureBytes) : null;

    await dio.post(url, data: {
      if (licenseBase64 != null) 'driver_license_base64': licenseBase64,
      if (signatureBase64 != null) 'signature_base64': signatureBase64,
    });
  }

  // POST /staff/sale/appointments/:id/post-drive
  Future<void> submitPostDrive(
      String bookingId, int interestLevel, String feedback) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url =
        '${ApiConfig.baseUrl}/staff/sale/appointments/$bookingId/post-drive';
    await dio.post(url, data: {
      'interest_level': interestLevel,
      'feedback': feedback,
    });
  }
}

final testDriveApiService = TestDriveApiService();
