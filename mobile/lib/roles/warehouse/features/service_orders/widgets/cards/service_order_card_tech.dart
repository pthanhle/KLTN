import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/service_order_model.dart';

class ServiceOrderCardTech extends StatelessWidget {
  final AssignedTechnician technician;

  const ServiceOrderCardTech({
    super.key,
    required this.technician,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final fallbackAvatar = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(technician.name)}';

    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: theme.colorScheme.surface, width: 2),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 4,
              ),
            ],
            image: DecorationImage(
              image: NetworkImage(technician.avatarUrl ?? fallbackAvatar),
              fit: BoxFit.cover,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                technician.name,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                technician.role,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
        ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: ShapeDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.12),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                  side: BorderSide(color: theme.colorScheme.primary.withValues(alpha: 0.25), width: 0.5),
                ),
              ),
              child: Text(
                technician.bayNumber,
                style: theme.textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.primary,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
