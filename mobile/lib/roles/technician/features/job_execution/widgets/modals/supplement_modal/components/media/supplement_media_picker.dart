import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class SupplementMediaPicker extends StatelessWidget {
  final List<String> mediaUrls;
  final VoidCallback onPickImage;
  final void Function(int index) onRemoveImage;
  final bool isUploading;

  const SupplementMediaPicker({
    super.key,
    required this.mediaUrls,
    required this.onPickImage,
    required this.onRemoveImage,
    this.isUploading = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final errorColor = theme.colorScheme.error;

    if (mediaUrls.isEmpty) {
      return GestureDetector(
        onTapDown: (_) => HapticFeedback.lightImpact(),
        onTap: isUploading ? null : () {
          HapticFeedback.mediumImpact();
          onPickImage();
        },
        child: Container(
          width: double.infinity,
          decoration: ShapeDecoration(
            color: errorColor.withValues(alpha: isDark ? 0.08 : 0.06),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
              side: BorderSide(color: errorColor.withValues(alpha: 0.25), width: 1.0),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.03),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: ShapeDecoration(
                        color: theme.colorScheme.surface.withValues(alpha: 0.80),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 17, cornerSmoothing: 1.0),
                          side: BorderSide(
                            color: Colors.white.withValues(alpha: isDark ? 0.20 : 0.50),
                            width: 1.0,
                          ),
                        ),
                        shadows: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.05),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: ClipSmoothRect(
                        radius: SmoothBorderRadius(cornerRadius: 17, cornerSmoothing: 1.0),
                        child: BackdropFilter(
                          filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                          child: Center(
                            child: isUploading
                                ? SizedBox(
                                    width: 24,
                                    height: 24,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2.5,
                                      color: errorColor,
                                    ),
                                  )
                                : Icon(CupertinoIcons.camera_fill, color: errorColor, size: 26),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      isUploading
                          ? 'Đang tải ảnh lên...'.tr()
                          : 'Bắt buộc: Chụp/Quay video chứng cứ rõ nét'.tr(),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: errorColor,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Nhấn để chụp ảnh hoặc chọn từ thư viện'.tr(),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 13,
                        color: theme.colorScheme.onSurfaceVariant,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    }

    // Has images — show grid with add button
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            ...mediaUrls.asMap().entries.map((e) => _ImageThumb(
                  url: e.value,
                  onRemove: () => onRemoveImage(e.key),
                )),
            if (!isUploading)
              GestureDetector(
                onTap: () {
                  HapticFeedback.selectionClick();
                  onPickImage();
                },
                child: Container(
                  width: 72,
                  height: 72,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surfaceContainerHighest,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: theme.colorScheme.outline.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Icon(CupertinoIcons.add, color: theme.colorScheme.onSurfaceVariant),
                ),
              ),
            if (isUploading)
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: theme.colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(
                  child: SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(strokeWidth: 2.5),
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}

class _ImageThumb extends StatelessWidget {
  final String url;
  final VoidCallback onRemove;

  const _ImageThumb({required this.url, required this.onRemove});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: Image.network(
            url,
            width: 72,
            height: 72,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(
              width: 72,
              height: 72,
              color: Theme.of(context).colorScheme.surfaceContainerHighest,
              child: const Icon(CupertinoIcons.photo, size: 28),
            ),
          ),
        ),
        Positioned(
          top: 2,
          right: 2,
          child: GestureDetector(
            onTap: onRemove,
            child: Container(
              width: 20,
              height: 20,
              decoration: const BoxDecoration(
                color: Colors.black54,
                shape: BoxShape.circle,
              ),
              child: const Icon(CupertinoIcons.xmark, size: 11, color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }
}
