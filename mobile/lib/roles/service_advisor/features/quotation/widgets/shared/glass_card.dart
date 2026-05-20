import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/quotation_constants.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry? margin;
  final double radius;
  final double blurSigma;
  final bool hasShadow;

  const GlassCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(QuotationConstants.cardPadding),
    this.margin,
    this.radius = QuotationConstants.radiusGlass,
    this.blurSigma = QuotationConstants.blurSigma,
    this.hasShadow = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: margin,
      decoration: ShapeDecoration(
        color: isDark 
            ? Colors.white.withValues(alpha: 0.05)
            : theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.6),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: radius,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.4),
            width: 1,
          ),
        ),
        shadows: hasShadow ? QuotationConstants.glassShadows : null,
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: radius, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blurSigma, sigmaY: blurSigma),
          child: Padding(
            padding: padding,
            child: child,
          ),
        ),
      ),
    );
  }
}
