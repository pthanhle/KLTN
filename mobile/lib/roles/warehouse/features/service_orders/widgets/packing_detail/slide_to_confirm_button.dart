import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class SlideToConfirmButton extends StatefulWidget {
  final Future<bool> Function() onConfirm;

  const SlideToConfirmButton({
    super.key,
    required this.onConfirm,
  });

  @override
  State<SlideToConfirmButton> createState() => _SlideToConfirmButtonState();
}

class _SlideToConfirmButtonState extends State<SlideToConfirmButton>
    with SingleTickerProviderStateMixin {
  bool _isConfirmed = false;
  bool _isLoading = false;
  double _dragExtent = 0.0;

  static const double _trackHeight = 64.0;
  static const double _trackPadding = 6.0;
  static const double _knobSize = _trackHeight - _trackPadding * 2;

  late AnimationController _resetController;
  late Animation<double> _resetAnimation;

  @override
  void initState() {
    super.initState();
    _resetController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 380),
    );
    _resetAnimation = Tween<double>(begin: 0, end: 0).animate(
      CurvedAnimation(parent: _resetController, curve: Curves.fastLinearToSlowEaseIn),
    )..addListener(() {
        setState(() => _dragExtent = _resetAnimation.value);
      });
  }

  @override
  void dispose() {
    _resetController.dispose();
    super.dispose();
  }

  void _handleDragUpdate(DragUpdateDetails details, double maxDrag) {
    if (_isConfirmed || _isLoading) return;
    setState(() {
      _dragExtent = (_dragExtent + details.primaryDelta!).clamp(0.0, maxDrag);
    });

    final progress = maxDrag > 0 ? _dragExtent / maxDrag : 0.0;
    if (progress > 0.5 && progress < 0.55) HapticFeedback.selectionClick();
  }

  Future<void> _handleDragEnd(DragEndDetails details, double maxDrag) async {
    if (_isConfirmed || _isLoading) return;

    if (_dragExtent > maxDrag * 0.85) {
      HapticFeedback.heavyImpact();
      setState(() {
        _dragExtent = maxDrag;
        _isLoading = true;
      });

      final success = await widget.onConfirm();

      if (mounted) {
        setState(() {
          _isLoading = false;
          _isConfirmed = success;
          if (!success) _animateReset();
        });
      }
    } else {
      _animateReset();
    }
  }

  void _animateReset() {
    HapticFeedback.lightImpact();
    _resetAnimation = Tween<double>(begin: _dragExtent, end: 0.0).animate(
      CurvedAnimation(
          parent: _resetController, curve: Curves.fastLinearToSlowEaseIn),
    );
    _resetController.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final primary = theme.colorScheme.primary;
    final confirmedColor = const Color(0xFF34C759);
    final activeColor = _isConfirmed ? confirmedColor : primary;

    return LayoutBuilder(
      builder: (context, constraints) {
        final maxDrag = constraints.maxWidth - _knobSize - _trackPadding * 2;
        final progress = maxDrag > 0 ? (_dragExtent / maxDrag).clamp(0.0, 1.0) : 0.0;

        return Container(
          height: _trackHeight,
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.06)
                : Colors.black.withValues(alpha: 0.05),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: _trackHeight / 2,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.40),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: _trackHeight / 2,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Stack(
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 80),
                    width: _dragExtent + _knobSize + _trackPadding * 2,
                    height: _trackHeight,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          activeColor.withValues(alpha: 0.30),
                          activeColor.withValues(alpha: 0.10),
                        ],
                      ),
                    ),
                  ),

                  Center(
                    child: AnimatedOpacity(
                      opacity: _isConfirmed
                          ? 0.0
                          : (1.0 - progress * 2).clamp(0.0, 1.0),
                      duration: const Duration(milliseconds: 100),
                      child: Text(
                        'Vuốt để xác nhận bàn giao'.tr(),
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.55),
                          fontWeight: FontWeight.w500,
                          letterSpacing: -0.2,
                        ),
                      ),
                    ),
                  ),

                  if (_isConfirmed)
                    Center(
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(CupertinoIcons.checkmark_seal_fill,
                              size: 18, color: confirmedColor),
                          const SizedBox(width: 6),
                          Text(
                            'Đã bàn giao'.tr(),
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: confirmedColor,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),

                  Positioned(
                    left: _dragExtent + _trackPadding,
                    top: _trackPadding,
                    child: GestureDetector(
                      onHorizontalDragUpdate: (d) =>
                          _handleDragUpdate(d, maxDrag),
                      onHorizontalDragEnd: (d) =>
                          _handleDragEnd(d, maxDrag),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 150),
                        width: _knobSize,
                        height: _knobSize,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: RadialGradient(
                            colors: [
                              activeColor.withValues(alpha: 0.9),
                              activeColor,
                            ],
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: activeColor.withValues(alpha: 0.45),
                              blurRadius: 16,
                              offset: const Offset(0, 4),
                            ),
                            BoxShadow(
                              color: Colors.white.withValues(alpha: 0.25),
                              blurRadius: 0,
                              spreadRadius: 1,
                              offset: const Offset(0, 1),
                            ),
                          ],
                        ),
                        child: Center(
                          child: _isLoading
                              ? const CupertinoActivityIndicator(
                                  color: Colors.white)
                              : Icon(
                                  _isConfirmed
                                      ? CupertinoIcons.checkmark_alt
                                      : CupertinoIcons.chevron_right_2,
                                  color: Colors.white,
                                  size: 20,
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
      },
    );
  }
}
