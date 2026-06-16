import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/vn_provinces_service.dart';

class VnProvincesState {
  final bool isLoadingProvinces;
  final bool isLoadingDistricts;
  final bool isLoadingWards;
  final List<VnProvinceModel> provinces;
  final List<VnProvinceModel> districts;
  final List<VnProvinceModel> wards;

  VnProvincesState({
    this.isLoadingProvinces = false,
    this.isLoadingDistricts = false,
    this.isLoadingWards = false,
    this.provinces = const [],
    this.districts = const [],
    this.wards = const [],
  });

  VnProvincesState copyWith({
    bool? isLoadingProvinces,
    bool? isLoadingDistricts,
    bool? isLoadingWards,
    List<VnProvinceModel>? provinces,
    List<VnProvinceModel>? districts,
    List<VnProvinceModel>? wards,
  }) {
    return VnProvincesState(
      isLoadingProvinces: isLoadingProvinces ?? this.isLoadingProvinces,
      isLoadingDistricts: isLoadingDistricts ?? this.isLoadingDistricts,
      isLoadingWards: isLoadingWards ?? this.isLoadingWards,
      provinces: provinces ?? this.provinces,
      districts: districts ?? this.districts,
      wards: wards ?? this.wards,
    );
  }
}

class VnProvincesController extends Notifier<VnProvincesState> {
  @override
  VnProvincesState build() {
    Future.microtask(() => fetchProvinces());
    return VnProvincesState();
  }

  Future<void> fetchProvinces() async {
    state = state.copyWith(isLoadingProvinces: true);
    final data = await vnProvincesService.fetchProvinces();
    state = state.copyWith(isLoadingProvinces: false, provinces: data);
  }

  Future<void> fetchDistricts(String provinceCode) async {
    state = state.copyWith(isLoadingDistricts: true, districts: [], wards: []);
    final data = await vnProvincesService.fetchDistricts(provinceCode);
    state = state.copyWith(isLoadingDistricts: false, districts: data);
  }

  Future<void> fetchWards(String districtCode) async {
    state = state.copyWith(isLoadingWards: true, wards: []);
    final data = await vnProvincesService.fetchWards(districtCode);
    state = state.copyWith(isLoadingWards: false, wards: data);
  }

  bool _isMatch(String item, String target) {
    if (item.isEmpty || target.isEmpty) return false;

    String normalize(String s) {
      String res = s.toLowerCase();
      res = res.replaceAll(RegExp(r'^(thành phố|tỉnh|quận|huyện|phường|xã)\s+'), '');
      res = res.replaceAll(RegExp(r'\b0(\d)\b'), r'$1');
      return res.trim();
    }

    final normItem = normalize(item);
    final normTarget = normalize(target);

    return normItem == normTarget;
  }

  Future<void> preloadAddresses(String? city, String? district) async {
    if (city == null || city.isEmpty) return;
    
    if (state.provinces.isEmpty) {
      await fetchProvinces();
    }

    try {
      final matchedProvince = state.provinces.firstWhere((p) => _isMatch(p.name, city));
      await fetchDistricts(matchedProvince.code);

      if (district != null && district.isNotEmpty) {
        final matchedDistrict = state.districts.firstWhere((d) => _isMatch(d.name, district));
        await fetchWards(matchedDistrict.code);
      }
    } catch (_) {
    }
  }
}

final vnProvincesControllerProvider = NotifierProvider<VnProvincesController, VnProvincesState>(() {
  return VnProvincesController();
});
