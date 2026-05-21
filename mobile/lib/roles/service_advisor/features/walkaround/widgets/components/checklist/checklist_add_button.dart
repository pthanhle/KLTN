import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class ChecklistAddButton extends StatefulWidget {
  final VoidCallback onTap;

  const ChecklistAddButton({super.key, required this.onTap});

  @override
  State<ChecklistAddButton> createState() => _ChecklistAddButtonState();
}

class _ChecklistAddButtonState extends State<ChecklistAddButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () {
        HapticFeedback.lightImpact();
        widget.onTap();
      },
      onTapDown: (_) => setState(() => _isPressed = true),
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      child: AnimatedScale(
        scale: _isPressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 130),
        curve: Curves.easeOutCubic,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.35),
                width: 0.5,
              ),
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: ShapeDecoration(
                  color: theme.colorScheme.primary.withValues(alpha: isDark ? 0.16 : 0.10),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: Colors.white.withValues(alpha: isDark ? 0.20 : 0.60),
                      width: 0.5,
                    ),
                  ),
                ),
                child: ClipSmoothRect(
                  radius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                    child: Icon(
                      CupertinoIcons.add,
                      size: 16,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                'Thêm tài sản khác'.tr(),
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.1,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
