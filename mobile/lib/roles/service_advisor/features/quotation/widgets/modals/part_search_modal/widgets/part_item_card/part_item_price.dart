import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class PartItemPrice extends StatelessWidget {
  final double price;

  const PartItemPrice({super.key, required this.price});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Text(
      NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(price),
      style: theme.textTheme.titleSmall?.copyWith(
        fontWeight: FontWeight.w700,
        color: theme.colorScheme.primary,
        letterSpacing: -0.3,
      ),
    );
  }
}
