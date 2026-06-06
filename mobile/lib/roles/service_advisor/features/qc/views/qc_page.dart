import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../../shared/widgets/buttons/liquid_button.dart';
import '../../../../../shared/widgets/toast/glass_toast.dart';
import '../controllers/qc_controller.dart';

class QcPage extends ConsumerStatefulWidget {
  final String progressId;

  const QcPage({super.key, required this.progressId});

  @override
  ConsumerState<QcPage> createState() => _QcPageState();
}

class _QcPageState extends ConsumerState<QcPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(qcControllerProvider.notifier).init(widget.progressId);
    });
  }

  Future<void> _handleSubmit() async {
    try {
      await ref.read(qcControllerProvider.notifier).submitQc();
      if (mounted) {
        GlassToast.show(
          context,
          title: 'Đã chuyển sang QC!'.tr(),
          icon: CupertinoIcons.check_mark_circled,
        );
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        GlassToast.show(
          context,
          title: e.toString().replaceFirst('Exception: ', ''),
          icon: CupertinoIcons.xmark_circle,
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(qcControllerProvider);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: Stack(
          children: [
            CustomScrollView(
              slivers: [
                SliverAppBar.large(
                  backgroundColor: Colors.transparent,
                  surfaceTintColor: Colors.transparent,
                  shadowColor: Colors.transparent,
                  scrolledUnderElevation: 0,
                  forceMaterialTransparency: true,
                  elevation: 0,
                  pinned: true,
                  leading: Padding(
                    padding: const EdgeInsets.only(left: 8),
                    child: GlassNavBackButton(onPressed: () => context.pop()),
                  ),
                  flexibleSpace: FlexibleSpaceBar(
                    titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    title: Text(
                      'Kiểm Tra Chất Lượng'.tr(),
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ),
                ),
                SliverPadding(
                  padding: EdgeInsets.only(
                    left: 16,
                    right: 16,
                    bottom: 120 + bottomSafeArea,
                  ),
                  sliver: SliverList(
                    delegate: SliverChildListDelegate([
                      const SizedBox(height: 8),
                      _InfoBanner(theme: theme, isDark: isDark),
                      const SizedBox(height: 20),
                      _ChecklistCard(
                        theme: theme,
                        isDark: isDark,
                        checklist: state.checklist,
                        onToggle: (id) => ref.read(qcControllerProvider.notifier).toggle(id),
                      ),
                      const SizedBox(height: 16),
                      _ProgressIndicator(
                        theme: theme,
                        passed: state.checklist.where((c) => c.checked).length,
                        total: state.checklist.length,
                      ),
                    ]),
                  ),
                ),
              ],
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: _BottomBar(
                theme: theme,
                isDark: isDark,
                bottomSafeArea: bottomSafeArea,
                isLoading: state.isSubmitting,
                allChecked: state.allChecked,
                onSubmit: _handleSubmit,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoBanner extends StatelessWidget {
  final ThemeData theme;
  final bool isDark;

  const _InfoBanner({required this.theme, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: ShapeDecoration(
        color: theme.colorScheme.primaryContainer.withValues(alpha: isDark ? 0.3 : 0.5),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
        ),
      ),
      child: Row(
        children: [
          Icon(CupertinoIcons.info_circle_fill, color: theme.colorScheme.primary, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Tích vào các hạng mục đã hoàn thành trước khi bàn giao xe cho khách'.tr(),
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onPrimaryContainer,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ChecklistCard extends StatelessWidget {
  final ThemeData theme;
  final bool isDark;
  final List<QcCheckItem> checklist;
  final void Function(String id) onToggle;

  const _ChecklistCard({
    required this.theme,
    required this.isDark,
    required this.checklist,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.05)
            : theme.colorScheme.surface.withValues(alpha: 0.72),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.4),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.20 : 0.05),
            blurRadius: 24,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Column(
            children: checklist.asMap().entries.map((entry) {
              final index = entry.key;
              final item = entry.value;
              final isLast = index == checklist.length - 1;
              return _ChecklistRow(
                theme: theme,
                isDark: isDark,
                item: item,
                isLast: isLast,
                onTap: () => onToggle(item.id),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}

class _ChecklistRow extends StatelessWidget {
  final ThemeData theme;
  final bool isDark;
  final QcCheckItem item;
  final bool isLast;
  final VoidCallback onTap;

  const _ChecklistRow({
    required this.theme,
    required this.isDark,
    required this.item,
    required this.isLast,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        InkWell(
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Row(
              children: [
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: item.checked
                        ? theme.colorScheme.primary
                        : Colors.transparent,
                    border: Border.all(
                      color: item.checked
                          ? theme.colorScheme.primary
                          : theme.colorScheme.outline.withValues(alpha: 0.5),
                      width: 1.5,
                    ),
                    borderRadius: BorderRadius.circular(7),
                  ),
                  child: item.checked
                      ? const Icon(CupertinoIcons.checkmark, size: 14, color: Colors.white)
                      : null,
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Text(
                    item.label,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: item.checked
                          ? theme.colorScheme.onSurface
                          : theme.colorScheme.onSurfaceVariant,
                      decoration: item.checked ? TextDecoration.lineThrough : null,
                      decorationColor: theme.colorScheme.onSurface.withValues(alpha: 0.4),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        if (!isLast)
          Divider(
            height: 0.5,
            thickness: 0.5,
            indent: 58,
            color: Colors.white.withValues(alpha: isDark ? 0.08 : 0.25),
          ),
      ],
    );
  }
}

class _ProgressIndicator extends StatelessWidget {
  final ThemeData theme;
  final int passed;
  final int total;

  const _ProgressIndicator({required this.theme, required this.passed, required this.total});

  @override
  Widget build(BuildContext context) {
    final ratio = total > 0 ? passed / total : 0.0;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Tiến độ kiểm tra'.tr(),
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            Text(
              '$passed/$total',
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: ratio,
            minHeight: 6,
            backgroundColor: theme.colorScheme.surfaceContainerHigh,
            valueColor: AlwaysStoppedAnimation(theme.colorScheme.primary),
          ),
        ),
      ],
    );
  }
}

class _BottomBar extends StatelessWidget {
  final ThemeData theme;
  final bool isDark;
  final double bottomSafeArea;
  final bool isLoading;
  final bool allChecked;
  final VoidCallback onSubmit;

  const _BottomBar({
    required this.theme,
    required this.isDark,
    required this.bottomSafeArea,
    required this.isLoading,
    required this.allChecked,
    required this.onSubmit,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.60),
        shape: SmoothRectangleBorder(
          borderRadius: const SmoothBorderRadius.only(
            topLeft: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            topRight: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.20),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.10),
            blurRadius: 20,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: const SmoothBorderRadius.only(
          topLeft: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          topRight: SmoothRadius(cornerRadius: 24, cornerSmoothing: 1.0),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: EdgeInsets.only(
              left: 20,
              right: 20,
              top: 16,
              bottom: bottomSafeArea > 0 ? bottomSafeArea : 20,
            ),
            child: LiquidButton(
              isLoading: isLoading,
              isGlass: false,
              onPressed: (!allChecked || isLoading) ? null : onSubmit,
              child: Text(
                allChecked
                    ? 'Xác Nhận QC & Chuyển Giao'.tr()
                    : 'Hoàn thành tất cả hạng mục để tiếp tục'.tr(),
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.2,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
