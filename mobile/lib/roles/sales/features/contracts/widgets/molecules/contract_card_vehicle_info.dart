import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ContractCardVehicleInfo extends StatelessWidget {
  final String carName;
  final String vin;

  const ContractCardVehicleInfo({super.key, required this.carName, required this.vin});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      children: [
        Icon(
          CupertinoIcons.car_detailed,
          size: 16,
          color: theme.colorScheme.onSurface.withValues(alpha: 0.5),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            '$carName • $vin',
            style: TextStyle(
              fontSize: 14,
              color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}
