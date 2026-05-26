import 'supplement_part_model.dart';
import 'supplement_labor_model.dart';

class SupplementModel {
  final String id;
  final String bookingCode;
  final String issueTitle;
  final String technicianNote;
  final String actionRequired;
  final String mechanicName;
  final String mechanicRole;
  final List<String> evidenceMediaUrls;
  final double oldCost;
  final List<SupplementPartModel> addedParts;
  final List<SupplementLaborModel> addedLabors;
  final DateTime oldDeliveryTime;
  final DateTime newDeliveryTime;
  final String delayReason;
  final SupplementStatus status;

  SupplementModel({
    required this.id,
    required this.bookingCode,
    required this.issueTitle,
    required this.technicianNote,
    required this.actionRequired,
    required this.mechanicName,
    required this.mechanicRole,
    required this.evidenceMediaUrls,
    required this.oldCost,
    this.addedParts = const [],
    this.addedLabors = const [],
    required this.oldDeliveryTime,
    required this.newDeliveryTime,
    required this.delayReason,
    this.status = SupplementStatus.pending,
  });

  factory SupplementModel.fromJson(Map<String, dynamic> json) {
    return SupplementModel(
      id: json['id'] ?? '',
      bookingCode: json['booking_code'] ?? '',
      issueTitle: json['issue_title'] ?? '',
      technicianNote: json['technician_note'] ?? '',
      actionRequired: json['action_required'] ?? '',
      mechanicName: json['mechanic_name'] ?? '',
      mechanicRole: json['mechanic_role'] ?? '',
      evidenceMediaUrls: List<String>.from(json['evidence_media_urls'] ?? []),
      oldCost: (json['old_cost'] ?? 0).toDouble(),
      addedParts: (json['added_parts'] as List<dynamic>?)
              ?.map((e) => SupplementPartModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      addedLabors: (json['added_labors'] as List<dynamic>?)
              ?.map((e) => SupplementLaborModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      oldDeliveryTime: DateTime.parse(json['old_delivery_time']),
      newDeliveryTime: DateTime.parse(json['new_delivery_time']),
      delayReason: json['delay_reason'] ?? '',
      status: SupplementStatus.values.firstWhere(
        (e) => e.name == (json['status'] ?? 'pending').toString().toLowerCase(),
        orElse: () => SupplementStatus.pending,
      ),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'booking_code': bookingCode,
      'issue_title': issueTitle,
      'technician_note': technicianNote,
      'action_required': actionRequired,
      'mechanic_name': mechanicName,
      'mechanic_role': mechanicRole,
      'evidence_media_urls': evidenceMediaUrls,
      'old_cost': oldCost,
      'added_parts': addedParts.map((e) => e.toJson()).toList(),
      'added_labors': addedLabors.map((e) => e.toJson()).toList(),
      'old_delivery_time': oldDeliveryTime.toIso8601String(),
      'new_delivery_time': newDeliveryTime.toIso8601String(),
      'delay_reason': delayReason,
      'status': status.name,
      'total_price': costDifference,
    };
  }

  double get partsTotal => addedParts.fold(0, (sum, item) => sum + item.total);
  double get laborsTotal => addedLabors.fold(0, (sum, item) => sum + item.total);
  double get calculatedNewCost => oldCost + partsTotal + laborsTotal;

  double get costDifference => calculatedNewCost - oldCost;
  Duration get timeDifference => newDeliveryTime.difference(oldDeliveryTime);

  SupplementModel copyWith({
    List<SupplementPartModel>? addedParts,
    List<SupplementLaborModel>? addedLabors,
    SupplementStatus? status,
  }) {
    return SupplementModel(
      id: id,
      bookingCode: bookingCode,
      issueTitle: issueTitle,
      technicianNote: technicianNote,
      actionRequired: actionRequired,
      mechanicName: mechanicName,
      mechanicRole: mechanicRole,
      evidenceMediaUrls: evidenceMediaUrls,
      oldCost: oldCost,
      addedParts: addedParts ?? this.addedParts,
      addedLabors: addedLabors ?? this.addedLabors,
      oldDeliveryTime: oldDeliveryTime,
      newDeliveryTime: newDeliveryTime,
      delayReason: delayReason,
      status: status ?? this.status,
    );
  }
}

enum SupplementStatus {
  pending,
  approved,
  rejected,
}
