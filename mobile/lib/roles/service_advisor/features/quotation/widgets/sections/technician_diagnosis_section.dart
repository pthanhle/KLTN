import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../../../dashboard/models/repair_order_model.dart';
import '../mpi_diagnosis_detail_modal.dart';
import '../shared/glass_card.dart';
import '../shared/glass_text_field.dart';
import '../../constants/quotation_constants.dart';

class TechnicianDiagnosisSection extends ConsumerWidget {
  final QuotationModel data;
  final String orderId;
  final List<MpiCategory> mpiDiagnostics;
  final String mpiConclusion;
  final bool hasViewedDiagnosis;
  final VoidCallback onViewDetail;

  const TechnicianDiagnosisSection({
    super.key,
    required this.data,
    required this.orderId,
    this.mpiDiagnostics = const [],
    this.mpiConclusion = '',
    this.hasViewedDiagnosis = false,
    required this.onViewDetail,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final controller = ref.read(quotationControllerProvider.notifier);
    final hasDiagnosis = mpiDiagnostics.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Chẩn đoán từ KTV'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        const SizedBox(height: 16),
        GlassCard(
          margin: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              InkWell(
                borderRadius: BorderRadius.circular(QuotationConstants.radiusSmall),
                onTap: hasDiagnosis ? () {
                  MpiDiagnosisDetailModal.show(context, mpiDiagnostics, mpiConclusion);
                  onViewDetail();
                } : null,
                child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          data.diagnosis.title,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        if (data.diagnosis.technicianNote != null && data.diagnosis.technicianNote!.isNotEmpty)
                          const SizedBox(height: 8),
                        if (data.diagnosis.technicianNote != null && data.diagnosis.technicianNote!.isNotEmpty)
                          Text(
                            data.diagnosis.technicianNote!,
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        if (hasDiagnosis) ...[
                          const SizedBox(height: 12),
                          Row(
                            children: [
                              Icon(
                                hasViewedDiagnosis ? CupertinoIcons.checkmark_alt_circle_fill : CupertinoIcons.list_bullet_below_rectangle,
                                size: 16,
                                color: hasViewedDiagnosis ? Colors.green : theme.colorScheme.primary,
                              ),
                              const SizedBox(width: 6),
                              Text(
                                hasViewedDiagnosis
                                    ? 'Đã xem chi tiết hạng mục kiểm tra'.tr()
                                    : 'Xem chi tiết hạng mục kiểm tra'.tr(),
                                style: theme.textTheme.labelMedium?.copyWith(
                                  color: hasViewedDiagnosis ? Colors.green : theme.colorScheme.primary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(width: 4),
                              Icon(CupertinoIcons.chevron_right, size: 12, color: theme.colorScheme.primary),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(width: 16),
                  Container(
                    width: 64,
                    height: 64,
                    decoration: ShapeDecoration(
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: QuotationConstants.radiusSmall,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(
                          color: Colors.white.withValues(alpha: 0.35),
                          width: 0.5,
                        ),
                      ),
                    ),
                    child: ClipSmoothRect(
                      radius: SmoothBorderRadius(cornerRadius: QuotationConstants.radiusSmall, cornerSmoothing: 1.0),
                      child: Stack(
                        children: [
                          Positioned.fill(
                            child: Image.network(
                              data.diagnosis.evidenceMediaUrls.isNotEmpty ? data.diagnosis.evidenceMediaUrls.first : '',
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) => const Center(child: Icon(CupertinoIcons.photo)),
                            ),
                          ),
                          Positioned.fill(
                            child: Container(
                              color: Colors.black.withValues(alpha: 0.1),
                              child: const Center(
                                child: Icon(CupertinoIcons.zoom_in, color: Colors.white, size: 20),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Tư vấn cho khách'.tr(),
                style: theme.textTheme.labelMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 8),
              GlassTextField(
                hintText: 'Nhập ghi chú tư vấn...'.tr(),
                maxLines: 2,
                onChanged: controller.updateAdvisorNote,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
