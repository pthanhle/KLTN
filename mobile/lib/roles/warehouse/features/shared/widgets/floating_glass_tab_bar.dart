import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../core/views/components/navigation/glass_nav_item.dart';

class FloatingGlassTabBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTabTapped;
  final VoidCallback onScannerTapped;

  const FloatingGlassTabBar({
    super.key,
    required this.currentIndex,
    required this.onTabTapped,
    required this.onScannerTapped,
  });

  @override
  Widget build(BuildContext context) {
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;
    final theme = Theme.of(context);

    return Positioned(
      bottom: bottomSafeArea > 0 ? 24 : 16,
      left: 20,
      right: 20,
      child: Container(
        height: 68,
        decoration: ShapeDecoration(
          color: Colors.white.withValues(alpha: 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 44,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: 0.3),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.5),
              blurRadius: 40,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 44,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Row(
              children: [
                Expanded(
                  child: GlassNavItem(
                    icon: CupertinoIcons.house,
                    activeIcon: CupertinoIcons.house,
                    label: 'Trang chủ'.tr(),
                    isSelected: currentIndex == 0,
                    onTap: () {
                      if (currentIndex != 0) onTabTapped(0);
                    },
                  ),
                ),
                Expanded(
                  child: GlassNavItem(
                    icon: CupertinoIcons.cube_box,
                    activeIcon: CupertinoIcons.cube_box,
                    label: 'Lệnh kho'.tr(),
                    isSelected: currentIndex == 1,
                    onTap: () {
                      if (currentIndex != 1) onTabTapped(1);
                    },
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    HapticFeedback.heavyImpact();
                    onScannerTapped();
                  },
                  child: ClipOval(
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                      child: Container(
                        width: 52,
                        height: 52,
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.5),
                            width: 0.5,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary.withValues(alpha: 0.3),
                              blurRadius: 16,
                              spreadRadius: 0,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Icon(
                          CupertinoIcons.barcode_viewfinder,
                          color: theme.colorScheme.primary,
                          size: 26,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: GlassNavItem(
                    icon: CupertinoIcons.person,
                    activeIcon: CupertinoIcons.person,
                    label: 'Tài khoản'.tr(),
                    isSelected: currentIndex == 3,
                    onTap: () {
                      if (currentIndex != 3) onTabTapped(2);
                    },
                  ),
                ),
                const Expanded(child: SizedBox()),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
