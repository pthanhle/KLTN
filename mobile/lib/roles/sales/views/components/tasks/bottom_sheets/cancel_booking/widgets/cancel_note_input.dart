import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class CancelNoteInput extends StatelessWidget {
  final ValueChanged<String> onChanged;
  final bool isRequired;

  const CancelNoteInput({
    super.key,
    required this.onChanged,
    this.isRequired = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          isRequired
              ? tr('Ghi chú thêm (Bắt buộc nếu chọn "Lý do khác")')
              : tr('Ghi chú thêm'),
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.onSurface,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: ShapeDecoration(
            color: theme.colorScheme.surface.withValues(alpha: 0.35), // Sáng hơn
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
            onChanged: onChanged,
            maxLines: 3,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface,
            ),
            decoration: InputDecoration(
              hintText: tr('Nhập ghi chú chi tiết...'),
              hintStyle: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.6), // Sáng hơn xíu
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
