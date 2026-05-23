import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/constants/service_report_constants.dart';

class ServiceReportState {
  final String? selectedReason;
  final DateTime? expectedArrivalDate;

  const ServiceReportState({
    this.selectedReason,
    this.expectedArrivalDate,
  });

  ServiceReportState copyWith({
    String? selectedReason,
    DateTime? expectedArrivalDate,
  }) {
    return ServiceReportState(
      selectedReason: selectedReason ?? this.selectedReason,
      expectedArrivalDate: expectedArrivalDate ?? this.expectedArrivalDate,
    );
  }
}

class ServiceReportController extends Notifier<ServiceReportState> {
  @override
  ServiceReportState build() {
    return const ServiceReportState();
  }

  void selectReason(String reason) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    state = state.copyWith(
      selectedReason: reason,
      expectedArrivalDate: reason == ServiceReportConstants.reasonBackorder ? today.add(const Duration(days: 7)) : null,
    );
  }

  void updateExpectedDate(DateTime date) {
    if (state.selectedReason == ServiceReportConstants.reasonBackorder) {
      state = state.copyWith(expectedArrivalDate: date);
    }
  }

  void reset() {
    state = const ServiceReportState();
  }
}

final serviceReportProvider = NotifierProvider.autoDispose<ServiceReportController, ServiceReportState>(() {
  return ServiceReportController();
});
