import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../inputs/glass_text_field.dart';
import '../../../models/contract_payload_model.dart';

class PersonalInfoForm extends StatelessWidget {
  final CustomerSnapshotModel customerSnapshot;
  final ValueChanged<CustomerSnapshotModel> onChanged;

  const PersonalInfoForm({
    super.key,
    required this.customerSnapshot,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GlassTextField(
          label: 'Họ và Tên'.tr(),
          placeholder: 'Nhập họ và tên...',
          controller: TextEditingController(text: customerSnapshot.fullName)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.fullName?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(fullName: val));
          },
        ),
        const SizedBox(height: 16),
        GlassTextField(
          label: 'CCCD / Passport'.tr(),
          placeholder: 'Nhập số CCCD...',
          keyboardType: TextInputType.number,
          controller: TextEditingController(text: customerSnapshot.idNumber)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.idNumber?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(idNumber: val));
          },
        ),
        const SizedBox(height: 16),
        GlassTextField(
          label: 'Mã số thuế'.tr(),
          placeholder: 'Nhập mã số thuế (nếu có)...'.tr(),
          controller: TextEditingController(text: customerSnapshot.taxCode)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.taxCode?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(taxCode: val));
          },
        ),
        const SizedBox(height: 16),
        GlassTextField(
          label: 'Tên công ty'.tr(),
          placeholder: 'Nhập tên công ty (nếu có)...'.tr(),
          controller: TextEditingController(text: customerSnapshot.companyName)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.companyName?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(companyName: val));
          },
        ),
      ],
    );
  }
}
