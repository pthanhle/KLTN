import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';
import 'package:ttauto_staff/roles/sales/features/shared/constants/sales_constants.dart';

class PoolItemDetails extends StatelessWidget {
  final TestDriveBooking booking;

  const PoolItemDetails({
    super.key,
    required this.booking,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isHome = booking.bookingType == BookingType.home;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: ShapeDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.dividerColor.withValues(alpha: 0.1),
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.schedule_rounded, size: 16, color: theme.colorScheme.onSurfaceVariant),
              const SizedBox(width: 8),
              Text(
                '${booking.selectedTimeSlot ?? '--:--'} - ${booking.selectedDate ?? '--/--/----'}',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          if (isHome && booking.addressDetail != null) ...[
            const SizedBox(height: 12),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.location_on_rounded, size: 16, color: theme.colorScheme.onSurfaceVariant),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    '${booking.addressDetail}, ${booking.district ?? ''}',
                    style: TextStyle(
                      fontSize: 14,
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ]
        ],
      ),
    );
  }
}