import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/walkaround_model.dart';
import '../models/service_package_model.dart';
import '../models/hotspot_model.dart';
import '../models/checklist_item_model.dart';
import '../data/walkaround_api_repository.dart';
import '../../dashboard/controllers/dashboard_controller.dart';

class WalkaroundState {
  final WalkaroundModel data;
  final int currentStep;
  final bool isLoading;
  final String? bookingId;
  final String? submitError;
  final bool submitSuccess;

  WalkaroundState({
    required this.data,
    this.currentStep = 0,
    this.isLoading = false,
    this.bookingId,
    this.submitError,
    this.submitSuccess = false,
  });

  WalkaroundState copyWith({
    WalkaroundModel? data,
    int? currentStep,
    bool? isLoading,
    String? bookingId,
    String? submitError,
    bool? submitSuccess,
  }) {
    return WalkaroundState(
      data: data ?? this.data,
      currentStep: currentStep ?? this.currentStep,
      isLoading: isLoading ?? this.isLoading,
      bookingId: bookingId ?? this.bookingId,
      submitError: submitError ?? this.submitError,
      submitSuccess: submitSuccess ?? this.submitSuccess,
    );
  }
}

class WalkaroundController extends Notifier<WalkaroundState> {
  final _api = WalkaroundApiRepository();

  @override
  WalkaroundState build() {
    return WalkaroundState(
      data: const WalkaroundModel(orderId: ''),
    );
  }

  void init(String orderId) {
    try {
      final dashboardState = ref.read(advisorDashboardProvider);
      final order = dashboardState.allRepairOrders.firstWhere((o) => o.id == orderId);
      state = state.copyWith(
        bookingId: order.bookingId,
        data: state.data.copyWith(
          orderId: order.id,
          customerComplaint: order.customerNote,
          selectedPackages: order.selectedServices,
          checklist: [
            const ChecklistItemModel(id: 'chk_1', name: 'Tài sản (Tiền mặt, Kính râm)', checked: false),
            const ChecklistItemModel(id: 'chk_2', name: 'Tình trạng đèn chiếu sáng', checked: false),
            const ChecklistItemModel(id: 'chk_3', name: 'Lốp xe và Mâm xe', checked: false),
            const ChecklistItemModel(id: 'chk_4', name: 'Laptop', checked: false),
          ],
          imageUrl: order.vehicleInfo.imageUrl ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41rvL56LDgqy7Q6rRp-OwmmEOZG4_EigDYMPUCrG1yhJbO406mV-5oRTuJRbVcCnNUHk7qIGWh-eBoCzJg4OZ3gVUWsofrmxhMWwLPqW0klZNWejNMm6wcO72fS87wG5WLw4ODs5JgUTxgoJYy9ZjINalD6rwNGWpOZm_O6k5N99aISoOOC4qYJV8DldamtRrM-TvrHCkkadDIa9cdvmqURXu8ZcFDImprAz0mRvtPebV5przpkHQ4R6Z6Z3uzCQYSSuPdbCo0uV0',
        ),
      );
    } catch (e) {
      state = state.copyWith(
        data: state.data.copyWith(
          orderId: orderId,
          imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41rvL56LDgqy7Q6rRp-OwmmEOZG4_EigDYMPUCrG1yhJbO406mV-5oRTuJRbVcCnNUHk7qIGWh-eBoCzJg4OZ3gVUWsofrmxhMWwLPqW0klZNWejNMm6wcO72fS87wG5WLw4ODs5JgUTxgoJYy9ZjINalD6rwNGWpOZm_O6k5N99aISoOOC4qYJV8DldamtRrM-TvrHCkkadDIa9cdvmqURXu8ZcFDImprAz0mRvtPebV5przpkHQ4R6Z6Z3uzCQYSSuPdbCo0uV0',
        ),
      );
    }
  }

  void setStep(int step) {
    if (step >= 0 && step <= 3) {
      state = state.copyWith(currentStep: step);
    }
  }

  void updateComplaint(String text) {
    state = state.copyWith(data: state.data.copyWith(customerComplaint: text));
  }

  void addPackage(ServicePackageModel package) {
    if (!state.data.selectedPackages.any((p) => p.id == package.id)) {
      final newPackages = List<ServicePackageModel>.from(state.data.selectedPackages)..add(package);
      state = state.copyWith(data: state.data.copyWith(selectedPackages: newPackages));
    }
  }

  void removePackage(String packageId) {
    final newPackages = state.data.selectedPackages.where((p) => p.id != packageId).toList();
    state = state.copyWith(data: state.data.copyWith(selectedPackages: newPackages));
  }

  void updateFuel(double level) {
    state = state.copyWith(data: state.data.copyWith(fuelLevel: level));
  }

  void updateOdometer(int km) {
    state = state.copyWith(data: state.data.copyWith(odometer: km));
  }

  void addHotspot(HotspotModel hotspot) {
    final newHotspots = List<HotspotModel>.from(state.data.hotspots)..add(hotspot);
    state = state.copyWith(data: state.data.copyWith(hotspots: newHotspots));
  }

  void removeHotspot(String id) {
    final newHotspots = state.data.hotspots.where((h) => h.id != id).toList();
    state = state.copyWith(data: state.data.copyWith(hotspots: newHotspots));
  }

  void toggleChecklist(String id, bool value) {
    final newChecklist = state.data.checklist.map((item) {
      if (item.id == id) {
        return item.copyWith(checked: value);
      }
      return item;
    }).toList();
    state = state.copyWith(data: state.data.copyWith(checklist: newChecklist));
  }

  void addCustomChecklistItem(String name) {
    final newItem = ChecklistItemModel(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      name: name,
      checked: true,
    );
    final newChecklist = List<ChecklistItemModel>.from(state.data.checklist)..add(newItem);
    state = state.copyWith(data: state.data.copyWith(checklist: newChecklist));
  }

  void removeChecklistItem(String id) {
    final newChecklist = state.data.checklist.where((item) => item.id != id).toList();
    state = state.copyWith(data: state.data.copyWith(checklist: newChecklist));
  }

  void setAdvisorSignature(String signaturePath) {
    state = state.copyWith(data: state.data.copyWith(advisorSignatureData: signaturePath));
  }

  void setCustomerSignature(String signaturePath) {
    state = state.copyWith(data: state.data.copyWith(customerSignatureData: signaturePath));
  }

  bool canSubmit() {
    return state.data.advisorSignatureData != null &&
           state.data.advisorSignatureData!.isNotEmpty &&
           state.data.customerSignatureData != null &&
           state.data.customerSignatureData!.isNotEmpty &&
           state.data.odometer > 0;
  }

  Future<bool> submit() async {
    final bookingId = state.bookingId;
    if (bookingId == null || bookingId.isEmpty) {
      state = state.copyWith(submitError: 'Không tìm thấy mã đặt lịch. Vui lòng thử lại.');
      return false;
    }

    state = state.copyWith(isLoading: true, submitError: null, submitSuccess: false);
    try {
      await _api.submitReception(
        bookingId: bookingId,
        data: state.data,
      );
      state = state.copyWith(isLoading: false, submitSuccess: true);
      ref.read(advisorDashboardProvider.notifier).refresh();
      return true;
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        submitError: e.toString().replaceFirst('Exception: ', ''),
      );
      return false;
    }
  }
}

final walkaroundControllerProvider = NotifierProvider<WalkaroundController, WalkaroundState>(() {
  return WalkaroundController();
});
