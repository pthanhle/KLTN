class SupplementModel {
  final String id;
  final String supplementId;
  final String orderId;
  final String issueTitle;
  final String issueDescription;
  final String proposedFix;
  final String mechanicName;
  final String mechanicRole;
  final List<String> evidenceMediaUrls;
  final double oldCost;
  final double newCost;
  final DateTime oldDeliveryTime;
  final DateTime newDeliveryTime;
  final String delayReason;
  final SupplementStatus status;

  SupplementModel({
    required this.id,
    this.supplementId = '',
    required this.orderId,
    required this.issueTitle,
    required this.issueDescription,
    required this.proposedFix,
    required this.mechanicName,
    required this.mechanicRole,
    required this.evidenceMediaUrls,
    required this.oldCost,
    required this.newCost,
    required this.oldDeliveryTime,
    required this.newDeliveryTime,
    required this.delayReason,
    this.status = SupplementStatus.pending,
  });

  factory SupplementModel.fromJson(Map<String, dynamic> json) {
    return SupplementModel(
      id: json['id'] ?? '',
      supplementId: json['supplement_id'] ?? '',
      orderId: json['order_id'] ?? '',
      issueTitle: json['issue_title'] ?? '',
      issueDescription: json['issue_description'] ?? '',
      proposedFix: json['proposed_fix'] ?? '',
      mechanicName: json['mechanic_name'] ?? '',
      mechanicRole: json['mechanic_role'] ?? '',
      evidenceMediaUrls: List<String>.from(json['evidence_media_urls'] ?? []),
      oldCost: (json['old_cost'] ?? 0).toDouble(),
      newCost: (json['new_cost'] ?? 0).toDouble(),
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
      'order_id': orderId,
      'issue_title': issueTitle,
      'issue_description': issueDescription,
      'proposed_fix': proposedFix,
      'mechanic_name': mechanicName,
      'mechanic_role': mechanicRole,
      'evidence_media_urls': evidenceMediaUrls,
      'old_cost': oldCost,
      'new_cost': newCost,
      'old_delivery_time': oldDeliveryTime.toIso8601String(),
      'new_delivery_time': newDeliveryTime.toIso8601String(),
      'delay_reason': delayReason,
      'status': status.name.toUpperCase(),
    };
  }

  double get costDifference => newCost - oldCost;
  Duration get timeDifference => newDeliveryTime.difference(oldDeliveryTime);
}

enum SupplementStatus {
  pending,
  approved,
  rejected,
}
