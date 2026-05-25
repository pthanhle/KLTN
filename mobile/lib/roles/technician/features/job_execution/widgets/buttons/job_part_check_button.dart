import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class JobPartCheckButton extends StatelessWidget {
  final bool isCompleted;
  final VoidCallback onTap;

  const JobPartCheckButton({
    super.key,
    required this.isCompleted,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        height: 32,
        width: 32,
        decoration: ShapeDecoration(
          color: isCompleted
              ? const Color(0xFF34C759)
              : Colors.transparent,
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isCompleted
                  ? const Color(0xFF34C759)
                  : Theme.of(context).colorScheme.onSurfaceVariant.withValues(alpha: 0.30),
              width: 1.5,
            ),
          ),
        ),
        child: isCompleted
            ? const Center(
                child: Icon(CupertinoIcons.checkmark_alt, color: Colors.white, size: 18),
              )
            : null,
      ),
    );
  }
}
