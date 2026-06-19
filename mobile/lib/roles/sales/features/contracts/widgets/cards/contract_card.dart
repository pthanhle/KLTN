import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../../models/vehicle_contract_list_model.dart';
import '../atoms/contract_status_badge.dart';
import 'contract_card/contract_card_header.dart';
import 'contract_card/contract_card_customer.dart';
import 'contract_card/contract_card_vehicle.dart';
import 'contract_card/contract_card_footer.dart';

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

  Color _cardBgColor(String status, bool isDark) {
    switch (status) {
      case 'signed':
      case 'delivered':
        return Colors.green.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
      case 'issued':
        return Colors.blue.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
      case 'cancelled':
        return Colors.red.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
      case 'paid':
        return Colors.teal.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
      default:
        return isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15);
    }
  }

  Color _cardBorderColor(String status, bool isDark) {
    switch (status) {
      case 'signed':
      case 'delivered':
        return Colors.green.shade600.withValues(alpha: isDark ? 0.20 : 0.40);
      case 'issued':
        return Colors.blue.shade600.withValues(alpha: isDark ? 0.20 : 0.40);
      case 'cancelled':
        return Colors.red.shade600.withValues(alpha: isDark ? 0.20 : 0.40);
      case 'paid':
        return Colors.teal.shade600.withValues(alpha: isDark ? 0.20 : 0.40);
      default:
        return isDark
            ? Colors.white.withValues(alpha: 0.15)
            : Colors.white.withValues(alpha: 0.70);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTapDown: (_) {
        HapticFeedback.selectionClick();
        setState(() => _isPressed = true);
      },
      onTapUp: (_) {
        HapticFeedback.lightImpact();
        setState(() => _isPressed = false);
        widget.onTap();
      },
      onTapCancel: () => setState(() => _isPressed = false),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        decoration: ShapeDecoration(
          color: _cardBgColor(widget.contract.status, isDark),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            side: BorderSide(
              color: _cardBorderColor(widget.contract.status, isDark),
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
          radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ContractCardHeader(contract: widget.contract),
                  const SizedBox(height: 16),
                  ContractCardCustomer(contract: widget.contract),
                  const SizedBox(height: 8),
                  ContractCardVehicle(contract: widget.contract),
                  const SizedBox(height: 16),
                  Container(
                    height: 0.5,
                    color: context.colors.outlineVariant.withValues(alpha: 0.3),
                  ),
                  const SizedBox(height: 16),
                  ContractCardFooter(contract: widget.contract),
                ],
              ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.95, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
