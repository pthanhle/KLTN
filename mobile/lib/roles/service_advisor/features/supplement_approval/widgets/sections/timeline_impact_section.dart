import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../quotation/widgets/shared/glass_card.dart';
import '../../utils/supplement_utils.dart';
import '../../constants/supplement_constants.dart';

class TimelineImpactSection extends StatelessWidget {
  final DateTime oldTime;
  final DateTime newTime;
  final String delayReason;

  const TimelineImpactSection({
    super.key,
    required this.oldTime,
    required this.newTime,
    required this.delayReason,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GlassCard(
      padding: const EdgeInsets.all(SupplementConstants.cardPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(CupertinoIcons.time, color: theme.colorScheme.onSurfaceVariant),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Thời gian giao xe'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          
          Padding(
            padding: const EdgeInsets.only(left: 8.0),
            child: Stack(
              children: [
                Positioned(
                  left: 5,
                  top: 10,
                  bottom: 10,
                  child: Container(
                    width: 2,
                    color: theme.colorScheme.surfaceContainerHighest,
                  ),
                ),
                
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 24.0),
                      child: Stack(
                        clipBehavior: Clip.none,
                        children: [
                          Positioned(
                            left: -24 - 4,
                            top: 4,
                            child: Container(
                              width: 10,
                              height: 10,
                              decoration: ShapeDecoration(
                                color: theme.colorScheme.outline,
                                shape: SmoothRectangleBorder(
                                  borderRadius: SmoothBorderRadius(
                                    cornerRadius: 5,
                                    cornerSmoothing: 1.0,
                                  ),
                                  side: BorderSide(
                                    color: theme.colorScheme.surface,
                                    width: 2,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(
                                child: Text(
                                  'Kế hoạch cũ'.tr(),
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: theme.colorScheme.onSurfaceVariant,
                                    decoration: TextDecoration.lineThrough,
                                  ),
                                ),
                              ),
                              Flexible(
                                child: Text(
                                  SupplementUtils.formatFullDateTime(oldTime),
                                  style: theme.textTheme.bodyLarge?.copyWith(
                                    color: theme.colorScheme.outline,
                                    decoration: TextDecoration.lineThrough,
                                  ),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    Padding(
                      padding: const EdgeInsets.only(left: 24.0),
                      child: Stack(
                        clipBehavior: Clip.none,
                        children: [
                          Positioned(
                            left: -24 - 5,
                            top: 4,
                            child: Container(
                              width: 12,
                              height: 12,
                              decoration: ShapeDecoration(
                                color: theme.colorScheme.error,
                                shape: SmoothRectangleBorder(
                                  borderRadius: SmoothBorderRadius(
                                    cornerRadius: 6,
                                    cornerSmoothing: 1.0,
                                  ),
                                  side: BorderSide(
                                    color: theme.colorScheme.surface,
                                    width: 2,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Dự kiến mới'.tr(),
                                      style: theme.textTheme.titleMedium?.copyWith(
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      delayReason,
                                      style: theme.textTheme.bodySmall?.copyWith(
                                        color: theme.colorScheme.error,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Flexible(
                                child: Text(
                                  SupplementUtils.formatTime(newTime),
                                  style: theme.textTheme.titleLarge?.copyWith(
                                    color: theme.colorScheme.error,
                                    fontWeight: FontWeight.w700,
                                  ),
                                  textAlign: TextAlign.right,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
