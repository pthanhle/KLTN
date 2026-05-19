import 'package:flutter/cupertino.dart';
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
            icon: CupertinoIcons.calendar,
            iconColor: Theme.of(context).colorScheme.secondary,
            title: 'Ngày gia nhập'.tr(),
            value: Formatters.formatDate(user!.joinDate),
            isFirst: true,
          ),
          Container(
            height: 0.5,
            margin: const EdgeInsets.only(left: 56),
            color: Theme.of(context).dividerColor.withValues(alpha: 0.15),
          ),
          _buildRow(
            context,
            icon: CupertinoIcons.money_dollar_circle,
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
    return GestureDetector(
      onTap: () {},
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        child: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, color: iconColor, size: 18),
            ),
            const SizedBox(width: 14),
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
    );
  }
}
