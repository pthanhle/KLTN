import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import 'package:go_router/go_router.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../controllers/quotation_controller.dart';
import '../widgets/shared/quotation_skeleton.dart';
import '../widgets/sections/technician_diagnosis_section.dart';
import '../widgets/sections/service_cart_section.dart';
import '../widgets/sections/promotions_section.dart';
import '../widgets/shared/quotation_bottom_sheet.dart';

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
            slivers: [
              // Liquid App Bar
              SliverAppBar(
                pinned: true,
                backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
                flexibleSpace: ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
                    child: Container(color: Colors.transparent),
                  ),
                ),
                leading: IconButton(
                  icon: const Icon(CupertinoIcons.back),
                  color: theme.colorScheme.primary,
                  onPressed: () => context.pop(),
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
                  IconButton(
                    icon: const Icon(CupertinoIcons.ellipsis),
                    color: theme.colorScheme.primary,
                    onPressed: () {},
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
                      ServiceCartSection(data: data),
                      const SizedBox(height: 32),
                      PromotionsSection(data: data),
                      const SizedBox(height: 400), // Padding for sticky bottom sheet
                    ],
                  ),
                ),
              ),
            ],
          ),

          // Sticky Bottom Sheet
          if (asyncData.hasValue && asyncData.value != null)
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: QuotationBottomSheet(data: asyncData.value!),
            ),
        ],
      ),
    );
  }
}
