class CancelReasonData {
  final int id;
  final String translationKey;

  const CancelReasonData({
    required this.id,
    required this.translationKey,
  });
}

class CancelReasons {
  static const List<CancelReasonData> allReasons = [
    CancelReasonData(id: 1, translationKey: 'Khách báo bận / Đổi ý'),
    CancelReasonData(id: 2, translationKey: 'Không liên lạc được khách hàng'),
    CancelReasonData(id: 3, translationKey: 'Sự cố xe lái thử'),
    CancelReasonData(id: 4, translationKey: 'Lý do khác'),
  ];
}
