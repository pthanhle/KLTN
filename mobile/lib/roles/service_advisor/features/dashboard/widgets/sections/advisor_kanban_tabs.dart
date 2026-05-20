import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'dart:ui';
import '../../models/repair_order_model.dart';

class AdvisorKanbanTabs extends StatelessWidget {
  final ROStage selectedStage;
  final Function(ROStage) onStageSelected;

  const AdvisorKanbanTabs({
    super.key,
    required this.selectedStage,
    required this.onStageSelected,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: ROStage.values.map((stage) {
          final isSelected = selectedStage == stage;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: _TabItem(
              stage: stage,
              isSelected: isSelected,
              onTap: () {
                if (!isSelected) {
                  HapticFeedback.selectionClick();
                  onStageSelected(stage);
                }
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _TabItem extends StatelessWidget {
  final ROStage stage;
  final bool isSelected;
  final VoidCallback onTap;

  const _TabItem({
    required this.stage,
    required this.isSelected,
    required this.onTap,
  });

  String _getLabel() {
    switch (stage) {
      case ROStage.pending: return 'Cần Đón'.tr();
      case ROStage.quotation: return 'Báo Giá'.tr();
      case ROStage.inProgress: return 'Đang Sửa'.tr();
      case ROStage.qc: return 'Chờ QC'.tr();
      case ROStage.delivery: return 'Giao Xe'.tr();
    }
  }

  IconData _getIcon() {
    switch (stage) {
      case ROStage.pending: return CupertinoIcons.time;
      case ROStage.quotation: return CupertinoIcons.doc_text;
      case ROStage.inProgress: return CupertinoIcons.wrench;
      case ROStage.qc: return CupertinoIcons.check_mark_circled;
      case ROStage.delivery: return CupertinoIcons.car;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        child: Container(
          decoration: ShapeDecoration(
            shadows: isSelected ? [
              BoxShadow(
                color: theme.colorScheme.primary.withValues(alpha: 0.15),
                blurRadius: 12,
                offset: const Offset(0, 4),
              )
            ] : [],
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 24,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: isSelected 
                    ? theme.colorScheme.primary.withValues(alpha: 0.5) 
                    : (isDark ? Colors.white.withValues(alpha: 0.15) : Colors.white.withValues(alpha: 0.6)),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 24,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                color: isSelected 
                    ? theme.colorScheme.primary.withValues(alpha: 0.1)
                    : (isDark ? Colors.white.withValues(alpha: 0.05) : Colors.white.withValues(alpha: 0.4)),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      _getIcon(),
                      size: 16,
                      color: isSelected 
                          ? theme.colorScheme.primary 
                          : theme.colorScheme.onSurfaceVariant,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      _getLabel(),
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                        color: isSelected 
                            ? theme.colorScheme.primary 
                            : theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
