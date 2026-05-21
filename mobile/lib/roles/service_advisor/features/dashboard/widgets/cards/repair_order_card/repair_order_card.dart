import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/repair_order_model.dart';
import 'ro_card_header.dart';
import 'ro_card_customer.dart';
import 'ro_card_timeline.dart';
import 'ro_card_footer.dart';

class RepairOrderCard extends StatefulWidget {
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
  State<RepairOrderCard> createState() => _RepairOrderCardState();
}

class _RepairOrderCardState extends State<RepairOrderCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  late Animation<double> _fadeAnim;
  late Animation<Offset> _slideAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _fadeAnim = CurvedAnimation(parent: _animController, curve: Curves.easeOut);
    _slideAnim = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOutCubic));

    Future.delayed(Duration(milliseconds: widget.index * 100), () {
      if (mounted) _animController.forward();
    });
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final order = widget.order;

    return FadeTransition(
      opacity: _fadeAnim,
      child: SlideTransition(
        position: _slideAnim,
        child: GestureDetector(
          onTap: () {
            HapticFeedback.selectionClick();
            widget.onTap();
          },
          child: Container(
            margin: const EdgeInsets.only(bottom: 16),
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.15),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 28,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: 0.3),
                  width: 0.5,
                ),
              ),
              shadows: [
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
                      Divider(
                        color: isDark
                            ? Colors.white.withValues(alpha: 0.1)
                            : Colors.black.withValues(alpha: 0.05),
                        height: 1,
                      ),
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
          ),
        ),
      ),
    );
  }
}
