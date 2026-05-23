import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class LaborCategoryChip extends StatefulWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const LaborCategoryChip({
    super.key,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  State<LaborCategoryChip> createState() => _LaborCategoryChipState();
}

class _LaborCategoryChipState extends State<LaborCategoryChip> {
  bool _isPressed = false;

  ImageFilter _buildLensFilter(double w, double h) {
    const scale = 1.05;
    final m = Matrix4.identity()
      ..translate(w / 2, h / 2)
      ..scale(scale, scale)
      ..translate(-w / 2, -h / 2);
    return ImageFilter.compose(
      outer: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
      inner: ImageFilter.matrix(m.storage, filterQuality: FilterQuality.high),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isSelected = widget.isSelected;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        widget.onTap();
      },
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      behavior: HitTestBehavior.opaque,
      child: AnimatedScale(
        scale: _isPressed ? 0.94 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: isSelected
            ? _SelectedChip(
                label: widget.label,
                isDark: isDark,
                lensFilter: _buildLensFilter,
              )
            : _UnselectedChip(label: widget.label, isDark: isDark, theme: theme),
      ),
    );
  }
}

class _SelectedChip extends StatelessWidget {
  final String label;
  final bool isDark;
  final ImageFilter Function(double, double) lensFilter;

  const _SelectedChip({
    required this.label,
    required this.isDark,
    required this.lensFilter,
  });

  @override
  Widget build(BuildContext context) {
    const h = 34.0;

    return IntrinsicWidth(
      child: Container(
        height: h,
        decoration: ShapeDecoration(
          color: Colors.white.withValues(alpha: isDark ? 0.14 : 0.55),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.50 : 0.90),
              width: 0.8,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.20 : 0.06),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius:
              SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
          child: Stack(
            children: [
              Positioned.fill(
                child: LayoutBuilder(
                  builder: (_, c) => BackdropFilter(
                    filter: lensFilter(c.maxWidth, h),
                    child: const SizedBox.expand(),
                  ),
                ),
              ),
              Positioned(
                top: 0, left: 0, right: 0,
                height: h * 0.40,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withValues(alpha: isDark ? 0.30 : 0.60),
                        Colors.white.withValues(alpha: 0.0),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                child: Text(
                  label,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: isDark
                        ? Colors.white
                        : Colors.black.withValues(alpha: 0.75),
                    letterSpacing: -0.2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _UnselectedChip extends StatelessWidget {
  final String label;
  final bool isDark;
  final ThemeData theme;

  const _UnselectedChip({
    required this.label,
    required this.isDark,
    required this.theme,
  });

  @override
  Widget build(BuildContext context) {
    final textColor = isDark
        ? Colors.white.withValues(alpha: 0.55)
        : Colors.black.withValues(alpha: 0.45);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.07)
            : Colors.black.withValues(alpha: 0.04),
        shape: SmoothRectangleBorder(
          borderRadius:
              SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.45),
            width: 0.5,
          ),
        ),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: textColor,
          letterSpacing: 0,
        ),
      ),
    );
  }
}
