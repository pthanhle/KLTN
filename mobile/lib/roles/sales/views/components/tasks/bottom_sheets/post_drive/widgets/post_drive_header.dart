import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class PostDriveHeader extends StatelessWidget {
  const PostDriveHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Stack(
      alignment: Alignment.topCenter,
      children: [
        Align(
          alignment: Alignment.topRight,
          child: IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: const Icon(Icons.close, size: 20),
            style: IconButton.styleFrom(
              backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.5),
              foregroundColor: theme.colorScheme.onSurface.withValues(alpha: 0.8),
              padding: const EdgeInsets.all(8),
              minimumSize: const Size(36, 36),
            ),
          ),
        ),
        Column(
          children: [
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.rate_review_rounded,
                color: theme.colorScheme.primary,
                size: 28,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              tr('Đánh giá lái thử'),
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.onSurface,
                letterSpacing: -0.5,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
