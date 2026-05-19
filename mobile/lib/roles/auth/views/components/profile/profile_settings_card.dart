import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../shared/widgets/containers/glass_card.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../../core/theme/theme_provider.dart';

class ProfileSettingsCard extends ConsumerStatefulWidget {
  const ProfileSettingsCard({super.key});

  @override
  ConsumerState<ProfileSettingsCard> createState() => _ProfileSettingsCardState();
}

class _ProfileSettingsCardState extends ConsumerState<ProfileSettingsCard> {
  bool _isDarkMode = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final themeMode = ref.watch(themeModeProvider);
    _isDarkMode = themeMode == ThemeMode.dark ||
        (themeMode == ThemeMode.system &&
            Theme.of(context).brightness == Brightness.dark);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 16, bottom: 8),
          child: Text(
            'Tuỳ chọn'.tr().toUpperCase(),
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
              letterSpacing: 1.2,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        GlassCard(
          padding: EdgeInsets.zero,
          child: Column(
            children: [
              _buildSettingRow(
                context,
                icon: Icons.dark_mode_outlined,
                title: 'Chế độ ban đêm'.tr(),
                trailing: CupertinoSwitch(
                  value: _isDarkMode,
                  activeColor: Theme.of(context).colorScheme.primary,
                  onChanged: (value) {
                    HapticFeedback.lightImpact();
                    setState(() {
                      _isDarkMode = value;
                    });
                    ref.read(themeModeProvider.notifier).toggleTheme(value);
                  },
                ),
                isFirst: true,
              ),
              Divider(
                height: 1,
                thickness: 1,
                color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                indent: 56,
              ),
              _buildSettingRow(
                context,
                icon: Icons.language_outlined,
                title: 'Ngôn ngữ'.tr(),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      context.locale.languageCode == 'vi' ? 'Tiếng Việt' : 'English',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Icon(
                      Icons.chevron_right_rounded,
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                      size: 20,
                    ),
                  ],
                ),
                isLast: true,
                onTap: () {
                  HapticFeedback.lightImpact();
                  _showLanguagePicker(context);
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _showLanguagePicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      elevation: 0,
      isScrollControlled: true,
      builder: (BuildContext ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;
        final glassColor = isDark ? Colors.grey[900]!.withValues(alpha: 0.6) : Colors.white.withValues(alpha: 0.7);
        final borderColor = isDark ? Colors.white.withValues(alpha: 0.2) : Colors.white.withValues(alpha: 0.6);

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ClipPath(
                  clipper: ShapeBorderClipper(
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                    ),
                  ),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
                    child: Container(
                      width: double.infinity,
                      decoration: ShapeDecoration(
                        color: glassColor,
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                          side: BorderSide(color: borderColor, width: 1),
                        ),
                      ),
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(20),
                            child: Text(
                              'Ngôn ngữ'.tr(),
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                                letterSpacing: -0.5,
                              ),
                            ),
                          ),
                          Divider(height: 1, color: theme.dividerColor.withValues(alpha: 0.15)),
                          _buildLanguageTile(
                            ctx,
                            title: 'Tiếng Việt',
                            isSelected: context.locale.languageCode == 'vi',
                            onTap: () {
                              HapticFeedback.lightImpact();
                              context.setLocale(const Locale('vi', 'VN'));
                              Navigator.pop(ctx);
                            },
                          ),
                          Divider(height: 1, color: theme.dividerColor.withValues(alpha: 0.15)),
                          _buildLanguageTile(
                            ctx,
                            title: 'English',
                            isSelected: context.locale.languageCode == 'en',
                            isLast: true,
                            onTap: () {
                              HapticFeedback.lightImpact();
                              context.setLocale(const Locale('en', 'US'));
                              Navigator.pop(ctx);
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                ClipPath(
                  clipper: ShapeBorderClipper(
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                    ),
                  ),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
                    child: Container(
                      width: double.infinity,
                      decoration: ShapeDecoration(
                        color: glassColor,
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                          side: BorderSide(color: borderColor, width: 1),
                        ),
                      ),
                      child: GestureDetector(
                        onTap: () {
                          HapticFeedback.lightImpact();
                          Navigator.pop(ctx);
                        },
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 18),
                          color: Colors.transparent,
                          child: Text(
                            'Hủy'.tr(),
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: theme.colorScheme.primary,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLanguageTile(
    BuildContext context, {
    required String title,
    required bool isSelected,
    required VoidCallback onTap,
    bool isLast = false,
  }) {
    final theme = Theme.of(context);
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: isLast 
            ? const BorderRadius.vertical(bottom: Radius.circular(24))
            : null,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                ),
              ),
              if (isSelected)
                Icon(
                  CupertinoIcons.checkmark_alt,
                  color: theme.colorScheme.primary,
                  size: 22,
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSettingRow(
    BuildContext context, {
    required IconData icon,
    required String title,
    required Widget trailing,
    bool isFirst = false,
    bool isLast = false,
    VoidCallback? onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.vertical(
          top: isFirst ? const Radius.circular(24) : Radius.zero,
          bottom: isLast ? const Radius.circular(24) : Radius.zero,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(
                  icon, 
                  color: Theme.of(context).colorScheme.onSurface,
                  size: 18,
                ),
              ),
              const SizedBox(width: 16),
              Text(
                title,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
              const Spacer(),
              trailing,
            ],
          ),
        ),
      ),
    );
  }
}
