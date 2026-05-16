import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class LoginHeader extends StatelessWidget {
  const LoginHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // App Icon
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: isDark ? Colors.white.withOpacity(0.1) : Colors.black.withOpacity(0.05),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isDark ? Colors.white.withOpacity(0.1) : Colors.black.withOpacity(0.05),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 16,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: const Center(
            child: Icon(
              Icons.directions_car,
              size: 32,
              color: Colors.blue,
            ),
          ),
        ),
        const SizedBox(height: 24),
        
        // Large Title
        Text(
          'auth_login_title'.tr(),
          style: const TextStyle(
            fontSize: 34,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.4,
          ),
        ),
        
        // Subtitle
        const SizedBox(height: 8),
        Text(
          'auth_login_subtitle'.tr(),
          style: TextStyle(
            fontSize: 15,
            color: isDark ? Colors.white70 : Colors.black54,
          ),
        ),
      ],
    );
  }
}
