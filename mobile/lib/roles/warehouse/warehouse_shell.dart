import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../shared/widgets/toast/glass_toast.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/floating_glass_tab_bar.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/scanner/scanner_modal.dart';

class WarehouseShell extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const WarehouseShell({
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
        print('Scanned Barcode: $code');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Stack(
        children: [
          navigationShell,
          
          FloatingGlassTabBar(
            currentIndex: navigationShell.currentIndex,
            onTabTapped: _onTabTapped,
            onScannerTapped: () => _onScannerTapped(context),
          ),
        ],
      ),
    );
  }
}
