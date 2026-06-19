import 'package:flutter/material.dart';

class ContractStatusConfig {
  final String labelKey;
  final Color color;

  const ContractStatusConfig({
    required this.labelKey,
    required this.color,
  });
}

class ContractStatusConstants {
  static const String all = 'all';
  static const String draft = 'draft';
  static const String issued = 'issued';
  static const String signed = 'signed';
  static const String cancelled = 'cancelled';
  static const String paid = 'paid';
  static const String delivered = 'delivered';

  static const List<String> filters = [all, draft, issued, signed, cancelled];

  static ContractStatusConfig getStatusConfig(String status) {
    switch (status) {
      case draft:
        return const ContractStatusConfig(labelKey: 'Nháp', color: Colors.grey);
      case issued:
        return const ContractStatusConfig(labelKey: 'Khách chờ', color: Colors.blue);
      case signed:
        return const ContractStatusConfig(labelKey: 'Đã ký', color: Colors.green);
      case cancelled:
        return const ContractStatusConfig(labelKey: 'Đã hủy', color: Colors.red);
      case paid:
        return const ContractStatusConfig(labelKey: 'Đã thanh toán', color: Colors.teal);
      case delivered:
        return const ContractStatusConfig(labelKey: 'Đã giao xe', color: Colors.purple);
      default:
        return const ContractStatusConfig(labelKey: 'Không xác định', color: Colors.grey);
    }
  }
}
