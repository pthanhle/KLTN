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
}

final testDriveApiService = TestDriveApiService();
