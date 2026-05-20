import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class WalkaroundTabSwitcher extends StatelessWidget {
  final int currentStep;
  final Function(int) onStepChanged;

  const WalkaroundTabSwitcher({
    super.key,
    required this.currentStep,
    required this.onStepChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final tabs = ['Khách Hàng', 'Trạng Thái', 'Ngoại Quan', 'Xác Nhận'];

    return LayoutBuilder(
      builder: (context, constraints) {
        final double trackPadding = 4.0;
        final double tabWidth = (constraints.maxWidth - (trackPadding * 2)) / tabs.length;

        return Container(
          decoration: ShapeDecoration(
            color: isDark 
                ? Colors.white.withValues(alpha: 0.05)
                : theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.6),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: 0.2),
                width: 0.5,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.04),
                blurRadius: 20,
                offset: const Offset(0, 4),
              )
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
              child: Padding(
                padding: EdgeInsets.all(trackPadding),
                child: SizedBox(
                  height: 36,
                  child: Stack(
                    children: [
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 350),
                        curve: Curves.fastLinearToSlowEaseIn,
                        left: currentStep * tabWidth,
                        top: 0,
                        bottom: 0,
                        width: tabWidth,
                        child: Container(
                          decoration: ShapeDecoration(
                            color: isDark 
                                ? Colors.white.withValues(alpha: 0.15) 
                                : theme.colorScheme.surface,
                            shape: SmoothRectangleBorder(
                              borderRadius: SmoothBorderRadius(
                                cornerRadius: 12,
                                cornerSmoothing: 1.0,
                              ),
                            ),
                            shadows: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.08),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              )
                            ],
                          ),
                        ),
                      ),
                      // Text Labels
                      Row(
                        children: List.generate(tabs.length, (index) {
                          final isSelected = currentStep == index;
                          return Expanded(
                            child: GestureDetector(
                              behavior: HitTestBehavior.opaque,
                              onTap: () {
                                if (currentStep != index) {
                                  HapticFeedback.selectionClick();
                                  onStepChanged(index);
                                }
                              },
                              child: Center(
                                child: AnimatedDefaultTextStyle(
                                  duration: const Duration(milliseconds: 250),
                                  curve: Curves.easeOutCubic,
                                  style: TextStyle(
                                    fontFamily: theme.textTheme.bodyMedium?.fontFamily,
                                    fontSize: 12,
                                    fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                                    letterSpacing: 0.5,
                                    color: isSelected 
                                        ? (isDark ? Colors.white : Colors.black87)
                                        : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.7),
                                  ),
                                  child: Text(
                                    tabs[index].tr(),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

