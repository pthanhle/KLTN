import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
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
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Row(
        children: ROStage.values.map((stage) {
          final isSelected = selectedStage == stage;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: _TabChip(
              stage: stage,
              isSelected: isSelected,
              isDark: isDark,
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

class _TabChip extends StatefulWidget {
  final ROStage stage;
  final bool isSelected;
  final bool isDark;
  final VoidCallback onTap;

  const _TabChip({
    required this.stage,
    required this.isSelected,
    required this.isDark,
    required this.onTap,
  });

  @override
  State<_TabChip> createState() => _TabChipState();
}

class _TabChipState extends State<_TabChip> {
  bool _isPressed = false;

  String _getLabel() {
    switch (widget.stage) {
      case ROStage.pending:    return 'Cần Đón'.tr();
      case ROStage.quotation:  return 'Báo Giá'.tr();
      case ROStage.inProgress: return 'Đang Sửa'.tr();
      case ROStage.qc:         return 'Chờ QC'.tr();
      case ROStage.delivery:   return 'Giao Xe'.tr();
    }
  }

  IconData _getIcon() {
    switch (widget.stage) {
      case ROStage.pending:    return CupertinoIcons.time;
      case ROStage.quotation:  return CupertinoIcons.doc_text;
      case ROStage.inProgress: return CupertinoIcons.wrench;
      case ROStage.qc:         return CupertinoIcons.check_mark_circled;
      case ROStage.delivery:   return CupertinoIcons.car;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = widget.isDark;
    final isSelected = widget.isSelected;

    return GestureDetector(
      onTap: widget.onTap,
      onTapDown: (_) {
        HapticFeedback.selectionClick();
        setState(() => _isPressed = true);
      },
      onTapUp: (_) => setState(() => _isPressed = false),
      onTapCancel: () => setState(() => _isPressed = false),
      behavior: HitTestBehavior.opaque,
      child: AnimatedScale(
        scale: _isPressed ? 0.94 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: isSelected
            ? _SelectedLiquidChip(
                isDark: isDark,
                theme: theme,
                icon: _getIcon(),
                label: _getLabel(),
              )
            : _UnselectedChip(
                isDark: isDark,
                theme: theme,
                icon: _getIcon(),
                label: _getLabel(),
              ),
      ),
    );
  }
}

class _SelectedLiquidChip extends StatelessWidget {
  final bool isDark;
  final ThemeData theme;
  final IconData icon;
  final String label;

  const _SelectedLiquidChip({
    required this.isDark,
    required this.theme,
    required this.icon,
    required this.label,
  });

  ImageFilter _buildLensFilter(double w, double h) {
    const scale = 1.06;
    final m = Matrix4.identity()
      ..translate(w / 2, h / 2)
      ..scale(scale, scale)
      ..translate(-w / 2, -h / 2);
    return ImageFilter.compose(
      outer: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
      inner: ImageFilter.matrix(m.storage, filterQuality: FilterQuality.high),
    );
  }

  @override
  Widget build(BuildContext context) {
    const chipH = 40.0;

    return IntrinsicWidth(
      child: Container(
        height: chipH,
        decoration: ShapeDecoration(
          color: theme.colorScheme.primary.withValues(alpha: isDark ? 0.20 : 0.14),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.50 : 0.85),
              width: 1.0,
            ),
          ),
          shadows: [
            BoxShadow(
              color: theme.colorScheme.primary.withValues(alpha: 0.22),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: Stack(
            children: [
              Positioned.fill(
                child: LayoutBuilder(
                  builder: (_, c) => BackdropFilter(
                    filter: _buildLensFilter(c.maxWidth, chipH),
                    child: const SizedBox.expand(),
                  ),
                ),
              ),

              Positioned(
                top: 0, left: 0, right: 0,
                height: chipH * 0.42,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.white.withValues(alpha: isDark ? 0.32 : 0.60),
                        Colors.white.withValues(alpha: isDark ? 0.08 : 0.20),
                        Colors.white.withValues(alpha: 0.0),
                      ],
                      stops: const [0.0, 0.5, 1.0],
                    ),
                  ),
                ),
              ),

              Positioned(
                bottom: 0, left: 0, right: 0,
                height: chipH * 0.25,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                      colors: [
                        Colors.white.withValues(alpha: isDark ? 0.10 : 0.18),
                        Colors.white.withValues(alpha: 0.0),
                      ],
                    ),
                  ),
                ),
              ),

              Padding(
                padding: const EdgeInsets.fromLTRB(14, 9, 14, 11),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(icon, size: 15, color: Colors.white),
                    const SizedBox(width: 6),
                    Text(
                      label,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: -0.2,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _UnselectedChip extends StatelessWidget {
  final bool isDark;
  final ThemeData theme;
  final IconData icon;
  final String label;

  const _UnselectedChip({
    required this.isDark,
    required this.theme,
    required this.icon,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    final textIconColor = isDark
        ? Colors.white.withValues(alpha: 0.55)
        : Colors.black.withValues(alpha: 0.45);

    return Container(
      padding: const EdgeInsets.fromLTRB(14, 9, 14, 11),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.07)
            : Colors.black.withValues(alpha: 0.05),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.14 : 0.45),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 15, color: textIconColor),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w500,
              color: textIconColor,
              letterSpacing: 0,
            ),
          ),
        ],
      ),
    );
  }
}
