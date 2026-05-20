import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/repair_order_model.dart';
import '../../../../../../../shared/widgets/toast/glass_toast.dart';

class ROCardCustomer extends StatelessWidget {
  final CustomerInfo customerInfo;
  final bool isWaitingInLounge;
  final bool showWaitingTag;

  const ROCardCustomer({
    super.key,
    required this.customerInfo,
    required this.isWaitingInLounge,
    this.showWaitingTag = true,
  });

  void _callCustomer(BuildContext context) {
    GlassToast.show(context, title: 'Đang gọi: ${customerInfo.phone}', icon: CupertinoIcons.phone_fill);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Name & Call Button
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Khách hàng'.tr(),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  customerInfo.name,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            GestureDetector(
              onTap: () => _callCustomer(context),
              child: Container(
                width: 40,
                height: 40,
                decoration: ShapeDecoration(
                  color: isDark ? Colors.white.withValues(alpha: 0.1) : Colors.black.withValues(alpha: 0.05),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 20,
                      cornerSmoothing: 1.0,
                    ),
                  ),
                ),
                child: Icon(
                  CupertinoIcons.phone_fill,
                  size: 20,
                  color: theme.colorScheme.primary,
                ),
              ),
            ),
          ],
        ),
        if (showWaitingTag) ...[
          const SizedBox(height: 12),
          // Waiting Tag
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: ShapeDecoration(
              color: isWaitingInLounge 
                  ? Colors.orange.withValues(alpha: 0.15)
                  : theme.colorScheme.surfaceContainerHighest,
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 8,
                  cornerSmoothing: 1.0,
                ),
              ),
              shadows: isWaitingInLounge ? [
                BoxShadow(
                  color: Colors.orange.withValues(alpha: 0.3),
                  blurRadius: 8,
                  spreadRadius: 0,
                )
              ] : [],
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  isWaitingInLounge ? CupertinoIcons.time : CupertinoIcons.car,
                  size: 14,
                  color: isWaitingInLounge ? Colors.orange[800] : theme.colorScheme.onSurfaceVariant,
                ),
                const SizedBox(width: 4),
                Text(
                  isWaitingInLounge ? 'Khách Đợi Tại Xưởng'.tr() : 'Khách Để Xe Lại'.tr(),
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                    color: isWaitingInLounge ? Colors.orange[800] : theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }
}
