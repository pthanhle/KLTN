import 'package:freezed_annotation/freezed_annotation.dart';

part 'vehicle_contract_list_model.freezed.dart';
part 'vehicle_contract_list_model.g.dart';

@freezed
abstract class VehicleContractListModel with _$VehicleContractListModel {
  const factory VehicleContractListModel({
    @JsonKey(name: '_id') required String id,
    @JsonKey(name: 'contract_number') String? contractNumber,
    required String status,
    @JsonKey(name: 'customer_snapshot') CustomerSnapshot? customerSnapshot,
    @JsonKey(name: 'vehicle_snapshot') VehicleSnapshot? vehicleSnapshot,
    @JsonKey(name: 'pricing_snapshot') PricingSnapshot? pricingSnapshot,
    @JsonKey(name: 'commission_snapshot') CommissionSnapshot? commissionSnapshot,
    List<String>? attachments,
    String? note,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _VehicleContractListModel;

  factory VehicleContractListModel.fromJson(Map<String, dynamic> json) =>
      _$VehicleContractListModelFromJson(json);
}

@freezed
abstract class CustomerSnapshot with _$CustomerSnapshot {
  const factory CustomerSnapshot({
    @JsonKey(name: 'full_name') String? fullName,
    String? phone,
    String? email,
    String? address,
    @JsonKey(name: 'id_number') String? idNumber,
    @JsonKey(name: 'tax_code') String? taxCode,
    @JsonKey(name: 'company_name') String? companyName,
  }) = _CustomerSnapshot;

  factory CustomerSnapshot.fromJson(Map<String, dynamic> json) =>
      _$CustomerSnapshotFromJson(json);
}

@freezed
abstract class VehicleSnapshot with _$VehicleSnapshot {
  const factory VehicleSnapshot({
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
  }) = _VehicleSnapshot;

  factory VehicleSnapshot.fromJson(Map<String, dynamic> json) =>
      _$VehicleSnapshotFromJson(json);
}

@freezed
abstract class PricingSnapshot with _$PricingSnapshot {
  const factory PricingSnapshot({
    @JsonKey(name: 'list_price') num? listPrice,
    @JsonKey(name: 'sale_price') num? salePrice,
    num? discount,
    num? vat,
    @JsonKey(name: 'registration_fee') num? registrationFee,
    @JsonKey(name: 'insurance_fee') num? insuranceFee,
    @JsonKey(name: 'other_fees') num? otherFees,
    @JsonKey(name: 'grand_total') num? grandTotal,
  }) = _PricingSnapshot;

  factory PricingSnapshot.fromJson(Map<String, dynamic> json) =>
      _$PricingSnapshotFromJson(json);
}

@freezed
abstract class CommissionSnapshot with _$CommissionSnapshot {
  const factory CommissionSnapshot({
    @JsonKey(name: 'policy_code') String? policyCode,
    @JsonKey(name: 'basis_amount') num? basisAmount,
    num? rate,
    num? amount,
  }) = _CommissionSnapshot;

  factory CommissionSnapshot.fromJson(Map<String, dynamic> json) =>
      _$CommissionSnapshotFromJson(json);
}

