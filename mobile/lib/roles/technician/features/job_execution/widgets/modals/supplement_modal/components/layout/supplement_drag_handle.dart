import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SupplementDragHandle extends StatelessWidget {
  const SupplementDragHandle({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(top: 12, bottom: 8),
      width: 48,
      height: 5,
      decoration: BoxDecoration(
        color: theme.colorScheme.onSurface.withValues(alpha: 0.20),
        borderRadius: BorderRadius.circular(3),
      ),
    );
  }
}
