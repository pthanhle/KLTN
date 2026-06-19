import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../constants/contract_status_constants.dart';

class ContractStatusBadge extends StatelessWidget {
  final String status;

  const ContractStatusBadge({super.key, required this.status});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final config = ContractStatusConstants.getStatusConfig(status);

    return Container(
      decoration: ShapeDecoration(
        color: config.color.withValues(alpha: isDark ? 0.15 : 0.1),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
          side: BorderSide(
            color: config.color.withValues(alpha: isDark ? 0.4 : 0.3),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            child: Row(
              mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 6,
                height: 6,
                decoration: BoxDecoration(
                  color: config.color,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: config.color.withValues(alpha: 0.4),
                      blurRadius: 4,
                    )
                  ],
                ),
              ),
              const SizedBox(width: 6),
              Text(
                config.labelKey.tr(),
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: config.color.withValues(alpha: isDark ? 1.0 : 0.8),
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
