import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class MpiImagePickerGrid extends StatelessWidget {
  final List<String> mediaUrls;
  final Future<void> Function() onAddImage;
  final Function(int) onRemoveImage;

  const MpiImagePickerGrid({
    super.key,
    required this.mediaUrls,
    required this.onAddImage,
    required this.onRemoveImage,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        ...List.generate(mediaUrls.length, (index) => _ImageItem(
          url: mediaUrls[index],
          onRemove: () => onRemoveImage(index),
        )),
        _AddButton(onAddImage: onAddImage),
      ],
    );
  }
}

class _ImageItem extends StatelessWidget {
  final String url;
  final VoidCallback onRemove;

  const _ImageItem({required this.url, required this.onRemove});

  ImageProvider _resolveImage() {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return NetworkImage(url);
    }
    return FileImage(File(url));
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: 72,
      height: 72,
      decoration: ShapeDecoration(
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
        ),
        image: DecorationImage(
          image: _resolveImage(),
          fit: BoxFit.cover,
        ),
      ),
      child: Align(
        alignment: Alignment.topRight,
        child: GestureDetector(
          onTap: () {
            HapticFeedback.lightImpact();
            onRemove();
          },
          child: Container(
            margin: const EdgeInsets.all(4),
            width: 20,
            height: 20,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.black.withValues(alpha: 0.65)
                  : Colors.black.withValues(alpha: 0.50),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 6, cornerSmoothing: 1.0),
              ),
            ),
            child: const Center(
              child: Icon(CupertinoIcons.xmark, size: 11, color: Colors.white),
            ),
          ),
        ),
      ),
    );
  }
}

class _AddButton extends StatelessWidget {
  final Future<void> Function() onAddImage;

  const _AddButton({required this.onAddImage});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        onAddImage();
      },
      child: Container(
        width: 72,
        height: 72,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.05)
              : Colors.black.withValues(alpha: 0.04),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.15)
                  : Colors.black.withValues(alpha: 0.12),
              width: 1.0,
              strokeAlign: BorderSide.strokeAlignInside,
            ),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              CupertinoIcons.camera_fill,
              size: 20,
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.70),
            ),
            const SizedBox(height: 4),
            Text(
              'Thêm ảnh'.tr(),
              style: TextStyle(
                fontSize: 9,
                fontWeight: FontWeight.w500,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.60),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
