import 'package:flutter/material.dart';
import 'service_package_model.dart';
import 'hotspot_model.dart';
import 'checklist_item_model.dart';

class WalkaroundModel {
  final String orderId;
  final String customerComplaint;
  final List<ServicePackageModel> selectedPackages;
  final double fuelLevel;
  final int odometer;
  final List<HotspotModel> hotspots;
  final List<ChecklistItemModel> checklist;
  final String? advisorSignatureData;
  final String? customerSignatureData;
  final String? imageUrl;

  const WalkaroundModel({
    required this.orderId,
    this.customerComplaint = '',
    this.selectedPackages = const [],
    this.fuelLevel = 0.5,
    this.odometer = 0,
    this.hotspots = const [],
    this.checklist = const [],
    this.advisorSignatureData,
    this.customerSignatureData,
    this.imageUrl,
  });

  WalkaroundModel copyWith({
    String? orderId,
    String? customerComplaint,
    List<ServicePackageModel>? selectedPackages,
    double? fuelLevel,
    int? odometer,
    List<HotspotModel>? hotspots,
    List<ChecklistItemModel>? checklist,
    String? advisorSignatureData,
    String? customerSignatureData,
    String? imageUrl,
  }) {
    return WalkaroundModel(
      orderId: orderId ?? this.orderId,
      customerComplaint: customerComplaint ?? this.customerComplaint,
      selectedPackages: selectedPackages ?? this.selectedPackages,
      fuelLevel: fuelLevel ?? this.fuelLevel,
      odometer: odometer ?? this.odometer,
      hotspots: hotspots ?? this.hotspots,
      checklist: checklist ?? this.checklist,
      advisorSignatureData: advisorSignatureData ?? this.advisorSignatureData,
      customerSignatureData: customerSignatureData ?? this.customerSignatureData,
      imageUrl: imageUrl ?? this.imageUrl,
    );
  }

  factory WalkaroundModel.fromJson(Map<String, dynamic> json) {
    return WalkaroundModel(
      orderId: json['order_id'] ?? '',
      customerComplaint: json['customer_complaint'] ?? '',
      selectedPackages: (json['selected_packages'] as List<dynamic>?)
              ?.map((e) => ServicePackageModel.fromJson(e))
              .toList() ??
          [],
      fuelLevel: (json['fuel_level'] ?? 50.0) / 100.0,
      odometer: json['odometer'] ?? 0,
      hotspots: (json['hotspots'] as List<dynamic>?)
              ?.map((e) => HotspotModel.fromJson(e))
              .toList() ??
          [],
      checklist: (json['checklist'] as List<dynamic>?)
              ?.map((e) => ChecklistItemModel.fromJson(e))
              .toList() ??
          [],
      advisorSignatureData: json['advisor_signature_data'],
      customerSignatureData: json['customer_signature_data'],
      imageUrl: json['image_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'order_id': orderId,
      'customer_complaint': customerComplaint,
      'selected_packages': selectedPackages.map((e) => e.toJson()).toList(),
      'fuel_level': fuelLevel * 100,
      'odometer': odometer,
      'hotspots': hotspots.map((e) => e.toJson()).toList(),
      'checklist': checklist.map((e) => e.toJson()).toList(),
      'advisor_signature_data': advisorSignatureData,
      'customer_signature_data': customerSignatureData,
      'image_url': imageUrl,
    };
  }
}
