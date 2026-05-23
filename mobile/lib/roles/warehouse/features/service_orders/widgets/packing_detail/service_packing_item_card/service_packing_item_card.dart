import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/service_order_model.dart';
import '../modals/service_report_modal/service_report_modal.dart';
import 'service_packing_item_actions.dart';
import 'service_packing_item_animated_container.dart';
import 'service_packing_item_info.dart';
import 'service_packing_item_progress.dart';

class ServicePackingItemCard extends StatelessWidget {
  final ServicePartItem item;
  final int packedQuantity;
  final VoidCallback onIncrement;
  final VoidCallback onPackAll;
  final VoidCallback onUndo;

  const ServicePackingItemCard({
    super.key,
    required this.item,
    required this.packedQuantity,
    required this.onIncrement,
    required this.onPackAll,
    required this.onUndo,
  });

  @override
  Widget build(BuildContext context) {
    final isPacked = packedQuantity == item.quantity;
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Slidable(
        key: ValueKey(item.partId),
        startActionPane: ActionPane(
          motion: const BehindMotion(),
          extentRatio: 0.28,
          openThreshold: 0.2,
          closeThreshold: 0.1,
          dragDismissible: false,
          children: ServicePackingItemActions.buildStartActions(context, () {
            HapticFeedback.mediumImpact();
            onPackAll();
          }),
        ),
        endActionPane: ActionPane(
          motion: const BehindMotion(),
          extentRatio: 0.28,
          openThreshold: 0.2,
          closeThreshold: 0.1,
          dragDismissible: false,
          children: ServicePackingItemActions.buildEndActions(context, () {
            HapticFeedback.mediumImpact();
            onUndo();
          }),
        ),
        child: GestureDetector(
          onTap: () {
            if (!isPacked) {
              HapticFeedback.selectionClick();
              onIncrement();
            } else {
              HapticFeedback.heavyImpact();
              onUndo();
            }
          },
          onLongPress: () {
            HapticFeedback.mediumImpact();
            _showContextMenu(context, isPacked);
          },
          behavior: HitTestBehavior.opaque,
          child: ServicePackingItemAnimatedContainer(
            isPacked: isPacked,
            child: Row(
              children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: ShapeDecoration(
                    color: theme.brightness == Brightness.dark
                        ? Colors.white.withValues(alpha: 0.06)
                        : Colors.black.withValues(alpha: 0.04),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 14,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: 0.2),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: Icon(
                    CupertinoIcons.cube_box,
                    size: 24,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ServicePackingItemInfo(
                    item: item,
                    isPacked: isPacked,
                  ),
                ),
                const SizedBox(width: 12),
                ServicePackingItemProgress(
                  packedQuantity: packedQuantity,
                  totalQuantity: item.quantity,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _showContextMenu(BuildContext context, bool isPacked) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet<void>(
      context: context,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      elevation: 0,
      isScrollControlled: true,
      builder: (ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;
        final appleRed = isDark ? const Color(0xFFFF453A) : const Color(0xFFFF3B30);
        final appleOrange = isDark ? const Color(0xFFFF9F0A) : const Color(0xFFFF9500);

        Widget glassBlock({required Widget child}) {
          return Container(
            width: double.infinity,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.65),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.8),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.06),
                  blurRadius: 20,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: child,
              ),
            ),
          );
        }

        Widget divider() => Container(
              height: 0.5,
              color: theme.dividerColor.withValues(alpha: 0.15),
            );

        Widget actionRow({
          required String label,
          required Color color,
          required VoidCallback onTap,
        }) =>
            GestureDetector(
              onTap: () {
                Navigator.pop(ctx);
                onTap();
              },
              behavior: HitTestBehavior.opaque,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 17),
                color: Colors.transparent,
                child: Text(
                  label,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: color,
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.3,
                  ),
                ),
              ),
            );

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                glassBlock(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                        child: Column(
                          children: [
                            Text(
                              item.name,
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                                letterSpacing: -0.5,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              'SKU: ${item.sku}',
                              style: TextStyle(
                                color: theme.colorScheme.onSurfaceVariant,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),
                      divider(),
                      if (!isPacked)
                        actionRow(
                          label: 'Nhặt đủ',
                          color: const Color(0xFF34C759),
                          onTap: () {
                            HapticFeedback.mediumImpact();
                            onPackAll();
                          },
                        ),
                      if (!isPacked) divider(),
                      actionRow(
                        label: 'Báo lỗi / Thiếu hàng',
                        color: appleOrange,
                        onTap: () {
                          HapticFeedback.heavyImpact();
                          ServiceReportModal.show(context, item);
                        },
                      ),
                      if (packedQuantity > 0) divider(),
                      if (packedQuantity > 0)
                        actionRow(
                          label: 'Hoàn tác',
                          color: appleRed,
                          onTap: () {
                            HapticFeedback.mediumImpact();
                            onUndo();
                          },
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                glassBlock(
                  child: GestureDetector(
                    onTap: () => Navigator.pop(ctx),
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 17),
                      color: Colors.transparent,
                      child: Text(
                        'Huỷ',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.3,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
        );
      },
    );
  }
}
