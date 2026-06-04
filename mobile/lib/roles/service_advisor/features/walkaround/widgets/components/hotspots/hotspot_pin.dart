import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class HotspotPin extends StatelessWidget {
  final VoidCallback onTap;
  final int index;

  const HotspotPin({super.key, required this.onTap, required this.index});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(
          color: theme.colorScheme.error,
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white, width: 2.5),
          boxShadow: [
            BoxShadow(
              color: theme.colorScheme.error.withValues(alpha: 0.55),
              blurRadius: 8,
              spreadRadius: 2,
            )
          ],
        ),
        child: Center(
          child: Text(
            '$index',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 11,
              fontWeight: FontWeight.w800,
              height: 1,
            ),
          ),
        ),
      ).animate(onPlay: (c) => c.repeat(reverse: true))
       .scale(begin: const Offset(1, 1), end: const Offset(1.15, 1.15), duration: 900.ms),
    );
  }
}
