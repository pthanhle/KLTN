import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/tech_task_model.dart';

class TechTaskCardHeader extends StatelessWidget {
  final TechTaskModel task;
  final Color urgencyColor;
  final String urgencyText;

  const TechTaskCardHeader({
    super.key,
    required this.task,
    required this.urgencyColor,
    required this.urgencyText,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    // Format booking date for display (yyyy-MM-dd → dd/MM)
    String? displayDate;
    if (task.bookingDate != null) {
      final parts = task.bookingDate!.split('-');
      if (parts.length == 3) displayDate = '${parts[2]}/${parts[1]}';
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Car icon
        Container(
          width: 48,
          height: 48,
          decoration: ShapeDecoration(
            color: urgencyColor.withValues(alpha: 0.12),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
            ),
          ),
          child: Icon(CupertinoIcons.car_detailed, color: urgencyColor, size: 24),
        ),
        const SizedBox(width: 12),

        // Plate, model, booking code & sequence
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Plate number (main identifier)
              Text(
                task.plate.isNotEmpty ? task.plate : '—',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.5,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              const SizedBox(height: 2),
              // Car model
              Text(
                task.model.isNotEmpty ? task.model : '—',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
                ),
              ),
              const SizedBox(height: 6),
              Row(
                children: [
                  if (task.bookingCode != null) ...[
                    Flexible(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                        decoration: ShapeDecoration(
                          color: (isDark ? Colors.white : Colors.black).withValues(alpha: 0.06),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(cornerRadius: 6, cornerSmoothing: 1.0),
                            side: BorderSide(
                              color: (isDark ? Colors.white : Colors.black).withValues(alpha: 0.10),
                              width: 0.5,
                            ),
                          ),
                        ),
                        child: Text(
                          task.bookingCode!,
                          overflow: TextOverflow.ellipsis,
                          style: theme.textTheme.labelSmall?.copyWith(
                            fontFamily: 'monospace',
                            fontSize: 10,
                            color: theme.colorScheme.onSurfaceVariant,
                            letterSpacing: 0.2,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 6),
                  ],
                  if (task.sequenceNumber != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                      decoration: ShapeDecoration(
                        color: urgencyColor.withValues(alpha: 0.10),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 6, cornerSmoothing: 1.0),
                          side: BorderSide(
                            color: urgencyColor.withValues(alpha: 0.20),
                            width: 0.5,
                          ),
                        ),
                      ),
                      child: Text(
                        '#${task.sequenceNumber}',
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: urgencyColor,
                          letterSpacing: 0.3,
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),

        // Right column: urgency badge + date
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: ShapeDecoration(
                color: urgencyColor.withValues(alpha: 0.12),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: urgencyColor.withValues(alpha: 0.20),
                    width: 0.5,
                  ),
                ),
              ),
              child: Text(
                urgencyText,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.5,
                  color: urgencyColor,
                ),
              ),
            ),
            if (displayDate != null) ...[
              const SizedBox(height: 6),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    CupertinoIcons.calendar,
                    size: 11,
                    color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
                  ),
                  const SizedBox(width: 3),
                  Text(
                    displayDate,
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.7),
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ],
    );
  }
}
