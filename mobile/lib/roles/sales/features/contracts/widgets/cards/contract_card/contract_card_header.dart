import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../models/vehicle_contract_list_model.dart';
import '../../atoms/contract_status_badge.dart';

class ContractCardHeader extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractCardHeader({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Flexible(
          child: Text(
            contract.contractNumber ?? '—',
            style: context.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: -0.3,
              color: context.colors.onSurface,
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
        const SizedBox(width: 12),
        ContractStatusBadge(status: contract.status),
      ],
    );
  }
}
