import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import '../models/contract_payload_model.dart';
import '../models/vehicle_unit_model.dart';

class ContractApiService {
  Dio _buildDio(String? token) {
    return Dio(BaseOptions(
      connectTimeout: Duration(milliseconds: ApiConfig.connectTimeout),
      receiveTimeout: Duration(milliseconds: ApiConfig.receiveTimeout),
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

  // GET /staff/sale/vehicle-units?car_id={carId}&status=in_stock
  Future<List<VehicleUnitModel>> fetchVehicleUnits(String carId) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/vehicle-units';
    
    final response = await dio.get(url, queryParameters: {
      'carId': carId, // BE expect carId query
      'status': 'in_stock',
    });
    
    final Map<String, dynamic> body = response.data as Map<String, dynamic>;
    final List<dynamic> itemsJson = body['data'] as List<dynamic>? ?? [];
    
    return itemsJson
        .map((e) => VehicleUnitModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  // POST /staff/sale/vehicle-contracts
  Future<void> submitContract(ContractPayloadModel payload) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/vehicle-contracts';
    
    await dio.post(url, data: payload.toJson());
  }

  // GET /staff/sale/cost-estimate
  Future<Map<String, dynamic>> fetchCostEstimateConfig() async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/cost-estimate';
    
    try {
      final response = await dio.get(url);
      final body = response.data as Map<String, dynamic>;
      if (body['success'] == true && body['data'] != null) {
        return body['data'] as Map<String, dynamic>;
      }
      return {};
    } catch (e) {
      return {};
    }
  }
}

final contractApiService = ContractApiService();
