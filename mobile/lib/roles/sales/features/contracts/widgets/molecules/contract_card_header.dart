import 'package:flutter/material.dart';
import '../../models/vehicle_contract_list_model.dart';
import '../atoms/contract_status_badge.dart';

class ContractCardHeader extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractCardHeader({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          contract.contractNumber ?? 'VHD-PENDING',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.onSurface,
          ),
        ),
        ContractStatusBadge(status: contract.status),
      ],
    );
  }
}
