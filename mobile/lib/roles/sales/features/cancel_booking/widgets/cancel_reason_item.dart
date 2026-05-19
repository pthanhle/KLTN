import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class CancelReasonItem extends StatefulWidget {
  final String title;
  final bool isSelected;
  final VoidCallback onTap;

  const CancelReasonItem({
    super.key,
    required this.title,
    required this.isSelected,
    required this.onTap,
  });

  @override
  State<CancelReasonItem> createState() => _CancelReasonItemState();
}

class _CancelReasonItemState extends State<CancelReasonItem>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.96).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
    HapticFeedback.selectionClick(); // Apple 2026 standard haptic
    widget.onTap();
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      behavior: HitTestBehavior.opaque,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.fastLinearToSlowEaseIn,
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: ShapeDecoration(
            // Deep Vibrancy logic - Tăng sáng lên
            color: widget.isSelected
                ? theme.colorScheme.errorContainer.withValues(alpha: 0.25)
                : theme.colorScheme.surface.withValues(alpha: 0.35),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 999, // Pill shape instead of squircle
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: widget.isSelected
                    ? theme.colorScheme.errorContainer.withValues(alpha: 0.8)
                    : theme.colorScheme.surface.withValues(alpha: 0.3), // Specular Highlight
                width: 0.5,
              ),
            ),
          ),
          child: Row(
            children: [
              _buildRadioIndicator(theme),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  tr(widget.title),
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: widget.isSelected
                        ? theme.colorScheme.error
                        : theme.colorScheme.onSurface, // Đổi sang onSurface cho sáng rõ
                    fontWeight: widget.isSelected ? FontWeight.w600 : FontWeight.w500, // Tăng font weight nhẹ
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRadioIndicator(ThemeData theme) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeOutCubic,
      width: 20,
      height: 20,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: widget.isSelected
            ? theme.colorScheme.error.withValues(alpha: 0.1)
            : Colors.transparent,
        border: Border.all(
          color: widget.isSelected
              ? theme.colorScheme.error
              : theme.colorScheme.outline.withValues(alpha: 0.6), // Sáng và rõ hơn outlineVariant
          width: 1.5,
        ),
      ),
      child: Center(
        child: AnimatedScale(
          scale: widget.isSelected ? 1.0 : 0.0,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutBack,
          child: Container(
            width: 10,
            height: 10,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: theme.colorScheme.error,
            ),
          ),
        ),
      ),
    );
  }
}
