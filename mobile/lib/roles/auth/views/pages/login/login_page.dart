import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../../shared/widgets/containers/glass_card.dart';
import '../../../controllers/auth_controller.dart';
import 'controllers/login_form_controller.dart';
import 'widgets/login_header.dart';
import 'widgets/login_inputs.dart';
import 'widgets/login_actions.dart';

class LoginPage extends ConsumerWidget {
  const LoginPage({super.key});

  void _showAppleErrorAlert(BuildContext context, String message) {
    HapticFeedback.heavyImpact();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    showGeneralDialog(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.25), 
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (context, animation, secondaryAnimation) {
        return Center(
          child: Material(
            color: Colors.transparent,
            child: ClipPath(
              clipper: ShapeBorderClipper(
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 28, 
                    cornerSmoothing: 1.0,
                  ),
                ),
              ),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30), 
                child: Container(
                  width: 320,
                  decoration: ShapeDecoration(
                    color: isDark ? Colors.black.withValues(alpha: 0.2) : Colors.white.withValues(alpha: 0.3),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 28,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: isDark ? Colors.white.withValues(alpha: 0.15) : Colors.white,
                        width: 1.5,
                      ),
                    ),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const SizedBox(height: 32),
                      Icon(
                        CupertinoIcons.exclamationmark_triangle_fill, 
                        color: isDark ? Colors.redAccent.shade100 : Colors.redAccent, 
                        size: 48
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Lỗi Đăng Nhập'.tr(),
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: Text(
                          message,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 15,
                            color: isDark ? Colors.white70 : Colors.black87,
                            height: 1.3,
                          ),
                        ),
                      ),
                      const SizedBox(height: 28),
                      Divider(height: 1, color: isDark ? Colors.white.withValues(alpha: 0.2) : Colors.black.withValues(alpha: 0.1)),
                      GestureDetector(
                        onTap: () => Navigator.pop(context),
                        behavior: HitTestBehavior.opaque,
                        child: Container(
                          width: double.infinity,
                          alignment: Alignment.center,
                          padding: const EdgeInsets.symmetric(vertical: 18),
                          child: Text(
                            'Đóng'.tr(),
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w600, 
                              color: isDark ? Colors.blueAccent.shade100 : CupertinoColors.activeBlue,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return ScaleTransition(
          scale: CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
          ),
          child: FadeTransition(
            opacity: animation,
            child: child,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.listen(loginFormControllerProvider, (previous, next) {
      if (next.errorMessage != null && next.errorMessage != previous?.errorMessage) {
        _showAppleErrorAlert(context, next.errorMessage!);
      }
    });

    ref.listen(authControllerProvider, (previous, next) {
      if (!next.isLoading && next.hasError) {
        _showAppleErrorAlert(context, next.error.toString().replaceAll("Exception: ", ""));
      } else if (!next.isLoading && next.hasValue && next.value != null) {
        final role = next.value!.role;
        if (role == 'INVENTORY_MGR' || role == 'WAREHOUSE_MANAGER') {
          context.go('/warehouse');
        } else if (role == 'SERVICE_ADVISOR') {
          context.go('/advisor');
        } else if (role == 'TECHNICIAN' || role == 'LEAD_TECHNICIAN') {
          context.go('/technician');
        } else {
          context.go('/dashboard');
        }
      }
    });

    return Scaffold(
      body: MeshBackground(
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const LoginHeader(),
                  const SizedBox(height: 48),
                  
                  GlassCard(
                    child: const Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        LoginInputs(),
                        SizedBox(height: 12),
                        LoginActions(),
                      ],
                    ),
                  ),
                  const SizedBox(height: 48),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
