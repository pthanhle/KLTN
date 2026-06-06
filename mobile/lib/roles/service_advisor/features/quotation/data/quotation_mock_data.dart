import '../models/quotation_model.dart';

final QuotationModel mockQuotationData = QuotationModel(
  orderId: 'RO_12345',
  diagnosis: const DiagnosticItem(
    title: 'Rò rỉ dầu giảm chấn',
    description:
        'Cần thay thế phuộc sau bên trái và phải do rò rỉ dầu nghiêm trọng.',
    imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9XqGGiJkCos-d77ihiKFui9sNzJApPHXWwxopzI09bDfx-uwCpmbnVD3Mv4e3Sl2sre7hKgjwkWRnrwkk7seQqMFc7YHb8R7ZRTov0JdQnQTl9T-NBIm4xEFr24q_abIesbZwhyMK-tya9mo7YxoLjSZiMvqCQ57hMu7RjB_DnaEgjfH-U9DQNOssIU_ucMz7fWvmE6s3q6c4LqYPQkTSbv-ZiOhUECKsU1D_7xHs_KdsOSQeP00CWYQWKEqYi1tGwPmwdYNrlWw',
  ),
  parts: const [
    CartPartItem(
      id: 'P001',
      name: 'Giảm xóc sau (L/R)',
      price: 450.00,
      quantity: 2,
      isBackorder: true,
      expectedDate: '2026-05-25',
    ),
  ],
  labor: const [
    CartLaborItem(
      id: 'L001',
      name: 'Thay giảm xóc',
      hours: 1.5,
      rate: 100.00,
    ),
  ],
  depositRequired: 200.00,
  receptionSnapshot: const ReceptionSnapshot(
    odometer: 24000,
    fuelLevel: 21,
    customerNotes: 'tối ưu',
    vehicleImageUrl:
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop',
    damageMap: [
      ReceptionDamagePoint(
        label: '1',
        description: 'Thay cửa',
        x: 0.62,
        y: 0.35,
      ),
      ReceptionDamagePoint(
        label: '2',
        description: 'Đèn bị hư',
        x: 0.29,
        y: 0.68,
      ),
      ReceptionDamagePoint(
        label: '3',
        description: 'Độ vô lăng',
        x: 0.45,
        y: 0.50,
      ),
    ],
    belongings: [
      ReceptionBelonging(item: 'Laptop', status: true),
      ReceptionBelonging(item: 'mắt kính', status: true),
      ReceptionBelonging(item: 'điện thoại', status: true),
      ReceptionBelonging(item: 'cục sạc', status: true),
    ],
  ),
);
