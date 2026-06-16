import 'package:flutter/material.dart';
import '../../../../models/vehicle_unit_model.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';

class VehicleCardSpecs extends StatelessWidget {
  final VehicleUnitModel unit;

  const VehicleCardSpecs({super.key, required this.unit});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Row(
      children: [
        _buildSpecItem(
          context,
          'Màu sắc',
          unit.color ?? 'N/A',
        ),
        Container(
          width: 1,
          height: 30,
          color: theme.colorScheme.onSurface.withValues(alpha: 0.1),
          margin: const EdgeInsets.symmetric(horizontal: 16),
        ),
        _buildSpecItem(
          context,
          'Số máy',
          unit.engineNumber ?? 'N/A',
        ),
      ],
    );
  }

  Widget _buildSpecItem(BuildContext context, String label, String value) {
    final theme = Theme.of(context);
    
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurface.withValues(alpha: 0.5),
            ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }
}
