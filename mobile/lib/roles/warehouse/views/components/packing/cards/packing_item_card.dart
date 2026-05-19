import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../models/warehouse_order_model.dart';
import '../placeholders/packing_image_placeholder.dart';

class PackingItemCard extends StatelessWidget {
  final WarehouseOrderItemModel item;
  final int packedQuantity;
  final VoidCallback onIncrement;
  final VoidCallback onPackAll;
  final VoidCallback onUndo;

  const PackingItemCard({
    super.key,
    required this.item,
    required this.packedQuantity,
    required this.onIncrement,
    required this.onPackAll,
    required this.onUndo,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isPacked = packedQuantity == item.quantity;
    final progress = packedQuantity / item.quantity;

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Slidable(
        key: ValueKey(item.partId),
        startActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.3,
          children: [
            CustomSlidableAction(
              onPressed: (_) {
                HapticFeedback.heavyImpact();
                onPackAll();
              },
              backgroundColor: Colors.transparent,
              padding: const EdgeInsets.only(right: 8),
              child: ClipSmoothRect(
                radius: SmoothBorderRadius(
                  cornerRadius: 16,
                  cornerSmoothing: 1.0,
                ),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: ShapeDecoration(
                      color: CupertinoColors.activeGreen.withValues(alpha: 0.25),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 16,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(CupertinoIcons.check_mark_circled_solid, color: CupertinoColors.activeGreen, size: 28),
                        const SizedBox(height: 4),
                        Text(
                          'Nhặt đủ'.tr(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: CupertinoColors.activeGreen,
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
        endActionPane: ActionPane(
          motion: const StretchMotion(),
          extentRatio: 0.25,
          children: [
            CustomSlidableAction(
              onPressed: (_) {
                HapticFeedback.mediumImpact();
                onUndo();
              },
              backgroundColor: Colors.transparent,
              padding: const EdgeInsets.only(left: 8),
              child: ClipSmoothRect(
                radius: SmoothBorderRadius(
                  cornerRadius: 16,
                  cornerSmoothing: 1.0,
                ),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: ShapeDecoration(
                      color: CupertinoColors.destructiveRed.withValues(alpha: 0.25),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 16,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(CupertinoIcons.arrow_counterclockwise, color: CupertinoColors.destructiveRed, size: 28),
                        const SizedBox(height: 4),
                        Text(
                          'Hoàn tác'.tr(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: CupertinoColors.destructiveRed,
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
          behavior: HitTestBehavior.opaque,
          child: TweenAnimationBuilder<double>(
            tween: Tween<double>(begin: 0.0, end: isPacked ? 1.0 : 0.0),
            duration: const Duration(milliseconds: 300),
            curve: Curves.fastLinearToSlowEaseIn,
            builder: (context, value, child) {
              final baseColor = Colors.white.withValues(alpha: isDark ? 0.05 : 0.2);
              final packedColor = theme.colorScheme.primary.withValues(alpha: 0.15);
              final currentColor = Color.lerp(baseColor, packedColor, value)!;
              
              final baseBorderColor = Colors.white.withValues(alpha: 0.3);
              final packedBorderColor = theme.colorScheme.primary.withValues(alpha: 0.5);
              final currentBorderColor = Color.lerp(baseBorderColor, packedBorderColor, value)!;

              return Container(
                decoration: ShapeDecoration(
                  shadows: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 2),
                    ),
                  ],
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 16,
                      cornerSmoothing: 1.0,
                    ),
                  ),
                ),
                child: ClipSmoothRect(
                  radius: SmoothBorderRadius(
                    cornerRadius: 16,
                    cornerSmoothing: 1.0,
                  ),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: ShapeDecoration(
                        color: currentColor,
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 16,
                            cornerSmoothing: 1.0,
                          ),
                          side: BorderSide(
                            color: currentBorderColor,
                            width: 0.5,
                          ),
                        ),
                      ),
                      child: Row(
                        children: [
                          ClipSmoothRect(
                            radius: SmoothBorderRadius(
                              cornerRadius: 12,
                              cornerSmoothing: 1.0,
                            ),
                            child: item.image != null
                                ? Image.network(
                                    item.image!,
                                    width: 80,
                                    height: 80,
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, __, ___) => const PackingImagePlaceholder(size: 80),
                                  )
                                : const PackingImagePlaceholder(size: 80),
                          ),
                          const SizedBox(width: 16),
                          
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  item.name,
                                  style: theme.textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.w600,
                                    decoration: isPacked ? TextDecoration.lineThrough : null,
                                    color: isPacked ? theme.colorScheme.onSurface.withValues(alpha: 0.6) : theme.colorScheme.onSurface,
                                  ),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                if (item.properties != null && item.properties!.isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text(
                                    item.properties!,
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      color: theme.colorScheme.onSurfaceVariant,
                                    ),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                                const SizedBox(height: 4),
                                Text(
                                  'SKU: ${item.sku}',
                                  style: theme.textTheme.labelSmall?.copyWith(
                                    fontFamily: 'monospace',
                                    color: theme.colorScheme.outline,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),
                          
                          Stack(
                            alignment: Alignment.center,
                            children: [
                              SizedBox(
                                width: 56,
                                height: 56,
                                child: CircularProgressIndicator(
                                  value: progress,
                                  strokeWidth: 3,
                                  backgroundColor: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    isPacked ? theme.colorScheme.primary : theme.colorScheme.secondary,
                                  ),
                                ),
                              ),
                              Container(
                                width: 48,
                                height: 48,
                                decoration: BoxDecoration(
                                  color: isPacked 
                                      ? theme.colorScheme.primary 
                                      : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.8),
                                  shape: BoxShape.circle,
                                ),
                                alignment: Alignment.center,
                                child: Text(
                                  '$packedQuantity',
                                  style: theme.textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.bold,
                                    color: isPacked ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
