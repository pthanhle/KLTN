import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../core/config/api_config.dart';
import '../../../models/labor_item_model.dart';
import '../../../models/part_item_model.dart';
import '../models/supplement_labor_model.dart';
import '../models/supplement_part_model.dart';
import '../models/supplement_model.dart';

class SupplementController extends Notifier<AsyncValue<SupplementModel>> {
  late String _progressId;

  final Dio _dio = Dio(BaseOptions(
    connectTimeout: const Duration(milliseconds: ApiConfig.connectTimeout),
    receiveTimeout: const Duration(milliseconds: ApiConfig.receiveTimeout),
  ));

  Future<String?> _getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  @override
  AsyncValue<SupplementModel> build() {
    return const AsyncLoading();
  }

  void init(String progressId) {
    _progressId = progressId;
    _loadSupplement();
  }

  Future<void> _loadSupplement() async {
    state = const AsyncLoading();
    try {
      final token = await _getToken();
      final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/$_progressId';
      final response = await _dio.get(
        url,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final data = response.data;
      final progress = data['repairProgress'] ?? data;
      final supplements = progress['supplement_requests'] as List<dynamic>? ?? [];

      final pending = supplements.firstWhere(
        (s) => (s['status'] ?? '') == 'PENDING',
        orElse: () => null,
      );

      if (pending == null) {
        state = AsyncError('Không có yêu cầu bổ sung đang chờ duyệt', StackTrace.current);
        return;
      }

      final quotation = progress['quotation'] ?? {};
      final quotParts = quotation['parts'] as List<dynamic>? ?? [];
      final quotLabors = quotation['labors'] as List<dynamic>? ?? [];
      final oldCost = quotParts.fold<double>(0, (s, p) => s + ((p['unit_price'] as num? ?? 0) * (p['quantity'] as num? ?? 0)).toDouble())
                    + quotLabors.fold<double>(0, (s, l) => s + ((l['hours'] as num? ?? 0) * (l['rate'] as num? ?? 0)).toDouble());
      final supplementTotal = (pending['total_price'] as num?)?.toDouble() ?? 0.0;

      final now = DateTime.now();
      final expectedDelivery = progress['expected_delivery_time'] != null
          ? (DateTime.tryParse(progress['expected_delivery_time'].toString()) ?? now.add(const Duration(days: 1)))
          : now.add(const Duration(days: 1));

      state = AsyncData(SupplementModel(
        id: _progressId,
        supplementId: pending['_id']?.toString() ?? '',
        orderId: _progressId,
        issueTitle: pending['title']?.toString() ?? 'Yêu cầu bổ sung',
        issueDescription: pending['description']?.toString() ?? '',
        proposedFix: pending['description']?.toString() ?? '',
        mechanicName: pending['mechanic_name']?.toString() ?? 'KTV',
        mechanicRole: 'Kỹ thuật viên',
        evidenceMediaUrls: List<String>.from(pending['evidence_images'] ?? []),
        oldCost: oldCost,
        newCost: oldCost + supplementTotal,
        oldDeliveryTime: expectedDelivery,
        newDeliveryTime: expectedDelivery.add(Duration(
          hours: (pending['delay_reason']?.toString().isNotEmpty == true) ? 24 : 0,
        )),
        delayReason: pending['delay_reason']?.toString() ?? '',
        status: SupplementStatus.pending,
      ));
    } catch (e, st) {
      state = AsyncError(e, st);
    }
  }

  void addPart(SupplementPartModel part) {
    final current = state.value;
    if (current == null) return;
    final existing = current.addedParts.indexWhere((p) => p.sku == part.sku);
    List<SupplementPartModel> updated;
    if (existing >= 0) {
      updated = [...current.addedParts];
      final old = updated[existing];
      updated[existing] = old.copyWith(quantity: old.quantity + 1);
    } else {
      updated = [...current.addedParts, part];
    }
    state = AsyncData(current.copyWith(addedParts: updated));
  }

  void addLabor(SupplementLaborModel labor) {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(addedLabors: [...current.addedLabors, labor]));
  }

  void addPartFromSearch(PartItemModel part, int quantity, {String? expectedDate}) {
    final supplementPart = SupplementPartModel(
      id: part.id,
      sku: part.sku,
      name: part.name,
      unitPrice: part.price,
      quantity: quantity,
      stockOnHand: part.availableStock,
    );
    final current = state.value;
    if (current == null) return;
    final existing = current.addedParts.indexWhere((p) => p.sku == part.sku);
    List<SupplementPartModel> updated;
    if (existing >= 0) {
      updated = [...current.addedParts];
      final old = updated[existing];
      updated[existing] = old.copyWith(quantity: old.quantity + quantity);
    } else {
      updated = [...current.addedParts, supplementPart];
    }
    state = AsyncData(current.copyWith(addedParts: updated));
  }

  void addLaborsFromSearch(List<LaborItemModel> labors) {
    final current = state.value;
    if (current == null) return;
    final newItems = labors.map((l) => SupplementLaborModel(
      id: l.laborCode,
      laborCode: l.laborCode,
      description: l.name,
      unitPrice: l.basePrice,
      quantity: l.estimatedHours,
    )).toList();
    state = AsyncData(current.copyWith(addedLabors: [...current.addedLabors, ...newItems]));
  }

  void updatePartQuantity(String id, int quantity) {
    final current = state.value;
    if (current == null) return;
    if (quantity <= 0) {
      removePart(id);
      return;
    }
    final updated = current.addedParts.map((p) {
      return p.id == id ? p.copyWith(quantity: quantity) : p;
    }).toList();
    state = AsyncData(current.copyWith(addedParts: updated));
  }

  void removePart(String id) {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(
      addedParts: current.addedParts.where((p) => p.id != id).toList(),
    ));
  }

  void removeLabor(String id) {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(
      addedLabors: current.addedLabors.where((l) => l.id != id).toList(),
    ));
  }

  Future<void> resolve(String action) async {
    final current = state.value;
    if (current == null) return;

    try {
      final token = await _getToken();
      final url = '${ApiConfig.baseUrl}/staff/service/repair-progress/supplement/resolve';
      await _dio.post(
        url,
        data: jsonEncode({
          'progress_id': _progressId,
          'supplement_id': current.supplementId,
          'action': action,
        }),
        options: Options(headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        }),
      );

      state = AsyncData(SupplementModel(
        id: current.id,
        supplementId: current.supplementId,
        orderId: current.orderId,
        issueTitle: current.issueTitle,
        issueDescription: current.issueDescription,
        proposedFix: current.proposedFix,
        mechanicName: current.mechanicName,
        mechanicRole: current.mechanicRole,
        evidenceMediaUrls: current.evidenceMediaUrls,
        oldCost: current.oldCost,
        newCost: current.newCost,
        oldDeliveryTime: current.oldDeliveryTime,
        newDeliveryTime: current.newDeliveryTime,
        delayReason: current.delayReason,
        status: action == 'APPROVED' ? SupplementStatus.approved : SupplementStatus.rejected,
      ));
    } catch (e) {
      rethrow;
    }
  }
}

final supplementControllerProvider =
    NotifierProvider<SupplementController, AsyncValue<SupplementModel>>(() {
  return SupplementController();
});
