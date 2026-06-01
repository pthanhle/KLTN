import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/login_request.dart';
import '../models/user_model.dart';
import '../models/performance_model.dart';
import '../models/kpi_model.dart';
import '../models/kanban_model.dart';
import '../models/task_model.dart';
import 'auth_repository.dart';
import 'auth_api_repository.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthApiRepository();
});

class AuthMock implements AuthRepository {
  @override
  Future<UserModel> login(LoginRequest request) async {
    await Future.delayed(const Duration(milliseconds: 1500));

    if (request.employeeId.isEmpty || request.password.isEmpty) {
      throw Exception("Vui lòng nhập đầy đủ thông tin");
    }

    if (request.password != "123456") {
      throw Exception("Mật khẩu không chính xác");
    }

    final emailLower = request.employeeId.toLowerCase();

    // 1. SALES EXECUTIVE MOCK
    if (emailLower.contains("sales") || emailLower == "anhptl@ttvelocity.com") {
      return const UserModel(
        id: "60d5ecb8b392d700153528a4",
        employeeId: "SLS-089",
        fullName: "Phạm Thị Lan Anh",
        email: "anhptl@ttvelocity.com",
        phone: "+84 906239054",
        joinDate: "2018-01-03",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
        role: "SALES_EXECUTIVE",
        department: "Showroom Floor",
        status: "ACTIVE",
        baseSalary: 8000000,
        kpiType: "COMMISSION",
        kpiValue: 2.5,
        isOvertimeEligible: true,
        accessLevel: "STANDARD_USER",
        lastLogin: "2026-05-06T08:30:00Z",
        accessToken: "mock_jwt_sales",
        performance: PerformanceModel(
          kpis: KpiModel(
            revenue: RevenueMetric(current: 3500000000, target: 4000000000),
            csat: CsatMetric(score: 4.6, totalReviews: 45, percentile: "Top 20%"),
          ),
          kanban: KanbanModel(
            tasks: [
              TaskModel(id: 'LD-881', status: 'todo', title: 'Lịch lái thử xe CR-V', priority: 'URGENT', sla: '2h', customerName: 'Phạm Anh Tuấn', customerPhone: '0901234567', vehicleModel: 'Honda CR-V', appointmentTime: '14:00', taskType: 'TEST_DRIVE', description: 'Khách VIP quan tâm bản L 1 cầu. Đã chốt thời gian lái thử tại showroom.', locationType: 'SHOWROOM', licensePlate: '51H-123.45', address: 'Showroom Quận 7', chatLogs: [ChatLog(sender: 'Khách', time: '13:00', text: 'Tôi tới trễ 15p nhé')]),
              TaskModel(id: 'CS-102', status: 'confirmed', taskType: 'CONSULTATION', title: 'Tư vấn giá lăn bánh CR-V', priority: 'HIGH', progress: 50, customerName: 'Hoàng Minh', isBlinking: true, description: 'Cần gửi bảng chiết tính trả góp 80% qua ngân hàng VIB.', billed: '1.1 Tỷ'),
              TaskModel(id: 'LD-870', status: 'in_progress', taskType: 'CONTRACT', title: 'Ký hợp đồng Ford Everest', priority: 'HIGH', progress: 90, customerName: 'Bùi Minh Sơn', locationType: 'HOME', address: 'Quận 2, TP.HCM', billed: '1.45 Tỷ', description: 'Giao xe và ký hợp đồng tận nhà khách.'),
              TaskModel(id: 'LD-865', status: 'done', taskType: 'DELIVERY', title: 'Giao xe Tucson', priority: 'LOW', customerName: 'Vũ Thanh Bình', vehicleModel: 'Hyundai Tucson', billed: '950 Tr'),
              TaskModel(id: 'TD-001', status: 'customer_arrived', taskType: 'TEST_DRIVE', title: 'Lái thử Honda Civic RS', priority: 'HIGH', customerName: 'Trần Thị B', customerPhone: '0987654321', vehicleModel: 'Honda Civic RS', licensePlate: '51H-678.90', locationType: 'SHOWROOM', appointmentTime: '10:30'),
              TaskModel(id: 'TD-002', status: 'post_drive', taskType: 'TEST_DRIVE', title: 'Đánh giá sau lái thử HR-V', priority: 'MEDIUM', customerName: 'Lê Văn C', customerPhone: '0912345678', vehicleModel: 'Honda HR-V', licensePlate: '51G-246.80', locationType: 'SHOWROOM', appointmentTime: '15:00'),
            ],
          )
        )
      );
    }

    // 2. SERVICE ADVISOR MOCK
    else if (emailLower.contains("advisor") || emailLower == "quantm@ttvelocity.com") {
      return const UserModel(
        id: "60d5ecb8b392d700153528a2",
        employeeId: "ADV-012",
        fullName: "Trần Minh Quân",
        email: "quantm@ttvelocity.com",
        phone: "+84 902891738",
        joinDate: "2023-05-12",
        avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
        role: "SERVICE_ADVISOR",
        department: "Customer Service",
        status: "ACTIVE",
        baseSalary: 12000000,
        kpiType: "COMMISSION",
        kpiValue: 3.5,
        isOvertimeEligible: true,
        accessLevel: "STANDARD_USER",
        lastLogin: "2026-05-06T08:30:00Z",
        accessToken: "mock_jwt_advisor",
        performance: PerformanceModel(
          kpis: KpiModel(
            revenue: RevenueMetric(current: 120000000, target: 150000000),
            csat: CsatMetric(score: 4.8, totalReviews: 124, percentile: "Top 5% Regional"),
          ),
          kanban: KanbanModel(
            tasks: [
              TaskModel(id: 'RO-101', status: 'todo', title: 'Booking: Khách VIP bảo dưỡng', priority: 'HIGH', sla: '2h', customerName: 'Lê Trần B', vehicleModel: 'BMW 320i', appointmentTime: '11:00'),
              TaskModel(id: 'RO-105', status: 'in_progress', title: 'Báo giá đại tu chờ duyệt', priority: 'HIGH', progress: 65, customerName: 'Nguyễn Quang Dũng', vehicleModel: 'Honda City', appointmentTime: '10:00'),
              TaskModel(id: 'RO-099', status: 'done', title: 'Đã thanh toán - Chờ giao xe', priority: 'LOW', customerName: 'Phạm Văn Hương', vehicleModel: 'Hyundai SantaFe'),
            ]
          )
        )
      );
    }

    // 3. TECHNICIAN MOCK
    else if (emailLower.contains("tech") || emailLower == "sondt@ttvelocity.com") {
      return const UserModel(
        id: "60d5ecb8b392d700153528a6",
        employeeId: "TEC-042",
        fullName: "Đặng Thái Sơn",
        email: "sondt@ttvelocity.com",
        phone: "+84 905291502",
        joinDate: "2019-02-07",
        avatarUrl: "https://randomuser.me/api/portraits/men/78.jpg",
        role: "LEAD_TECHNICIAN",
        department: "Repair Workshop",
        status: "ACTIVE",
        baseSalary: 15000000,
        kpiType: "FLAT_RATE",
        kpiValue: 250000,
        isOvertimeEligible: true,
        accessLevel: "STANDARD_USER",
        lastLogin: "2026-05-06T08:30:00Z",
        accessToken: "mock_jwt_tech",
        performance: PerformanceModel(
          kpis: KpiModel(
            csat: CsatMetric(score: 4.5, totalReviews: 89, percentile: "Top 15%"),
            efficiency: EfficiencyMetric(billed: 185, clocked: 160, rate: 115),
            rework: ReworkMetric(rate: 2.1, trend: -0.4),
          ),
          kanban: KanbanModel(
            tasks: [
              TaskModel(id: 'RO-201', status: 'todo', title: 'Khám xe & Lên Checklist lỗi', priority: 'HIGH', sla: '24h', vehicleModel: 'Mercedes C200', appointmentTime: '08:00'),
              TaskModel(id: 'RO-195', status: 'in_progress', title: 'Đang tháo cụm lốc điều hoà', priority: 'MEDIUM', progress: 80, vehicleModel: 'Mazda 3', appointmentTime: '11:00'),
              TaskModel(id: 'RO-180', status: 'done', title: 'Hoàn thành bảo dưỡng', priority: 'LOW', billed: '4h', vehicleModel: 'Toyota Camry', appointmentTime: '14:00'),
            ]
          )
        )
      );
    }

    // 4. INVENTORY MGR MOCK
    else if (emailLower.contains("kho") || emailLower == "huydt@ttvelocity.com") {
      return const UserModel(
        id: "60d5ecb8b392d700153528a9",
        employeeId: "INV-112",
        fullName: "Đỗ Tiến Huy",
        email: "huydt@ttvelocity.com",
        phone: "+84 909784467",
        joinDate: "2019-01-23",
        avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
        role: "INVENTORY_MGR",
        department: "Logistics",
        status: "ACTIVE",
        baseSalary: 14000000,
        kpiType: "SALARY_ONLY",
        kpiValue: 0,
        isOvertimeEligible: true,
        accessLevel: "STANDARD_USER",
        lastLogin: "2026-05-06T08:30:00Z",
        accessToken: "mock_jwt_warehouse",
        performance: PerformanceModel(
          kpis: KpiModel(
            inventoryAccuracy: ValueMetric(score: 99.8, target: 99.0),
            avgSla: TimeMetric(time: 1.2, unit: 'h'),
          ),
          kanban: KanbanModel(
            tasks: [
              TaskModel(id: 'PO-551', status: 'todo', title: 'Web Order: Khách đặt lốp Michelin', priority: 'HIGH', sla: '2h', vehicleModel: 'Porsche Macan', appointmentTime: '13:00'),
              TaskModel(id: 'IV-220', status: 'in_progress', title: 'Đang đóng gói lốp gửi Viettel Post', priority: 'MEDIUM', progress: 60, vehicleModel: 'Toyota Camry', appointmentTime: '09:00'),
              TaskModel(id: 'IV-210', status: 'done', title: 'Đã xuất 4 lốp xe cho KTV (RO-099)', priority: 'HIGH', vehicleModel: 'Mercedes C200', appointmentTime: '09:00'),
            ]
          )
        )
      );
    }

    // Default fallback
    return const UserModel(
      id: "60d5ecb8b392d700153528a4",
      employeeId: "SLS-089",
      fullName: "Phạm Thị Lan Anh",
      email: "anhptl@ttvelocity.com",
      phone: "+84 906239054",
      role: "SALES_EXECUTIVE",
      department: "Showroom Floor",
      status: "ACTIVE",
      accessToken: "mock_jwt_default",
    );
  }

  @override
  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 500));
  }
}