import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class CheckInCameraBox extends StatelessWidget {
  final Uint8List? imageBytes;
  final VoidCallback onTap;

  const CheckInCameraBox({
    super.key,
    required this.imageBytes,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasImage = imageBytes != null;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          tr('BẰNG LÁI XE'),
          style: theme.textTheme.labelSmall?.copyWith(
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 8),
        GestureDetector(
          onTap: () {
            HapticFeedback.lightImpact();
            onTap();
          },
          child: Container(
            height: 128,
            width: double.infinity,
            alignment: Alignment.center,
            decoration: ShapeDecoration(
              color: hasImage
                  ? theme.colorScheme.surface.withValues(alpha: 0.1)
                  : theme.colorScheme.surface.withValues(alpha: 0.25),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: hasImage
                      ? theme.colorScheme.primary.withValues(alpha: 0.8)
                      : theme.colorScheme.surface.withValues(alpha: 0.5),
                  width: hasImage ? 1.5 : 0.5,
                ),
              ),
              image: hasImage
                  ? DecorationImage(
                      image: MemoryImage(imageBytes!),
                      fit: BoxFit.cover,
                      opacity: 0.8,
                    )
                  : null,
            ),
            child: hasImage
                ? Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.5),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.check_rounded, color: Colors.white, size: 24),
                  )
                : Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.camera_alt_rounded, color: theme.colorScheme.primary, size: 28),
                      const SizedBox(height: 12),
                      Text(
                        tr('Chụp/Tải lên mặt trước Bằng Lái'),
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurface,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
          ),
        ),
      ],
    );
  }
}
