import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';

class SlideToConfirmButton extends StatefulWidget {
  final Future<bool> Function() onConfirm;

  const SlideToConfirmButton({
    super.key,
    required this.onConfirm,
  });

  @override
  State<SlideToConfirmButton> createState() => _SlideToConfirmButtonState();
}

class _SlideToConfirmButtonState extends State<SlideToConfirmButton> with SingleTickerProviderStateMixin {
  bool _isConfirmed = false;
  bool _isLoading = false;
  double _dragExtent = 0.0;
  
  late AnimationController _resetController;
  late Animation<double> _resetAnimation;

  @override
  void initState() {
    super.initState();
    _resetController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _resetAnimation = Tween<double>(begin: 0, end: 0).animate(
      CurvedAnimation(parent: _resetController, curve: Curves.easeOutCubic),
    )..addListener(() {
        setState(() {
          _dragExtent = _resetAnimation.value;
        });
      });
  }

  @override
  void dispose() {
    _resetController.dispose();
    super.dispose();
  }

  void _handleDragUpdate(DragUpdateDetails details, double maxWidth) {
    if (_isConfirmed || _isLoading) return;
    
    setState(() {
      _dragExtent += details.primaryDelta!;
      if (_dragExtent < 0) {
        _dragExtent = 0;
      }
      final maxDrag = maxWidth - 48 - 8; 
      if (_dragExtent > maxDrag) {
        _dragExtent = maxDrag;
      }
    });
  }

  void _handleDragEnd(DragEndDetails details, double maxWidth) async {
    if (_isConfirmed || _isLoading) return;

    final maxDrag = maxWidth - 48 - 8;
    
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
          if (success) {
            _isConfirmed = true;
          } else {
            _animateReset();
          }
        });
      }
    } else {
      _animateReset();
    }
  }

  void _animateReset() {
    HapticFeedback.lightImpact();
    _resetAnimation = Tween<double>(begin: _dragExtent, end: 0.0).animate(
      CurvedAnimation(parent: _resetController, curve: Curves.easeOutCubic),
    );
    _resetController.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final knobColor = _isConfirmed 
        ? Colors.green 
        : theme.colorScheme.primary;
        
    final trackColor = isDark 
        ? Colors.white.withValues(alpha: 0.05)
        : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5);
        
    final borderColor = isDark
        ? Colors.white.withValues(alpha: 0.1)
        : theme.colorScheme.outlineVariant.withValues(alpha: 0.5);
        
    final textOpacityColor = isDark ? Colors.white : theme.colorScheme.onSurface;

    return LayoutBuilder(
      builder: (context, constraints) {
        final maxWidth = constraints.maxWidth;
        final maxDrag = maxWidth - 48 - 8;
        final progress = maxDrag > 0 ? (_dragExtent / maxDrag) : 0.0;

        return Container(
          height: 64,
          decoration: BoxDecoration(
            color: trackColor,
            borderRadius: BorderRadius.circular(32),
            border: Border.all(color: borderColor),
          ),
          child: Stack(
            children: [
              Center(
                child: AnimatedOpacity(
                  opacity: _isConfirmed ? 0.0 : (1.0 - progress).clamp(0.0, 1.0),
                  duration: const Duration(milliseconds: 100),
                  child: Text(
                    'Vuốt để bàn giao tận tay'.tr(),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: textOpacityColor.withValues(alpha: 0.7),
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.2,
                    ),
                  ),
                ),
              ),

              if (_isConfirmed)
                Center(
                  child: Text(
                    'Đã bàn giao'.tr(),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: isDark ? Colors.white : Colors.green.shade900,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.2,
                    ),
                  ),
                ),

              AnimatedContainer(
                duration: const Duration(milliseconds: 100),
                width: _dragExtent + 48 + 4,
                height: 64,
                decoration: BoxDecoration(
                  color: _isConfirmed 
                      ? Colors.green.withValues(alpha: 0.8)
                      : theme.colorScheme.primary.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(32),
                ),
              ),

              Positioned(
                left: _dragExtent + 4,
                top: 8,
                child: GestureDetector(
                  onHorizontalDragUpdate: (details) => _handleDragUpdate(details, maxWidth),
                  onHorizontalDragEnd: (details) => _handleDragEnd(details, maxWidth),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: LinearGradient(
                        colors: [
                          knobColor.withValues(alpha: 0.8),
                          knobColor,
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: knobColor.withValues(alpha: 0.4),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                        BoxShadow(
                          color: Colors.white.withValues(alpha: 0.2),
                          blurRadius: 0,
                          spreadRadius: 1,
                          offset: const Offset(0, 1),
                        ),
                      ],
                    ),
                    child: Center(
                      child: _isLoading
                          ? const CupertinoActivityIndicator(color: Colors.white)
                          : Icon(
                              _isConfirmed ? CupertinoIcons.check_mark : CupertinoIcons.chevron_right,
                              color: Colors.white,
                              size: 24,
                            ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
