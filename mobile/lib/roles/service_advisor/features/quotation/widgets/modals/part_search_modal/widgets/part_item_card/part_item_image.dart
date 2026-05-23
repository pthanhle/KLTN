import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartItemImage extends StatelessWidget {
  final String imageUrl;
  final bool inStock;

  const PartItemImage({
    super.key,
    required this.imageUrl,
    required this.inStock,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return ClipSmoothRect(
      radius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
      child: Container(
        width: 64,
        height: 64,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.08)
              : Colors.black.withValues(alpha: 0.04),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
          ),
        ),
        child: imageUrl.isNotEmpty
            ? Image.network(
                imageUrl,
                fit: BoxFit.cover,
                color:
                    inStock ? null : Colors.grey.withValues(alpha: 0.8),
                colorBlendMode:
                    inStock ? null : BlendMode.saturation,
                errorBuilder: (_, __, ___) => _placeholder(theme),
              )
            : _placeholder(theme),
      ),
    );
  }

  Widget _placeholder(ThemeData theme) => Center(
        child: Icon(
          CupertinoIcons.cube_box,
          color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.4),
          size: 28,
        ),
      );
}
