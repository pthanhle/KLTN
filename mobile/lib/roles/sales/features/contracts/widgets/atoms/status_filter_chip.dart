import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';

class StatusFilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const StatusFilterChip({
    super.key,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  ImageFilter _buildLensFilter(double w, double h) {
    const scale = 1.06;
    final m = Matrix4.identity()
      ..translate(w / 2, h / 2)
      ..scale(scale, scale)
      ..translate(-w / 2, -h / 2);

    return ImageFilter.compose(
      outer: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
      inner: ImageFilter.matrix(m.storage, filterQuality: FilterQuality.high),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: LayoutBuilder(
        builder: (context, constraints) {
          final w = constraints.maxWidth > 0 ? constraints.maxWidth : 100.0; // fallback
          final h = 36.0;

          if (isSelected) {
            return Container(
              height: h,
              decoration: ShapeDecoration(
                color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.18),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: isDark ? 0.50 : 0.90),
                    width: 0.8,
                  ),
                ),
                shadows: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.06),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  )
                ],
              ),
              child: ClipSmoothRect(
                radius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: BackdropFilter(
                        filter: _buildLensFilter(w, h),
                        child: const SizedBox.expand(),
                      ),
                    ),
                    Positioned(
                      top: 0,
                      left: 0,
                      right: 0,
                      height: h * 0.40,
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              Colors.white.withValues(alpha: isDark ? 0.28 : 0.55),
                              Colors.transparent
                            ],
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Center(
                        child: Text(
                          label,
                          style: TextStyle(
                            color: theme.colorScheme.onSurface.withValues(alpha: 0.75),
                            fontWeight: FontWeight.w700,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }

          // Unselected State
          return Container(
            height: h,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            decoration: ShapeDecoration(
              color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.03),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
              ),
            ),
            child: Center(
              child: Text(
                label,
                style: TextStyle(
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.45),
                  fontWeight: FontWeight.w500,
                  fontSize: 14,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
