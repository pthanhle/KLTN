import 'package:freezed_annotation/freezed_annotation.dart';
import 'contract_payload_model.dart';
import 'vehicle_unit_model.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';

part 'contract_builder_state.freezed.dart';

@freezed
abstract class ContractBuilderState with _$ContractBuilderState {
  const ContractBuilderState._();

  const factory ContractBuilderState({
    @Default(false) bool isLoading,
    @Default(false) bool isSubmitting,
    @Default(false) bool isSuccess,
    String? errorMessage,
    
    TaskModel? sourceTask,
    
    @Default([]) List<VehicleUnitModel> availableVehicleUnits,
    
    ContractPayloadModel? payload,
    
    String? customerCity,
    String? customerDistrict,
    String? customerWard,
    String? customerStreet,
    
    String? selectedShowroomId,
  }) = _ContractBuilderState;
}
