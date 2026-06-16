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
import 'widgets/customer_form/forms/personal_info_form.dart';
import 'widgets/customer_form/forms/contact_info_form.dart';
import 'contract_vehicle_selection_page.dart';

class ContractCustomerPage extends ConsumerWidget {
  const ContractCustomerPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final state = ref.watch(contractBuilderControllerProvider);
    final controller = ref.read(contractBuilderControllerProvider.notifier);

    final customerSnapshot = state.payload?.customerSnapshot;

    if (customerSnapshot == null) {
      return const CupertinoPageScaffold(
        backgroundColor: Colors.transparent,
        child: Center(child: CupertinoActivityIndicator()),
      );
    }

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
                      'Khách hàng'.tr(),
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
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
                    sliver: SliverList(
                      delegate: SliverChildListDelegate([
                        Text(
                          'Thông tin chung'.tr(),
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSurface,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 16),
                        PersonalInfoForm(
                          customerSnapshot: customerSnapshot,
                          onChanged: controller.updateCustomerInfo,
                        ),
                        const SizedBox(height: 32),
                        Text(
                          'Thông tin liên hệ'.tr(),
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSurface,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 16),
                        ContactInfoForm(
                          customerSnapshot: customerSnapshot,
                          onChanged: controller.updateCustomerInfo,
                        ),
                        const SizedBox(height: 120),
                      ]),
                    ),
                  ),
                ],
              ),
              const _CustomerBottomBar(),
            ],
          ),
        ),
      ),
    );
  }
}

class _CustomerBottomBar extends ConsumerWidget {
  const _CustomerBottomBar();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Positioned(
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
                Navigator.of(context).push(
                  CupertinoPageRoute(
                    builder: (context) => const ContractVehicleSelectionPage(),
                  ),
                );
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Tiếp tục - Chọn Xe'.tr(),
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
    );
  }
}
