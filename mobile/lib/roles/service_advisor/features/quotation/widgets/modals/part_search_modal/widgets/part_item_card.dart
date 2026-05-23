import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../models/part_item_model.dart';
import '../../../../controllers/part_search_controller.dart';
import 'part_stock_badge.dart';
import 'part_quantity_stepper.dart';

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
    ref.read(partSearchControllerProvider.notifier)
       .addPartToQuotation(widget.part, _quantity, expectedDate: _expectedDate?.toIso8601String());
    // Auto collapse if it was backorder
    if (_isExpanded) {
      setState(() => _isExpanded = false);
    }
  }

  void _toggleBackorder() {
    HapticFeedback.selectionClick();
    setState(() => _isExpanded = !_isExpanded);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final inStock = widget.part.availableStock > 0;
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.8),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
          side: BorderSide(color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2)),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surfaceContainerHigh,
                    borderRadius: BorderRadius.circular(12),
                    image: widget.part.imageUrl.isNotEmpty
                        ? DecorationImage(
                            image: NetworkImage(widget.part.imageUrl),
                            fit: BoxFit.cover,
                            colorFilter: inStock ? null : ColorFilter.mode(
                              Colors.grey.withValues(alpha: 0.8),
                              BlendMode.saturation,
                            ),
                          )
                        : null,
                  ),
                  child: widget.part.imageUrl.isEmpty
                      ? Icon(CupertinoIcons.cube_box, color: theme.colorScheme.onSurfaceVariant)
                      : null,
                ),
                const SizedBox(width: 12),
                
                // Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.part.name,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'SKU: ${widget.part.sku}',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Price
                Text(
                  NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(widget.part.price),
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                    color: theme.colorScheme.primary,
                  ),
                ),
              ],
            ),
          ),
          
          // Divider
          Divider(height: 1, color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2)),
          
          // Action Row
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                PartStockBadge(availableStock: widget.part.availableStock),
                
                // Animated CrossFade for InStock vs Backorder
                AnimatedCrossFade(
                  duration: const Duration(milliseconds: 300),
                  crossFadeState: inStock ? CrossFadeState.showFirst : CrossFadeState.showSecond,
                  firstChild: Row( // In Stock Actions
                    children: [
                      PartQuantityStepper(
                        quantity: _quantity,
                        maxStock: widget.part.availableStock,
                        onChanged: (val) => setState(() => _quantity = val),
                      ),
                      const SizedBox(width: 12),
                      GestureDetector(
                        onTap: _onAdd,
                        child: Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: theme.colorScheme.primary.withValues(alpha: 0.3),
                                blurRadius: 8,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: Icon(CupertinoIcons.cart_badge_plus, color: theme.colorScheme.onPrimary, size: 20),
                        ),
                      ),
                    ],
                  ),
                  secondChild: GestureDetector( // Backorder Action
                    onTap: _toggleBackorder,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.surfaceContainer,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: const Color(0xFFFF9500).withValues(alpha: 0.3)),
                      ),
                      child: Row(
                        children: [
                          const Icon(CupertinoIcons.calendar, color: Color(0xFFFF9500), size: 18),
                          const SizedBox(width: 8),
                          Text(
                            'Đặt hàng'.tr(),
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: const Color(0xFFFF9500),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Expected Date Picker Expansion
          AnimatedSize(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOutCubic,
            child: _isExpanded
                ? Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      border: Border(top: BorderSide(color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2))),
                      color: isDark ? const Color(0xFF1C1C1E) : const Color(0xFFF9F9F9),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Ngày dự kiến về'.tr().toUpperCase(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            letterSpacing: 0.5,
                            color: theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: () async {
                                  final now = DateTime.now();
                                  await showCupertinoModalPopup<void>(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return Container(
                                        height: 280,
                                        margin: const EdgeInsets.only(bottom: 24, left: 16, right: 16),
                                        decoration: BoxDecoration(
                                          color: theme.colorScheme.surface.withValues(alpha: 0.8),
                                          borderRadius: BorderRadius.circular(24),
                                        ),
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.circular(24),
                                          child: BackdropFilter(
                                            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                                            child: Column(
                                              children: [
                                                Expanded(
                                                  child: CupertinoDatePicker(
                                                    initialDateTime: _expectedDate ?? now.add(const Duration(days: 3)),
                                                    minimumDate: now,
                                                    maximumDate: now.add(const Duration(days: 90)),
                                                    mode: CupertinoDatePickerMode.date,
                                                    use24hFormat: true,
                                                    onDateTimeChanged: (DateTime newDate) {
                                                      setState(() => _expectedDate = newDate);
                                                    },
                                                  ),
                                                ),
                                                CupertinoButton(
                                                  child: Text(
                                                    'Xong'.tr(), 
                                                    style: TextStyle(
                                                      fontWeight: FontWeight.w600,
                                                      color: theme.colorScheme.primary,
                                                    )
                                                  ),
                                                  onPressed: () => Navigator.of(context).pop(),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      );
                                    },
                                  );
                                  
                                  if (_expectedDate == null) {
                                    setState(() => _expectedDate = now.add(const Duration(days: 3)));
                                  }
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                  decoration: BoxDecoration(
                                    color: theme.colorScheme.surface,
                                    borderRadius: BorderRadius.circular(8),
                                    border: Border.all(color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3)),
                                  ),
                                  child: Text(
                                    _expectedDate != null
                                        ? DateFormat('dd/MM/yyyy').format(_expectedDate!)
                                        : 'Chọn ngày...'.tr(),
                                    style: theme.textTheme.bodyMedium,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            GestureDetector(
                              onTap: _expectedDate != null ? _onAdd : null,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                decoration: BoxDecoration(
                                  color: _expectedDate != null
                                      ? theme.colorScheme.primary
                                      : theme.colorScheme.primary.withValues(alpha: 0.3),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  children: [
                                    Icon(CupertinoIcons.checkmark_alt, color: theme.colorScheme.onPrimary, size: 18),
                                    const SizedBox(width: 6),
                                    Text(
                                      'Xác nhận'.tr(),
                                      style: theme.textTheme.bodyMedium?.copyWith(
                                        color: theme.colorScheme.onPrimary,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
