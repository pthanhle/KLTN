import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:shimmer/shimmer.dart';

class GlassDropdown<T> extends StatelessWidget {
  final String label;
  final String? placeholder;
  final String? value;
  final List<String> items;
  final ValueChanged<String?>? onChanged;
  final bool isLoading;

  const GlassDropdown({
    super.key,
    required this.label,
    this.placeholder,
    this.value,
    required this.items,
    this.onChanged,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: isLoading
              ? Shimmer.fromColors(
                  baseColor: isDark ? Colors.white12 : Colors.grey[300]!,
                  highlightColor: isDark ? Colors.white24 : Colors.grey[100]!,
                  child: Container(width: 80, height: 14, color: Colors.white),
                )
              : Text(
                  label,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
                  ),
                ),
        ),
        Container(
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.02)
                : Colors.white.withValues(alpha: 0.15),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.45 : 0.90),
                width: 1.0,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.02),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: isLoading
                  ? Shimmer.fromColors(
                      baseColor: isDark ? Colors.white12 : Colors.grey[300]!,
                      highlightColor: isDark ? Colors.white24 : Colors.grey[100]!,
                      child: Container(height: 52, color: Colors.white),
                    )
                  : GestureDetector(
                      onTap: () {
                        if (items.isEmpty) return;
                        int initialIndex = items.indexOf(value ?? '');
                        if (initialIndex == -1) initialIndex = 0;
                        
                        showModalBottomSheet(
                          context: context,
                          backgroundColor: Colors.transparent,
                          isScrollControlled: true,
                          useRootNavigator: true,
                          builder: (context) {
                            String searchQuery = '';
                            return StatefulBuilder(
                              builder: (context, setState) {
                                final filteredItems = items
                                    .where((item) => item.toLowerCase().contains(searchQuery.toLowerCase()))
                                    .toList();

                                return DraggableScrollableSheet(
                                  initialChildSize: 0.85,
                                  minChildSize: 0.5,
                                  maxChildSize: 0.95,
                                  expand: false,
                                  builder: (context, scrollController) {
                                    return Container(
                                      decoration: ShapeDecoration(
                                        color: isDark
                                            ? Colors.white.withValues(alpha: 0.04)
                                            : Colors.white.withValues(alpha: 0.65),
                                        shape: SmoothRectangleBorder(
                                          borderRadius: const SmoothBorderRadius.vertical(
                                            top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
                                          ),
                                          side: BorderSide(
                                            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
                                            width: 0.5,
                                          ),
                                        ),
                                      ),
                                      child: ClipSmoothRect(
                                        radius: const SmoothBorderRadius.vertical(
                                          top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
                                        ),
                                        child: BackdropFilter(
                                          filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
                                          child: Column(
                                            children: [
                                              Container(
                                                margin: const EdgeInsets.only(top: 12, bottom: 8),
                                                width: 36,
                                                height: 4,
                                                decoration: BoxDecoration(
                                                  color: theme.colorScheme.onSurface.withValues(alpha: 0.20),
                                                  borderRadius: BorderRadius.circular(2),
                                                ),
                                              ),
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                                child: CupertinoSearchTextField(
                                                  placeholder: 'Tìm kiếm...',
                                                  onChanged: (val) {
                                                    setState(() {
                                                      searchQuery = val;
                                                    });
                                                  },
                                                ),
                                              ),
                                              Expanded(
                                                child: ListView.builder(
                                                  controller: scrollController,
                                                  itemCount: filteredItems.length,
                                                  itemBuilder: (context, index) {
                                                    final item = filteredItems[index];
                                                    final isSelected = item == value;
                                                    return CupertinoButton(
                                                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                                                      onPressed: () {
                                                        if (onChanged != null) onChanged!(item);
                                                        Navigator.pop(context);
                                                      },
                                                      child: Row(
                                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                        children: [
                                                          Expanded(
                                                            child: Text(
                                                              item,
                                                              style: TextStyle(
                                                                color: theme.colorScheme.onSurface,
                                                                fontSize: 16,
                                                                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                                                              ),
                                                            ),
                                                          ),
                                                          if (isSelected)
                                                            Icon(CupertinoIcons.checkmark_alt, color: theme.colorScheme.primary),
                                                        ],
                                                      ),
                                                    );
                                                  },
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    );
                                  },
                                );
                              },
                            );
                          },
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              value ?? placeholder ?? '',
                              style: TextStyle(
                                color: value != null 
                                  ? theme.colorScheme.onSurface 
                                  : theme.colorScheme.onSurface.withValues(alpha: 0.3),
                                fontSize: 15,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Icon(CupertinoIcons.chevron_down, size: 16, color: theme.colorScheme.onSurface.withValues(alpha: 0.5)),
                          ],
                        ),
                      ),
                    ),
            ),
          ),
        ),
      ],
    );
  }
}
