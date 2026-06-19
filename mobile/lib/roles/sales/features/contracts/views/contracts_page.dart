import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../core/utils/theme_extension.dart';
import '../widgets/lists/contracts_list_view.dart';
import '../widgets/segmented_control/contracts_segmented_control.dart';

class ContractsPage extends ConsumerStatefulWidget {
  const ContractsPage({super.key});

  @override
  ConsumerState<ContractsPage> createState() => _ContractsPageState();
}

class _ContractsPageState extends ConsumerState<ContractsPage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return CupertinoPageScaffold(
      backgroundColor: Colors.transparent,
      child: Material(
        type: MaterialType.transparency,
        child: Stack(
          children: [
            // Mesh background
            Positioned.fill(
              child: Stack(
                children: [
                  Container(
                    color: isDark
                        ? const Color(0xFF0F172A)
                        : const Color(0xFFF1F5F9),
                  ),
                  Positioned(
                    top: -100,
                    right: -80,
                    child: Container(
                      width: 350,
                      height: 350,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.secondary.withValues(
                            alpha: isDark ? 0.12 : 0.08),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: -100,
                    left: -80,
                    child: Container(
                      width: 450,
                      height: 450,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary.withValues(
                            alpha: isDark ? 0.10 : 0.07),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                  Positioned.fill(
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
                      child: Container(color: Colors.transparent),
                    ),
                  ),
                ],
              ),
            ),

            // Content — CupertinoSliverNavigationBar (§4)
            CustomScrollView(
              physics: const BouncingScrollPhysics(
                parent: AlwaysScrollableScrollPhysics(),
              ),
              slivers: [
                // Large Title NavBar — chuẩn §4
                CupertinoSliverNavigationBar(
                  largeTitle: Text(
                    'Hợp đồng'.tr(),
                    style: TextStyle(
                      fontFamily: theme.textTheme.headlineLarge?.fontFamily,
                      fontWeight: FontWeight.w800,
                      letterSpacing: -0.5,
                      color: context.colors.onSurface,
                    ),
                  ),
                  backgroundColor:
                      theme.colorScheme.surface.withValues(alpha: 0.6),
                  border: null,
                ),

                // Sticky Segmented Control (§4)
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _SegmentedControlDelegate(isDark: isDark),
                ),

                // Contract list
                const SliverToBoxAdapter(child: SizedBox(height: 12)),
                ContractsSliverListView(),

                const SliverToBoxAdapter(child: SizedBox(height: 120)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Sticky header delegate for segmented control
class _SegmentedControlDelegate extends SliverPersistentHeaderDelegate {
  final bool isDark;

  _SegmentedControlDelegate({required this.isDark});

  @override
  double get minExtent => 60.0;
  @override
  double get maxExtent => 60.0;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
        child: Container(
          color: (isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9))
              .withValues(alpha: 0.75),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: const ContractsSegmentedControl(),
        ),
      ),
    );
  }

  @override
  bool shouldRebuild(_SegmentedControlDelegate oldDelegate) =>
      oldDelegate.isDark != isDark;
}
