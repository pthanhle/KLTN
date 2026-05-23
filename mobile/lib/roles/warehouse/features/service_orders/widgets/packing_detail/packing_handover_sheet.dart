import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import 'slide_to_confirm_button.dart';

class PackingHandoverSheet extends StatelessWidget {
  final AssignedTechnician technician;
  final String licensePlate;
  final int totalParts;
  final Future<bool> Function() onConfirm;

  const PackingHandoverSheet({
    super.key,
    required this.technician,
    required this.licensePlate,
    required this.totalParts,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final fallbackAvatar =
        'https://ui-avatars.com/api/?name=${Uri.encodeComponent(technician.name)}&background=random';

    return Container(
      width: double.infinity,
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.04)
            : Colors.white.withValues(alpha: 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 40,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.8),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.35 : 0.10),
            blurRadius: 40,
            offset: const Offset(0, -12),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 40, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
          child: SafeArea(
            top: false,
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 48,
                    height: 5,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface
                          .withValues(alpha: 0.20),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 28),

                  Text(
                    'Bàn giao vật tư cho KTV'.tr(),
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.5,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 28),

                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: theme.colorScheme.primary
                                .withValues(alpha: 0.08),
                            width: 1,
                          ),
                        ),
                      )
                          .animate(onPlay: (c) => c.repeat(reverse: true))
                          .scaleXY(
                            begin: 1.0,
                            end: 1.04,
                            duration: 3.seconds,
                            curve: Curves.easeInOut,
                          ),
                      Container(
                        width: 120,
                        height: 120,
                        padding: const EdgeInsets.all(3),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [
                              theme.colorScheme.primary.withValues(alpha: 0.5),
                              theme.colorScheme.primary.withValues(alpha: 0.15),
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary
                                  .withValues(alpha: 0.25),
                              blurRadius: 32,
                            ),
                          ],
                        ),
                        child: Container(
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: isDark
                                  ? const Color(0xFF0F172A)
                                  : theme.colorScheme.surface,
                              width: 2,
                            ),
                            image: DecorationImage(
                              image: NetworkImage(
                                  technician.avatarUrl ?? fallbackAvatar),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  Text(
                    technician.name,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 8),

                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12, vertical: 5),
                    decoration: ShapeDecoration(
                      color: theme.colorScheme.primary.withValues(alpha: 0.12),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 12,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(
                          color: theme.colorScheme.primary
                              .withValues(alpha: 0.25),
                          width: 0.5,
                        ),
                      ),
                    ),
                    child: Text(
                      technician.bayNumber
                              .toLowerCase()
                              .contains('khoang')
                          ? technician.bayNumber
                          : '${'Khoang'.tr()} ${technician.bayNumber}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.2,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 12),
                    decoration: ShapeDecoration(
                      color: isDark
                          ? Colors.white.withValues(alpha: 0.04)
                          : Colors.black.withValues(alpha: 0.03),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 16,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(
                          color: Colors.white.withValues(alpha: 0.12),
                          width: 0.5,
                        ),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          CupertinoIcons.cube_box_fill,
                          size: 14,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          'Bàn giao {count} phụ tùng · {plate}'.tr(namedArgs: {
                            'count': totalParts.toString(),
                            'plate': licensePlate,
                          }),
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 28),

                  SlideToConfirmButton(
                    onConfirm: () async {
                      final success = await onConfirm();
                      if (success) {
                        await Future.delayed(
                            const Duration(milliseconds: 600));
                        if (context.mounted) Navigator.of(context).pop();
                      }
                      return success;
                    },
                  ),
                  const SizedBox(height: 12),

                  Container(
                    width: double.infinity,
                    decoration: ShapeDecoration(
                      color: isDark
                          ? Colors.white.withValues(alpha: 0.05)
                          : Colors.white.withValues(alpha: 0.65),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: 24,
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(
                          color: Colors.white
                              .withValues(alpha: isDark ? 0.15 : 0.8),
                          width: 0.5,
                        ),
                      ),
                      shadows: [
                        BoxShadow(
                          color: Colors.black
                              .withValues(alpha: isDark ? 0.25 : 0.05),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: ClipSmoothRect(
                      radius: SmoothBorderRadius(
                          cornerRadius: 24, cornerSmoothing: 1.0),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                        child: GestureDetector(
                          onTap: () {
                            HapticFeedback.lightImpact();
                            Navigator.of(context).pop();
                          },
                          behavior: HitTestBehavior.opaque,
                          child: Container(
                            width: double.infinity,
                            padding:
                                const EdgeInsets.symmetric(vertical: 17),
                            color: Colors.transparent,
                            child: Text(
                              'Huỷ'.tr(),
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
                    ),
                  ),
                  const SizedBox(height: 4),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
