import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../models/vehicle_contract_list_model.dart';

class ContractCardCustomer extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractCardCustomer({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    final name = contract.customerSnapshot?.fullName ?? '—';
    final phone = contract.customerSnapshot?.phone ?? '—';

    return Row(
      children: [
        Icon(
          CupertinoIcons.person,
          size: 14,
          color: context.colors.onSurface.withValues(alpha: 0.45),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: Text(
            '$name · $phone',
            style: context.textTheme.bodySmall?.copyWith(
              color: context.colors.onSurface.withValues(alpha: 0.65),
              fontWeight: FontWeight.w500,
            ),
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}
