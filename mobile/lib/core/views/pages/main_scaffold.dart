import 'package:flutter/cupertino.dart';
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
      extendBody: true,
      body: navigationShell,
      bottomNavigationBar: GlassNavigationBar(
        items: [
          GlassNavItem(
            icon: CupertinoIcons.house,
            activeIcon: CupertinoIcons.house,
            label: 'Trang chủ'.tr(),
            isSelected: navigationShell.currentIndex == 0,
            onTap: () => _goBranch(0),
          ),
          GlassNavItem(
            icon: CupertinoIcons.briefcase,
            activeIcon: CupertinoIcons.briefcase,
            label: 'Công việc'.tr(),
            isSelected: navigationShell.currentIndex == 1,
            onTap: () => _goBranch(1),
          ),
          GlassNavItem(
            icon: CupertinoIcons.calendar,
            activeIcon: CupertinoIcons.calendar,
            label: 'Lịch hẹn'.tr(),
            isSelected: navigationShell.currentIndex == 2,
            onTap: () => _goBranch(2),
          ),
          GlassNavItem(
            icon: CupertinoIcons.person,
            activeIcon: CupertinoIcons.person,
            label: 'Tài khoản'.tr(),
            isSelected: navigationShell.currentIndex == 3,
            onTap: () => _goBranch(3),
          ),
        ],
      ),
    );
  }
}
