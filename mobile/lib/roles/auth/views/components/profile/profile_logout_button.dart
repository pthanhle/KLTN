import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../controllers/auth_controller.dart';

class ProfileLogoutButton extends ConsumerStatefulWidget {
  const ProfileLogoutButton({super.key});

  @override
  ConsumerState<ProfileLogoutButton> createState() => _ProfileLogoutButtonState();
}

class _ProfileLogoutButtonState extends ConsumerState<ProfileLogoutButton> {
  bool _isPressed = false;

  void _onTapDown(TapDownDetails _) {
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }

  void _onTapUp(TapUpDetails _) {
    setState(() => _isPressed = false);
    _showLogoutConfirmation(context);
  }

  void _onTapCancel() => setState(() => _isPressed = false);

  void _showLogoutConfirmation(BuildContext context) {
    HapticFeedback.heavyImpact();
    showModalBottomSheet(
      context: context,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      elevation: 0,
      isScrollControlled: true,
      builder: (BuildContext ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;
        final appleRed = isDark ? const Color(0xFFFF453A) : const Color(0xFFFF3B30);

        Widget glassBlock({required Widget child}) {
          return Container(
            width: double.infinity,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.65),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.8),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.06),
                  blurRadius: 20,
                  offset: const Offset(0, 6),
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.15 : 0.03),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: child,
              ),
            ),
          );
        }

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                glassBlock(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 20, 20, 16),
                        child: Column(
                          children: [
                            Text(
                              'Đăng xuất khỏi hệ thống?'.tr(),
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                                letterSpacing: -0.5,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Phiên đăng nhập hiện tại của bạn sẽ bị kết thúc.'.tr(),
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: theme.colorScheme.onSurfaceVariant,
                                fontSize: 13,
                                height: 1.4,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        height: 0.5,
                        color: theme.dividerColor.withValues(alpha: 0.15),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.pop(ctx);
                          _performLogout();
                        },
                        behavior: HitTestBehavior.opaque,
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 17),
                          color: Colors.transparent,
                          child: Text(
                            'Đăng xuất'.tr(),
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: appleRed,
                              fontSize: 17,
                              fontWeight: FontWeight.w600,
                              letterSpacing: -0.3,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 10),

                glassBlock(
                  child: GestureDetector(
                    onTap: () => Navigator.pop(ctx),
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 17),
                      color: Colors.transparent,
                      child: Text(
                        'Hủy'.tr(),
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.3,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> _performLogout() async {
    await ref.read(authControllerProvider.notifier).logout();
    if (mounted) context.go('/login');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final appleRed = isDark ? const Color(0xFFFF453A) : const Color(0xFFFF3B30);

    return GestureDetector(
      onTapDown: _onTapDown,
      onTapUp: _onTapUp,
      onTapCancel: _onTapCancel,
      child: Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          // Tinted Red Glass — nút trigger logout trên Profile page
          color: appleRed.withValues(alpha: isDark ? 0.12 : 0.08),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            side: BorderSide(
              color: appleRed.withValues(alpha: isDark ? 0.35 : 0.25),
              width: 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 17),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    CupertinoIcons.square_arrow_right, // SF Symbols (Mục 12 HIG)
                    color: appleRed,
                    size: 20,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Đăng xuất'.tr(),
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: appleRed,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.4,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
