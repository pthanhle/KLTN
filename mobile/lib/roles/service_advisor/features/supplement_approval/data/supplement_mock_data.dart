import '../models/supplement_model.dart';

final now = DateTime.now();

final Map<String, dynamic> mockSupplementJson = {
  "id": "SUP-2026-001",
  "order_id": "RO-2026-002",
  "issue_title": "Phát sinh khi rã máy",
  "issue_description": "Hỏng phuộc sau bên trái. Cần thay thế phuộc mới và cân chỉnh lại hệ thống treo để đảm bảo an toàn.",
  "evidence_media_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB8eLMyZrWseKMz1-sFvgbnaRwdzJutc7keN_rYhopur-_MQXmzX5nWEJY6cK7Xldmzp2jQmjMRfoL-PFzcvE-0Mx7CR50BkYJgtMFYK0gG1OXLz374W-knvqdo1gj9SG-o0xYEaLfaUNThZlYnaO-BCRiXef78TKqI1PuFiMSTiWyMuaGCczg6x5UlrYv3jHQActw9XjxM1Go-V5p8oNHJgeK6MsIVasmD1OwGEbC0qMs2Qili5aEiw9yYj2uMkMYE1VzYibqOHaa0",
  "old_cost": 15000000.0,
  "new_cost": 22000000.0,
  "old_delivery_time": DateTime(now.year, now.month, now.day, 14, 0).toIso8601String(),
  "new_delivery_time": DateTime(now.year, now.month, now.day, 16, 30).toIso8601String(),
  "delay_reason": "Dự kiến trễ 2.5 giờ do chờ phụ tùng & lắp ráp",
  "status": "PENDING"
};

final SupplementModel mockSupplementData = SupplementModel.fromJson(mockSupplementJson);
