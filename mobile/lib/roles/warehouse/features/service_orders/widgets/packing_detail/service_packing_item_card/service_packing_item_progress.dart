import 'dart:math';
import 'package:flutter/material.dart';

class ServicePackingItemProgress extends StatelessWidget {
  final int packedQuantity;
  final int totalQuantity;

  const ServicePackingItemProgress({
    super.key,
    required this.packedQuantity,
    required this.totalQuantity,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final progress = totalQuantity > 0 ? packedQuantity / totalQuantity : 0.0;
    final isPacked = packedQuantity == totalQuantity;

    final ringColor = isPacked ? const Color(0xFF34C759) : theme.colorScheme.primary;

    return SizedBox(
      width: 52,
      height: 52,
      child: CustomPaint(
        painter: _ItemProgressRingPainter(
          progress: progress,
          ringColor: ringColor,
          isPacked: isPacked,
          theme: theme,
        ),
        child: Center(
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOutCubic,
            style: TextStyle(
              fontSize: isPacked ? 10 : 11,
              fontWeight: FontWeight.w800,
              color: ringColor,
              height: 1.0,
            ),
            child: Text(
              '$packedQuantity/$totalQuantity',
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }
}

class _ItemProgressRingPainter extends CustomPainter {
  final double progress;
  final Color ringColor;
  final bool isPacked;
  final ThemeData theme;

  _ItemProgressRingPainter({
    required this.progress,
    required this.ringColor,
    required this.isPacked,
    required this.theme,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (size.width / 2) - 4;
    const strokeWidth = 2.5;

    canvas.drawCircle(
      center,
      radius,
      Paint()
        ..color = theme.colorScheme.onSurface.withValues(alpha: 0.06)
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.butt,
    );

    if (progress <= 0) return;

    if (isPacked) {
      canvas.drawCircle(
        center,
        radius,
        Paint()
          ..color = const Color(0xFF34C759).withValues(alpha: 0.2)
          ..style = PaintingStyle.stroke
          ..strokeWidth = strokeWidth + 3
          ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3),
      );
      canvas.drawCircle(
        center,
        radius,
        Paint()
          ..color = ringColor
          ..style = PaintingStyle.stroke
          ..strokeWidth = strokeWidth
          ..strokeCap = StrokeCap.butt,
      );
    } else {
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        -pi / 2,
        2 * pi * progress,
        false,
        Paint()
          ..color = ringColor
          ..style = PaintingStyle.stroke
          ..strokeWidth = strokeWidth
          ..strokeCap = StrokeCap.round,
      );
    }
  }

  @override
  bool shouldRepaint(_ItemProgressRingPainter old) =>
      old.progress != progress || old.isPacked != isPacked;
}
