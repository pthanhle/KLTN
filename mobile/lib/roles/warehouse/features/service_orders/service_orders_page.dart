import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'controllers/service_orders_controller.dart';
import 'widgets/cards/service_order_glass_card.dart';
import 'widgets/cards/service_order_glass_card_skeleton.dart';
import 'widgets/controls/service_segmented_control.dart';
import 'widgets/empty_state/service_empty_state.dart';
import 'package:go_router/go_router.dart';
import 'package:ttauto_staff/shared/widgets/inputs/list_search_bar.dart';
import 'package:ttauto_staff/shared/widgets/inputs/date_filter_chip.dart';

class ServiceOrdersPage extends ConsumerStatefulWidget {
  const ServiceOrdersPage({super.key});

  @override
  ConsumerState<ServiceOrdersPage> createState() => _ServiceOrdersPageState();
}

class _ServiceOrdersPageState extends ConsumerState<ServiceOrdersPage> {
  int _currentTabIndex = 0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    final ordersState = ref.watch(serviceOrdersProvider);
    final isLoading = ordersState.isLoading;
    final orders = _currentTabIndex == 0 
        ? ref.watch(pendingServiceOrdersProvider)
        : ref.watch(readyServiceOrdersProvider);

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
            slivers: [
              CupertinoSliverNavigationBar(
                largeTitle: Text(
                  'Lệnh Sửa Chữa'.tr(),
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
                delegate: _SegmentedControlHeaderDelegate(
                  child: ServiceSegmentedControl(
                    selectedIndex: _currentTabIndex,
                    onValueChanged: (index) {
                      setState(() {
                        _currentTabIndex = index;
                      });
                    },
                  ),
                ),
              ),

              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
                  child: Row(
                    children: [
                      Expanded(
                        child: ListSearchBar(
                          hintText: 'Tìm mã đơn, biển số, khách hàng...',
                          onChanged: ref.read(serviceOrdersProvider.notifier).updateSearch,
                          padding: EdgeInsets.zero,
                        ),
                      ),
                      const SizedBox(width: 8),
                      DateFilterChip(
                        selectedDate: ordersState.filterDate,
                        onDateChanged: ref.read(serviceOrdersProvider.notifier).setFilterDate,
                        padding: EdgeInsets.zero,
                      ),
                    ],
                  ),
                ),
              ),

              if (isLoading)
                SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        return const ServiceOrderGlassCardSkeleton();
                      },
                      childCount: 3, // Hiển thị 3 skeleton card
                    ),
                  ),
                )
              else if (orders.isEmpty)
                SliverFillRemaining(
                  hasScrollBody: false,
                  child: ServiceEmptyState(
                    type: _currentTabIndex == 0
                        ? ServiceEmptyStateType.pendingPick
                        : ServiceEmptyStateType.readyForHandover,
                  ),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        return ServiceOrderGlassCard(
                          order: orders[index],
                          onTap: () {
                            context.goNamed(
                              'warehouse_service_packing_detail',
                              pathParameters: {'id': orders[index].id},
                            );
                          },
                        );
                      },
                      childCount: orders.length,
                    ),
                  ),
                ),
                
              const SliverToBoxAdapter(
                child: SizedBox(height: 100),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SegmentedControlHeaderDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  _SegmentedControlHeaderDelegate({required this.child});

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
