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
          color: theme.colorScheme.surface.withValues(alpha: 0.6),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 24,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: 0.4),
              width: 1.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 24,
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
            filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
            child: Stack(
              children: [
                if (isUrgent)
                  Positioned(
                    top: -40,
                    right: -40,
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: theme.colorScheme.error.withValues(alpha: 0.15),
                      ),
                    ),
                  ),
                Padding(
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
              ],
            ),
          ),
        ),
      ),
    );
  }
}
