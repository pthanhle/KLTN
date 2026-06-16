import 'package:dio/dio.dart';

class VnProvinceModel {
  final String code;
  final String name;

  VnProvinceModel({required this.code, required this.name});

  factory VnProvinceModel.fromJson(Map<String, dynamic> json) {
    return VnProvinceModel(
      code: json['code'].toString(),
      name: json['name'] as String,
    );
  }
}

class VnProvincesService {
  final Dio _dio = Dio();
  final String _baseUrl = 'https://provinces.open-api.vn/api';

  Future<List<VnProvinceModel>> fetchProvinces() async {
    try {
      final response = await _dio.get('$_baseUrl/p/');
      final data = response.data as List;
      return data.map((e) => VnProvinceModel.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<List<VnProvinceModel>> fetchDistricts(String provinceCode) async {
    try {
      final response = await _dio.get('$_baseUrl/p/$provinceCode?depth=2');
      final data = response.data['districts'] as List;
      return data.map((e) => VnProvinceModel.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }

  Future<List<VnProvinceModel>> fetchWards(String districtCode) async {
    try {
      final response = await _dio.get('$_baseUrl/d/$districtCode?depth=2');
      final data = response.data['wards'] as List;
      return data.map((e) => VnProvinceModel.fromJson(e)).toList();
    } catch (e) {
      return [];
    }
  }
}

final vnProvincesService = VnProvincesService();
