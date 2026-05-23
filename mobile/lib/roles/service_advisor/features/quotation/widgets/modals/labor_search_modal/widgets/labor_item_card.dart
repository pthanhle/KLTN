import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../models/labor_item_model.dart';

class LaborItemCard extends StatelessWidget {
  final LaborItemModel labor;
  final bool isSelected;
  final VoidCallback onTap;

  const LaborItemCard({
    super.key,
    required this.labor,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        onTap();
      },
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOutCubic,
        decoration: ShapeDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: isDark ? 0.15 : 0.08)
              : Colors.white.withValues(alpha: isDark ? 0.05 : 0.60),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isSelected
                  ? theme.colorScheme.primary.withValues(alpha: 0.30)
                  : Colors.white.withValues(alpha: isDark ? 0.10 : 0.70),
              width: isSelected ? 1.0 : 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.20 : 0.04),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius:
              SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          labor.id,
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant
                                .withValues(alpha: 0.70),
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0.4,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          labor.name,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                            letterSpacing: -0.2,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Icon(
                              CupertinoIcons.clock,
                              size: 13,
                              color: theme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.60),
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${labor.estimatedHours}h',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: theme.colorScheme.onSurfaceVariant
                                    .withValues(alpha: 0.70),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Container(
                              width: 3,
                              height: 3,
                              decoration: BoxDecoration(
                                color: theme.colorScheme.onSurfaceVariant
                                    .withValues(alpha: 0.30),
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 10),
                            Text(
                              NumberFormat.currency(
                                      locale: 'vi_VN', symbol: 'đ')
                                  .format(labor.price),
                              style: theme.textTheme.bodySmall?.copyWith(
                                fontWeight: FontWeight.w700,
                                color: isSelected
                                    ? theme.colorScheme.primary
                                    : theme.colorScheme.onSurface,
                                letterSpacing: -0.2,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 12),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 200),
                    transitionBuilder: (child, anim) => ScaleTransition(
                      scale: anim,
                      child: child,
                    ),
                    child: isSelected
                        ? Container(
                            key: const ValueKey('selected'),
                            width: 28,
                            height: 28,
                            decoration: ShapeDecoration(
                              color: theme.colorScheme.primary
                                  .withValues(alpha: 0.15),
                              shape: SmoothRectangleBorder(
                                borderRadius: SmoothBorderRadius(
                                    cornerRadius: 9,
                                    cornerSmoothing: 1.0),
                                side: BorderSide(
                                  color: theme.colorScheme.primary
                                      .withValues(alpha: 0.30),
                                  width: 0.5,
                                ),
                              ),
                            ),
                            child: Center(
                              child: Icon(
                                CupertinoIcons.checkmark,
                                color: theme.colorScheme.primary,
                                size: 14,
                              ),
                            ),
                          )
                        : Container(
                            key: const ValueKey('unselected'),
                            width: 28,
                            height: 28,
                            decoration: ShapeDecoration(
                              color: Colors.white
                                  .withValues(alpha: isDark ? 0.06 : 0.40),
                              shape: SmoothRectangleBorder(
                                borderRadius: SmoothBorderRadius(
                                    cornerRadius: 9,
                                    cornerSmoothing: 1.0),
                                side: BorderSide(
                                  color: Colors.white.withValues(
                                      alpha: isDark ? 0.12 : 0.50),
                                  width: 0.5,
                                ),
                              ),
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
