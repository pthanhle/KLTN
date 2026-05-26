import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:ttauto_staff/shared/widgets/buttons/glass_nav_back_button.dart';

class JobExecutionNavBar extends StatelessWidget {
  final String plate;

  const JobExecutionNavBar({super.key, required this.plate});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return CupertinoSliverNavigationBar(
      largeTitle: Text(
        plate,
        style: TextStyle(
          fontFamily: 'Hanken Grotesk',
          fontWeight: FontWeight.bold,
          letterSpacing: -0.5,
          color: theme.colorScheme.onSurface,
        ),
      ),
      backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
      border: null,
      leading: GlassNavBackButton(),
    );
  }
}
