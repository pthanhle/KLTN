import 'package:flutter/material.dart';

class ContractCardFooter extends StatelessWidget {
  final num grandTotal;
  final String formattedCurrency;

  const ContractCardFooter({super.key, required this.grandTotal, required this.formattedCurrency});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(vertical: 12.0),
          child: SizedBox(
            height: 0.5,
            child: ColoredBox(color: Color(0x22FFFFFF)),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Tổng tiền',
              style: TextStyle(
                fontSize: 14,
                color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
              ),
            ),
            Text(
              formattedCurrency,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: theme.colorScheme.primary,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
