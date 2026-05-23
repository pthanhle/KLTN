import 'dart:math';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:go_router/go_router.dart';

class PackingGlassHeader extends StatelessWidget {
  final int pickedItems;
  final int totalItems;

  const PackingGlassHeader({
    super.key,
    required this.pickedItems,
    required this.totalItems,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final progress = totalItems > 0 ? pickedItems / totalItems : 0.0;

    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
        child: Container(
          color: theme.colorScheme.surface.withValues(alpha: 0.6),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () => context.pop(),
                child: ClipOval(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                    child: Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: theme.brightness == Brightness.dark
                            ? Colors.white.withValues(alpha: 0.12)
                            : Colors.black.withValues(alpha: 0.06),
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.4),
                          width: 0.5,
                        ),
                      ),
                      child: Icon(
                        CupertinoIcons.back,
                        color: theme.colorScheme.primary,
                        size: 20,
                      ),
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Text(
                  'Chi tiết Nhặt hàng'.tr(),
                  textAlign: TextAlign.center,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.5,
                  ),
                ),
              ),
              SizedBox(
                width: 44,
                height: 44,
                child: CustomPaint(
                  painter: _ProgressRingPainter(
                    progress: progress,
                    theme: theme,
                  ),
                  child: Center(
                    child: Text(
                      '$pickedItems',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: _ringColor(progress, theme),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Color _ringColor(double progress, ThemeData theme) {
    if (progress >= 1.0) return const Color(0xFF34C759);
    if (progress >= 0.5) return const Color(0xFFFF9500);
    return theme.colorScheme.error;
  }
}

class _ProgressRingPainter extends CustomPainter {
  final double progress;
  final ThemeData theme;

  _ProgressRingPainter({required this.progress, required this.theme});

  List<Color> get _colors {
    if (progress >= 1.0) return [const Color(0xFF30B0C7), const Color(0xFF34C759)];
    if (progress >= 0.5) return [const Color(0xFFFF9500), const Color(0xFFFFCC00)];
    return [theme.colorScheme.error, const Color(0xFFFF9500)];
  }

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width / 2) - 5;
    const strokeWidth = 3.0;

    final trackPaint = Paint()
      ..color = theme.colorScheme.onSurface.withValues(alpha: 0.08)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.butt;

    canvas.drawCircle(center, radius, trackPaint);

    if (progress <= 0) return;

    final colors = _colors;

    final glowPaint = Paint()
      ..color = colors.last.withValues(alpha: 0.25)
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth + 3
      ..strokeCap = StrokeCap.butt
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);

    if (progress >= 1.0) {
      canvas.drawCircle(center, radius, glowPaint);
    } else {
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        -pi / 2,
        2 * pi * progress,
        false,
        glowPaint,
      );
    }

    final sweepGradient = SweepGradient(
      startAngle: -pi / 2,
      endAngle: -pi / 2 + 2 * pi,
      colors: colors,
      stops: const [0.0, 1.0],
    );

    final foregroundPaint = Paint()
      ..shader = sweepGradient.createShader(
        Rect.fromCircle(center: center, radius: radius),
      )
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    if (progress >= 1.0) {
      final solidPaint = Paint()
        ..color = colors.last
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.butt;
      canvas.drawCircle(center, radius, solidPaint);
    } else {
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        -pi / 2,
        2 * pi * progress,
        false,
        foregroundPaint,
      );

      final dotAngle = -pi / 2 + 2 * pi * progress;
      final dotOffset = Offset(
        center.dx + radius * cos(dotAngle),
        center.dy + radius * sin(dotAngle),
      );
      canvas.drawCircle(
        dotOffset,
        2.5,
        Paint()..color = Colors.white.withValues(alpha: 0.8),
      );
    }
  }

  @override
  bool shouldRepaint(_ProgressRingPainter old) => old.progress != progress;
}
