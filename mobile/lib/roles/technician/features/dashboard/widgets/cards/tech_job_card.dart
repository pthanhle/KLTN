import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/tech_job_model.dart';

class TechJobCard extends StatefulWidget {
  final TechJobModel job;
  final VoidCallback? onTap;

  const TechJobCard({
    super.key,
    required this.job,
    this.onTap,
  });

  @override
  State<TechJobCard> createState() => _TechJobCardState();
}

class _TechJobCardState extends State<TechJobCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.96).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails _) {
    HapticFeedback.lightImpact();
    _controller.forward();
  }

  void _onTapUp(TapUpDetails _) {
    _controller.reverse();
    widget.onTap?.call();
  }

  void _onTapCancel() => _controller.reverse();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final stageColor = Color(widget.job.stageColorHex);

    return ScaleTransition(
      scale: _scale,
      child: GestureDetector(
        onTapDown: _onTapDown,
        onTapUp: _onTapUp,
        onTapCancel: _onTapCancel,
        child: Container(
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.02)
                : Colors.white.withValues(alpha: 0.15),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.30),
                width: 0.5,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 30,
                offset: const Offset(0, 10),
              ),
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.02),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    _JobIconBadge(stageColor: stageColor),
                    const SizedBox(width: 14),
                    _JobInfo(job: widget.job),
                    _JobStageBadge(stage: widget.job.stage, stageColor: stageColor),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _JobIconBadge extends StatelessWidget {
  final Color stageColor;

  const _JobIconBadge({required this.stageColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 44,
      height: 44,
      decoration: ShapeDecoration(
        color: stageColor.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
        ),
      ),
      child: Icon(CupertinoIcons.car_detailed, color: stageColor, size: 22),
    );
  }
}

class _JobInfo extends StatelessWidget {
  final TechJobModel job;

  const _JobInfo({required this.job});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            job.plate,
            style: theme.textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: -0.3,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            job.model,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.70),
            ),
          ),
        ],
      ),
    );
  }
}

class _JobStageBadge extends StatelessWidget {
  final String stage;
  final Color stageColor;

  const _JobStageBadge({required this.stage, required this.stageColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: ShapeDecoration(
        color: stageColor.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
        ),
      ),
      child: Text(
        stage,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: stageColor,
        ),
      ),
    );
  }
}
