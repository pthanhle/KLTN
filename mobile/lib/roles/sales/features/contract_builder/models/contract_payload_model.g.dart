// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contract_payload_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_CustomerSnapshotModel _$CustomerSnapshotModelFromJson(
  Map<String, dynamic> json,
) => _CustomerSnapshotModel(
  fullName: json['full_name'] as String?,
  phone: json['phone'] as String?,
  email: json['email'] as String?,
  address: json['address'] as String?,
  idNumber: json['id_number'] as String?,
  taxCode: json['tax_code'] as String?,
  companyName: json['company_name'] as String?,
);

Map<String, dynamic> _$CustomerSnapshotModelToJson(
  _CustomerSnapshotModel instance,
) => <String, dynamic>{
  'full_name': instance.fullName,
  'phone': instance.phone,
  'email': instance.email,
  'address': instance.address,
  'id_number': instance.idNumber,
  'tax_code': instance.taxCode,
  'company_name': instance.companyName,
};

_VehicleSnapshotModel _$VehicleSnapshotModelFromJson(
  Map<String, dynamic> json,
) => _VehicleSnapshotModel(
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

Map<String, dynamic> _$VehicleSnapshotModelToJson(
  _VehicleSnapshotModel instance,
) => <String, dynamic>{
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

_ContractPricingSnapshotModel _$ContractPricingSnapshotModelFromJson(
  Map<String, dynamic> json,
) => _ContractPricingSnapshotModel(
  listPrice: json['list_price'] as num? ?? 0,
  salePrice: json['sale_price'] as num? ?? 0,
  discount: json['discount'] as num? ?? 0,
  vat: json['vat'] as num? ?? 0,
  registrationFee: json['registration_fee'] as num? ?? 0,
  insuranceFee: json['insurance_fee'] as num? ?? 0,
  otherFees: json['other_fees'] as num? ?? 0,
  grandTotal: json['grand_total'] as num? ?? 0,
);

Map<String, dynamic> _$ContractPricingSnapshotModelToJson(
  _ContractPricingSnapshotModel instance,
) => <String, dynamic>{
  'list_price': instance.listPrice,
  'sale_price': instance.salePrice,
  'discount': instance.discount,
  'vat': instance.vat,
  'registration_fee': instance.registrationFee,
  'insurance_fee': instance.insuranceFee,
  'other_fees': instance.otherFees,
  'grand_total': instance.grandTotal,
};

_ContractPayloadModel _$ContractPayloadModelFromJson(
  Map<String, dynamic> json,
) => _ContractPayloadModel(
  customerId: json['customer_id'] as String,
  carId: json['car_id'] as String,
  vehicleUnitId: json['vehicle_unit_id'] as String,
  salesId: json['sales_id'] as String?,
  testDriveBookingId: json['test_drive_booking_id'] as String?,
  customerSnapshot: json['customer_snapshot'] == null
      ? const CustomerSnapshotModel()
      : CustomerSnapshotModel.fromJson(
          json['customer_snapshot'] as Map<String, dynamic>,
        ),
  vehicleSnapshot: json['vehicle_snapshot'] == null
      ? const VehicleSnapshotModel()
      : VehicleSnapshotModel.fromJson(
          json['vehicle_snapshot'] as Map<String, dynamic>,
        ),
  pricingSnapshot: json['pricing_snapshot'] == null
      ? const ContractPricingSnapshotModel()
      : ContractPricingSnapshotModel.fromJson(
          json['pricing_snapshot'] as Map<String, dynamic>,
        ),
  note: json['note'] as String?,
);

Map<String, dynamic> _$ContractPayloadModelToJson(
  _ContractPayloadModel instance,
) => <String, dynamic>{
  'customer_id': instance.customerId,
  'car_id': instance.carId,
  'vehicle_unit_id': instance.vehicleUnitId,
  'sales_id': instance.salesId,
  'test_drive_booking_id': instance.testDriveBookingId,
  'customer_snapshot': instance.customerSnapshot,
  'vehicle_snapshot': instance.vehicleSnapshot,
  'pricing_snapshot': instance.pricingSnapshot,
  'note': instance.note,
};
