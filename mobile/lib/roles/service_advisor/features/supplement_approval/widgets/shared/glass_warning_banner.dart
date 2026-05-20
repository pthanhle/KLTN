import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/supplement_constants.dart';

class GlassWarningBanner extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const GlassWarningBanner({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    // errorContainer equivalent with opacity
    final bgColor = isDark 
        ? theme.colorScheme.errorContainer.withValues(alpha: 0.3)
        : theme.colorScheme.errorContainer.withValues(alpha: 0.7);

    return Container(
      decoration: ShapeDecoration(
        color: bgColor,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: SupplementConstants.cardRadius,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.5),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: theme.colorScheme.error.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: SupplementConstants.cardRadius,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: SupplementConstants.glassBlurSigma, sigmaY: SupplementConstants.glassBlurSigma),
          child: Padding(
            padding: const EdgeInsets.all(SupplementConstants.cardPadding),
            child: Row(
              children: [
                // Pulse Animation on Icon
                TweenAnimationBuilder<double>(
                  tween: Tween(begin: 0.8, end: 1.2),
                  duration: SupplementConstants.pulseDuration,
                  curve: Curves.easeInOutSine,
                  builder: (context, value, child) {
                    return Transform.scale(
                      scale: value,
                      child: child,
                    );
                  },
                  child: Icon(
                    icon,
                    color: theme.colorScheme.error,
                    size: 32,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: theme.colorScheme.error,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        subtitle,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.error.withValues(alpha: 0.8),
                        ),
                      ),
                    ],
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
