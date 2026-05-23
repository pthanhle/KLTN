import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import '../../models/service_order_model.dart';

final List<ServiceOrderModel> mockServiceOrders = [
  ServiceOrderModel(
    id: 'SVC-ORD-98213',
    quotationId: 'QUO-2026-054',
    priority: OrderPriority.urgent,
    status: ServiceOrderStatus.pendingPick,
    createdAt: DateTime.now().subtract(const Duration(minutes: 15)),
    customer: const ServiceCustomerInfo(
      name: 'Nguyễn Văn A',
      licensePlate: '51H-123.45',
      vehicleModel: 'Toyota Camry',
    ),
    assignedTechnician: const AssignedTechnician(
      technicianId: 'TECH-042',
      name: 'Trần Thanh Bình',
      role: 'Master Technician',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzO1GRjuh7g1LG2kLRJZyKu0UavIu_p94OJmlwNuwGO6DNmACGD30Ew0RN7JyONTlAwO5IY0rxJlo2PnztPSiKrtABndAGoC6xtOIk-h3k-Rx_DCzyaSO1ySSdlWCpaXSNml7MDkoaJQSuGOca1czOup9AgIEPA4lMJlgnMslm0F8sPDV7jbHrr62NmgIGRQe-Z8ntqlbYBM4fPaLR9MFg8ILPBQ-BYljLiX6MdKPR6j8aqEGvHaUikGiQxQxqcYH1RhWHvOBqaL11',
      bayNumber: 'Khoang 04',
    ),
    parts: const [
      ServicePartItem(
        partId: 'PART-001',
        sku: 'BOSCH-BRK-PAD-001',
        name: 'Má phanh gốm Bosch',
        quantity: 2,
        warehouseStatus: 'pending',
        binLocation: 'A-04-02',
      ),
      ServicePartItem(
        partId: 'PART-002',
        sku: 'OIL-MOBIL1-5W30',
        name: 'Nhớt Mobil 1 5W-30',
        quantity: 5,
        warehouseStatus: 'pending',
        binLocation: 'L-01-05',
      ),
    ],
  ),
  ServiceOrderModel(
    id: 'SVC-ORD-98214',
    quotationId: 'QUO-2026-055',
    priority: OrderPriority.standard,
    status: ServiceOrderStatus.pendingPick,
    createdAt: DateTime.now().subtract(const Duration(hours: 1)),
    customer: const ServiceCustomerInfo(
      name: 'Lê Hoàng C',
      licensePlate: '29A-888.88',
      vehicleModel: 'Mercedes S450',
    ),
    assignedTechnician: const AssignedTechnician(
      technicianId: 'TECH-011',
      name: 'Trần Thị B',
      role: 'Chuyên viên chẩn đoán',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRR3Deb80LIhyoSbIRvMxpsTGPtcxx5lUWuBBGBkRDZDIFymqTaEHrKhRBc1_ThVmvMLEDWdcI-lUUEWfA6VqmTuiPjsb1MlZtw9ysvWf14jY6CpmQpkSh86scV9SFT88uCS5YBrm6Xm0ZdbgAxrx01vrrcm8v9Ppe2V4KjgtAV9kZee_5DsIoHKOLUtMVshXngeJBzi9OI_sIaTs89L4qKWa05lqawCUC3LLMAPbYcUd4BG7guKWprM4LNYq7_cKLHhio729NNJM4',
      bayNumber: 'Khoang 02',
    ),
    parts: const [
      ServicePartItem(
        partId: 'PART-101',
        sku: 'FIL-AIR-MB',
        name: 'Lọc gió động cơ Mercedes',
        quantity: 1,
        warehouseStatus: 'pending',
        binLocation: 'M-12-01',
      ),
      ServicePartItem(
        partId: 'PART-102',
        sku: 'BRK-DISC-MB',
        name: 'Đĩa phanh tản nhiệt',
        quantity: 2,
        warehouseStatus: 'pending',
        binLocation: 'B-02-04',
      ),
    ],
  ),
];
