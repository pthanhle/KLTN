import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../models/quotation_model.dart';
import '../../../models/labor_item_model.dart';
import '../../dashboard/controllers/dashboard_controller.dart';
import '../../walkaround/models/service_package_model.dart';


class _ActiveQuotationOrderIdNotifier extends Notifier<String> {
  @override
  String build() => '';
}

final activeQuotationOrderIdProvider =
    NotifierProvider<_ActiveQuotationOrderIdNotifier, String>(
  _ActiveQuotationOrderIdNotifier.new,
);

class QuotationController extends Notifier<AsyncValue<QuotationModel>> {
  late String _orderId;

  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
  ));

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  @override
  AsyncValue<QuotationModel> build() {
    return const AsyncLoading();
  }

  void init(String orderId) {
    _orderId = orderId;
    ref.read(activeQuotationOrderIdProvider.notifier).state = orderId;
    // Capture in-session cart before clearing, so _loadForOrder can preserve it.
    final sessionSnapshot = state.value;
    state = const AsyncLoading();
    ref.read(advisorDashboardProvider.notifier).refresh().then((_) {
      _loadForOrder(orderId, sessionSnapshot: sessionSnapshot);
    });
  }

  void refresh() {
    final sessionSnapshot = state.value;
    state = const AsyncLoading();
    ref.read(advisorDashboardProvider.notifier).refresh().then((_) {
      _loadForOrder(_orderId, sessionSnapshot: sessionSnapshot);
    });
  }

  /// Fetches the submitted quotation from the backend for the given progress ID.
  /// Returns (parts, labors) or empty lists if not available / not yet submitted.
  Future<(List<CartPartItem>, List<CartLaborItem>)> _fetchBackendQuotation(String progressId) async {
    try {
      final token = await _getToken();
      final resp = await _dio.get(
        '${ApiConfig.baseUrl}/staff/service/repair-progress/$progressId',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
      final data = resp.data as Map<String, dynamic>? ?? {};
      final q = data['quotation'] as Map<String, dynamic>? ?? {};

      final parts = (q['parts'] as List<dynamic>? ?? []).asMap().entries.map((e) {
        final p = e.value as Map<String, dynamic>;
        return CartPartItem(
          id: p['sku']?.toString().isNotEmpty == true
              ? p['sku'].toString()
              : 'part_${e.key}',
          sku: p['sku']?.toString() ?? '',
          name: p['name']?.toString() ?? '',
          price: (p['unit_price'] as num?)?.toDouble() ?? 0,
          quantity: (p['quantity'] as num?)?.toInt() ?? 1,
        );
      }).toList();

      final labors = (q['labors'] as List<dynamic>? ?? []).asMap().entries.map((e) {
        final l = e.value as Map<String, dynamic>;
        return CartLaborItem(
          id: l['description']?.toString().isNotEmpty == true
              ? l['description'].toString()
              : 'labor_${e.key}',
          name: l['description']?.toString() ?? '',
          hours: (l['hours'] as num?)?.toDouble() ?? 0,
          rate: (l['rate'] as num?)?.toDouble() ?? 0,
        );
      }).toList();

      return (parts, labors);
    } catch (_) {
      return (const <CartPartItem>[], const <CartLaborItem>[]);
    }
  }

  Future<void> _loadForOrder(String orderId, {QuotationModel? sessionSnapshot}) async {
    // Restore submitted quotation from backend (handles app restart after submit).
    final (backendParts, backendLabors) = await _fetchBackendQuotation(orderId);

    final dashboard = ref.read(advisorDashboardProvider);
    try {
      final order = dashboard.allRepairOrders.firstWhere((o) => o.id == orderId);

      final diagTitle = order.mpiDiagnostics.isNotEmpty
          ? '${order.mpiDiagnostics.length} hạng mục đã kiểm tra'
          : 'Chưa có kết quả chẩn đoán';

      final criticalCount = order.mpiDiagnostics
          .fold(0, (sum, cat) => sum + cat.criticalCount);
      final warningCount = order.mpiDiagnostics
          .fold(0, (sum, cat) => sum + cat.warningCount);

      final diagDescription = order.mpiConclusion.isNotEmpty
          ? order.mpiConclusion
          : (criticalCount > 0 || warningCount > 0
              ? '$criticalCount hạng mục lỗi, $warningCount hạng mục cần theo dõi'
              : 'Xe trong tình trạng bình thường');

      final receptionInfo = order.receptionInfo;
      ReceptionSnapshot? receptionSnapshot;
      if (receptionInfo != null) {
        receptionSnapshot = ReceptionSnapshot(
          odometer: receptionInfo.odometer,
          fuelLevel: receptionInfo.fuelLevel.round(),
          customerNotes: receptionInfo.customerNotes,
          damageMap: receptionInfo.damageMap
              .map((d) => ReceptionDamagePoint(
                    label: d['label']?.toString() ?? '',
                    description: d['description']?.toString() ?? '',
                    x: (d['x'] as num?)?.toDouble() ?? 0.0,
                    y: (d['y'] as num?)?.toDouble() ?? 0.0,
                  ))
              .toList(),
          belongings: receptionInfo.belongings
              .map((b) => ReceptionBelonging(
                    item: b['item']?.toString() ?? '',
                    status: b['status'] == true,
                  ))
              .toList(),
        );
      }

      // Cart priority: in-session edits (not yet submitted) > backend submitted data > empty.
      // "In-session edits" are captured in sessionSnapshot before state is cleared.
      final parts = sessionSnapshot?.parts.isNotEmpty == true
          ? sessionSnapshot!.parts
          : backendParts;
      final labor = sessionSnapshot?.labor.isNotEmpty == true
          ? sessionSnapshot!.labor
          : backendLabors;
      final services = sessionSnapshot?.selectedServices.isNotEmpty == true
          ? sessionSnapshot!.selectedServices
          : order.selectedServices;

      state = AsyncData(QuotationModel(
        orderId: orderId,
        diagnosis: DiagnosticItem(
          title: diagTitle,
          description: diagDescription,
          imageUrl: '',
        ),
        receptionSnapshot: receptionSnapshot,
        selectedServices: services,
        parts: parts,
        labor: labor,
      ));
    } catch (_) {
      state = AsyncData(QuotationModel(
        orderId: orderId,
        diagnosis: const DiagnosticItem(
          title: 'Chưa có kết quả chẩn đoán',
          description: 'KTV chưa hoàn tất kiểm tra xe',
          imageUrl: '',
        ),
        parts: backendParts,
        labor: backendLabors,
      ));
    }
  }

  void applyPromoCode(String code) {
    // Promo code logic not yet implemented
  }

  void updateAdvisorNote(String note) {
    if (state.hasValue && state.value != null) {
      state = AsyncData(state.value!.copyWith(advisorNote: note));
    }
  }

  void updateExpectedDate(String partId, String date) {
    if (state.hasValue && state.value != null) {
      final updatedParts = state.value!.parts.map((p) {
        if (p.id == partId) return CartPartItem(
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          isBackorder: p.isBackorder,
          expectedDate: date,
        );
        return p;
      }).toList();
      state = AsyncData(state.value!.copyWith(parts: updatedParts));
    }
  }

  void addPart(CartPartItem part) {
    if (state.hasValue && state.value != null) {
      final currentParts = List<CartPartItem>.from(state.value!.parts);
      final existingIndex = currentParts.indexWhere((p) => p.id == part.id);
      if (existingIndex >= 0) {
        final existing = currentParts[existingIndex];
        currentParts[existingIndex] = CartPartItem(
          id: existing.id,
          name: existing.name,
          price: existing.price,
          quantity: existing.quantity + part.quantity,
          isBackorder: existing.isBackorder,
          expectedDate: existing.expectedDate,
        );
      } else {
        currentParts.add(part);
      }
      state = AsyncData(state.value!.copyWith(parts: currentParts));
    }
  }

  void addLabor(LaborItemModel labor) {
    if (state.hasValue && state.value != null) {
      final currentLabor = List<CartLaborItem>.from(state.value!.labor);
      final existingIndex = currentLabor.indexWhere((l) => l.id == labor.laborCode);
      if (existingIndex < 0) {
        currentLabor.add(CartLaborItem(
          id: labor.laborCode,
          name: labor.name,
          hours: labor.estimatedHours,
          rate: labor.estimatedHours > 0 ? labor.basePrice / labor.estimatedHours : labor.basePrice,
        ));
        state = AsyncData(state.value!.copyWith(labor: currentLabor));
      }
    }
  }

  void removeLabor(String id) {
    if (state.hasValue && state.value != null) {
      final updated = state.value!.labor.where((l) => l.id != id).toList();
      state = AsyncData(state.value!.copyWith(labor: updated));
    }
  }

  void removePart(String id) {
    if (state.hasValue && state.value != null) {
      final updated = state.value!.parts.where((p) => p.id != id).toList();
      state = AsyncData(state.value!.copyWith(parts: updated));
    }
  }

  void addServicePackage(ServicePackageModel pkg) {
    if (state.hasValue && state.value != null) {
      final current = List<ServicePackageModel>.from(state.value!.selectedServices);
      if (!current.any((s) => s.id == pkg.id)) {
        current.add(pkg);
        state = AsyncData(state.value!.copyWith(selectedServices: current));
      }
    }
  }

  void removeServicePackage(String id) {
    if (state.hasValue && state.value != null) {
      final updated = state.value!.selectedServices.where((s) => s.id != id).toList();
      state = AsyncData(state.value!.copyWith(selectedServices: updated));
    }
  }

  Future<void> submitQuotation() async {
    if (!state.hasValue || state.value == null) return;
    final quotation = state.value!;

    final token = await _getToken();
    final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/quotation';

    final backendParts = quotation.parts.map((p) => {
      'sku': p.sku,
      'name': p.name,
      'quantity': p.quantity,
      'unit_price': p.price,
    }).toList();

    final backendLabors = quotation.labor.map((l) => {
      'description': l.name,
      'hours': l.hours,
      'rate': l.rate,
    }).toList();

    final response = await _dio.post(
      url,
      data: jsonEncode({
        'progress_id': _orderId,
        'parts': backendParts,
        'labors': backendLabors,
        'vat_rate': 0.1,
        'service_package_total': quotation.servicePackageTotal,
      }),
      options: Options(headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      }),
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      throw Exception(response.data['message'] ?? 'Gửi báo giá thất bại');
    }
  }
}

final quotationControllerProvider =
    NotifierProvider<QuotationController, AsyncValue<QuotationModel>>(
  QuotationController.new,
);
