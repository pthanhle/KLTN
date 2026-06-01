import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/constants/api_constants.dart';

class WarehouseApiService {
  static String get _baseUrl => '${ApiConstants.baseUrl}/api/staff/warehouse';

  static Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  static Future<Map<String, String>> _getHeaders() async {
    final token = await _getToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<List<dynamic>> fetchPickLists() async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/pick-lists'),
        headers: await _getHeaders(),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load pick lists: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching pick lists: $e');
      throw Exception('Network error');
    }
  }

  static Future<bool> dispatchParts(String progressId, List<String> partIds) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/pick-lists/dispatch'),
        headers: await _getHeaders(),
        body: jsonEncode({
          'progress_id': progressId,
          'part_ids': partIds,
        }),
      );

      if (response.statusCode == 200) {
        return true;
      } else {
        print('Dispatch failed: ${response.body}');
        return false;
      }
    } catch (e) {
      print('Error dispatching parts: $e');
      return false;
    }
  }
}
