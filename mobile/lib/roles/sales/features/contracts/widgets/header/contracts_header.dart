import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../segmented_control/contracts_segmented_control.dart';

class ContractsHeader extends ConsumerWidget {
  const ContractsHeader({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Padding(
      padding: const EdgeInsets.only(top: 16, left: 24, right: 24, bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hợp đồng'.tr(),
            style: context.textTheme.headlineLarge?.copyWith(
              color: context.colors.onSurface,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.8,
            ),
          ),
          const SizedBox(height: 16),
          const ContractsSegmentedControl(),
        ],
      ),
    );
  }
}
