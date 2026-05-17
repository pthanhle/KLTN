import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../components/navigation/glass_nav_item.dart';
import '../components/navigation/glass_navigation_bar.dart';

class MainScaffold extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const MainScaffold({
    super.key,
    required this.navigationShell,
  });

  void _goBranch(int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true, // Crucial for floating nav bar
      body: navigationShell,
      bottomNavigationBar: GlassNavigationBar(
        items: [
          GlassNavItem(
            icon: Icons.dashboard_outlined,
            activeIcon: Icons.dashboard_rounded,
            label: 'Trang chủ'.tr(),
            isSelected: navigationShell.currentIndex == 0,
            onTap: () => _goBranch(0),
          ),
          GlassNavItem(
            icon: Icons.assignment_outlined,
            activeIcon: Icons.assignment_rounded,
            label: 'Công việc'.tr(),
            isSelected: navigationShell.currentIndex == 1,
            onTap: () => _goBranch(1),
          ),
          GlassNavItem(
            icon: Icons.calendar_today_outlined,
            activeIcon: Icons.calendar_today_rounded,
            label: 'Lịch hẹn'.tr(),
            isSelected: navigationShell.currentIndex == 2,
            onTap: () => _goBranch(2),
          ),
          GlassNavItem(
            icon: Icons.person_outline_rounded,
            activeIcon: Icons.person_rounded,
            label: 'Tài khoản'.tr(),
            isSelected: navigationShell.currentIndex == 3,
            onTap: () => _goBranch(3),
          ),
        ],
      ),
    );
  }
}
