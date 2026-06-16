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
import 'widgets/vehicle_selection/lists/vehicle_unit_list_view.dart';
import 'contract_pricing_page.dart';

class ContractVehicleSelectionPage extends ConsumerStatefulWidget {
  const ContractVehicleSelectionPage({super.key});

  @override
  ConsumerState<ContractVehicleSelectionPage> createState() => _ContractVehicleSelectionPageState();
}

class _ContractVehicleSelectionPageState extends ConsumerState<ContractVehicleSelectionPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(contractBuilderControllerProvider.notifier).fetchAvailableVehicleUnits();
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final state = ref.watch(contractBuilderControllerProvider);

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
                      'Chọn Xe Vật Lý'.tr(),
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
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                    sliver: SliverToBoxAdapter(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            Icon(CupertinoIcons.car_detailed, color: theme.colorScheme.primary),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                '${'Mẫu xe yêu cầu:'.tr()} ${state.sourceTask?.vehicleModel ?? ''}',
                                style: TextStyle(
                                  color: theme.colorScheme.primary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  VehicleUnitListView(
                    isLoading: state.isLoading,
                    vehicleUnits: state.availableVehicleUnits,
                    selectedUnitId: state.payload?.vehicleUnitId,
                    onSelectUnit: (unit) {
                      ref.read(contractBuilderControllerProvider.notifier).selectVehicleUnit(unit);
                    },
                  ),
                  const SliverPadding(padding: EdgeInsets.only(bottom: 120)),
                ],
              ),
              const _VehicleBottomBar(),
            ],
          ),
        ),
      ),
    );
  }
}

class _VehicleBottomBar extends ConsumerWidget {
  const _VehicleBottomBar();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(contractBuilderControllerProvider);
    final hasSelectedUnit = state.payload != null && state.payload!.vehicleUnitId.isNotEmpty;

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
            child: Opacity(
              opacity: hasSelectedUnit ? 1.0 : 0.5,
              child: LiquidButton(
                onPressed: () {
                  if (hasSelectedUnit) {
                    Navigator.of(context).push(
                      CupertinoPageRoute(
                        builder: (context) => const ContractPricingPage(),
                      ),
                    );
                  }
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Tiếp tục - Chốt giá'.tr(),
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
    );
  }
}
