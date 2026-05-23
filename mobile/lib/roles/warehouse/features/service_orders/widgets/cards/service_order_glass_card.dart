import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/service_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'service_order_card_header.dart';
import 'service_order_card_tech.dart';
import 'service_order_card_footer.dart';

class ServiceOrderGlassCard extends StatelessWidget {
  final ServiceOrderModel order;
  final VoidCallback onTap;

  const ServiceOrderGlassCard({
    super.key,
    required this.order,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUrgent = order.priority == OrderPriority.urgent;

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: ShapeDecoration(
          color: Theme.of(context).brightness == Brightness.dark
              ? Colors.white.withValues(alpha: 0.02)
              : Colors.white.withValues(alpha: 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 24,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isUrgent
                  ? theme.colorScheme.error.withValues(alpha: 0.5)
                  : Colors.white.withValues(alpha: 0.3),
              width: isUrgent ? 1.0 : 0.5,
            ),
          ),
          shadows: [
            if (isUrgent)
              BoxShadow(
                color: theme.colorScheme.error.withValues(alpha: 0.15),
                blurRadius: 20,
                spreadRadius: 0,
                offset: const Offset(0, 4),
              ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 24,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ServiceOrderCardHeader(
                    licensePlate: order.customer.licensePlate,
                    vehicleModel: order.customer.vehicleModel,
                    priority: order.priority,
                  ),
                  const SizedBox(height: 16),
                  ServiceOrderCardTech(
                    technician: order.assignedTechnician,
                  ),
                  const SizedBox(height: 16),
                  ServiceOrderCardFooter(
                    totalItems: order.totalItems,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
