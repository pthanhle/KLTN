import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/core/config/api_config.dart';
import 'package:ttauto_staff/roles/warehouse/features/orders/controllers/warehouse_orders_controller.dart';
import 'package:ttauto_staff/shared/widgets/toast/glass_toast.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';
import 'shipping_provider_modal.dart';
import 'package:ttauto_staff/shared/widgets/buttons/glass_close_button.dart';

class DispatchBottomSheet extends StatefulWidget {
  final String orderId;

  const DispatchBottomSheet({
    super.key,
    required this.orderId,
  });

  static Future<void> show(BuildContext context, String orderId) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: DispatchBottomSheet(orderId: orderId),
      ),
    );
  }

  @override
  State<DispatchBottomSheet> createState() => _DispatchBottomSheetState();
}

class _DispatchBottomSheetState extends State<DispatchBottomSheet> {
  final _providerController = TextEditingController();
  final _trackingCodeController = TextEditingController();
  bool _isLoading = false;

  bool get _isCodeMatching =>
      _trackingCodeController.text.trim() == ApiConfig.validTrackingCode;

  bool get _isValid =>
      _providerController.text.trim().isNotEmpty &&
      _trackingCodeController.text.trim().isNotEmpty &&
      _isCodeMatching;

  @override
  void dispose() {
    _providerController.dispose();
    _trackingCodeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.2),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: const EdgeInsets.only(
              top: 16,
              left: 24,
              right: 24,
              bottom: 32,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                Stack(
                  alignment: Alignment.topCenter,
                  children: [
                    Align(
                      alignment: Alignment.topRight,
                      child: GlassCloseButton(
                        onPressed: () => context.pop(),
                      ),
                    ),
                    Column(
                      children: [
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: ShapeDecoration(
                            color: theme.colorScheme.primary.withValues(alpha: 0.15),
                            shape: SmoothRectangleBorder(
                              borderRadius: SmoothBorderRadius(
                                cornerRadius: 20,
                                cornerSmoothing: 1.0,
                              ),
                            ),
                          ),
                          child: Icon(
                            CupertinoIcons.car_detailed,
                            color: theme.colorScheme.primary,
                            size: 28,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Bàn giao ĐVVC'.tr(),
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSurface,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${'Đơn hàng'.tr()}: ${widget.orderId}',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 32),
                GestureDetector(
                  onTap: () async {
                    HapticFeedback.selectionClick();
                    final provider = await ShippingProviderModal.show(context);
                    if (provider != null) {
                      setState(() {
                        _providerController.text = provider.name;
                      });
                    }
                  },
                  behavior: HitTestBehavior.opaque,
                  child: AbsorbPointer(
                    child: _buildInputField(
                      context,
                      label: 'Hãng vận chuyển'.tr(),
                      hint: 'Chọn đơn vị vận chuyển'.tr(),
                      controller: _providerController,
                      icon: CupertinoIcons.building_2_fill,
                      suffixIcon: CupertinoIcons.chevron_down,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                _buildInputField(
                  context,
                  label: 'Mã vận đơn'.tr(),
                  hint: 'Nhập hoặc quét mã vạch'.tr(),
                  controller: _trackingCodeController,
                  icon: CupertinoIcons.barcode,
                  suffixIcon: CupertinoIcons.qrcode_viewfinder,
                ),
                if (_trackingCodeController.text.trim().isNotEmpty && !_isCodeMatching) ...[
                  const SizedBox(height: 8),
                  Text(
                    'Mã vận đơn không hợp lệ. Vui lòng quét đúng mã trên phiếu của ĐVVC.'.tr(),
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
                const SizedBox(height: 32),
                Consumer(
                  builder: (context, ref, child) {
                    return SizedBox(
                      height: 56,
                      child: LiquidButton(
                        isLoading: _isLoading,
                        isGlass: true,
                        onPressed: _isValid && !_isLoading
                            ? () async {
                                setState(() => _isLoading = true);
                                
                                await Future.delayed(const Duration(milliseconds: 800));
                                
                                if (context.mounted) {
                                  ref.read(warehouseOrdersProvider.notifier).dispatchOrder(
                                    widget.orderId,
                                    _providerController.text,
                                    _trackingCodeController.text,
                                  );
                                  
                                  context.pop();
                                  GlassToast.show(
                                    context,
                                    title: 'Bàn giao đơn {orderId} thành công!'.tr(namedArgs: {'orderId': widget.orderId}),
                                    icon: CupertinoIcons.checkmark_seal_fill,
                                  );
                                }
                              }
                            : null,
                        child: Text('Hoàn tất bàn giao'.tr()),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInputField(
    BuildContext context, {
    required String label,
    required String hint,
    required TextEditingController controller,
    required IconData icon,
    IconData? suffixIcon,
  }) {
    final theme = Theme.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: theme.textTheme.labelMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          decoration: ShapeDecoration(
            color: theme.colorScheme.surface.withValues(alpha: 0.5),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                width: 1,
              ),
            ),
          ),
          child: TextField(
            controller: controller,
            onChanged: (_) => setState(() {}),
            style: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurface,
            ),
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
              ),
              prefixIcon: Icon(
                icon,
                color: theme.colorScheme.onSurfaceVariant,
                size: 22,
              ),
              suffixIcon: suffixIcon != null
                  ? IconButton(
                      icon: Icon(suffixIcon, color: theme.colorScheme.primary),
                      onPressed: () {
                        HapticFeedback.lightImpact();
                      },
                    )
                  : null,
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }
}
