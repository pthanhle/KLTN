import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/controllers/warehouse_orders_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/widgets/controls/orders_segmented_control.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/widgets/orders_list_view.dart';

class WarehouseOrdersPage extends ConsumerStatefulWidget {
  const WarehouseOrdersPage({super.key});

  @override
  ConsumerState<WarehouseOrdersPage> createState() => _WarehouseOrdersPageState();
}

class _WarehouseOrdersPageState extends ConsumerState<WarehouseOrdersPage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final state = ref.watch(warehouseOrdersProvider);
    final controller = ref.read(warehouseOrdersProvider.notifier);

    return CupertinoPageScaffold(
      backgroundColor: theme.colorScheme.surface,
      child: Stack(
        children: [
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: theme.brightness == Brightness.dark
                      ? [
                          const Color(0xFF0F172A),
                          const Color(0xFF1E293B),
                        ]
                      : [
                          const Color(0xFFF7F9FB),
                          const Color(0xFFE0E3E5),
                        ],
                ),
              ),
            ),
          ),

          CustomScrollView(
            physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(
                  'Lệnh Kho'.tr(),
                  style: TextStyle(
                    fontFamily: 'Hanken Grotesk',
                    fontWeight: FontWeight.bold,
                    letterSpacing: -0.5,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
                border: null,
              ),

              SliverPersistentHeader(
                pinned: true,
                delegate: _SegmentedControlDelegate(
                  child: OrdersSegmentedControl(
                    selectedTab: state.currentTab,
                    onTabChanged: controller.setTab,
                  ),
                ),
              ),

              const OrdersListView(),

              const SliverToBoxAdapter(
                child: SizedBox(height: 120),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SegmentedControlDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  _SegmentedControlDelegate({required this.child});

  @override
  double get minExtent => 76.0;

  @override
  double get maxExtent => 76.0;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final opacity = (shrinkOffset / maxExtent).clamp(0.0, 1.0);
    
    return Stack(
      children: [
        if (opacity > 0)
          Positioned.fill(
            child: ClipRect(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 24 * opacity, sigmaY: 24 * opacity),
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.15 * opacity),
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.white.withValues(alpha: 0.3 * opacity),
                        width: 0.5,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        Center(child: child),
      ],
    );
  }

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) => true;
}
