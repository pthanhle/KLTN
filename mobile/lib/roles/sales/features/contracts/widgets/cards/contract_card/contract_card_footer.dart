import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import '../../../models/vehicle_contract_list_model.dart';
import '../../../utils/contract_formatters.dart';

class ContractCardFooter extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractCardFooter({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    final grandTotal = contract.pricingSnapshot?.grandTotal;
    final createdAt = contract.createdAt;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // Date
        Text(
          createdAt != null
              ? ContractFormatters.formatDate(createdAt)
              : '—',
          style: context.textTheme.labelSmall?.copyWith(
            color: context.colors.onSurface.withValues(alpha: 0.40),
            fontWeight: FontWeight.w500,
          ),
        ),
        // Price
        Text(
          grandTotal != null
              ? ContractFormatters.formatCurrency(grandTotal)
              : '—',
          style: context.textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w700,
            color: context.colors.primary,
            letterSpacing: -0.2,
          ),
        ),
      ],
    );
  }
}
