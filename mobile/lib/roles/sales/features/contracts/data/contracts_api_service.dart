import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import '../models/vehicle_contract_list_model.dart';

class ContractsApiService {
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

  Future<({List<VehicleContractListModel> contracts, int totalPages})> fetchContracts({
    int page = 1,
    int limit = 20,
    String? status,
  }) async {
    final token = await _getToken();
    final dio = _buildDio(token);
    final url = '${ApiConfig.baseUrl}/staff/sale/vehicle-contracts';

    final queryParams = <String, dynamic>{
      'page': page,
      'limit': limit,
    };
    if (status != null && status != 'all') {
      queryParams['status'] = status;
    }

    final response = await dio.get(url, queryParameters: queryParams);
    final body = response.data as Map<String, dynamic>;

    if (body['success'] == true) {
      final List<dynamic> dataJson = body['data'] as List<dynamic>? ?? [];
      final contracts = dataJson
          .map((e) => VehicleContractListModel.fromJson(e as Map<String, dynamic>))
          .toList();
      
      final pagination = body['pagination'] as Map<String, dynamic>?;
      final totalPages = pagination?['totalPages'] as int? ?? 1;

      return (contracts: contracts, totalPages: totalPages);
    } else {
      throw Exception('Failed to load contracts');
    }
  }
}

final contractsApiService = ContractsApiService();
