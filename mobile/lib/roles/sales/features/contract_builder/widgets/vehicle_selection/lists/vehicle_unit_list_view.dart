import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../models/vehicle_unit_model.dart';
import '../cards/vehicle_unit_card.dart';
import '../cards/vehicle_unit_card_skeleton.dart';
import 'vehicle_unit_empty_state.dart';

class VehicleUnitListView extends StatelessWidget {
  final bool isLoading;
  final List<VehicleUnitModel> vehicleUnits;
  final String? selectedUnitId;
  final ValueChanged<VehicleUnitModel> onSelectUnit;

  const VehicleUnitListView({
    super.key,
    required this.isLoading,
    required this.vehicleUnits,
    this.selectedUnitId,
    required this.onSelectUnit,
  });

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return const Padding(
                padding: EdgeInsets.only(bottom: 16),
                child: VehicleUnitCardSkeleton(),
              );
            },
            childCount: 3,
          ),
        ),
      );
    }

    if (vehicleUnits.isEmpty) {
      return const SliverToBoxAdapter(
        child: VehicleUnitEmptyState(),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final unit = vehicleUnits[index];
            final isSelected = unit.id == selectedUnitId;
            return Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: VehicleUnitCard(
                unit: unit,
                isSelected: isSelected,
                onTap: () => onSelectUnit(unit),
              ),
            );
          },
          childCount: vehicleUnits.length,
        ),
      ),
    );
  }
}
