import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../models/warehouse_enums.dart';
import '../../../../models/warehouse_order_model.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'order_item_row.dart';
import '../modals/order_items_modal.dart';
import '../../../pages/packing_detail_page.dart';

class OrderGlassCard extends StatefulWidget {
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
  State<OrderGlassCard> createState() => _OrderGlassCardState();
}

class _OrderGlassCardState extends State<OrderGlassCard> with SingleTickerProviderStateMixin {

  String _getTimeElapsed(DateTime createdAt) {
    final diff = DateTime.now().difference(createdAt);
    if (diff.inHours > 0) {
      return 'Chờ ${diff.inHours} giờ';
    } else if (diff.inMinutes > 0) {
      return 'Chờ ${diff.inMinutes} phút';
    }
    return 'Vừa xong';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUrgent = widget.order.priority == OrderPriority.urgent;
    
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        if (widget.order.status == OrderStatus.pendingPick) {
          Navigator.of(context, rootNavigator: true).push(
            MaterialPageRoute(
              builder: (context) => PackingDetailPage(orderId: widget.order.id),
            ),
          );
        } else if (widget.order.status == OrderStatus.pendingDelivery) {
          widget.onDispatch();
        }
      },
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: Slidable(
          key: ValueKey(widget.order.id),
          endActionPane: ActionPane(
            motion: const StretchMotion(),
            extentRatio: 0.3,
            children: [
              if (widget.order.status == OrderStatus.pendingPick)
                CustomSlidableAction(
                  onPressed: (_) {
                    HapticFeedback.heavyImpact();
                    widget.onQuickPack();
                  },
                  backgroundColor: Colors.transparent,
                  padding: const EdgeInsets.only(left: 8),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                      cornerRadius: 22,
                      cornerSmoothing: 1.0,
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                      child: Container(
                        width: double.infinity,
                        height: double.infinity,
                        decoration: ShapeDecoration(
                          color: CupertinoColors.activeBlue.withValues(alpha: 0.25),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 22,
                              cornerSmoothing: 1.0,
                            ),
                            side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(CupertinoIcons.checkmark_seal_fill, color: CupertinoColors.activeBlue, size: 28),
                            const SizedBox(height: 4),
                            Text(
                              'Đóng gói nhanh'.tr(),
                              textAlign: TextAlign.center,
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: CupertinoColors.activeBlue,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              if (widget.order.status == OrderStatus.pendingDelivery)
                CustomSlidableAction(
                  onPressed: (_) {
                    HapticFeedback.heavyImpact();
                    widget.onDispatch();
                  },
                  backgroundColor: Colors.transparent,
                  padding: const EdgeInsets.only(left: 8),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                      cornerRadius: 22,
                      cornerSmoothing: 1.0,
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                      child: Container(
                        width: double.infinity,
                        height: double.infinity,
                        decoration: ShapeDecoration(
                          color: CupertinoColors.systemIndigo.withValues(alpha: 0.25),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 22,
                              cornerSmoothing: 1.0,
                            ),
                            side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(CupertinoIcons.car_detailed, color: CupertinoColors.systemIndigo, size: 28),
                            const SizedBox(height: 4),
                            Text(
                              'Bàn giao ĐVVC'.tr(),
                              textAlign: TextAlign.center,
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: CupertinoColors.systemIndigo,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
          child: Container(
        decoration: ShapeDecoration(
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 22,
              cornerSmoothing: 1.0,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
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
            filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
            child: Container(
              decoration: ShapeDecoration(
                color: theme.colorScheme.surface.withValues(alpha: 0.15),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 22,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: 0.3),
                    width: 0.5,
                  ),
                ),
              ),
              child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        widget.order.code,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: isUrgent 
                              ? theme.colorScheme.errorContainer 
                              : theme.colorScheme.surfaceContainerHighest,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              isUrgent ? CupertinoIcons.clock_fill : CupertinoIcons.check_mark_circled_solid,
                              size: 14,
                              color: isUrgent 
                                  ? theme.colorScheme.error 
                                  : theme.colorScheme.onSurfaceVariant,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              isUrgent ? 'Gấp'.tr() : 'Thường'.tr(),
                              style: theme.textTheme.labelSmall?.copyWith(
                                fontWeight: FontWeight.w700,
                                letterSpacing: 0.5,
                                color: isUrgent 
                                    ? theme.colorScheme.error 
                                    : theme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: theme.colorScheme.secondaryContainer,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.5),
                            width: 1,
                          ),
                        ),
                        child: Icon(
                          widget.order.customerType == CustomerType.b2b 
                              ? CupertinoIcons.building_2_fill 
                              : CupertinoIcons.person_fill,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.order.customerName,
                              style: theme.textTheme.bodyLarge?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: theme.colorScheme.onSurface,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Row(
                              children: [
                                Icon(
                                  CupertinoIcons.cube_box,
                                  size: 16,
                                  color: theme.colorScheme.secondary,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '${widget.order.totalItems} ${"Sản phẩm".tr()}',
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: theme.colorScheme.secondary,
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Icon(
                                  isUrgent ? CupertinoIcons.clock_fill : CupertinoIcons.time,
                                  size: 16,
                                  color: isUrgent ? theme.colorScheme.error : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  _getTimeElapsed(widget.order.createdAt),
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  
                  if (widget.order.items.isNotEmpty) ...[
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: ShapeDecoration(
                        color: theme.colorScheme.surface.withValues(alpha: 0.4),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 16,
                            cornerSmoothing: 1.0,
                          ),
                        ),
                      ),
                      child: Column(
                        children: [
                          ...widget.order.items.take(2).map((item) => OrderItemRow(item: item)),
                          if (widget.order.items.length > 2)
                            GestureDetector(
                              onTap: () {
                                HapticFeedback.lightImpact();
                                OrderItemsModal.show(context, widget.order);
                              },
                              behavior: HitTestBehavior.opaque,
                              child: Padding(
                                padding: const EdgeInsets.only(top: 8.0, bottom: 4.0),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      '+ ${widget.order.items.length - 2} ${'sản phẩm nữa'.tr()}',
                                      style: theme.textTheme.labelMedium?.copyWith(
                                        color: theme.colorScheme.primary,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const SizedBox(width: 4),
                                    Icon(
                                      CupertinoIcons.chevron_down,
                                      size: 14,
                                      color: theme.colorScheme.primary,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                        ],
                      ),
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
  ),
);
  }
}
