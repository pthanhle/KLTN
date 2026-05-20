import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class AdvisorBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTabTapped;
  final VoidCallback onScannerTapped;

  const AdvisorBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTabTapped,
    required this.onScannerTapped,
  });

  @override
  Widget build(BuildContext context) {
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;
    final isDark = Theme.of(context).brightness == Brightness.dark;

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
              cornerRadius: 36,
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
            )
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 36,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Row(
              children: [
                Expanded(
                  child: _buildTabItem(
                    context,
                    icon: CupertinoIcons.house,
                    activeIcon: CupertinoIcons.house_fill,
                    label: 'Trang chủ'.tr(),
                    index: 0,
                  ),
                ),
                Expanded(
                  child: _buildTabItem(
                    context,
                    icon: CupertinoIcons.calendar,
                    activeIcon: CupertinoIcons.calendar_today,
                    label: 'Lịch hẹn'.tr(),
                    index: 1,
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
                          color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.5),
                            width: 1,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.3),
                              blurRadius: 16,
                              spreadRadius: 0,
                              offset: const Offset(0, 4),
                            ),
                          ]
                        ),
                        child: Icon(
                          CupertinoIcons.qrcode_viewfinder,
                          color: Theme.of(context).colorScheme.primary,
                          size: 26,
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: _buildTabItem(
                    context,
                    icon: CupertinoIcons.person,
                    activeIcon: CupertinoIcons.person_solid,
                    label: 'Tài khoản'.tr(),
                    index: 2,
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

  Widget _buildTabItem(
    BuildContext context, {
    required IconData icon,
    required IconData activeIcon,
    required String label,
    required int index,
  }) {
    final isSelected = currentIndex == index;
    final theme = Theme.of(context);
    
    final activeColor = theme.colorScheme.primary;
    final inactiveColor = theme.brightness == Brightness.dark 
        ? Colors.white.withValues(alpha: 0.5) 
        : Colors.black.withValues(alpha: 0.4);
    
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () {
        if (!isSelected) {
          HapticFeedback.selectionClick();
          onTabTapped(index);
        }
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 80,
        curve: Curves.easeOutCubic,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              isSelected ? activeIcon : icon,
              color: isSelected ? activeColor : inactiveColor,
              size: isSelected ? 26 : 24,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: isSelected ? activeColor : inactiveColor,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
