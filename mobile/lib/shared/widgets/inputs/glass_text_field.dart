import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class GlassTextField extends StatefulWidget {
  final String hintText;
  final IconData prefixIcon;
  final bool isPassword;
  final TextEditingController? controller;
  
  const GlassTextField({
    super.key,
    required this.hintText,
    required this.prefixIcon,
    this.isPassword = false,
    this.controller,
  });

  @override
  State<GlassTextField> createState() => _GlassTextFieldState();
}

class _GlassTextFieldState extends State<GlassTextField> {
  bool _obscureText = true;
  bool _isFocused = false;
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _obscureText = widget.isPassword;
    _focusNode.addListener(() {
      if (_focusNode.hasFocus && !_isFocused) {
        HapticFeedback.selectionClick();
      }
      setState(() => _isFocused = _focusNode.hasFocus);
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final squircleShape = SmoothRectangleBorder(
      borderRadius: SmoothBorderRadius(
        cornerRadius: 20,
        cornerSmoothing: 1.0,
      ),
      side: BorderSide(
        color: _isFocused 
            ? theme.primaryColor.withValues(alpha: 0.5)
            : Colors.transparent,
        width: 1,
      ),
    );

    return ClipPath(
      clipper: ShapeBorderClipper(shape: squircleShape),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: ShapeDecoration(
            color: isDark 
                ? Colors.white.withValues(alpha: _isFocused ? 0.1 : 0.05)
                : Colors.black.withValues(alpha: _isFocused ? 0.08 : 0.03),
            shape: squircleShape,
          ),
          child: TextField(
            controller: widget.controller,
            focusNode: _focusNode,
            obscureText: widget.isPassword ? _obscureText : false,
            style: TextStyle(
              color: theme.textTheme.bodyLarge?.color,
              fontSize: 16,
            ),
            decoration: InputDecoration(
              hintText: widget.hintText,
              hintStyle: TextStyle(
                color: isDark ? Colors.white54 : Colors.black54,
              ),
              prefixIcon: Icon(
                widget.prefixIcon,
                color: _isFocused ? theme.primaryColor : (isDark ? Colors.white54 : Colors.black54),
              ),
              suffixIcon: widget.isPassword
                  ? IconButton(
                      icon: Icon(
                        _obscureText ? Icons.visibility_off : Icons.visibility,
                        color: isDark ? Colors.white54 : Colors.black54,
                      ),
                      onPressed: () {
                        HapticFeedback.selectionClick();
                        setState(() => _obscureText = !_obscureText);
                      },
                    )
                  : null,
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(vertical: 18),
            ),
          ),
        ),
      ),
    ).animate(target: _isFocused ? 1 : 0)
     .scaleXY(end: 1.02, duration: 200.ms, curve: Curves.easeOutCubic);
  }
}