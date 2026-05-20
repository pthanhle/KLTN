import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../quotation/widgets/shared/glass_card.dart';
import '../../constants/supplement_constants.dart';

class SupplementIssueSection extends StatelessWidget {
  final String title;
  final String description;
  final String proposedFix;
  final String mechanicName;
  final String mechanicRole;
  final List<String> imageUrls;

  const SupplementIssueSection({
    super.key,
    required this.title,
    required this.description,
    required this.proposedFix,
    required this.mechanicName,
    required this.mechanicRole,
    required this.imageUrls,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GlassCard(
      padding: const EdgeInsets.all(SupplementConstants.cardPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),
          Container(
            padding: const EdgeInsets.all(SupplementConstants.innerPadding),
            decoration: ShapeDecoration(
              color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: SupplementConstants.innerRadius,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
            child: Text(
              description,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
                height: 1.5,
              ),
            ),
          ),
          const SizedBox(height: SupplementConstants.sectionSpacing),
          
          // Proposed Fix
          if (proposedFix.isNotEmpty) ...[
            Text(
              'Đề xuất sửa chữa'.tr(),
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(SupplementConstants.innerPadding),
              decoration: ShapeDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.1),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: SupplementConstants.innerRadius,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: theme.colorScheme.primary.withValues(alpha: 0.25),
                    width: 0.5,
                  ),
                ),
              ),
              child: Row(
                children: [
                  Icon(CupertinoIcons.wrench_fill, color: theme.colorScheme.primary, size: 20),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      proposedFix,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: SupplementConstants.sectionSpacing),
          ],

          if (mechanicName.isNotEmpty) ...[
            Row(
              children: [
                Container(
                  width: 32,
                  height: 32,
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.surfaceContainerHighest,
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 10,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: 0.3),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: Icon(
                    CupertinoIcons.person_solid,
                    size: 16,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      mechanicName,
                      style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600),
                    ),
                    Text(
                      mechanicRole,
                      style: theme.textTheme.labelSmall?.copyWith(color: theme.colorScheme.outline),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: SupplementConstants.sectionSpacing),
          ],

          if (imageUrls.isNotEmpty)
            ClipSmoothRect(
              radius: SmoothBorderRadius(
                cornerRadius: SupplementConstants.imageRadius,
                cornerSmoothing: 1.0,
              ),
              child: Stack(
                children: [
                  AspectRatio(
                    aspectRatio: 16 / 9,
                    child: PageView.builder(
                      itemCount: imageUrls.length,
                      itemBuilder: (context, index) {
                        return Image.network(
                          imageUrls[index],
                          fit: BoxFit.cover,
                          loadingBuilder: (context, child, loadingProgress) {
                            if (loadingProgress == null) return child;
                            return Container(
                              color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                              child: const Center(
                                child: CupertinoActivityIndicator(),
                              ),
                            );
                          },
                          errorBuilder: (context, error, stackTrace) => Container(
                            color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                            child: Center(
                              child: Icon(
                                CupertinoIcons.exclamationmark_triangle_fill, 
                                size: 40, 
                                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5)
                              ),
                            ),
                          ),
                        );
                      }
                    ),
                  ),
                  Positioned(
                    bottom: 8,
                    right: 8,
                    child: ClipSmoothRect(
                      radius: SmoothBorderRadius(
                        cornerRadius: 8,
                        cornerSmoothing: 1.0,
                      ),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          color: theme.colorScheme.surface.withValues(alpha: 0.8),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(CupertinoIcons.camera_fill, size: 14, color: theme.colorScheme.onSurface),
                              const SizedBox(width: 4),
                              Flexible(
                                child: Text(
                                  imageUrls.length > 1 ? '${imageUrls.length} ${'Ảnh'.tr()}' : 'Ảnh hiện trường'.tr(),
                                  style: theme.textTheme.labelSmall?.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
