import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class HotspotPin extends StatelessWidget {
  final VoidCallback onTap;

  const HotspotPin({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 24,
        height: 24,
        decoration: BoxDecoration(
          color: theme.colorScheme.error,
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white, width: 3),
          boxShadow: [
            BoxShadow(
              color: theme.colorScheme.error.withValues(alpha: 0.5),
              blurRadius: 8,
              spreadRadius: 2,
            )
          ],
        ),
      ).animate(onPlay: (c) => c.repeat(reverse: true))
       .scale(begin: const Offset(1, 1), end: const Offset(1.2, 1.2), duration: 800.ms),
    );
  }
}
