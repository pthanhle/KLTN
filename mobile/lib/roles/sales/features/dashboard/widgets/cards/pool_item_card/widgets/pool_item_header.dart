import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../../../core/utils/car_formatter.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';
import 'package:ttauto_staff/roles/sales/features/shared/constants/sales_constants.dart';

class PoolItemHeader extends StatelessWidget {
  final TestDriveBooking booking;

  const PoolItemHeader({
    super.key,
    required this.booking,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isHome = booking.bookingType == BookingType.home;
    final carName = CarFormatter.formatSkuToName(booking.targetCarSku);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                carName,
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.4,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 6),
              if (booking.targetCarSku != null && carName != booking.targetCarSku)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.primaryContainer.withValues(alpha: 0.4),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 8,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                  child: Text(
                    booking.targetCarSku!,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ),
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: ShapeDecoration(
            color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 12,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: theme.dividerColor.withValues(alpha: 0.1),
              ),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                isHome ? Icons.house_rounded : Icons.storefront_rounded,
                size: 16,
                color: theme.colorScheme.secondary,
              ),
              const SizedBox(width: 6),
              Text(
                isHome ? 'Tại nhà'.tr() : 'Showroom'.tr(),
                style: theme.textTheme.labelSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.secondary,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
