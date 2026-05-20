import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/service_package_model.dart';
import '../data/walkaround_mock_data.dart';


final serviceCatalogProvider = Provider<List<ServicePackageModel>>((ref) {
  return mockServicePackages;
});
