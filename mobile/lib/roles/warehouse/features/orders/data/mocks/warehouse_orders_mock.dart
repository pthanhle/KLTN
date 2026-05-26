final List<Map<String, dynamic>> mockWarehouseOrdersJson = [
  {
    'order_code': 'ORD-2026-X89A',
    'user_id': 'USR-08912',
    'order_status': 'PROCESSING',
    'order_date': '12/10/2026',
    'handled_by': 'INV-112',
    'shipping': {
      'provider': 'Giao Hàng Tiết Kiệm',
      'tracking_code': 'GHTK-X89A',
    },
    'delivery': {
      'receiver_name': 'Nguyễn Văn A',
      'phone': '0901234567',
    },
    'financials': {
      'grand_total': 16800000,
    },
    'items': [
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9j',
        'sku': 'MIC-225-45R17',
        'name': 'Lốp Michelin Primacy 4 225/45R17',
        'properties': 'Kích thước: 225/45R17',
        'quantity': 4,
        'unit_price': 2500000,
        'total_price': 10000000,
      },
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9k',
        'sku': 'CAS-MAG-5W30',
        'name': 'Nhớt Castrol Magnatec 5W-30 (4L)',
        'properties': 'Dung tích: 4L',
        'quantity': 8,
        'unit_price': 850000,
        'total_price': 6800000,
      }
    ]
  },
  {
    'order_code': 'ORD-2026-Y42B',
    'order_status': 'PROCESSING',
    'order_date': '12/10/2026',
    'handled_by': 'INV-112',
    'shipping': {
      'provider': 'AhaMove',
      'tracking_code': 'AHA-Y42B',
    },
    'delivery': {
      'receiver_name': 'Chi Nhánh Q1',
    },
    'items': [
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9l',
        'sku': 'BOS-WIP-2418',
        'name': 'Gạt mưa Bosch Clear Advantage 24/18',
        'properties': 'Kích thước: 24/18 inch',
        'quantity': 5,
        'unit_price': 450000,
        'total_price': 2250000,
      }
    ]
  },
  {
    'order_code': 'ORD-2026-Z11C',
    'order_status': 'PACKED',
    'order_date': '12/10/2026',
    'handled_by': 'INV-112',
    'shipping': {
      'provider': 'Viettel Post',
    },
    'delivery': {
      'receiver_name': 'Trần Thị B',
    },
    'items': [
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9m',
        'sku': 'NGK-IR-BKR6EIX',
        'name': 'Bugi Iridium NGK BKR6EIX-11',
        'properties': 'Loại: Iridium',
        'quantity': 20,
        'unit_price': 220000,
        'total_price': 4400000,
      },
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9n',
        'sku': 'DEN-FIL-CABIN',
        'name': 'Lọc gió máy lạnh Denso',
        'properties': '',
        'quantity': 4,
        'unit_price': 350000,
        'total_price': 1400000,
      }
    ]
  },
  {
    'order_code': 'ORD-2026-D99K',
    'order_status': 'SHIPPING',
    'order_date': '13/10/2026',
    'handled_by': 'INV-112',
    'shipping': {
      'provider': 'TT AUTO Logistics',
    },
    'delivery': {
      'receiver_name': 'Gara Auto 365',
    },
    'items': [
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9o',
        'sku': 'GS-BAT-MF46B24L',
        'name': 'Bình Ắc Quy GS MF 46B24L (12V-45Ah)',
        'properties': 'Điện áp: 12V, Dung lượng: 45Ah',
        'quantity': 50,
        'unit_price': 1350000,
        'total_price': 67500000,
      }
    ]
  },
  {
    'order_code': 'ORD-2026-E12M',
    'order_status': 'SHIPPING',
    'order_date': '13/10/2026',
    'handled_by': 'INV-113',
    'shipping': {
      'provider': 'VNPost',
    },
    'delivery': {
      'receiver_name': 'Lê Văn C',
    },
    'items': [
      {
        '_id': '64fa3b1a2c3d4e5f6g7h8i9p',
        'sku': 'BRE-PAD-P83082',
        'name': 'Má phanh trước Brembo P83082',
        'properties': 'Vị trí: Phanh trước',
        'quantity': 2,
        'unit_price': 1800000,
        'total_price': 3600000,
      }
    ]
  },
];
