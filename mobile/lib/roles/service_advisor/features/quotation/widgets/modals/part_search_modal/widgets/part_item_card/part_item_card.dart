import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../../models/part_item_model.dart';
import '../../../../../controllers/part_search_controller.dart';
import '../part_stock_badge.dart';
import '../part_quantity_stepper.dart';
import 'part_item_image.dart';
import 'part_item_info.dart';
import 'part_item_price.dart';
import 'part_item_add_button.dart';
import 'part_item_backorder_button.dart';
import 'part_item_backorder_section.dart';

class PartItemCard extends ConsumerStatefulWidget {
  final PartItemModel part;

  const PartItemCard({super.key, required this.part});

  @override
  ConsumerState<PartItemCard> createState() => _PartItemCardState();
}

class _PartItemCardState extends ConsumerState<PartItemCard> {
  int _quantity = 1;
  bool _isExpanded = false;
  DateTime? _expectedDate;

  void _onAdd() {
    HapticFeedback.mediumImpact();
    ref.read(partSearchControllerProvider.notifier).addPartToQuotation(
          widget.part,
          _quantity,
          expectedDate: _expectedDate?.toIso8601String(),
        );
    if (_isExpanded) setState(() => _isExpanded = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final inStock = widget.part.availableStock > 0;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.05)
            : Colors.white.withValues(alpha: 0.60),
        shape: SmoothRectangleBorder(
          borderRadius:
              SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.70),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.20 : 0.04),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(14),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    PartItemImage(
                      imageUrl: widget.part.imageUrl,
                      inStock: inStock,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: PartItemInfo(
                        name: widget.part.name,
                        sku: widget.part.sku,
                      ),
                    ),
                    const SizedBox(width: 8),
                    PartItemPrice(price: widget.part.price),
                  ],
                ),
              ),
              Container(
                height: 0.5,
                color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.40),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(
                    horizontal: 14, vertical: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    PartStockBadge(
                        availableStock: widget.part.availableStock),
                    AnimatedCrossFade(
                      duration: const Duration(milliseconds: 250),
                      crossFadeState: inStock
                          ? CrossFadeState.showFirst
                          : CrossFadeState.showSecond,
                      firstChild: Row(
                        children: [
                          PartQuantityStepper(
                            quantity: _quantity,
                            maxStock: widget.part.availableStock,
                            onChanged: (val) =>
                                setState(() => _quantity = val),
                          ),
                          const SizedBox(width: 10),
                          PartItemAddButton(onTap: _onAdd),
                        ],
                      ),
                      secondChild: PartItemBackorderButton(
                        onTap: () => setState(
                            () => _isExpanded = !_isExpanded),
                        isExpanded: _isExpanded,
                      ),
                    ),
                  ],
                ),
              ),
              AnimatedSize(
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeOutCubic,
                child: _isExpanded
                    ? PartItemBackorderSection(
                        expectedDate: _expectedDate,
                        onDateChanged: (d) =>
                            setState(() => _expectedDate = d),
                        onConfirm: _expectedDate != null ? _onAdd : null,
                      )
                    : const SizedBox.shrink(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
