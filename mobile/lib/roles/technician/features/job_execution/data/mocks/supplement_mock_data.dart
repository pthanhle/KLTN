import '../../models/supplement_request_model.dart';

class SupplementMockData {
  static const List<SupplementRequestModel> mockRequests = [
    SupplementRequestModel(
      bookingCode: 'RO-12345',
      taskId: 'TASK-987',
      issueTitle: 'Rỉ sét mâm phanh',
      technicianNote: 'Phát hiện rỉ sét mâm phanh sau bên trái',
      actionRequired: 'Cần vớt mâm phanh và thay má phanh mới',
      evidenceMediaUrls: [
        'https://fakeimg.pl/400x400/282828/eae0d0/?retina=1&text=Brake+Disc',
      ],
      status: 'PAUSED_FOR_SUPPLEMENT',
    )
  ];
}
