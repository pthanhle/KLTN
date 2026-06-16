import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';
import '../../../models/vehicle_unit_model.dart';
import 'vehicle_unit_card/vehicle_card_header.dart';
import 'vehicle_unit_card/vehicle_card_specs.dart';

class VehicleUnitCard extends StatefulWidget {
  final VehicleUnitModel unit;
  final bool isSelected;
  final VoidCallback onTap;

  const VehicleUnitCard({
    super.key,
    required this.unit,
    required this.isSelected,
    required this.onTap,
  });

  @override
  State<VehicleUnitCard> createState() => _VehicleUnitCardState();
}

class _VehicleUnitCardState extends State<VehicleUnitCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTapDown: (_) {
        HapticFeedback.selectionClick();
        setState(() => _isPressed = true);
      },
      onTapUp: (_) {
        HapticFeedback.lightImpact();
        setState(() => _isPressed = false);
        widget.onTap();
      },
      onTapCancel: () {
        setState(() => _isPressed = false);
      },
      child: Container(
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: widget.isSelected ? 0.08 : 0.04)
              : Colors.white.withValues(alpha: widget.isSelected ? 0.8 : 0.4),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 24,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: widget.isSelected
                  ? theme.colorScheme.primary
                  : Colors.white.withValues(alpha: isDark ? 0.15 : 0.6),
              width: widget.isSelected ? 2.0 : 0.5,
            ),
          ),
          shadows: [
            if (widget.isSelected)
              BoxShadow(
                color: theme.colorScheme.primary.withValues(alpha: 0.3),
                blurRadius: 16,
                spreadRadius: 2,
              ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  VehicleCardHeader(unit: widget.unit),
                  const SizedBox(height: 12),
                  VehicleCardSpecs(unit: widget.unit),
                ],
              ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.97, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
