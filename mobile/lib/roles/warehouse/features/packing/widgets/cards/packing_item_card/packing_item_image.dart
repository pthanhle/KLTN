import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/placeholders/packing_image_placeholder.dart';

class PackingItemImage extends StatelessWidget {
  final String? imageUrl;
  final double size;

  const PackingItemImage({
    super.key,
    this.imageUrl,
    this.size = 80,
  });

  @override
  Widget build(BuildContext context) {
    return ClipSmoothRect(
      radius: SmoothBorderRadius(
        cornerRadius: 12,
        cornerSmoothing: 1.0,
      ),
      child: imageUrl != null
          ? Image.network(
              imageUrl!,
              width: size,
              height: size,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => PackingImagePlaceholder(size: size),
            )
          : PackingImagePlaceholder(size: size),
    );
  }
}
