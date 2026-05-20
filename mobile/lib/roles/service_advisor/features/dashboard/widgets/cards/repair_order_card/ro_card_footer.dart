import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/repair_order_model.dart';

class ROCardFooter extends StatelessWidget {
  final AssignedTechnician? technician;

  const ROCardFooter({
    super.key,
    required this.technician,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    if (technician == null) {
      return Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: ShapeDecoration(
              color: theme.colorScheme.errorContainer,
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 16,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            alignment: Alignment.center,
            child: Text(
              '!',
              style: TextStyle(
                color: theme.colorScheme.onErrorContainer,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            'Chưa phân bổ KTV'.tr(),
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.error,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      );
    }

    return Row(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.10)
                : theme.colorScheme.secondaryContainer,
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: 0.3),
                width: 0.5,
              ),
            ),
            image: DecorationImage(
              image: NetworkImage(technician!.avatarUrl),
              fit: BoxFit.cover,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Text(
          '${'KTV'.tr()}: ${technician!.name}',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurface,
          ),
        ),
      ],
    );
  }
}
