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
    
    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        onTap();
      },
      behavior: HitTestBehavior.opaque,
      child: AnimatedScale(
        scale: 1.0,
        duration: const Duration(milliseconds: 150),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOutCubic,
          padding: const EdgeInsets.all(16),
          decoration: ShapeDecoration(
            color: isSelected 
                ? theme.colorScheme.primaryContainer.withValues(alpha: 0.3)
                : theme.colorScheme.surface.withValues(alpha: 0.6),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
              side: BorderSide(
                color: isSelected
                    ? theme.colorScheme.primary.withValues(alpha: 0.3)
                    : Colors.white.withValues(alpha: 0.2),
              ),
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      labor.id,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      labor.name,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(
                          CupertinoIcons.clock,
                          size: 14,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${labor.estimatedHours}h',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          '•',
                          style: TextStyle(color: theme.colorScheme.onSurfaceVariant),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(labor.price),
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: isSelected 
                                ? theme.colorScheme.primary 
                                : theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              // Checkmark
              AnimatedOpacity(
                duration: const Duration(milliseconds: 200),
                opacity: isSelected ? 1.0 : 0.0,
                child: Icon(
                  CupertinoIcons.check_mark_circled_solid,
                  color: theme.colorScheme.primary,
                  size: 28,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
