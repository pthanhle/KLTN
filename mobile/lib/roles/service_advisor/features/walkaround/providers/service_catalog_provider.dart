import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/service_package_model.dart';
import '../data/walkaround_api_repository.dart';

final serviceCatalogProvider = FutureProvider.autoDispose<List<ServicePackageModel>>((ref) {
  return WalkaroundApiRepository().fetchServiceCatalog();
});
