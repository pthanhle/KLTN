import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/mpi_category_model.dart';
import '../../models/mpi_item_model.dart';
import 'mpi_category_header.dart';
import '../rows/mpi_item_row.dart';

class MpiCategorySection extends StatefulWidget {
  final MpiCategoryModel category;
  final VoidCallback onPassAll;
  final Function(String, MpiItemStatus) onStatusChanged;
  final bool readOnly;

  const MpiCategorySection({
    super.key,
    required this.category,
    required this.onPassAll,
    required this.onStatusChanged,
    this.readOnly = false,
  });

  @override
  State<MpiCategorySection> createState() => _MpiCategorySectionState();
}

class _MpiCategorySectionState extends State<MpiCategorySection> {
  bool _isExpanded = true;

  void _toggle() => setState(() => _isExpanded = !_isExpanded);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isAllPassed = widget.category.items.isNotEmpty &&
        widget.category.items.every((item) => item.status == MpiItemStatus.pass);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.30),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Column(
            children: [
              MpiCategoryHeader(
                title: widget.category.name,
                isExpanded: _isExpanded,
                onToggle: _toggle,
                onPassAll: widget.readOnly ? null : widget.onPassAll,
                isAllPassed: isAllPassed,
              ),
              AnimatedCrossFade(
                firstChild: const SizedBox(width: double.infinity),
                secondChild: Column(
                  children: [
                    Divider(
                      height: 1,
                      thickness: 0.5,
                      color: Colors.white.withValues(alpha: isDark ? 0.05 : 0.20),
                    ),
                    ...widget.category.items.map((item) => Column(
                          children: [
                            MpiItemRow(
                              item: item,
                              onStatusChanged: widget.readOnly
                                  ? null
                                  : (status) =>
                                      widget.onStatusChanged(item.id, status),
                            ),
                            if (item != widget.category.items.last)
                              Divider(
                                height: 1,
                                thickness: 0.5,
                                indent: 16,
                                endIndent: 16,
                                color: Colors.white.withValues(alpha: isDark ? 0.03 : 0.12),
                              ),
                          ],
                        )),
                    const SizedBox(height: 8),
                  ],
                ),
                crossFadeState: _isExpanded
                    ? CrossFadeState.showSecond
                    : CrossFadeState.showFirst,
                duration: const Duration(milliseconds: 300),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
