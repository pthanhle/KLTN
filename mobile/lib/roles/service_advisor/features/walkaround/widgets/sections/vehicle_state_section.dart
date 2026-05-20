import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/services.dart';
import '../../controllers/walkaround_controller.dart';

class VehicleStateSection extends ConsumerWidget {
  const VehicleStateSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Trạng thái xe'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Mức nhiên liệu / Pin (%)'.tr(),
                style: theme.textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w600),
              ),
              Text(
                '${(state.data.fuelLevel * 100).toInt()}%',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(
            width: double.infinity,
            child: CupertinoSlider(
              value: state.data.fuelLevel,
              min: 0.0,
              max: 1.0,
              onChanged: controller.updateFuel,
              activeColor: theme.colorScheme.primary,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('E', style: theme.textTheme.labelSmall?.copyWith(color: theme.colorScheme.outline)),
                Text('1/2', style: theme.textTheme.labelSmall?.copyWith(color: theme.colorScheme.outline)),
                Text('F', style: theme.textTheme.labelSmall?.copyWith(color: theme.colorScheme.outline)),
              ],
            ),
          ),

          const SizedBox(height: 32),

          Text(
            'Số Odometer (km)'.tr(),
            style: theme.textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 12),
          Container(
            decoration: ShapeDecoration(
              color: isDark 
                  ? Colors.white.withValues(alpha: 0.05)
                  : theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.8),
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
              keyboardType: const TextInputType.numberWithOptions(decimal: false, signed: false),
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(7), // Max 9,999,999 km
              ],
              onChanged: (val) {
                final km = int.tryParse(val);
                if (km != null) {
                  controller.updateOdometer(km);
                } else if (val.isEmpty) {
                  controller.updateOdometer(0);
                }
              },
              style: theme.textTheme.bodyLarge,
              decoration: InputDecoration(
                hintText: 'Ví dụ: 45000'.tr(),
                hintStyle: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.outline,
                ),
                prefixIcon: Icon(CupertinoIcons.speedometer, color: theme.colorScheme.onSurfaceVariant),
                contentPadding: const EdgeInsets.all(16),
                border: InputBorder.none,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
