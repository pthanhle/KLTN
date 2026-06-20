import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/vehicle_contract_list_model.dart';
import '../../utils/contract_formatters.dart';
import '../molecules/contract_card_header.dart';
import '../molecules/contract_card_customer_info.dart';
import '../molecules/contract_card_vehicle_info.dart';
import '../molecules/contract_card_footer.dart';

class ContractCard extends StatefulWidget {
  final VehicleContractListModel contract;
  final VoidCallback onTap;

  const ContractCard({
    super.key,
    required this.contract,
    required this.onTap,
  });

  @override
  State<ContractCard> createState() => _ContractCardState();
}

class _ContractCardState extends State<ContractCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTapDown: (_) {
        setState(() => _isPressed = true);
      },
      onTapUp: (_) {
        setState(() => _isPressed = false);
        widget.onTap();
      },
      onTapCancel: () {
        setState(() => _isPressed = false);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.02)
              : Colors.white.withValues(alpha: 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ContractCardHeader(contract: widget.contract),
                  const SizedBox(height: 12),
                  ContractCardCustomerInfo(
                    customerName: widget.contract.customerSnapshot?.fullName ?? 'Khách hàng',
                  ),
                  const SizedBox(height: 6),
                  ContractCardVehicleInfo(
                    carName: widget.contract.vehicleSnapshot?.name ?? '',
                    vin: widget.contract.vehicleSnapshot?.vin ?? '',
                  ),
                  ContractCardFooter(
                    grandTotal: widget.contract.pricingSnapshot?.grandTotal ?? 0,
                    formattedCurrency: ContractFormatters.formatCurrency(widget.contract.pricingSnapshot?.grandTotal ?? 0),
                  ),
                ],
              ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0).scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
