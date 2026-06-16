import 'package:freezed_annotation/freezed_annotation.dart';

part 'contract_payload_model.freezed.dart';
part 'contract_payload_model.g.dart';

@freezed
abstract class CustomerSnapshotModel with _$CustomerSnapshotModel {
  const CustomerSnapshotModel._();

  const factory CustomerSnapshotModel({
    @JsonKey(name: 'full_name') String? fullName,
    String? phone,
    String? email,
    String? address,
    @JsonKey(name: 'id_number') String? idNumber,
    @JsonKey(name: 'tax_code') String? taxCode,
    @JsonKey(name: 'company_name') String? companyName,
  }) = _CustomerSnapshotModel;

  factory CustomerSnapshotModel.fromJson(Map<String, dynamic> json) =>
      _$CustomerSnapshotModelFromJson(json);
}

@freezed
abstract class VehicleSnapshotModel with _$VehicleSnapshotModel {
  const VehicleSnapshotModel._();

  const factory VehicleSnapshotModel({
    String? name,
    String? brandName,
    String? sku,
    String? vin,
    @JsonKey(name: 'engine_number') String? engineNumber,
    String? color,
    int? year,
    int? odometer,
    String? fuel,
    int? seats,
  }) = _VehicleSnapshotModel;

  factory VehicleSnapshotModel.fromJson(Map<String, dynamic> json) =>
      _$VehicleSnapshotModelFromJson(json);
}

@freezed
abstract class ContractPricingSnapshotModel with _$ContractPricingSnapshotModel {
  const ContractPricingSnapshotModel._();

  const factory ContractPricingSnapshotModel({
    @JsonKey(name: 'list_price') @Default(0) num listPrice,
    @JsonKey(name: 'sale_price') @Default(0) num salePrice,
    @Default(0) num discount,
    @Default(0) num vat,
    @JsonKey(name: 'registration_fee') @Default(0) num registrationFee,
    @JsonKey(name: 'insurance_fee') @Default(0) num insuranceFee,
    @JsonKey(name: 'other_fees') @Default(0) num otherFees,
    @JsonKey(name: 'grand_total') @Default(0) num grandTotal,
  }) = _ContractPricingSnapshotModel;

  factory ContractPricingSnapshotModel.fromJson(Map<String, dynamic> json) =>
      _$ContractPricingSnapshotModelFromJson(json);
}

@freezed
abstract class ContractPayloadModel with _$ContractPayloadModel {
  const ContractPayloadModel._();

  const factory ContractPayloadModel({
    @JsonKey(name: 'customer_id') required String customerId,
    @JsonKey(name: 'car_id') required String carId,
    @JsonKey(name: 'vehicle_unit_id') required String vehicleUnitId,
    @JsonKey(name: 'sales_id') String? salesId,
    @JsonKey(name: 'test_drive_booking_id') String? testDriveBookingId,
    @JsonKey(name: 'customer_snapshot') @Default(CustomerSnapshotModel()) CustomerSnapshotModel customerSnapshot,
    @JsonKey(name: 'vehicle_snapshot') @Default(VehicleSnapshotModel()) VehicleSnapshotModel vehicleSnapshot,
    @JsonKey(name: 'pricing_snapshot') @Default(ContractPricingSnapshotModel()) ContractPricingSnapshotModel pricingSnapshot,
    String? note,
  }) = _ContractPayloadModel;

  factory ContractPayloadModel.fromJson(Map<String, dynamic> json) =>
      _$ContractPayloadModelFromJson(json);
}
