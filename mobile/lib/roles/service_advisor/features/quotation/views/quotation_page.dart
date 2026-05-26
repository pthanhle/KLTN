import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import 'package:go_router/go_router.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../../shared/widgets/buttons/glass_menu_button.dart';
import '../controllers/quotation_controller.dart';
import '../widgets/shared/quotation_skeleton.dart';
import '../widgets/sections/technician_diagnosis_section.dart';
import '../widgets/sections/service_cart_section.dart';
import '../widgets/sections/promotions_section.dart';
import '../widgets/shared/quotation_summary_card.dart';

class QuotationPage extends ConsumerWidget {
  final String orderId;

  const QuotationPage({super.key, required this.orderId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncData = ref.watch(quotationControllerProvider);
    final theme = Theme.of(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          const MeshBackground(child: SizedBox()),

          CustomScrollView(
            physics: const BouncingScrollPhysics(
              parent: AlwaysScrollableScrollPhysics(),
            ),
            slivers: [
              // Liquid App Bar
              SliverAppBar(
                pinned: true,
                backgroundColor:
                    theme.colorScheme.surface.withValues(alpha: 0.6),
                flexibleSpace: ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
                    child: Container(color: Colors.transparent),
                  ),
                ),
                leading: Padding(
                  padding: const EdgeInsets.only(left: 8),
                  child: GlassNavBackButton(
                    onPressed: () => context.pop(),
                  ),
                ),
                title: Text(
                  'Lập Báo Giá'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                    color: theme.colorScheme.primary,
                  ),
                ),
                centerTitle: true,
                actions: [
                  Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: GlassMenuButton(
                      onPressed: () {},
                    ),
                  ),
                ],
              ),

              SliverToBoxAdapter(
                child: asyncData.when(
                  loading: () => const QuotationSkeleton(),
                  error: (err, stack) => Center(child: Text('Error: $err')),
                  data: (data) => Column(
                    children: [
                      const SizedBox(height: 24),
                      TechnicianDiagnosisSection(data: data),
                      const SizedBox(height: 32),
                      ServiceCartSection(),
                      const SizedBox(height: 32),
                      PromotionsSection(data: data),
                      const SizedBox(height: 32),
                      QuotationSummaryCard(data: data),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
