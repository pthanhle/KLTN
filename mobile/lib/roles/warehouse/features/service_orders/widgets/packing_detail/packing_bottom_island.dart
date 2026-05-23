import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:ui';
import 'package:easy_localization/easy_localization.dart';
import 'liquid_progress_bar.dart';

class PackingBottomIsland extends StatelessWidget {
  final String orderId;
  final int totalItems;
  final int pickedItems;
  final bool isSubmitting;
  final VoidCallback onHandover;

  const PackingBottomIsland({
    super.key,
    required this.orderId,
    required this.totalItems,
    required this.pickedItems,
    required this.isSubmitting,
    required this.onHandover,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final progress = totalItems > 0 ? pickedItems / totalItems : 0.0;
    final isReady = pickedItems == totalItems && totalItems > 0;

    return Padding(
      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 32),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(32),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.surface.withValues(alpha: 0.8),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.1),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Tiến độ nhặt hàng'.tr(),
                            style: theme.textTheme.bodySmall?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Text(
                            '$pickedItems/$totalItems',
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: theme.colorScheme.primary,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      LiquidProgressBar(progress: progress),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                
                SizedBox(
                  width: double.infinity,
                  height: 48,
                  child: CupertinoButton(
                    padding: EdgeInsets.zero,
                    color: isReady ? theme.colorScheme.primary : theme.colorScheme.surfaceContainerHighest,
                    borderRadius: BorderRadius.circular(24),
                    onPressed: isReady && !isSubmitting ? onHandover : null,
                    child: isSubmitting
                        ? const CupertinoActivityIndicator(color: Colors.white)
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                CupertinoIcons.wrench_fill,
                                size: 20,
                                color: isReady ? theme.colorScheme.onPrimary : theme.colorScheme.onSurfaceVariant,
                              ),
                              const SizedBox(width: 8),
                              Text(
                                'Giao cho KTV'.tr(),
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: isReady ? theme.colorScheme.onPrimary : theme.colorScheme.onSurfaceVariant,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
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
