import 'package:flutter/material.dart';
import '../../../../../../models/test_drive_booking.dart';

class PoolItemNote extends StatelessWidget {
  final TestDriveBooking booking;

  const PoolItemNote({
    super.key,
    required this.booking,
  });

  @override
  Widget build(BuildContext context) {
    if (booking.note == null || booking.note!.isEmpty) {
      return const SizedBox.shrink();
    }

    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(top: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            Icons.format_quote_rounded,
            size: 18,
            color: theme.colorScheme.primary.withValues(alpha: 0.5),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              booking.note!,
              style: TextStyle(
                fontSize: 14,
                fontStyle: FontStyle.italic,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ],
      ),
    );
  }
}