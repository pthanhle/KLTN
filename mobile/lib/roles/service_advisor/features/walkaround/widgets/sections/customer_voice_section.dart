import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/walkaround_controller.dart';
import '../components/customer_voice/customer_complaint_input.dart';
import '../components/customer_voice/service_package_chip.dart';
import '../components/customer_voice/add_package_button.dart';
import '../modals/add_service_package_modal.dart';

class CustomerVoiceSection extends ConsumerWidget {
  const CustomerVoiceSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Section title — Ý kiến khách hàng
          Text(
            'Ý kiến khách hàng'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 16),

          CustomerComplaintInput(
            initialValue: state.data.customerComplaint,
            onChanged: controller.updateComplaint,
          ),
          const SizedBox(height: 28),

          // Section title — Gói dịch vụ
          Row(
            children: [
              Text(
                'Gói Dịch Vụ'.tr(),
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.3,
                ),
              ),
              if (state.data.selectedPackages.isNotEmpty) ...[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 2,
                  ),
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.12),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 10,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                  child: Text(
                    '${state.data.selectedPackages.length}',
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 12),

          Wrap(
            spacing: 8,
            runSpacing: 10,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              ...state.data.selectedPackages.map(
                (pkg) => ServicePackageChip(
                  package: pkg,
                  onRemove: () => controller.removePackage(pkg.id),
                ),
              ),
              AddPackageButton(
                onTap: () => AddServicePackageModal.show(context),
              ),
            ],
          ),

          // Empty state nếu chưa có gói nào
          if (state.data.selectedPackages.isEmpty) ...[
            const SizedBox(height: 8),
            Text(
              'Chưa có gói dịch vụ nào được chọn.'.tr(),
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
              ),
            ),
          ],

          const SizedBox(height: 32),
        ],
      ),
    );
  }
}
