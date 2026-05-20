import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../shared/widgets/toast/glass_toast.dart';
import 'features/shared/widgets/advisor_bottom_nav.dart';

class AdvisorShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const AdvisorShell({
    super.key,
    required this.navigationShell,
  });

  void _onTabTapped(int index) {
    if (index < navigationShell.route.branches.length) {
      navigationShell.goBranch(
        index,
        initialLocation: index == navigationShell.currentIndex,
      );
    }
  }

  void _onScannerTapped(BuildContext context) {
    GlassToast.show(
      context,
      title: 'Quét QR'.tr(),
      icon: CupertinoIcons.qrcode,
    );
  }

  @override
  Widget build(BuildContext context) {
    int visualIndex = navigationShell.currentIndex;
    if (visualIndex >= 2) {
      visualIndex += 1;
    }

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Stack(
        children: [
          navigationShell,
          AdvisorBottomNav(
            currentIndex: visualIndex,
            onTabTapped: _onTabTapped,
            onScannerTapped: () => _onScannerTapped(context),
          ),
        ],
      ),
    );
  }
}
