import 'dart:math';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class AnimatedProgressRing extends StatefulWidget {
  final int completed;
  final int totalTarget;

  const AnimatedProgressRing({
    super.key,
    required this.completed,
    required this.totalTarget,
  });

  @override
  State<AnimatedProgressRing> createState() => _AnimatedProgressRingState();
}

class _AnimatedProgressRingState extends State<AnimatedProgressRing> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    double targetRatio = widget.totalTarget > 0 ? widget.completed / widget.totalTarget : 0;
    
    _animation = Tween<double>(begin: 0, end: targetRatio).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );

    _controller.forward();
  }
  
  @override
  void didUpdateWidget(covariant AnimatedProgressRing oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.completed != widget.completed || oldWidget.totalTarget != widget.totalTarget) {
      double targetRatio = widget.totalTarget > 0 ? widget.completed / widget.totalTarget : 0;
      _animation = Tween<double>(begin: _animation.value, end: targetRatio).animate(
        CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
      );
      _controller.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return SizedBox(
      width: 160,
      height: 160,
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 160,
            height: 160,
            child: AnimatedBuilder(
              animation: _animation,
              builder: (context, child) {
                return CustomPaint(
                  painter: _AppleRingPainter(
                    progress: _animation.value,
                    isDark: isDark,
                  ),
                );
              }
            ),
          ),
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    '${(_animation.value * 100).toInt()}%',
                    style: TextStyle(
                      fontSize: 34,
                      fontWeight: FontWeight.w700,
                      color: isDark ? Colors.white : Colors.black87,
                      letterSpacing: -1,
                    ),
                  ),
                  Text(
                    'Hoàn thành'.tr(),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                      letterSpacing: 0.5,
                    ),
                  ),
                ],
              );
            }
          ),
        ],
      ),
    );
  }
}

class _AppleRingPainter extends CustomPainter {
  final double progress;
  final bool isDark;

  _AppleRingPainter({
    required this.progress,
    required this.isDark,
  });

  List<Color> _getGradientColors(double value) {
    if (value < 0.5) {
      return [const Color(0xFFFF3B30), const Color(0xFFFF9500)]; 
    } else if (value < 0.8) {
      return [const Color(0xFFFF9500), const Color(0xFFFFCC00)]; 
    } else {
      return [const Color(0xFF30B0C7), const Color(0xFF34C759)]; 
    }
  }

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = min(size.width / 2, size.height / 2) - 6;
    
    final bgPaint = Paint()
      ..color = isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.05)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 12
      ..strokeCap = StrokeCap.round;
      
    canvas.drawCircle(center, radius, bgPaint);

    if (progress > 0) {
      final sweepAngle = 2 * pi * progress;
      final startAngle = -pi / 2;
      
      final rect = Rect.fromCircle(center: center, radius: radius);
      
      final gradient = SweepGradient(
        colors: _getGradientColors(progress),
        stops: const [0.0, 1.0],
        transform: GradientRotation(startAngle),
      );

      final glowPaint = Paint()
        ..shader = gradient.createShader(rect)
        ..color = Colors.white.withValues(alpha: 0.4) // Fallback
        ..style = PaintingStyle.stroke
        ..strokeWidth = 22
        ..strokeCap = StrokeCap.round
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 12.0);
        
      canvas.drawArc(rect, startAngle, sweepAngle, false, glowPaint);

      final fgPaint = Paint()
        ..shader = gradient.createShader(rect)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 12
        ..strokeCap = StrokeCap.round;

      canvas.drawArc(rect, startAngle, sweepAngle, false, fgPaint);
      
      if (progress > 0.02 && progress < 1.0) {
        final endX = center.dx + radius * cos(startAngle + sweepAngle);
        final endY = center.dy + radius * sin(startAngle + sweepAngle);
        
        final dotPaint = Paint()
          ..color = Colors.white.withValues(alpha: 0.8)
          ..style = PaintingStyle.fill;
          
        canvas.drawCircle(Offset(endX, endY), 2.5, dotPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _AppleRingPainter oldDelegate) {
    return oldDelegate.progress != progress || oldDelegate.isDark != isDark;
  }
}
