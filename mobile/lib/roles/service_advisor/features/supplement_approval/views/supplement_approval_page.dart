import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../controllers/supplement_controller.dart';
import '../widgets/shared/supplement_skeleton.dart';
import '../widgets/shared/glass_warning_banner.dart';
import '../widgets/sections/supplement_issue_section.dart';
import '../widgets/sections/financial_impact_section.dart';
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
                  elevation: 0,
                  pinned: true,
                  leading: IconButton(
                    icon: const Icon(CupertinoIcons.back),
                    onPressed: () => context.pop(),
                  ),
                  actions: [
                    IconButton(
                      icon: const Icon(CupertinoIcons.ellipsis_vertical),
                      onPressed: () {},
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
                          description: data.issueDescription,
                          imageUrl: data.evidenceMediaUrl,
                        ),
                        const SizedBox(height: SupplementConstants.sectionSpacing),
                        FinancialImpactSection(
                          oldCost: data.oldCost,
                          newCost: data.newCost,
                        ),
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
            
            // Bottom Action Button
            if (state.hasValue)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                    child: Container(
                      padding: EdgeInsets.only(
                        left: SupplementConstants.cardPadding,
                        right: SupplementConstants.cardPadding,
                        top: 16,
                        bottom: bottomSafeArea > 0 ? bottomSafeArea : SupplementConstants.cardPadding,
                      ),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                          colors: [
                            theme.scaffoldBackgroundColor,
                            theme.scaffoldBackgroundColor.withValues(alpha: 0.5),
                          ],
                        ),
                        border: Border(
                          top: BorderSide(
                            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2),
                            width: 0.5,
                          ),
                        ),
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
          ],
        ),
      ),
    );
  }
}
