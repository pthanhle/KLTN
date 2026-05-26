import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../../shared/widgets/buttons/glass_menu_button.dart';
import '../controllers/supplement_controller.dart';
import '../widgets/shared/supplement_skeleton.dart';
import '../widgets/shared/glass_warning_banner.dart';
import '../widgets/sections/supplement_issue_section.dart';
import '../widgets/sections/supplement_cart/supplement_cart_section.dart';
import '../widgets/sections/supplement_summary/supplement_summary_section.dart';
import '../widgets/sections/supplement_actions/supplement_add_part_button.dart';
import '../widgets/sections/supplement_actions/supplement_add_labor_button.dart';
import '../widgets/sections/timeline_impact_section.dart';
import '../constants/supplement_constants.dart';
import '../widgets/shared/vibrant_liquid_button.dart';

class SupplementApprovalPage extends ConsumerWidget {
  final String supplementId;

  const SupplementApprovalPage({super.key, required this.supplementId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(supplementControllerProvider);
    final controller = ref.read(supplementControllerProvider.notifier);
    final theme = Theme.of(context);
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: Stack(
          children: [
            CustomScrollView(
              slivers: [
                SliverAppBar.large(
                  backgroundColor: Colors.transparent,
                  surfaceTintColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  scrolledUnderElevation: 0,
                  forceMaterialTransparency: true,
                  elevation: 0,
                  pinned: true,
                  leading: Padding(
                    padding: const EdgeInsets.only(left: 8),
                    child: GlassNavBackButton(
                      onPressed: () => context.pop(),
                    ),
                  ),
                  actions: [
                    Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: GlassMenuButton(
                        onPressed: () {},
                      ),
                    ),
                  ],
                  flexibleSpace: FlexibleSpaceBar(
                    titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    title: Text(
                      'Duyệt Bổ Sung'.tr(),
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ),
                ),
                
                state.when(
                  loading: () => const SliverFillRemaining(
                    child: SupplementSkeleton(),
                  ),
                  error: (error, stack) => SliverFillRemaining(
                    child: Center(child: Text('Đã xảy ra lỗi'.tr())),
                  ),
                  data: (data) => SliverPadding(
                    padding: const EdgeInsets.only(
                      left: SupplementConstants.pagePaddingX, 
                      right: SupplementConstants.pagePaddingX, 
                      bottom: SupplementConstants.pagePaddingBottom,
                    ),
                    sliver: SliverList(
                      delegate: SliverChildListDelegate([
                        const SizedBox(height: 8),
                        GlassWarningBanner(
                          icon: CupertinoIcons.exclamationmark_triangle_fill,
                          title: 'LỆNH ĐANG TẠM DỪNG'.tr(),
                          subtitle: 'Cần duyệt gấp để tiếp tục sửa chữa'.tr(),
                        ),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        SupplementIssueSection(
                          title: data.issueTitle,
                          description: data.technicianNote,
                          proposedFix: data.actionRequired,
                          mechanicName: data.mechanicName,
                          mechanicRole: data.mechanicRole,
                          imageUrls: data.evidenceMediaUrls,
                        ),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        const SupplementCartSection(),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        const Row(
                          children: [
                            Expanded(child: SupplementAddPartButton()),
                            const SizedBox(width: 12),
                            Expanded(child: SupplementAddLaborButton()),
                          ],
                        ),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        const SupplementSummarySection(),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        TimelineImpactSection(
                          oldTime: data.oldDeliveryTime,
                          newTime: data.newDeliveryTime,
                          delayReason: data.delayReason,
                        ),
                      ]),
                    ),
                  ),
                ),
              ],
            ),
            if (state.hasValue)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: Container(
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.surface.withValues(alpha: 0.60),
                    shape: SmoothRectangleBorder(
                      borderRadius: const SmoothBorderRadius.only(
                        topLeft: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                        topRight: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: 0.20),
                        width: 0.5,
                      ),
                    ),
                    shadows: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.10),
                        blurRadius: 20,
                        offset: const Offset(0, -4),
                      ),
                    ],
                  ),
                  child: ClipSmoothRect(
                    radius: const SmoothBorderRadius.only(
                      topLeft: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                      topRight: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                      child: Padding(
                        padding: EdgeInsets.only(
                          left: SupplementConstants.cardPadding,
                          right: SupplementConstants.cardPadding,
                          top: 16,
                          bottom: bottomSafeArea > 0
                              ? bottomSafeArea
                              : SupplementConstants.cardPadding,
                        ),
                        child: VibrantLiquidButton(
                          text: 'Gửi Yêu Cầu Duyệt Bổ Sung'.tr(),
                          icon: CupertinoIcons.paperplane_fill,
                          onPressed: () => controller.submitApproval(),
                          isLoading: state.isLoading,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
