import 'package:flutter/material.dart';
import '../../../models/user_model.dart';
import '../../../../../shared/widgets/loaders/skeleton_loader.dart';

class ProfileHeader extends StatelessWidget {
  final UserModel? user;

  const ProfileHeader({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    if (user == null) {
      return const Column(
        children: [
          SizedBox(height: 16),
          SkeletonLoader(width: 200, height: 32, borderRadius: BorderRadius.all(Radius.circular(8))),
          SizedBox(height: 8),
          SkeletonLoader(width: 100, height: 20, borderRadius: BorderRadius.all(Radius.circular(4))),
          SizedBox(height: 12),
          SkeletonLoader(width: 120, height: 28, borderRadius: BorderRadius.all(Radius.circular(14))),
        ],
      );
    }

    return Column(
      children: [
        const SizedBox(height: 16),
        Text(
          user!.fullName,
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 4),
        Text(
          user!.employeeId,
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurfaceVariant,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(100),
            border: Border.all(
              color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.2),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                user!.role.replaceAll('_', ' '),
                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                  color: Theme.of(context).colorScheme.primary,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
