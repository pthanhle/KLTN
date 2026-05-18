import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../controllers/sales_dashboard_controller.dart';
import '../../../../../auth/controllers/auth_controller.dart';
import '../cards/pool_item_card.dart';

class ThePoolSection extends ConsumerWidget {
  const ThePoolSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashboardState = ref.watch(salesDashboardProvider);
    final poolBookings = dashboardState.poolBookings;
    final currentUserId = ref.watch(authControllerProvider).value?.id ?? '';

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                'Khu vực chờ'.tr(),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(width: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: ShapeDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 12,
                      cornerSmoothing: 1.0,
                    ),
                  ),
                ),
                child: Text(
                  poolBookings.length.toString(),
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onPrimaryContainer,
                  ),
                ),
              )
            ],
          ),
          const SizedBox(height: 16),
          if (poolBookings.isEmpty && !dashboardState.isLoading)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 32),
              child: Center(
                child: Text(
                  'Hiện tại không có yêu cầu nào đang chờ.'.tr(),
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            )
          else
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: poolBookings.length,
              itemBuilder: (context, index) {
                final booking = poolBookings[index];
                final isRequestedByMe = booking.requestedStaff?.any((staff) => staff.id == currentUserId) ?? false;
                
                return PoolItemCard(
                  booking: booking,
                  isRequestedByMe: isRequestedByMe,
                  onRequestJob: () => ref.read(salesDashboardProvider.notifier).requestJob(booking.id),
                );
              },
            ),
        ],
      ),
    );
  }
}
