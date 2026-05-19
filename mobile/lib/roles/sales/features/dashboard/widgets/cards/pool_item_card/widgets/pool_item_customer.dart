import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';

class PoolItemCustomer extends StatelessWidget {
  final TestDriveBooking booking;

  const PoolItemCustomer({
    super.key,
    required this.booking,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    
    final licenseColor = booking.hasDriverLicense ? colorScheme.tertiary : colorScheme.error;

    return Row(
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: ShapeDecoration(
            color: colorScheme.primaryContainer,
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
            ),
          ),
          child: Center(
            child: Text(
              booking.fullName.isNotEmpty ? booking.fullName[0].toUpperCase() : '?',
              style: TextStyle(
                color: colorScheme.primary,
                fontWeight: FontWeight.bold,
                fontSize: 18,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                booking.fullName,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.2,
                ),
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  Icon(Icons.phone_rounded, size: 14, color: colorScheme.onSurfaceVariant),
                  const SizedBox(width: 4),
                  Text(
                    booking.phoneNumber,
                    style: TextStyle(
                      fontSize: 14,
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        // Driver License Badge
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: ShapeDecoration(
            color: licenseColor.withValues(alpha: 0.15),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 10,
                cornerSmoothing: 1.0,
              ),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                booking.hasDriverLicense ? Icons.check_circle_rounded : Icons.warning_rounded,
                size: 14,
                color: licenseColor,
              ),
              const SizedBox(width: 4),
              Text(
                booking.hasDriverLicense 
                    ? 'Đã có Bằng lái'.tr()
                    : 'Chưa có Bằng lái'.tr(),
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: licenseColor,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
