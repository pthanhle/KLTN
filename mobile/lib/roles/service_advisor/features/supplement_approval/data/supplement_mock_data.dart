import '../models/supplement_model.dart';
import '../models/supplement_part_model.dart';
import '../models/supplement_labor_model.dart';

final now = DateTime.now();

final Map<String, dynamic> mockSupplementJson = {
  "id": "SUP-2026-001",
  "booking_code": "SRV-2026-B77P",
  "issue_title": "Phát hiện đĩa phanh bị xước sâu không thể vớt lại, bắt buộc thay đĩa phanh mới.",
  "technician_note": "Đĩa phanh trước do lâu ngày mòn má phanh đã ăn sâu vào thép, không thể láng lại.",
  "action_required": "Thay cặp đĩa phanh tản nhiệt cao cấp",
  "mechanic_name": "Lê Văn Nam",
  "mechanic_role": "Master Technician",
  "evidence_media_urls": [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB8eLMyZrWseKMz1-sFvgbnaRwdzJutc7keN_rYhopur-_MQXmzX5nWEJY6cK7Xldmzp2jQmjMRfoL-PFzcvE-0Mx7CR50BkYJgtMFYK0gG1OXLz374W-knvqdo1gj9SG-o0xYEaLfaUNThZlYnaO-BCRiXef78TKqI1PuFiMSTiWyMuaGCczg6x5UlrYv3jHQActw9XjxM1Go-V5p8oNHJgeK6MsIVasmD1OwGEbC0qMs2Qili5aEiw9yYj2uMkMYE1VzYibqOHaa0"
  ],
  "old_cost": 15000000.0,
  "added_parts": [],
  "added_labors": [],
  "old_delivery_time": DateTime(now.year, now.month, now.day, 14, 0).toIso8601String(),
  "new_delivery_time": DateTime(now.year, now.month, now.day, 16, 30).toIso8601String(),
  "delay_reason": "Dự kiến trễ 2.5 giờ do chờ phụ tùng & lắp ráp",
  "status": "PENDING"
};

final SupplementModel mockSupplementData = SupplementModel.fromJson(mockSupplementJson);

// Master Data Catalog Mocks
final List<SupplementPartModel> mockMasterPartsCatalog = [
  SupplementPartModel(id: 'p1', sku: 'BRK-DISC-001', name: 'Đĩa phanh tản nhiệt Brembo', unitPrice: 3200000.0, quantity: 1, stockOnHand: 4),
  SupplementPartModel(id: 'p2', sku: 'BRK-PAD-002', name: 'Má phanh gốm cao cấp', unitPrice: 1800000.0, quantity: 1, stockOnHand: 10),
  SupplementPartModel(id: 'p3', sku: 'OIL-FLT-003', name: 'Lọc dầu động cơ K&N', unitPrice: 450000.0, quantity: 1, stockOnHand: 0, estimatedArrivalDate: DateTime(now.year, now.month, now.day + 2)),
  SupplementPartModel(id: 'p4', sku: 'SPK-PLG-004', name: 'Bugi Iridium NGK', unitPrice: 250000.0, quantity: 1, stockOnHand: 24),
];

final List<SupplementLaborModel> mockMasterLaborsCatalog = [
  const SupplementLaborModel(id: 'l1', laborCode: 'SVC-BRK-01', description: 'Công thay đĩa phanh', unitPrice: 250000.0, quantity: 1.5),
  const SupplementLaborModel(id: 'l2', laborCode: 'SVC-BRK-02', description: 'Công thay má phanh', unitPrice: 250000.0, quantity: 0.8),
  const SupplementLaborModel(id: 'l3', laborCode: 'SVC-OIL-03', description: 'Công bảo dưỡng bôi trơn càng A', unitPrice: 300000.0, quantity: 1.0),
];
