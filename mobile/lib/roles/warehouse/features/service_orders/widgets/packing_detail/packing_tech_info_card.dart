import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';

class PackingTechInfoCard extends StatelessWidget {
  final AssignedTechnician technician;
  final String licensePlate;

  const PackingTechInfoCard({
    super.key,
    required this.technician,
    required this.licensePlate,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final fallbackAvatar =
        'https://ui-avatars.com/api/?name=${Uri.encodeComponent(technician.name)}';

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 24,
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
          cornerRadius: 24,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Stack(
            children: [
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                height: 32,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withValues(alpha: isDark ? 0.10 : 0.30),
                        Colors.white.withValues(alpha: 0.0),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.4),
                          width: 0.5,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.08),
                            blurRadius: 8,
                          ),
                        ],
                        image: DecorationImage(
                          image: NetworkImage(
                              technician.avatarUrl ?? fallbackAvatar),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            licensePlate,
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w700,
                              letterSpacing: -0.5,
                            ),
                          ),
                          Text(
                            'KTV: '.tr() + technician.name,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ),
                    ClipSmoothRect(
                      radius: SmoothBorderRadius(
                          cornerRadius: 10, cornerSmoothing: 1.0),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 8),
                          decoration: ShapeDecoration(
                            color: theme.colorScheme.primary
                                .withValues(alpha: 0.12),
                            shape: SmoothRectangleBorder(
                              borderRadius: SmoothBorderRadius(
                                  cornerRadius: 10, cornerSmoothing: 1.0),
                              side: BorderSide(
                                color: theme.colorScheme.primary
                                    .withValues(alpha: 0.25),
                                width: 0.5,
                              ),
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                CupertinoIcons.cube_box_fill,
                                size: 15,
                                color: theme.colorScheme.primary,
                              ),
                              const SizedBox(width: 5),
                              Text(
                                'Khoang'.tr() + ' ' + technician.bayNumber,
                                style: theme.textTheme.titleSmall?.copyWith(
                                  fontWeight: FontWeight.w700,
                                  color: theme.colorScheme.primary,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
