import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../customer_form/inputs/glass_text_field.dart';

class PricingAdjustmentsForm extends StatefulWidget {
  final num discount;
  final num vat;
  final num registrationFee;
  final num insuranceFee;
  final num otherFees;
  final ValueChanged<num> onDiscountChanged;
  final ValueChanged<num> onVatChanged;
  final ValueChanged<num> onRegistrationFeeChanged;
  final ValueChanged<num> onInsuranceFeeChanged;
  final ValueChanged<num> onOtherFeesChanged;

  const PricingAdjustmentsForm({
    super.key,
    required this.discount,
    required this.vat,
    required this.registrationFee,
    required this.insuranceFee,
    required this.otherFees,
    required this.onDiscountChanged,
    required this.onVatChanged,
    required this.onRegistrationFeeChanged,
    required this.onInsuranceFeeChanged,
    required this.onOtherFeesChanged,
  });

  @override
  State<PricingAdjustmentsForm> createState() => _PricingAdjustmentsFormState();
}

class _PricingAdjustmentsFormState extends State<PricingAdjustmentsForm> {
  late final TextEditingController _discountController;
  late final TextEditingController _vatController;
  late final TextEditingController _registrationController;
  late final TextEditingController _insuranceController;
  late final TextEditingController _otherFeesController;

  @override
  void initState() {
    super.initState();
    _discountController = TextEditingController(text: widget.discount > 0 ? widget.discount.toString() : '');
    _vatController = TextEditingController(text: widget.vat > 0 ? widget.vat.toString() : '');
    _registrationController = TextEditingController(text: widget.registrationFee > 0 ? widget.registrationFee.toString() : '');
    _insuranceController = TextEditingController(text: widget.insuranceFee > 0 ? widget.insuranceFee.toString() : '');
    _otherFeesController = TextEditingController(text: widget.otherFees > 0 ? widget.otherFees.toString() : '');
  }

  @override
  void dispose() {
    _discountController.dispose();
    _vatController.dispose();
    _registrationController.dispose();
    _insuranceController.dispose();
    _otherFeesController.dispose();
    super.dispose();
  }

  void _parseAndCall(String value, ValueChanged<num> callback) {
    final parsed = num.tryParse(value.replaceAll(RegExp(r'[^0-9]'), '')) ?? 0;
    callback(parsed);
  }

  Widget _buildPrefixIcon(IconData iconData) {
    return Icon(
      iconData,
      size: 20,
      color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8, bottom: 8),
          child: Text(
            'Điều chỉnh giá & Các loại phí'.tr().toUpperCase(),
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
              letterSpacing: 0.5,
            ),
          ),
        ),
        GlassTextField(
          label: 'Giảm giá (VND)'.tr(),
          prefix: _buildPrefixIcon(Icons.money_off_rounded),
          controller: _discountController,
          keyboardType: TextInputType.number,
          onChanged: (v) => _parseAndCall(v, widget.onDiscountChanged),
        ),
        const SizedBox(height: 12),
        GlassTextField(
          label: 'Thuế VAT (VND)'.tr(),
          prefix: _buildPrefixIcon(Icons.account_balance_rounded),
          controller: _vatController,
          keyboardType: TextInputType.number,
          onChanged: (v) => _parseAndCall(v, widget.onVatChanged),
        ),
        const SizedBox(height: 12),
        GlassTextField(
          label: 'Phí trước bạ (VND)'.tr(),
          prefix: _buildPrefixIcon(Icons.directions_car_rounded),
          controller: _registrationController,
          keyboardType: TextInputType.number,
          onChanged: (v) => _parseAndCall(v, widget.onRegistrationFeeChanged),
        ),
        const SizedBox(height: 12),
        GlassTextField(
          label: 'Phí bảo hiểm (VND)'.tr(),
          prefix: _buildPrefixIcon(Icons.security_rounded),
          controller: _insuranceController,
          keyboardType: TextInputType.number,
          onChanged: (v) => _parseAndCall(v, widget.onInsuranceFeeChanged),
        ),
        const SizedBox(height: 12),
        GlassTextField(
          label: 'Phí khác (VND)'.tr(),
          prefix: _buildPrefixIcon(Icons.more_horiz_rounded),
          controller: _otherFeesController,
          keyboardType: TextInputType.number,
          onChanged: (v) => _parseAndCall(v, widget.onOtherFeesChanged),
        ),
      ],
    );
  }
}
