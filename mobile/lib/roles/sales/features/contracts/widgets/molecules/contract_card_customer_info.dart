import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ContractCardCustomerInfo extends StatelessWidget {
  final String customerName;

  const ContractCardCustomerInfo({super.key, required this.customerName});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Row(
      children: [
        Icon(
          CupertinoIcons.person,
          size: 16,
          color: theme.colorScheme.primary,
        ),
        const SizedBox(width: 8),
        Text(
          customerName,
          style: TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface.withValues(alpha: 0.9),
          ),
        ),
      ],
    );
  }
}
