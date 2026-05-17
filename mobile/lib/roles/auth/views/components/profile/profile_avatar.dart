import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../../../shared/widgets/loaders/skeleton_loader.dart';

class ProfileAvatar extends StatelessWidget {
  final String? avatarUrl;

  const ProfileAvatar({super.key, this.avatarUrl});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          width: 112,
          height: 112,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.2),
              width: 3,
            ),
            boxShadow: [
              BoxShadow(
                color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.15),
                blurRadius: 40,
                spreadRadius: 0,
              )
            ],
          ),
          child: ClipOval(
            child: avatarUrl != null && avatarUrl!.isNotEmpty
                ? CachedNetworkImage(
                    imageUrl: avatarUrl!,
                    fit: BoxFit.cover,
                    placeholder: (context, url) => SkeletonLoader(
                      width: 112,
                      height: 112,
                      borderRadius: BorderRadius.circular(56),
                    ),
                    errorWidget: (context, url, error) => _buildFallback(context),
                  )
                : _buildFallback(context),
          ),
        ),
        Positioned(
          bottom: 0,
          right: 0,
          child: Material(
            color: Theme.of(context).scaffoldBackgroundColor,
            shape: const CircleBorder(),
            elevation: 2,
            child: InkWell(
              onTap: () {
                // TODO: Handle avatar edit
              },
              customBorder: const CircleBorder(),
              child: Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Theme.of(context).colorScheme.surfaceContainerHighest,
                    width: 1,
                  ),
                ),
                child: Icon(
                  Icons.edit_outlined,
                  size: 16,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFallback(BuildContext context) {
    return Container(
      color: Theme.of(context).colorScheme.surfaceContainerHighest,
      child: Icon(
        Icons.person_outline,
        size: 40,
        color: Theme.of(context).colorScheme.onSurfaceVariant,
      ),
    );
  }
}
