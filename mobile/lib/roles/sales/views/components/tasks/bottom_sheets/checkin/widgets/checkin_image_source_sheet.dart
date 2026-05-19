import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controllers/checkin_controller.dart';

class CheckInImageSourceSheet extends StatelessWidget {
  final CheckInController controller;

  const CheckInImageSourceSheet({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Block 1: Options (Glassmorphism)
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
              child: Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: Colors.white.withOpacity(0.2),
                    width: 0.5,
                  ),
                ),
                child: Column(
                  children: [
                    // Header
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Text(
                            'Chọn ảnh bằng lái'.tr(),
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: theme.colorScheme.onSurface,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Vui lòng chụp ảnh trực tiếp hoặc chọn ảnh mặt trước bằng lái xe của khách hàng từ thư viện.'.tr(),
                            textAlign: TextAlign.center,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant.withOpacity(0.8),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 0.5, color: Colors.white10),
                    // Option 1: Camera
                    ListTile(
                      title: Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(CupertinoIcons.camera, color: CupertinoColors.activeBlue, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              'Chụp ảnh mới'.tr(),
                              style: theme.textTheme.bodyLarge?.copyWith(
                                color: CupertinoColors.activeBlue,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                        controller.pickDriverLicenseImage(ImageSource.camera);
                      },
                    ),
                    const Divider(height: 0.5, color: Colors.white10),
                    // Option 2: Gallery
                    ListTile(
                      title: Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(CupertinoIcons.photo_on_rectangle, color: CupertinoColors.activeBlue, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              'Chọn từ thư viện'.tr(),
                              style: theme.textTheme.bodyLarge?.copyWith(
                                color: CupertinoColors.activeBlue,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                      onTap: () {
                        Navigator.pop(context);
                        controller.pickDriverLicenseImage(ImageSource.gallery);
                      },
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          // Block 2: Cancel (Glassmorphism with destructive red text)
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: Colors.white.withOpacity(0.2),
                    width: 0.5,
                  ),
                ),
                child: ListTile(
                  title: Center(
                    child: Text(
                      'Hủy'.tr(),
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: CupertinoColors.destructiveRed,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  onTap: () => Navigator.pop(context),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
