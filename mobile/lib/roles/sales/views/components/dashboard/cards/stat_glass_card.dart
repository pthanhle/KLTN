import 'dart:ui';
import 'package:flutter/material.dart';
import '../../../../../../shared/widgets/containers/glass_card.dart';

class StatGlassCard extends StatefulWidget {
  final String title;
  final String value;
  final Color glowColor;
  final Color valueColor;

  const StatGlassCard({
    super.key,
    required this.title,
    required this.value,
    required this.glowColor,
    required this.valueColor,
  });

  @override
  State<StatGlassCard> createState() => _StatGlassCardState();
}

class _StatGlassCardState extends State<StatGlassCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _isHovered = true),
      onTapUp: (_) => setState(() => _isHovered = false),
      onTapCancel: () => setState(() => _isHovered = false),
      child: AnimatedScale(
        scale: _isHovered ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutBack,
        child: GlassCard(
          padding: const EdgeInsets.all(24.0),
          child: Stack(
            children: [
              // Glow Effect
              Positioned(
                right: -20,
                top: -20,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _isHovered
                        ? widget.glowColor.withOpacity(0.15)
                        : widget.glowColor.withOpacity(0.05),
                    boxShadow: [
                      BoxShadow(
                        color: widget.glowColor.withOpacity(0.2),
                        blurRadius: 24,
                        spreadRadius: 12,
                      )
                    ],
                  ),
                ),
              ),
              // Content
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    widget.title.toUpperCase(),
                    style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      letterSpacing: 1.2,
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.value,
                    style: Theme.of(context).textTheme.displaySmall?.copyWith(
                      height: 1,
                      fontWeight: FontWeight.w700,
                      color: widget.valueColor,
                    ),
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
