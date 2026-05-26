import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../../../../shared/widgets/buttons/add_catalog_button.dart';
import '../../../controllers/supplement_controller.dart';
import '../../../../quotation/controllers/part_search_controller.dart';
import '../../../../quotation/widgets/modals/part_search_modal/part_search_modal.dart';

class SupplementAddPartButton extends ConsumerWidget {
  const SupplementAddPartButton({super.key});

  void _openPartModal(BuildContext context, WidgetRef ref) {
    final supplementNotifier = ref.read(supplementControllerProvider.notifier);
    final partSearchNotifier = ref.read(partSearchControllerProvider.notifier);
    partSearchNotifier.setAddOverride((part, qty, {expectedDate}) {
      supplementNotifier.addPartFromSearch(part, qty, expectedDate: expectedDate);
    });
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      builder: (_) => const PartSearchModal(),
    ).then((_) => partSearchNotifier.setAddOverride(null));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return AddCatalogButton(
      icon: CupertinoIcons.wrench_fill,
      label: 'Phụ tùng'.tr(),
      onTap: () {
        HapticFeedback.mediumImpact();
        _openPartModal(context, ref);
      },
    );
  }
}
