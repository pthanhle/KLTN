import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class UrgentActionCard extends StatelessWidget {
  final String title;
  final String count;
  final IconData icon;
  final Color baseColor;
  final VoidCallback onTap;

  const UrgentActionCard({
    super.key,
    required this.title,
    required this.count,
    required this.icon,
    required this.baseColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: ShapeDecoration(
          color: baseColor.withValues(alpha: 0.1),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: baseColor.withValues(alpha: 0.3),
              width: 1,
            ),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: ShapeDecoration(
                  color: baseColor.withValues(alpha: 0.2),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 16,
                      cornerSmoothing: 1.0,
                    ),
                  ),
                  shadows: [
                    BoxShadow(
                      color: baseColor.withValues(alpha: 0.4),
                      blurRadius: 15,
                      offset: Offset.zero,
                    ),
                  ],
                ),
                  child: Icon(
                    icon,
                    color: baseColor.withValues(alpha: 0.8),
                    size: 18,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    title,
                    style: TextStyle(
                      fontSize: 15,
                      color: isDark ? baseColor.withValues(alpha: 0.9) : baseColor.withValues(alpha: 1.0),
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              count,
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
                color: isDark ? Colors.white : Colors.black87,
              ),
            ),
          ],
        ),
        ),
    );
  }
}
