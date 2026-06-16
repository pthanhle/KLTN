import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../inputs/glass_text_field.dart';
import '../inputs/glass_dropdown.dart';
import '../../../models/contract_payload_model.dart';
import '../../../controllers/contract_builder_controller.dart';
import '../../../controllers/vn_provinces_controller.dart';

class ContactInfoForm extends ConsumerWidget {
  final CustomerSnapshotModel customerSnapshot;
  final ValueChanged<CustomerSnapshotModel> onChanged;

  const ContactInfoForm({
    super.key,
    required this.customerSnapshot,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final contractState = ref.watch(contractBuilderControllerProvider);
    final contractController = ref.read(contractBuilderControllerProvider.notifier);
    
    final vnState = ref.watch(vnProvincesControllerProvider);
    final vnController = ref.read(vnProvincesControllerProvider.notifier);

    String? getMatchedName(List<String> items, String? target) {
      if (target == null || target.isEmpty) return null;
      
      String normalize(String s) {
        String res = s.toLowerCase();
        res = res.replaceAll(RegExp(r'^(thành phố|tỉnh|quận|huyện|phường|xã)\s+'), '');
        res = res.replaceAll(RegExp(r'\b0(\d)\b'), r'$1');
        return res.trim();
      }

      final normTarget = normalize(target);
      for (var item in items) {
        final normItem = normalize(item);
        if (normItem == normTarget) {
          return item;
        }
      }
      return null;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GlassTextField(
          label: 'Số điện thoại'.tr(),
          placeholder: 'Nhập số điện thoại...'.tr(),
          keyboardType: TextInputType.phone,
          controller: TextEditingController(text: customerSnapshot.phone)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.phone?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(phone: val));
          },
        ),
        const SizedBox(height: 16),
        GlassTextField(
          label: 'Email'.tr(),
          placeholder: 'Nhập email...'.tr(),
          keyboardType: TextInputType.emailAddress,
          controller: TextEditingController(text: customerSnapshot.email)
            ..selection = TextSelection.collapsed(offset: customerSnapshot.email?.length ?? 0),
          onChanged: (val) {
            onChanged(customerSnapshot.copyWith(email: val));
          },
        ),
        const SizedBox(height: 16),
        GlassDropdown<String>(
          label: 'Tỉnh/Thành phố'.tr(),
          placeholder: 'Chọn Tỉnh/Thành phố'.tr(),
          isLoading: vnState.isLoadingProvinces,
          value: getMatchedName(vnState.provinces.map((p) => p.name).toList(), contractState.customerCity),
          items: vnState.provinces.map((p) => p.name).toList(),
          onChanged: (val) {
            contractController.updateCustomerAddress(city: val, district: '', ward: '');
            final p = vnState.provinces.firstWhere((p) => p.name == val);
            vnController.fetchDistricts(p.code);
          },
        ),
        const SizedBox(height: 16),
        GlassDropdown<String>(
          label: 'Quận/Huyện'.tr(),
          placeholder: 'Chọn Quận/Huyện'.tr(),
          isLoading: vnState.isLoadingDistricts,
          value: getMatchedName(vnState.districts.map((d) => d.name).toList(), contractState.customerDistrict),
          items: vnState.districts.map((d) => d.name).toList(),
          onChanged: (val) {
            contractController.updateCustomerAddress(district: val, ward: '');
            final d = vnState.districts.firstWhere((d) => d.name == val);
            vnController.fetchWards(d.code);
          },
        ),
        const SizedBox(height: 16),
        GlassDropdown<String>(
          label: 'Phường/Xã'.tr(),
          placeholder: 'Chọn Phường/Xã'.tr(),
          isLoading: vnState.isLoadingWards,
          value: getMatchedName(vnState.wards.map((w) => w.name).toList(), contractState.customerWard),
          items: vnState.wards.map((w) => w.name).toList(),
          onChanged: (val) {
            contractController.updateCustomerAddress(ward: val);
          },
        ),
        const SizedBox(height: 16),
        GlassTextField(
          label: 'Số nhà, tên đường'.tr(),
          placeholder: 'Nhập số nhà, tên đường...'.tr(),
          controller: TextEditingController(text: contractState.customerStreet)
            ..selection = TextSelection.collapsed(offset: contractState.customerStreet?.length ?? 0),
          onChanged: (val) {
            contractController.updateCustomerAddress(street: val);
          },
        ),
      ],
    );
  }
}
