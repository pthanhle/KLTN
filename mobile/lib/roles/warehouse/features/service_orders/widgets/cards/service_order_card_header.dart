import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/cupertino.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';

class ServiceOrderCardHeader extends StatelessWidget {
  final String licensePlate;
  final String vehicleModel;
  final OrderPriority priority;

  const ServiceOrderCardHeader({
    super.key,
    required this.licensePlate,
    required this.vehicleModel,
    required this.priority,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUrgent = priority == OrderPriority.urgent;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Row(
            children: [
              Text(
                licensePlate,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(width: 8),
              ClipSmoothRect(
                radius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: ShapeDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.06),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
                        side: BorderSide(color: Colors.white.withValues(alpha: 0.15), width: 0.5),
                      ),
                    ),
                    child: Text(
                      vehicleModel,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        if (isUrgent)
          ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: ShapeDecoration(
                  color: theme.colorScheme.error.withValues(alpha: 0.15),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                    side: BorderSide(color: theme.colorScheme.error.withValues(alpha: 0.3), width: 0.5),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 6,
                      height: 6,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.error,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      'Gấp'.tr(),
                      style: theme.textTheme.labelSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.error,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }
}
