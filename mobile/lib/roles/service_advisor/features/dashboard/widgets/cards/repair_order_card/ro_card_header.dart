import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/repair_order_model.dart';

class ROCardHeader extends StatelessWidget {
  final VehicleInfo vehicleInfo;
  final String serviceType;
  final String bookingCode;
  final int? sequenceNumber;

  const ROCardHeader({
    super.key,
    required this.vehicleInfo,
    required this.serviceType,
    this.bookingCode = '',
    this.sequenceNumber,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      vehicleInfo.licensePlate,
                      style: theme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ),
                  if (sequenceNumber != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.6),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: theme.colorScheme.primary.withValues(alpha: 0.25),
                          width: 0.5,
                        ),
                      ),
                      child: Text(
                        '#$sequenceNumber',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.primary,
                          letterSpacing: 0.3,
                        ),
                      ),
                    ),
                ],
              ),
              if (vehicleInfo.model.isNotEmpty) ...[
                const SizedBox(height: 2),
                Text(
                  vehicleInfo.model,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
              if (bookingCode.isNotEmpty) ...[
                const SizedBox(height: 4),
                Text(
                  bookingCode,
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ],
          ),
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: ShapeDecoration(
            color: theme.colorScheme.tertiary.withValues(alpha: 0.1),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 12,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: theme.colorScheme.tertiary.withValues(alpha: 0.2),
                width: 0.5,
              ),
            ),
          ),
          child: Text(
            serviceType,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.5,
              color: isDark ? theme.colorScheme.tertiaryFixed : theme.colorScheme.tertiary,
            ),
          ),
        ),
      ],
    );
  }
}
