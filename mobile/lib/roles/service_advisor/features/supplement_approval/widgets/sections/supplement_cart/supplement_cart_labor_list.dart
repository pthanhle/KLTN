import 'package:flutter/material.dart';
import '../../../models/supplement_labor_model.dart';
import 'items/cart_labor_item.dart';

class SupplementCartLaborList extends StatelessWidget {
  final List<SupplementLaborModel> labors;
  final void Function(String id) onRemove;

  const SupplementCartLaborList({
    super.key,
    required this.labors,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    if (labors.isEmpty) return const SizedBox.shrink();

    return Column(
      children: labors.map((labor) => CartLaborItem(
        labor: labor,
        onRemove: () => onRemove(labor.id),
      )).toList(),
    );
  }
}
