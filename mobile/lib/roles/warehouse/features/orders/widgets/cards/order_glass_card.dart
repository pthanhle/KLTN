import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/packing_detail_page.dart';
import 'order_glass_card/order_card_header.dart';
import 'order_glass_card/order_card_customer_info.dart';
import 'order_glass_card/order_card_items_preview.dart';
import 'order_glass_card/order_card_actions.dart';

class OrderGlassCard extends StatelessWidget {
  final WarehouseOrderModel order;
  final VoidCallback onQuickPack;
  final VoidCallback onDispatch;

  const OrderGlassCard({
    super.key,
    required this.order,
    required this.onQuickPack,
    required this.onDispatch,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        if (order.status == OrderStatus.pendingPick) {
          Navigator.of(context, rootNavigator: true).push(
            MaterialPageRoute(
              builder: (context) => PackingDetailPage(orderId: order.id),
            ),
          );
        } else if (order.status == OrderStatus.pendingDelivery) {
          onDispatch();
        }
      },
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: Slidable(
          key: ValueKey(order.id),
          endActionPane: ActionPane(
            motion: const StretchMotion(),
            extentRatio: 0.3,
            children: OrderCardActions.buildActions(
              context: context,
              order: order,
              onQuickPack: onQuickPack,
              onDispatch: onDispatch,
            ),
          ),
          child: Container(
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.15),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 22,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.45),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.04 : 0.02),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.08 : 0.04),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(
                cornerRadius: 22,
                cornerSmoothing: 1.0,
              ),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      OrderCardHeader(order: order),
                      const SizedBox(height: 16),
                      OrderCardCustomerInfo(order: order),
                      const SizedBox(height: 16),
                      OrderCardItemsPreview(order: order),
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
