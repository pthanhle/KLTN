import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controllers/post_drive_controller.dart';

class FeedbackInput extends ConsumerWidget {
  const FeedbackInput({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isRequired = false;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          isRequired ? tr('ĐÁNH GIÁ/PHẢN HỒI (Bắt buộc)') : tr('ĐÁNH GIÁ/PHẢN HỒI'),
          style: theme.textTheme.labelSmall?.copyWith(
            color: theme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: ShapeDecoration(
            color: theme.colorScheme.surface.withValues(alpha: 0.35), // Sáng hơn, Liquid Glass
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: theme.colorScheme.surface.withValues(alpha: 0.3), // Specular highlight mỏng
                width: 0.5,
              ),
            ),
          ),
          child: TextFormField(
            onChanged: (text) {
              ref.read(postDriveControllerProvider.notifier).setFeedback(text);
            },
            maxLines: 4,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface,
            ),
            decoration: InputDecoration(
              hintText: tr('Nhập chi tiết đánh giá của khách hàng về xe, mức giá, ý định mua...'),
              hintStyle: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.6), // Sáng hơn
              ),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.all(16),
            ),
          ),
        ),
      ],
    );
  }
}