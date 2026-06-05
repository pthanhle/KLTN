import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/quotation_model.dart';
import '../../../models/labor_item_model.dart';
import '../../dashboard/controllers/dashboard_controller.dart';


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

  @override
  AsyncValue<QuotationModel> build() {
    return const AsyncLoading();
  }

  void init(String orderId) {
    _orderId = orderId;
    ref.read(activeQuotationOrderIdProvider.notifier).state = orderId;
    _loadForOrder(orderId);
  }

  Future<void> _loadForOrder(String orderId) async {
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
      ReceptionSnapshot? snapshot;
      if (receptionInfo != null) {
        snapshot = ReceptionSnapshot(
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

      state = AsyncData(QuotationModel(
        orderId: orderId,
        diagnosis: DiagnosticItem(
          title: diagTitle,
          description: diagDescription,
          imageUrl: '',
        ),
        receptionSnapshot: snapshot,
      ));
    } catch (_) {
      state = AsyncData(QuotationModel(
        orderId: orderId,
        diagnosis: const DiagnosticItem(
          title: 'Chưa có kết quả chẩn đoán',
          description: 'KTV chưa hoàn tất kiểm tra xe',
          imageUrl: '',
        ),
      ));
    }
  }

  void updateAdvisorNote(String note) {
    if (state.hasValue && state.value != null) {
      state = AsyncData(state.value!.copyWith(advisorNote: note));
    }
  }

  void applyPromoCode(String code) {
    if (state.hasValue && state.value != null) {
      state = AsyncData(state.value!.copyWith(promoCode: code));
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
      final existingIndex = currentLabor.indexWhere((l) => l.id == labor.id);
      if (existingIndex < 0) {
        currentLabor.add(CartLaborItem(
          id: labor.id,
          name: labor.name,
          hours: labor.estimatedHours,
          rate: labor.estimatedHours > 0 ? labor.price / labor.estimatedHours : 0,
        ));
        state = AsyncData(state.value!.copyWith(labor: currentLabor));
      }
    }
  }
}

final quotationControllerProvider =
    NotifierProvider<QuotationController, AsyncValue<QuotationModel>>(
  QuotationController.new,
);
