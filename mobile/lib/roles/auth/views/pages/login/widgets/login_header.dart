import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class LoginHeader extends StatelessWidget {
  const LoginHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    final glassColor = isDark 
        ? Colors.black.withValues(alpha: 0.3) 
        : Colors.white.withValues(alpha: 0.4);
    final borderColor = isDark 
        ? Colors.white.withValues(alpha: 0.2) 
        : Colors.white.withValues(alpha: 0.6);

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ClipPath(
          clipper: ShapeBorderClipper(
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 24,
                cornerSmoothing: 1.0,
              ),
            ),
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Container(
              width: 72,
              height: 72,
              decoration: ShapeDecoration(
                color: glassColor,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 24,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(color: borderColor, width: 1.5),
                ),
              ),
              child: const Center(
                child: Icon(
                  Icons.directions_car_rounded,
                  size: 40,
                  color: Colors.blueAccent,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 28),
        
        Text(
          'TT Auto'.tr(),
          style: const TextStyle(
            fontSize: 36,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.8,
          ),
        ),
        
        const SizedBox(height: 8),
        Text(
          'Hệ thống quản trị nội bộ'.tr(),
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w500,
            letterSpacing: -0.2,
            color: isDark ? Colors.white70 : Colors.black54,
          ),
        ),
      ],
    );
  }
}
