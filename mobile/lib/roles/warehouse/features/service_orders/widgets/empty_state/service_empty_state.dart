import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

enum ServiceEmptyStateType { pendingPick, readyForHandover }

class ServiceEmptyState extends StatelessWidget {
  final ServiceEmptyStateType type;

  const ServiceEmptyState({
    super.key,
    this.type = ServiceEmptyStateType.pendingPick,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final isPending = type == ServiceEmptyStateType.pendingPick;

    final icon = isPending
        ? CupertinoIcons.checkmark_seal_fill
        : CupertinoIcons.cube_box_fill;

    final iconColor = isPending
        ? const Color(0xFF34C759)
        : theme.colorScheme.primary;

    final title = isPending
        ? 'Không có lệnh chờ nhặt!'.tr()
        : 'Chưa có lệnh sẵn sàng!'.tr();

    final subtitle = isPending
        ? 'Tất cả linh kiện đã được nhặt đầy đủ.'.tr()
        : 'Chưa có đơn nào hoàn tất nhặt hàng và chờ bàn giao KTV.'.tr();

    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 88,
              height: 88,
              decoration: ShapeDecoration(
                color: isDark
                    ? iconColor.withValues(alpha: 0.12)
                    : iconColor.withValues(alpha: 0.10),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 26,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: iconColor.withValues(alpha: isDark ? 0.25 : 0.20),
                    width: 1.0,
                  ),
                ),
                shadows: [
                  BoxShadow(
                    color: iconColor.withValues(alpha: 0.12),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: ClipSmoothRect(
                radius: SmoothBorderRadius(
                  cornerRadius: 26,
                  cornerSmoothing: 1.0,
                ),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                  child: Center(
                    child: Icon(
                      icon,
                      size: 40,
                      color: iconColor,
                    ),
                  ),
                ),
              ),
            )
                .animate(onPlay: (c) => c.repeat(reverse: true))
                .scaleXY(
                  begin: 1.0,
                  end: 1.04,
                  duration: 2800.ms,
                  curve: Curves.easeInOut,
                ),
            const SizedBox(height: 24),
            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
                letterSpacing: -0.5,
                color: theme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
            )
                .animate()
                .fadeIn(delay: 100.ms, duration: 400.ms, curve: Curves.easeOut)
                .slideY(begin: 0.1, end: 0),
            const SizedBox(height: 8),
            Text(
              subtitle,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            )
                .animate()
                .fadeIn(delay: 200.ms, duration: 400.ms, curve: Curves.easeOut)
                .slideY(begin: 0.1, end: 0),
          ],
        ),
      ),
    );
  }
}
