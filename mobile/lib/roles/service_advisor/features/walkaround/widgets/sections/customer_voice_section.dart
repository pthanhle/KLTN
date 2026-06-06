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

        ],
      ),
    );
  }
}
