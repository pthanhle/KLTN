import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../shared/widgets/toast/glass_toast.dart';
import 'features/shared/widgets/tech_bottom_nav.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/scanner/scanner_modal.dart';

class TechnicianShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const TechnicianShell({
    super.key,
    required this.navigationShell,
  });

  void _onTabTapped(int index) {
    navigationShell.goBranch(
      index,
      initialLocation: index == navigationShell.currentIndex,
    );
  }

  void _onScannerTapped(BuildContext context) {
    showScannerModal(
      context,
      onDetect: (code) {
        GlassToast.show(
          context,
          title: '${'Đã nhận dạng'.tr()}: $code',
          icon: CupertinoIcons.checkmark_alt,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      child: DefaultTextStyle.merge(
        style: const TextStyle(decoration: TextDecoration.none),
        child: Stack(
          children: [
          navigationShell,
          TechBottomNav(
            currentIndex: navigationShell.currentIndex,
            onTabTapped: _onTabTapped,
            onScannerTapped: () => _onScannerTapped(context),
          ),
          ],
        ),
      ),
    );
  }
}
