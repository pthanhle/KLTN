import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'dart:ui';
import 'package:easy_localization/easy_localization.dart';
import 'package:go_router/go_router.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import 'slide_to_confirm_button.dart';

class PackingHandoverSheet extends StatelessWidget {
  final AssignedTechnician technician;
  final String licensePlate;
  final int totalParts;
  final Future<bool> Function() onConfirm;

  const PackingHandoverSheet({
    super.key,
    required this.technician,
    required this.licensePlate,
    required this.totalParts,
    required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final fallbackAvatar = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(technician.name)}';

    final sheetColor = isDark 
        ? const Color(0xFF0F172A).withValues(alpha: 0.7)
        : theme.colorScheme.surface.withValues(alpha: 0.85);
        
    final textColor = isDark ? Colors.white : theme.colorScheme.onSurface;
    final borderColor = isDark ? Colors.white.withValues(alpha: 0.15) : theme.colorScheme.outlineVariant.withValues(alpha: 0.5);

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: sheetColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
        border: Border.all(
          color: borderColor,
          width: 0.5,
        ),
      ),
      child: ClipRRect(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(40)),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
          child: SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: isDark ? Colors.white.withValues(alpha: 0.2) : Colors.black.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 32),
                  
                  Text(
                    'Bàn giao vật tư cho KTV'.tr(),
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: textColor,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),

                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.03)),
                        ),
                      ),
                      Container(
                        width: 140,
                        height: 140,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: theme.colorScheme.primary.withValues(alpha: 0.1)),
                        ),
                      ),
                      Container(
                        width: 128,
                        height: 128,
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          gradient: LinearGradient(
                            colors: [
                              theme.colorScheme.primary.withValues(alpha: 0.4),
                              isDark ? Colors.white.withValues(alpha: 0.2) : theme.colorScheme.primary.withValues(alpha: 0.1),
                            ],
                            begin: Alignment.topRight,
                            end: Alignment.bottomLeft,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: theme.colorScheme.primary.withValues(alpha: 0.2),
                              blurRadius: 40,
                              spreadRadius: 0,
                            ),
                          ],
                        ),
                        child: Container(
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: isDark ? const Color(0xFF0F172A) : theme.colorScheme.surface, width: 2),
                            image: DecorationImage(
                              image: NetworkImage(technician.avatarUrl ?? fallbackAvatar),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  Text(
                    technician.name,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: textColor,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withValues(alpha: 0.2),
                      border: Border.all(color: theme.colorScheme.primary.withValues(alpha: 0.3)),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      technician.bayNumber.toLowerCase().contains('khoang') 
                          ? technician.bayNumber 
                          : '${'Khoang'.tr()} ${technician.bayNumber}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: isDark ? const Color(0xFFAAC7FF) : theme.colorScheme.primary,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  Text(
                    'Bàn giao {count} phụ tùng cho xe {plate}'.tr(namedArgs: {
                      'count': totalParts.toString(),
                      'plate': licensePlate,
                    }),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: isDark ? Colors.white.withValues(alpha: 0.6) : theme.colorScheme.onSurfaceVariant,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),

                  SlideToConfirmButton(
                    onConfirm: () async {
                      final success = await onConfirm();
                      if (success) {
                        await Future.delayed(const Duration(milliseconds: 600));
                        if (context.mounted) {
                          context.pop();
                        }
                      }
                      return success;
                    },
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
