const List<Map<String, dynamic>> mockWarehouseOrders = [
  {
    "order_code": "ORD-2026-X89A",
    "order_status": "PROCESSING",
    "is_urgent": true,
    "items_count": 3,
    "delivery": {
      "receiver_name": "Lê Phước Thành"
    }
  },
  {
    "order_code": "ORD-2026-V12K",
    "order_status": "PROCESSING",
    "is_urgent": true,
    "items_count": 1,
    "delivery": {
      "receiver_name": "Nguyễn Văn B"
    }
  },
  {
    "order_code": "ORD-2026-NEW1",
    "order_status": "PACKED",
    "is_urgent": false,
    "items_count": 4,
    "delivery": {
      "receiver_name": "Trần Thị C"
    }
  },
  {
    "order_code": "ORD-2026-Z99P",
    "order_status": "PACKED",
    "is_urgent": false,
    "items_count": 2,
    "delivery": {
      "receiver_name": "Phạm Văn D"
    }
  },
];

const Map<String, dynamic> mockShiftTarget = {
  "total_target": 50,
  "completed": 45,
  "exceptions": ["A"]
};
