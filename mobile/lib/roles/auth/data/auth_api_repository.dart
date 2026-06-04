import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import '../models/login_request.dart';
import '../models/user_model.dart';
import 'auth_repository.dart';

class AuthApiRepository implements AuthRepository {
  final Dio _dio = Dio(BaseOptions(
    connectTimeout: Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: Duration(milliseconds: ApiConfig.receiveTimeout),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  @override
  Future<UserModel> login(LoginRequest request) async {
    final url = '${ApiConfig.baseUrl}/staff/auth/login';

    try {
      final response = await _dio.post(url, data: {
        'employeeId': request.employeeId,
        'password': request.password,
      });

      final data = response.data as Map<String, dynamic>;

      final prefs = await SharedPreferences.getInstance();
      if (data['accessToken'] != null) {
        await prefs.setString('access_token', data['accessToken'] as String);
      }

      return UserModel.fromJson(data);
    } on DioException catch (e) {
      String? serverMessage;
      if (e.response?.data is Map) {
        serverMessage = e.response?.data['message']?.toString();
      } else if (e.response?.data is List && (e.response?.data as List).isNotEmpty) {
        final firstError = (e.response?.data as List).first;
        if (firstError is Map) {
          serverMessage = firstError['message']?.toString();
        }
      }

      if (serverMessage != null && serverMessage.isNotEmpty) {
        throw Exception(serverMessage);
      }
      if (e.type == DioExceptionType.connectionTimeout ||
          e.type == DioExceptionType.receiveTimeout) {
        throw Exception('Kết nối quá thời gian. Vui lòng thử lại.');
      }
      if (e.type == DioExceptionType.connectionError) {
        throw Exception('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
      }
      throw Exception('Đăng nhập thất bại. Vui lòng thử lại.');
    } catch (e) {
      throw Exception('Đã xảy ra lỗi không xác định.');
    }
  }

  @override
  Future<void> logout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('access_token');

      await _dio.post(
        '${ApiConfig.baseUrl}/staff/auth/logout',
        options: Options(headers: {
          if (token != null) 'Authorization': 'Bearer $token',
        }),
      );
    } catch (_) {
    } finally {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('access_token');
    }
  }
}
