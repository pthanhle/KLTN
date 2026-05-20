import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/quotation_constants.dart';

class ShimmerButton extends StatefulWidget {
  final String text;
  final VoidCallback onTap;

  const ShimmerButton({
    super.key,
    required this.text,
    required this.onTap,
  });

  @override
  State<ShimmerButton> createState() => _ShimmerButtonState();
}

class _ShimmerButtonState extends State<ShimmerButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 16),
            decoration: ShapeDecoration(
              gradient: LinearGradient(
                begin: Alignment(-2.0 + (_controller.value * 4), 0),
                end: Alignment(0.0 + (_controller.value * 4), 0),
                colors: [
                  theme.colorScheme.primary,
                  theme.colorScheme.primary.withValues(alpha: 0.6),
                  theme.colorScheme.primary,
                ],
                stops: const [0.0, 0.5, 1.0],
              ),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: QuotationConstants.radiusButton,
                  cornerSmoothing: 1.0,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: theme.colorScheme.primary.withValues(alpha: 0.3),
                  blurRadius: 16,
                  offset: const Offset(0, 8),
                )
              ],
            ),
            child: Center(
              child: Text(
                widget.text,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
