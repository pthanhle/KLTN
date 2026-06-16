import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';
import 'package:ttauto_staff/shared/widgets/backgrounds/mesh_background.dart';
import 'package:ttauto_staff/shared/widgets/buttons/glass_close_button.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';
import 'controllers/contract_builder_controller.dart';
import 'widgets/pricing_form/cards/pricing_summary_card.dart';
import 'widgets/pricing_form/forms/pricing_adjustments_form.dart';
import 'widgets/review_sheet/contract_review_sheet.dart';

class ContractPricingPage extends ConsumerWidget {
  const ContractPricingPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(contractBuilderControllerProvider);
    final controller = ref.read(contractBuilderControllerProvider.notifier);
    final theme = Theme.of(context);

    if (state.payload == null || state.payload!.pricingSnapshot == null) {
      return const CupertinoPageScaffold(
        child: Center(child: CupertinoActivityIndicator()),
      );
    }

    final pricing = state.payload!.pricingSnapshot;

    return CupertinoPageScaffold(
      backgroundColor: Colors.transparent,
      child: Material(
        type: MaterialType.transparency,
        child: MeshBackground(
          child: Stack(
            children: [
              CustomScrollView(
                physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
                slivers: [
                  CupertinoSliverNavigationBar(
                    largeTitle: Text(
                      'Chốt giá & Chi phí'.tr(),
                      style: TextStyle(
                        fontFamily: 'Hanken Grotesk',
                        fontWeight: FontWeight.bold,
                        letterSpacing: -0.5,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
                    border: null,
                    trailing: GlassCloseButton(
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ),
                  SliverPadding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),
                    sliver: SliverToBoxAdapter(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          PricingSummaryCard(pricing: pricing),
                          const SizedBox(height: 32),
                          PricingAdjustmentsForm(
                            discount: pricing.discount,
                            vat: pricing.vat,
                            registrationFee: pricing.registrationFee,
                            insuranceFee: pricing.insuranceFee,
                            otherFees: pricing.otherFees,
                            onDiscountChanged: (v) => controller.updatePricing(discount: v),
                            onVatChanged: (v) => controller.updatePricing(vat: v),
                            onRegistrationFeeChanged: (v) => controller.updatePricing(registrationFee: v),
                            onInsuranceFeeChanged: (v) => controller.updatePricing(insuranceFee: v),
                            onOtherFeesChanged: (v) => controller.updatePricing(otherFees: v),
                          ),
                          const SizedBox(height: 120), 
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                    child: Container(
                      padding: EdgeInsets.only(
                        top: 16,
                        left: 20,
                        right: 20,
                        bottom: MediaQuery.of(context).padding.bottom + 16,
                      ),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            Theme.of(context).colorScheme.surface.withValues(alpha: 0.0),
                            Theme.of(context).colorScheme.surface.withValues(alpha: 0.8),
                          ],
                        ),
                      ),
                      child: LiquidButton(
                        onPressed: () {
                          ContractReviewSheet.show(context);
                        },
                        isLoading: state.isSubmitting,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              'Review Hợp đồng'.tr(),
                              style: const TextStyle(fontWeight: FontWeight.w700, letterSpacing: -0.4),
                            ),
                            const SizedBox(width: 8),
                            const Icon(CupertinoIcons.arrow_right, size: 18, color: Colors.white),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
