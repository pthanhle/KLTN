import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import '../models/contract_builder_state.dart';
import '../models/contract_payload_model.dart';
import '../models/vehicle_unit_model.dart';
import '../data/contract_api_service.dart';
import 'vn_provinces_controller.dart';

class ContractBuilderController extends Notifier<ContractBuilderState> {
  @override
  ContractBuilderState build() => const ContractBuilderState();

  void initializeWithTask(TaskModel task) {
    final initialPayload = ContractPayloadModel(
      customerId: task.customerId ?? '', 
      carId: task.productId ?? '',
      vehicleUnitId: '', 
      testDriveBookingId: task.id,
      customerSnapshot: CustomerSnapshotModel(
        fullName: task.customerName,
        phone: task.customerPhone,
        email: task.customerEmail,
        idNumber: '',
        taxCode: task.customerTaxCode,
        companyName: task.customerCompanyName,
      ),
    );

    state = state.copyWith(
      sourceTask: task,
      payload: initialPayload,
      customerCity: task.customerCity,
      customerDistrict: task.customerDistrict,
      customerWard: task.customerWard,
      customerStreet: task.customerStreet,
      isSuccess: false,
      errorMessage: null,
    );

    ref.read(vnProvincesControllerProvider.notifier).preloadAddresses(task.customerCity, task.customerDistrict);
  }

  void updateCustomerInfo(CustomerSnapshotModel newInfo) {
    if (state.payload == null) return;
    state = state.copyWith(
      payload: state.payload!.copyWith(customerSnapshot: newInfo),
    );
  }

  void updateCustomerAddress({String? city, String? district, String? ward, String? street}) {
    state = state.copyWith(
      customerCity: city ?? state.customerCity,
      customerDistrict: district ?? state.customerDistrict,
      customerWard: ward ?? state.customerWard,
      customerStreet: street ?? state.customerStreet,
    );
  }

  Future<void> fetchAvailableVehicleUnits() async {
    if (state.sourceTask?.productId == null) return;
    
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final units = await contractApiService.fetchVehicleUnits(state.sourceTask!.productId!);
      state = state.copyWith(
        isLoading: false,
        availableVehicleUnits: units,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  void selectShowroom(String? showroomId) {
    state = state.copyWith(selectedShowroomId: showroomId);
  }

  Future<void> selectVehicleUnit(VehicleUnitModel unit) async {
    if (state.payload == null) return;
    
    final vehicleSnapshot = VehicleSnapshotModel(
      name: state.sourceTask?.vehicleModel,
      vin: unit.vin,
      engineNumber: unit.engineNumber,
      color: unit.color,
      year: unit.year,
      fuel: unit.fuel,
      seats: unit.seats,
    );

    final num listPrice = unit.salePrice ?? 0;
    
    // Auto fill estimate from config
    final config = await contractApiService.fetchCostEstimateConfig();
    final registrationFee = config['le_phi_kv1'] ?? 0; 
    final insuranceFee = (config['bao_hiem_tnds'] ?? 0) + (config['bao_hiem_than_xe'] ?? 0);
    final otherFees = (config['phi_kiem_dinh'] ?? 0) + (config['phi_duong_bo'] ?? 0);
    final grandTotal = listPrice + registrationFee + insuranceFee + otherFees;

    final pricingSnapshot = ContractPricingSnapshotModel(
      listPrice: listPrice,
      salePrice: listPrice,
      registrationFee: registrationFee,
      insuranceFee: insuranceFee,
      otherFees: otherFees,
      grandTotal: grandTotal,
    );

    state = state.copyWith(
      payload: state.payload!.copyWith(
        vehicleUnitId: unit.id,
        vehicleSnapshot: vehicleSnapshot,
        pricingSnapshot: pricingSnapshot,
      ),
    );
  }

  void updatePricing({
    num? discount,
    num? vat,
    num? registrationFee,
    num? insuranceFee,
    num? otherFees,
  }) {
    if (state.payload == null) return;
    
    final pricing = state.payload!.pricingSnapshot;
    
    final newDiscount = discount ?? pricing.discount;
    final newVat = vat ?? pricing.vat;
    final newRegistrationFee = registrationFee ?? pricing.registrationFee;
    final newInsuranceFee = insuranceFee ?? pricing.insuranceFee;
    final newOtherFees = otherFees ?? pricing.otherFees;

    final salePrice = pricing.listPrice - newDiscount;
    final grandTotal = salePrice + newVat + newRegistrationFee + newInsuranceFee + newOtherFees;
    
    state = state.copyWith(
      payload: state.payload!.copyWith(
        pricingSnapshot: pricing.copyWith(
          discount: newDiscount,
          vat: newVat,
          registrationFee: newRegistrationFee,
          insuranceFee: newInsuranceFee,
          otherFees: newOtherFees,
          salePrice: salePrice,
          grandTotal: grandTotal,
        ),
      ),
    );
  }


  Future<bool> submitContract() async {
    if (state.payload == null) return false;
    
    state = state.copyWith(isSubmitting: true, errorMessage: null);
    
    // Concatenate address before submitting
    final street = state.customerStreet ?? '';
    final ward = state.customerWard ?? '';
    final district = state.customerDistrict ?? '';
    final city = state.customerCity ?? '';
    final fullAddress = [street, ward, district, city].where((e) => e.isNotEmpty).join(', ');

    final finalPayload = state.payload!.copyWith(
      customerSnapshot: state.payload!.customerSnapshot.copyWith(address: fullAddress),
    );

    try {
      await contractApiService.submitContract(finalPayload);
      state = state.copyWith(isSubmitting: false, isSuccess: true);
      return true;
    } catch (e) {
      state = state.copyWith(isSubmitting: false, errorMessage: e.toString());
      return false;
    }
  }
}

final contractBuilderControllerProvider =
    NotifierProvider<ContractBuilderController, ContractBuilderState>(() {
  return ContractBuilderController();
});
