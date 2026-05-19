import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/auth/controllers/auth_controller.dart';
import 'package:ttauto_staff/roles/sales/features/shared/constants/sales_constants.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';
import 'package:ttauto_staff/roles/sales/features/shared/data/mocks/sales_mock_data.dart';

// State class holding the dashboard data
class SalesDashboardState {
  final bool isLoading;
  final String? error;
  final List<TestDriveBooking> todayBookings;
  final List<TestDriveBooking> poolBookings;

  const SalesDashboardState({
    this.isLoading = false,
    this.error,
    this.todayBookings = const [],
    this.poolBookings = const [],
  });

  SalesDashboardState copyWith({
    bool? isLoading,
    String? error,
    List<TestDriveBooking>? todayBookings,
    List<TestDriveBooking>? poolBookings,
  }) {
    return SalesDashboardState(
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      todayBookings: todayBookings ?? this.todayBookings,
      poolBookings: poolBookings ?? this.poolBookings,
    );
  }
}

class SalesDashboardController extends Notifier<SalesDashboardState> {
  @override
  SalesDashboardState build() {
    Future.microtask(_loadDashboardData);
    return const SalesDashboardState();
  }

  Future<void> _loadDashboardData() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      // Giả lập API delay
      await Future.delayed(const Duration(milliseconds: 800));

      final currentUser = ref.read(authControllerProvider).value;
      final currentUserId = currentUser?.id ?? '';

      // Mock dữ liệu
      final allBookings = List<TestDriveBooking>.from(globalTestDrivesMock);

      // Filter "The Pool": status == Pending
      final pool = allBookings.where((b) => b.status == BookingStatus.pending).toList();

      // Filter "Hôm nay": Những booking đã Confirm/InProgress cho nhân viên hiện tại trong hôm nay
      // Để mock, ta lấy những booking assignedStaff == currentUserId
      final today = allBookings.where((b) {
        return b.assignedStaff?.id == currentUserId &&
            (b.status == BookingStatus.confirmed || b.status == BookingStatus.inProgress);
      }).toList();

      state = state.copyWith(
        isLoading: false,
        poolBookings: pool,
        todayBookings: today,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> requestJob(String bookingId) async {
    // 1. Loading state on a specific job (could add specific loading array, but full reload is fine for mock)
    try {
      // Mock API Call delay
      await Future.delayed(const Duration(seconds: 1));

      final currentUser = ref.read(authControllerProvider).value;
      if (currentUser == null) return;

      // Update the mock data
      final index = globalTestDrivesMock.indexWhere((b) => b.id == bookingId);
      if (index != -1) {
        final booking = globalTestDrivesMock[index];
        final currentRequests = List<RequestedStaff>.from(booking.requestedStaff ?? []);
        
        // Kiểm tra xem đã ứng cử chưa
        if (!currentRequests.any((r) => r.id == currentUser.id)) {
          currentRequests.add(RequestedStaff(
            id: currentUser.id,
            fullName: currentUser.fullName,
            avatarUrl: currentUser.avatarUrl,
          ));

          final updatedBooking = booking.copyWith(requestedStaff: currentRequests);
          globalTestDrivesMock[index] = updatedBooking;

          // Cập nhật State nội bộ để UI render lại ngay lập tức
          final updatedPool = List<TestDriveBooking>.from(state.poolBookings);
          final poolIndex = updatedPool.indexWhere((b) => b.id == bookingId);
          if (poolIndex != -1) {
            updatedPool[poolIndex] = updatedBooking;
          }
          state = state.copyWith(poolBookings: updatedPool);
        }
      }
    } catch (e) {
      state = state.copyWith(error: "Không thể yêu cầu nhận việc: $e");
    }
  }
  
  Future<void> refresh() async {
    await _loadDashboardData();
  }
}

final salesDashboardProvider =
    NotifierProvider<SalesDashboardController, SalesDashboardState>(() {
  return SalesDashboardController();
});
