import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../models/vehicle_contract_list_model.dart';

class ContractCardVehicle extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractCardVehicle({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    final name = contract.vehicleSnapshot?.name ?? '—';
    final vin = contract.vehicleSnapshot?.vin;

    return Row(
      children: [
        Icon(
          CupertinoIcons.car_detailed,
          size: 14,
          color: context.colors.onSurface.withValues(alpha: 0.45),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            vin != null && vin.isNotEmpty ? '$name · $vin' : name,
            style: context.textTheme.bodySmall?.copyWith(
              color: context.colors.onSurface.withValues(alpha: 0.55),
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}
