import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

/// §6: Drag handle pill — 36×4px, borderRadius(2), alpha: 0.20
class SupplementDragHandle extends StatelessWidget {
  const SupplementDragHandle({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(top: 12, bottom: 8),
      width: 36,   // §6: 36px, KHÔNG phải 48px
      height: 4,   // §6: 4px, KHÔNG phải 5px
      decoration: BoxDecoration(
        color: theme.colorScheme.onSurface.withValues(alpha: 0.20),
        borderRadius: BorderRadius.circular(2), // §6: radius(2), KHÔNG phải radius(3)
      ),
    );
  }
}
