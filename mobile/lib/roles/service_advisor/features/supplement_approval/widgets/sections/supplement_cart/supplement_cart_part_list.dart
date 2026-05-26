import 'package:flutter/material.dart';
import '../../../models/supplement_part_model.dart';
import 'items/cart_part_item.dart';

class SupplementCartPartList extends StatelessWidget {
  final List<SupplementPartModel> parts;
  final void Function(String id, int quantity) onUpdateQuantity;
  final void Function(String id) onRemove;

  const SupplementCartPartList({
    super.key,
    required this.parts,
    required this.onUpdateQuantity,
    required this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    if (parts.isEmpty) return const SizedBox.shrink();

    return Column(
      children: parts.map((part) => CartPartItem(
        part: part,
        onQuantityChanged: (qty) => onUpdateQuantity(part.id, qty),
        onRemove: () => onRemove(part.id),
      )).toList(),
    );
  }
}
