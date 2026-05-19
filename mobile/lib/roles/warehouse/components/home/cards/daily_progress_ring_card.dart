import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class DailyProgressRingCard extends StatefulWidget {
  final int completed;
  final int totalTarget;

  const DailyProgressRingCard({
    super.key,
    required this.completed,
    required this.totalTarget,
  });

  @override
  State<DailyProgressRingCard> createState() => _DailyProgressRingCardState();
}

class _DailyProgressRingCardState extends State<DailyProgressRingCard> with SingleTickerProviderStateMixin {
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
  void didUpdateWidget(covariant DailyProgressRingCard oldWidget) {
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
    final primaryColor = theme.colorScheme.primary;
    final isDark = theme.brightness == Brightness.dark;

    return ClipSmoothRect(
      radius: SmoothBorderRadius(
        cornerRadius: 32,
        cornerSmoothing: 1.0,
      ),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.white.withValues(alpha: 0.3),
            border: Border.all(
              color: isDark ? Colors.white.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.6),
              width: 1,
            ),
          ),
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Positioned(
                top: -50,
                right: -50,
                child: Container(
                  width: 150,
                  height: 150,
                  decoration: BoxDecoration(
                    color: primaryColor.withValues(alpha: 0.2),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: primaryColor.withValues(alpha: 0.3),
                        blurRadius: 40,
                        spreadRadius: 20,
                      )
                    ]
                  ),
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Tiến độ ca trực'.tr(),
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w600,
                      color: isDark ? Colors.white : Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Center(
                    child: SizedBox(
                      width: 160,
                      height: 160,
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          // Background Ring
                          SizedBox(
                            width: 160,
                            height: 160,
                            child: CircularProgressIndicator(
                              value: 1.0,
                              strokeWidth: 10,
                              color: isDark ? Colors.white.withValues(alpha: 0.1) : Colors.black.withValues(alpha: 0.05),
                            ),
                          ),
                          // Animated Foreground Ring
                          SizedBox(
                            width: 160,
                            height: 160,
                            child: AnimatedBuilder(
                              animation: _animation,
                              builder: (context, child) {
                                return CircularProgressIndicator(
                                  value: _animation.value,
                                  strokeWidth: 10,
                                  strokeCap: StrokeCap.round,
                                  color: theme.colorScheme.primaryContainer,
                                );
                              }
                            ),
                          ),
                          // Percentage Text
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
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text(
                            'Đã đóng gói'.tr(),
                            style: TextStyle(
                              fontSize: 15,
                              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.9),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${widget.completed}',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w600,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        width: 1,
                        height: 32,
                        color: isDark ? Colors.white.withValues(alpha: 0.2) : Colors.black.withValues(alpha: 0.1),
                      ),
                      Column(
                        children: [
                          Text(
                            'Tổng chỉ tiêu'.tr(),
                            style: TextStyle(
                              fontSize: 15,
                              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.9),
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${widget.totalTarget}',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w600,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
