import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../shared/widgets/containers/glass_card.dart';
import 'package:ttauto_staff/roles/sales/features/shared/models/test_drive_booking.dart';
import 'pool_item_card/widgets/pool_item_header.dart';
import 'pool_item_card/widgets/pool_item_customer.dart';
import 'pool_item_card/widgets/pool_item_details.dart';
import 'pool_item_card/widgets/pool_item_note.dart';
import 'pool_item_card/widgets/pool_item_action.dart';

class PoolItemCard extends StatelessWidget {
  final TestDriveBooking booking;
  final bool isRequestedByMe;
  final FutureOr<void> Function() onRequestJob;

  const PoolItemCard({
    super.key,
    required this.booking,
    required this.isRequestedByMe,
    required this.onRequestJob,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: GlassCard(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            PoolItemHeader(booking: booking),
            const SizedBox(height: 16),
            Divider(color: theme.dividerColor.withValues(alpha: 0.1), height: 1),
            const SizedBox(height: 16),
            PoolItemCustomer(booking: booking),
            const SizedBox(height: 16),
            PoolItemDetails(booking: booking),
            PoolItemNote(booking: booking),
            const SizedBox(height: 20),
            PoolItemAction(
              isRequestedByMe: isRequestedByMe,
              onRequestJob: onRequestJob,
            ),
          ],
        ),
      ),
    ).animate().fadeIn(duration: 400.ms, curve: Curves.easeOut)
               .slideY(begin: 0.1, end: 0, duration: 400.ms, curve: Curves.easeOutCubic);
  }
}
