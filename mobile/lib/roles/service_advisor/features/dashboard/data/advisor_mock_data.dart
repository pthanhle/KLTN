import '../models/repair_order_model.dart';

final now = DateTime.now();

final List<Map<String, dynamic>> mockRepairOrdersJson = [
  {
    "id": "RO-2026-001",
    "vehicle_info": {
      "license_plate": "30A-123.45",
      "model": "Toyota Camry",
      "color": "Trắng"
    },
    "customer_info": {
      "name": "Nguyễn Văn A",
      "phone": "0901234567"
    },
    "service_type": "Bảo dưỡng định kỳ",
    "is_waiting_in_lounge": true,
    "stage": "PENDING",
    "scheduled_arrival_time": now.add(const Duration(minutes: 30)).toIso8601String(),
    "actual_arrival_time": null,
    "expected_delivery_time": null,
    "assigned_technician": null, // Báo động đỏ
    "selected_services": [
      {
        "_id": "srv_1",
        "sku": "B-SERV-MB",
        "serviceName": "Bảo dưỡng định kỳ (B-Service) Mercedes",
        "priceType": "STARTING_AT",
        "basePrice": 4500000,
        "category": "Bảo dưỡng"
      }
    ]
  },
  {
    "id": "RO-2026-002",
    "vehicle_info": {
      "license_plate": "51G-789.01",
      "model": "Ford Everest",
      "color": "Đen"
    },
    "customer_info": {
      "name": "Trần Thị B",
      "phone": "0987654321"
    },
    "service_type": "Sửa chữa nặng",
    "is_waiting_in_lounge": false,
    "stage": "IN_PROGRESS",
    "scheduled_arrival_time": now.subtract(const Duration(hours: 3, minutes: 15)).toIso8601String(),
    "actual_arrival_time": now.subtract(const Duration(hours: 3)).toIso8601String(),
    "expected_delivery_time": now.add(const Duration(hours: 4)).toIso8601String(),
    "assigned_technician": {
      "id": "TECH-01",
      "name": "Lê Văn C",
      "avatarUrl": "https://i.pravatar.cc/150?u=tech01"
    },
    "selected_services": [
      {
        "_id": "srv_5",
        "sku": "ENG-DIA-01",
        "serviceName": "Đại Tu Động Cơ Chuyên Sâu",
        "priceType": "CONTACT",
        "basePrice": 0,
        "category": "Sửa chữa chung"
      },
      {
        "_id": "srv_6",
        "sku": "ALIGN-HUNTER",
        "serviceName": "Cân chỉnh thước lái điện tử Hunter 3D",
        "priceType": "FIXED",
        "basePrice": 600000,
        "category": "Sửa chữa chung"
      }
    ]
  },
  {
    "id": "RO-2026-003",
    "vehicle_info": {
      "license_plate": "60C-444.55",
      "model": "Honda CR-V",
      "color": "Bạc"
    },
    "customer_info": {
      "name": "Phạm Văn D",
      "phone": "0911223344"
    },
    "service_type": "Thay dầu, phanh",
    "is_waiting_in_lounge": true,
    "stage": "QUOTATION",
    "scheduled_arrival_time": now.subtract(const Duration(minutes: 65)).toIso8601String(),
    "actual_arrival_time": now.subtract(const Duration(minutes: 60)).toIso8601String(),
    "expected_delivery_time": now.add(const Duration(minutes: 90)).toIso8601String(),
    "assigned_technician": {
      "id": "TECH-02",
      "name": "Hoàng KTV",
      "avatarUrl": "https://i.pravatar.cc/150?u=tech02"
    },
    "selected_services": [
      {
        "_id": "srv_4",
        "sku": "TIRE-BAL-01",
        "serviceName": "Thay mâm vỏ và Cân bằng động Road Force",
        "priceType": "FIXED",
        "basePrice": 1200000,
        "category": "Phụ kiện & Đồ chơi"
      }
    ]
  },
  {
    "id": "RO-2026-004",
    "vehicle_info": {
      "license_plate": "79A-999.99",
      "model": "VinFast VF8",
      "color": "Xanh dương"
    },
    "customer_info": {
      "name": "Đặng VIP",
      "phone": "0999999999"
    },
    "service_type": "Cập nhật phần mềm",
    "is_waiting_in_lounge": true,
    "stage": "QC",
    "scheduled_arrival_time": now.subtract(const Duration(minutes: 130)).toIso8601String(),
    "actual_arrival_time": now.subtract(const Duration(minutes: 120)).toIso8601String(),
    "expected_delivery_time": now.add(const Duration(minutes: 5)).toIso8601String(), // Rất gấp
    "assigned_technician": {
      "id": "TECH-03",
      "name": "Nam Tester",
      "avatarUrl": "https://i.pravatar.cc/150?u=tech03"
    }
  },
  {
    "id": "RO-2026-005",
    "vehicle_info": {
      "license_plate": "15A-888.88",
      "model": "Mazda CX-5",
      "color": "Đỏ"
    },
    "customer_info": {
      "name": "Lê Lợi",
      "phone": "0933333333"
    },
    "service_type": "Bảo dưỡng 10.000km",
    "is_waiting_in_lounge": true,
    "stage": "PENDING",
    "scheduled_arrival_time": now.subtract(const Duration(minutes: 5)).toIso8601String(),
    "actual_arrival_time": null,
    "expected_delivery_time": null,
    "assigned_technician": null
  },
  {
    "id": "RO-2026-006",
    "vehicle_info": {
      "license_plate": "51H-123.99",
      "model": "Hyundai Tucson",
      "color": "Trắng"
    },
    "customer_info": {
      "name": "Trần Thanh",
      "phone": "0944444444"
    },
    "service_type": "Thay lốp, cân mâm",
    "is_waiting_in_lounge": false,
    "stage": "DELIVERY",
    "scheduled_arrival_time": now.subtract(const Duration(hours: 5)).toIso8601String(),
    "actual_arrival_time": now.subtract(const Duration(hours: 5)).toIso8601String(),
    "expected_delivery_time": now.subtract(const Duration(minutes: 15)).toIso8601String(), // Trễ 15p
    "assigned_technician": {
      "id": "TECH-05",
      "name": "Tuấn Gầm",
      "avatarUrl": "https://i.pravatar.cc/150?u=tech05"
    }
  }
];

final List<RepairOrderModel> mockRepairOrders = 
    mockRepairOrdersJson.map((json) => RepairOrderModel.fromJson(json)).toList();
