import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/sales/features/shared/constants/sales_constants.dart';
import 'package:ttauto_staff/roles/sales/features/shared/data/test_drive_api_service.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';

class SalesDashboardState {
  final bool isLoading;
  final String? error;
  final List<TestDriveBooking> todayBookings;
  final List<TestDriveBooking> poolBookings;
  final Set<String> requestingJobIds;

  const SalesDashboardState({
    this.isLoading = false,
    this.error,
    this.todayBookings = const [],
    this.poolBookings = const [],
    this.requestingJobIds = const {},
  });

  SalesDashboardState copyWith({
    bool? isLoading,
    String? error,
    List<TestDriveBooking>? todayBookings,
    List<TestDriveBooking>? poolBookings,
    Set<String>? requestingJobIds,
  }) {
    return SalesDashboardState(
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      todayBookings: todayBookings ?? this.todayBookings,
      poolBookings: poolBookings ?? this.poolBookings,
      requestingJobIds: requestingJobIds ?? this.requestingJobIds,
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
      final results = await Future.wait([
        testDriveApiService.fetchPool(),
        testDriveApiService.fetchMyBookings(),
      ]);

      final pool = results[0] as List<TestDriveBooking>;
      final myBookings = results[1] as List<TestDriveBooking>;

      final today = myBookings.where((b) {
        return b.status == BookingStatus.confirmed ||
            b.status == BookingStatus.inProgress ||
            b.status == BookingStatus.received;
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
    // Optimistic: mark as requesting
    state = state.copyWith(
      requestingJobIds: {...state.requestingJobIds, bookingId},
    );
    try {
      await testDriveApiService.requestJob(bookingId);
      // Reload pool to get updated requestedStaff list
      final pool = await testDriveApiService.fetchPool();
      final newRequestingIds = Set<String>.from(state.requestingJobIds)
        ..remove(bookingId);
      state = state.copyWith(
        poolBookings: pool,
        requestingJobIds: newRequestingIds,
      );
    } catch (e) {
      final newRequestingIds = Set<String>.from(state.requestingJobIds)
        ..remove(bookingId);
      state = state.copyWith(
        error: 'Không thể yêu cầu nhận việc: $e',
        requestingJobIds: newRequestingIds,
      );
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
