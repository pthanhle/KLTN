import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../models/user_model.dart';
import '../../../../../core/utils/formatters.dart';
import '../../../../../shared/widgets/containers/glass_card.dart';

class ProfileDetailsCard extends StatelessWidget {
  final UserModel? user;

  const ProfileDetailsCard({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    if (user == null) return const SizedBox.shrink();

    return GlassCard(
      padding: EdgeInsets.zero,
      child: Column(
        children: [
          _buildRow(
            context,
            icon: Icons.calendar_today_outlined,
            iconColor: Theme.of(context).colorScheme.secondary,
            title: 'Ngày gia nhập'.tr(),
            value: Formatters.formatDate(user!.joinDate),
            isFirst: true,
          ),
          Divider(
            height: 1,
            thickness: 1,
            color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
            indent: 56,
          ),
          _buildRow(
            context,
            icon: Icons.attach_money_rounded,
            iconColor: Theme.of(context).colorScheme.primary,
            title: 'Lương cơ bản'.tr(),
            value: Formatters.formatCurrency(user!.baseSalary),
            isLast: true,
            isHighlight: true,
          ),
        ],
      ),
    );
  }

  Widget _buildRow(
    BuildContext context, {
    required IconData icon,
    required Color iconColor,
    required String title,
    required String value,
    bool isFirst = false,
    bool isLast = false,
    bool isHighlight = false,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {}, // For subtle ripple
        borderRadius: BorderRadius.vertical(
          top: isFirst ? const Radius.circular(24) : Radius.zero,
          bottom: isLast ? const Radius.circular(24) : Radius.zero,
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: iconColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(icon, color: iconColor, size: 20),
              ),
              const SizedBox(width: 16),
              Text(
                title,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
              const Spacer(),
              Text(
                value,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: isHighlight
                      ? Theme.of(context).colorScheme.onSurface
                      : Theme.of(context).colorScheme.onSurfaceVariant,
                  fontWeight: isHighlight ? FontWeight.w600 : FontWeight.w400,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
