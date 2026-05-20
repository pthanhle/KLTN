import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
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
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ý kiến khách hàng'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          CustomerComplaintInput(
            initialValue: state.data.customerComplaint,
            onChanged: controller.updateComplaint,
          ),
          const SizedBox(height: 24),
          Text(
            'Gói Dịch Vụ'.tr(),
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 12,
            children: [
              ...state.data.selectedPackages.map((pkg) => ServicePackageChip(
                    package: pkg,
                    onRemove: () => controller.removePackage(pkg.id),
                  )),
              AddPackageButton(
                onTap: () => AddServicePackageModal.show(context),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
