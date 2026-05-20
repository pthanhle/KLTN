import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../shared/glass_card.dart';
import '../shared/glass_text_field.dart';
import '../../constants/quotation_constants.dart';

class TechnicianDiagnosisSection extends ConsumerWidget {
  final QuotationModel data;

  const TechnicianDiagnosisSection({super.key, required this.data});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final controller = ref.read(quotationControllerProvider.notifier);

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
              Row(
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
                        const SizedBox(height: 8),
                        Text(
                          data.diagnosis.description,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
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
                          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                          width: 1,
                        ),
                      ),
                    ),
                    child: ClipSmoothRect(
                      radius: SmoothBorderRadius(cornerRadius: QuotationConstants.radiusSmall, cornerSmoothing: 1.0),
                      child: Stack(
                        children: [
                          Positioned.fill(
                            child: Image.network(
                              data.diagnosis.imageUrl,
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
