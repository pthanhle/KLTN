import 'package:ttauto_staff/roles/sales/features/cancel_booking/models/cancel_reason_model.dart';

class MockCancelReasonsData {
  /// Single source of truth for mock cancel reasons.
  /// Matches the fields expected from the future BE API.
  static const List<CancelReasonModel> allReasons = [
    CancelReasonModel(id: 1, translationKey: 'Khách báo bận / Đổi ý'),
    CancelReasonModel(id: 2, translationKey: 'Không liên lạc được khách hàng'),
    CancelReasonModel(id: 3, translationKey: 'Sự cố xe lái thử'),
    CancelReasonModel(id: 4, translationKey: 'Lý do khác'),
  ];
}
