import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

enum TechTaskTab { diagnosing, waitingParts, inProgress }

class TechKanbanTabs extends StatelessWidget {
  final TechTaskTab selectedTab;
  final Function(TechTaskTab) onTabSelected;

  const TechKanbanTabs({
    super.key,
    required this.selectedTab,
    required this.onTabSelected,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Row(
        children: TechTaskTab.values.map((tab) {
          final isSelected = selectedTab == tab;
          return Padding(
            padding: const EdgeInsets.only(right: 8),
            child: _TechTabChip(
              tab: tab,
              isSelected: isSelected,
              isDark: isDark,
              onTap: () {
                if (!isSelected) {
                  HapticFeedback.selectionClick();
                  onTabSelected(tab);
                }
              },
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _TechTabChip extends StatefulWidget {
  final TechTaskTab tab;
  final bool isSelected;
  final bool isDark;
  final VoidCallback onTap;

  const _TechTabChip({
    required this.tab,
    required this.isSelected,
    required this.isDark,
    required this.onTap,
  });

  @override
  State<_TechTabChip> createState() => _TechTabChipState();
}

class _TechTabChipState extends State<_TechTabChip> {
  bool _isPressed = false;

  String _label() {
    switch (widget.tab) {
      case TechTaskTab.diagnosing:
        return 'Khám xe';
      case TechTaskTab.waitingParts:
        return 'Chờ phụ tùng';
      case TechTaskTab.inProgress:
        return 'Đang thi công';
    }
  }

  IconData _icon() {
    switch (widget.tab) {
      case TechTaskTab.diagnosing:
        return CupertinoIcons.search;
      case TechTaskTab.waitingParts:
        return CupertinoIcons.time;
      case TechTaskTab.inProgress:
        return CupertinoIcons.wrench;
    }
  }

  @override
  Widget build(BuildContext context) {
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
        child: widget.isSelected
            ? _SelectedLiquidChip(
                isDark: widget.isDark,
                icon: _icon(),
                label: _label(),
              )
            : _UnselectedChip(
                isDark: widget.isDark,
                icon: _icon(),
                label: _label(),
              ),
      ),
    );
  }
}

class _SelectedLiquidChip extends StatelessWidget {
  final bool isDark;
  final IconData icon;
  final String label;

  const _SelectedLiquidChip({
    required this.isDark,
    required this.icon,
    required this.label,
  });

  ImageFilter _buildLensFilter(double w, double h) {
    const scale = 1.06;
    final m = Matrix4.identity()
      ..translateByDouble(w / 2, h / 2, 0, 1.0)
      ..scaleByDouble(scale, scale, 1.0, 1.0)
      ..translateByDouble(-w / 2, -h / 2, 0, 1.0);
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
          color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.18),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.50 : 0.90),
              width: 1.0,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.18 : 0.07),
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: Stack(
            children: [
              Positioned.fill(
                child: LayoutBuilder(
                  builder: (context, c) => BackdropFilter(
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
                    Icon(
                      icon,
                      size: 15,
                      color: isDark
                          ? Colors.white.withValues(alpha: 0.90)
                          : Colors.black.withValues(alpha: 0.75),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      label,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: isDark
                            ? Colors.white.withValues(alpha: 0.90)
                            : Colors.black.withValues(alpha: 0.75),
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
  final IconData icon;
  final String label;

  const _UnselectedChip({
    required this.isDark,
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
