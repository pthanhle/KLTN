import '../../models/supplement_request_model.dart';

class SupplementMockData {
  static const List<SupplementRequestModel> mockRequests = [
    SupplementRequestModel(
      orderId: 'RO-12345',
      taskId: 'TASK-987',
      description: 'Phát hiện rỉ sét mâm phanh sau bên trái',
      proposedSolution: 'Cần vớt mâm phanh và thay má phanh mới',
      evidenceUrls: [
        'https://fakeimg.pl/400x400/282828/eae0d0/?retina=1&text=Brake+Disc',
      ],
      status: 'PAUSED_FOR_SUPPLEMENT',
    )
  ];
}
