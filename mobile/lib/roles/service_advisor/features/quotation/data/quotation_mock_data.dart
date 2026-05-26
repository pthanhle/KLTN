import '../models/quotation_model.dart';

final QuotationModel mockQuotationData = QuotationModel(
  orderId: 'RO_12345',
  diagnosis: const DiagnosticItem(
    title: 'Rò rỉ dầu giảm chấn',
    technicianNote: 'Cần thay thế phuộc sau bên trái và phải do rò rỉ dầu nghiêm trọng.',
    evidenceMediaUrls: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD_9XqGGiJkCos-d77ihiKFui9sNzJApPHXWwxopzI09bDfx-uwCpmbnVD3Mv4e3Sl2sre7hKgjwkWRnrwkk7seQqMFc7YHb8R7ZRTov0JdQnQTl9T-NBIm4xEFr24q_abIesbZwhyMK-tya9mo7YxoLjSZiMvqCQ57hMu7RjB_DnaEgjfH-U9DQNOssIU_ucMz7fWvmE6s3q6c4LqYPQkTSbv-ZiOhUECKsU1D_7xHs_KdsOSQeP00CWYQWKEqYi1tGwPmwdYNrlWw'],
  ),
  parts: const [
    CartPartItem(
      sku: 'P001',
      name: 'Giảm xóc sau (L/R)',
      unitPrice: 450.00,
      quantity: 2,
      isBackorder: true,
      expectedDate: '2026-05-25',
    ),
  ],
  labor: const [
    CartLaborItem(
      laborCode: 'L001',
      name: 'Thay giảm xóc',
      quantity: 1.5,
      unitPrice: 100.00,
    ),
  ],
  depositRequired: 200.00,
);
