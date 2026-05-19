import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/shared/widgets/buttons/glass_close_button.dart';

class PackingReportHeader extends StatelessWidget {
  final String orderId;

  const PackingReportHeader({
    super.key,
    required this.orderId,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Stack(
      alignment: Alignment.topCenter,
      children: [
        Align(
          alignment: Alignment.topRight,
          child: GlassCloseButton(
                        onPressed: () => context.pop(),
                      ),
        ),
        Column(
          children: [
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: theme.colorScheme.errorContainer.withValues(alpha: 0.5),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.warning_rounded,
                color: theme.colorScheme.error,
                size: 28,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Báo Cáo Sự Cố'.tr(),
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.onSurface,
                letterSpacing: -0.5,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '${'Đơn hàng'.tr()}: $orderId',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
