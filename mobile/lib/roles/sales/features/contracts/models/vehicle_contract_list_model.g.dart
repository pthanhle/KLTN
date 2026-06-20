// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vehicle_contract_list_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_VehicleContractListModel _$VehicleContractListModelFromJson(
  Map<String, dynamic> json,
) => _VehicleContractListModel(
  id: json['_id'] as String,
  contractNumber: json['contract_number'] as String?,
  status: json['status'] as String,
  customerSnapshot: json['customer_snapshot'] == null
      ? null
      : CustomerSnapshot.fromJson(
          json['customer_snapshot'] as Map<String, dynamic>,
        ),
  vehicleSnapshot: json['vehicle_snapshot'] == null
      ? null
      : VehicleSnapshot.fromJson(
          json['vehicle_snapshot'] as Map<String, dynamic>,
        ),
  pricingSnapshot: json['pricing_snapshot'] == null
      ? null
      : PricingSnapshot.fromJson(
          json['pricing_snapshot'] as Map<String, dynamic>,
        ),
  commissionSnapshot: json['commission_snapshot'] == null
      ? null
      : CommissionSnapshot.fromJson(
          json['commission_snapshot'] as Map<String, dynamic>,
        ),
  attachments: (json['attachments'] as List<dynamic>?)
      ?.map((e) => e as String)
      .toList(),
  note: json['note'] as String?,
  createdAt: json['createdAt'] == null
      ? null
      : DateTime.parse(json['createdAt'] as String),
  updatedAt: json['updatedAt'] == null
      ? null
      : DateTime.parse(json['updatedAt'] as String),
);

Map<String, dynamic> _$VehicleContractListModelToJson(
  _VehicleContractListModel instance,
) => <String, dynamic>{
  '_id': instance.id,
  'contract_number': instance.contractNumber,
  'status': instance.status,
  'customer_snapshot': instance.customerSnapshot,
  'vehicle_snapshot': instance.vehicleSnapshot,
  'pricing_snapshot': instance.pricingSnapshot,
  'commission_snapshot': instance.commissionSnapshot,
  'attachments': instance.attachments,
  'note': instance.note,
  'createdAt': instance.createdAt?.toIso8601String(),
  'updatedAt': instance.updatedAt?.toIso8601String(),
};

_CustomerSnapshot _$CustomerSnapshotFromJson(Map<String, dynamic> json) =>
    _CustomerSnapshot(
      fullName: json['full_name'] as String?,
      phone: json['phone'] as String?,
      email: json['email'] as String?,
      address: json['address'] as String?,
      idNumber: json['id_number'] as String?,
      taxCode: json['tax_code'] as String?,
      companyName: json['company_name'] as String?,
    );

Map<String, dynamic> _$CustomerSnapshotToJson(_CustomerSnapshot instance) =>
    <String, dynamic>{
      'full_name': instance.fullName,
      'phone': instance.phone,
      'email': instance.email,
      'address': instance.address,
      'id_number': instance.idNumber,
      'tax_code': instance.taxCode,
      'company_name': instance.companyName,
    };

_VehicleSnapshot _$VehicleSnapshotFromJson(Map<String, dynamic> json) =>
    _VehicleSnapshot(
      name: json['name'] as String?,
      brandName: json['brandName'] as String?,
      sku: json['sku'] as String?,
      vin: json['vin'] as String?,
      engineNumber: json['engine_number'] as String?,
      color: json['color'] as String?,
      year: (json['year'] as num?)?.toInt(),
      odometer: (json['odometer'] as num?)?.toInt(),
      fuel: json['fuel'] as String?,
      seats: (json['seats'] as num?)?.toInt(),
    );

Map<String, dynamic> _$VehicleSnapshotToJson(_VehicleSnapshot instance) =>
    <String, dynamic>{
      'name': instance.name,
      'brandName': instance.brandName,
      'sku': instance.sku,
      'vin': instance.vin,
      'engine_number': instance.engineNumber,
      'color': instance.color,
      'year': instance.year,
      'odometer': instance.odometer,
      'fuel': instance.fuel,
      'seats': instance.seats,
    };

_PricingSnapshot _$PricingSnapshotFromJson(Map<String, dynamic> json) =>
    _PricingSnapshot(
      listPrice: json['list_price'] as num?,
      salePrice: json['sale_price'] as num?,
      discount: json['discount'] as num?,
      vat: json['vat'] as num?,
      registrationFee: json['registration_fee'] as num?,
      insuranceFee: json['insurance_fee'] as num?,
      otherFees: json['other_fees'] as num?,
      grandTotal: json['grand_total'] as num?,
    );

Map<String, dynamic> _$PricingSnapshotToJson(_PricingSnapshot instance) =>
    <String, dynamic>{
      'list_price': instance.listPrice,
      'sale_price': instance.salePrice,
      'discount': instance.discount,
      'vat': instance.vat,
      'registration_fee': instance.registrationFee,
      'insurance_fee': instance.insuranceFee,
      'other_fees': instance.otherFees,
      'grand_total': instance.grandTotal,
    };

_CommissionSnapshot _$CommissionSnapshotFromJson(Map<String, dynamic> json) =>
    _CommissionSnapshot(
      policyCode: json['policy_code'] as String?,
      basisAmount: json['basis_amount'] as num?,
      rate: json['rate'] as num?,
      amount: json['amount'] as num?,
    );

Map<String, dynamic> _$CommissionSnapshotToJson(_CommissionSnapshot instance) =>
    <String, dynamic>{
      'policy_code': instance.policyCode,
      'basis_amount': instance.basisAmount,
      'rate': instance.rate,
      'amount': instance.amount,
    };
