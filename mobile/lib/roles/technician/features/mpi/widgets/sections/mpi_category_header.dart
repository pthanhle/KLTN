import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../buttons/mpi_pass_all_button.dart';

class MpiCategoryHeader extends StatelessWidget {
  final String title;
  final bool isExpanded;
  final VoidCallback onToggle;
  final VoidCallback onPassAll;
  final bool isAllPassed;

  const MpiCategoryHeader({
    super.key,
    required this.title,
    required this.isExpanded,
    required this.onToggle,
    required this.onPassAll,
    required this.isAllPassed,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: onToggle,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            AnimatedRotation(
              turns: isExpanded ? 0.5 : 0.0,
              duration: const Duration(milliseconds: 200),
              child: Icon(
                CupertinoIcons.chevron_down,
                size: 18,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.70),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                title,
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ),
            MpiPassAllButton(
              onTap: onPassAll,
              isAllPassed: isAllPassed,
            ),
          ],
        ),
      ),
    );
  }
}
