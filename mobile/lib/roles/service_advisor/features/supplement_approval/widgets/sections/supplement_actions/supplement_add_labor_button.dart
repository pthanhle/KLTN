import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../../../../shared/widgets/buttons/add_catalog_button.dart';
import '../../../controllers/supplement_controller.dart';
import '../../../../quotation/controllers/labor_search_controller.dart';
import '../../../../quotation/widgets/modals/labor_search_modal/labor_search_modal.dart';

class SupplementAddLaborButton extends ConsumerWidget {
  const SupplementAddLaborButton({super.key});

  void _openLaborModal(BuildContext context, WidgetRef ref) {
    final supplementNotifier = ref.read(supplementControllerProvider.notifier);
    final laborSearchNotifier = ref.read(laborSearchControllerProvider.notifier);
    laborSearchNotifier.setConfirmOverride((labors) {
      supplementNotifier.addLaborsFromSearch(labors);
    });
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      builder: (_) => const LaborSearchModal(),
    ).then((_) => laborSearchNotifier.setConfirmOverride(null));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return AddCatalogButton(
      icon: CupertinoIcons.person_fill,
      label: 'Tiền công'.tr(),
      color: Theme.of(context).colorScheme.tertiary,
      onTap: () {
        HapticFeedback.mediumImpact();
        _openLaborModal(context, ref);
      },
    );
  }
}
