import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../models/repair_order_model.dart';
import 'ro_card_header.dart';
import 'ro_card_customer.dart';
import 'ro_card_timeline.dart';
import 'ro_card_footer.dart';

class RepairOrderCard extends StatelessWidget {
  final RepairOrderModel order;
  final VoidCallback onTap;
  final int index;

  const RepairOrderCard({
    super.key,
    required this.order,
    required this.onTap,
    required this.index,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        onTap();
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: ShapeDecoration(
          color: isDark 
              ? Colors.white.withValues(alpha: 0.05) 
              : Colors.white.withValues(alpha: 0.6),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 28,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isDark 
                  ? Colors.white.withValues(alpha: 0.1) 
                  : Colors.white.withValues(alpha: 0.8),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.05),
              blurRadius: 20,
              offset: const Offset(0, 10),
            )
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 28,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ROCardHeader(
                    vehicleInfo: order.vehicleInfo,
                    serviceType: order.serviceType,
                  ),
                  const SizedBox(height: 16),
                  Divider(color: isDark ? Colors.white.withValues(alpha: 0.1) : Colors.black.withValues(alpha: 0.05), height: 1),
                  const SizedBox(height: 16),
                  ROCardCustomer(
                    customerInfo: order.customerInfo,
                    isWaitingInLounge: order.isWaitingInLounge,
                    showWaitingTag: order.stage != ROStage.pending,
                  ),
                  const SizedBox(height: 16),
                  ROCardTimeline(
                    scheduledTime: order.scheduledArrivalTime,
                    arrivalTime: order.actualArrivalTime,
                    deliveryTime: order.expectedDeliveryTime,
                  ),
                  if (order.stage != ROStage.pending) ...[
                    const SizedBox(height: 16),
                    ROCardFooter(
                      technician: order.assignedTechnician,
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ).animate(delay: (index * 100).ms)
       .fade(duration: 400.ms, curve: Curves.easeOut)
       .slideY(begin: 0.2, end: 0, duration: 400.ms, curve: Curves.easeOutCubic),
    );
  }
}
