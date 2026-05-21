import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// Note: In real app, import 'package:cached_network_image/cached_network_image.dart';
import '../../../../../roles/auth/controllers/auth_controller.dart';
import '../../../../utils/theme_extension.dart';

class HeaderAvatarButton extends ConsumerWidget {
  final VoidCallback? onPressed;

  const HeaderAvatarButton({
    super.key,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final user = ref.watch(authControllerProvider).value;

    return Padding(
      padding: const EdgeInsets.only(left: 16.0),
      child: CupertinoButton(
        padding: EdgeInsets.zero,
        onPressed: () {
          HapticFeedback.selectionClick();
          onPressed?.call();
        },
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.1),
              width: 1,
            ),
          ),
          child: ClipOval(
            child: user?.avatarUrl != null && user!.avatarUrl!.isNotEmpty
                ? Image.network(
                    user.avatarUrl!, // Should use CachedNetworkImage in production
                    width: 32,
                    height: 32,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) => _buildFallback(theme),
                  )
                : _buildFallback(theme),
          ),
        ),
      ),
    );
  }

  Widget _buildFallback(ThemeData theme) {
    return Container(
      width: 32,
      height: 32,
      color: theme.colorScheme.primaryContainer,
      child: Icon(
        CupertinoIcons.person_fill,
        size: 16,
        color: theme.colorScheme.onPrimaryContainer,
      ),
    );
  }
}
