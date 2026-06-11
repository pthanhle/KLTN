import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/services.dart';
import '../controllers/walkaround_controller.dart';
import '../widgets/shared/walkaround_tab_switcher.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../../shared/widgets/toast/glass_toast.dart';
import '../../shared/widgets/buttons/advisor_primary_button.dart';
import '../widgets/sections/customer_voice_section.dart';
import '../widgets/sections/vehicle_state_section.dart';
import '../widgets/sections/hotspots_section.dart';
import '../widgets/sections/checklist_section.dart';

class WalkaroundPage extends ConsumerStatefulWidget {
  final String orderId;

  const WalkaroundPage({super.key, required this.orderId});

  @override
  ConsumerState<WalkaroundPage> createState() => _WalkaroundPageState();
}

class _WalkaroundPageState extends ConsumerState<WalkaroundPage> {
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(walkaroundControllerProvider.notifier).init(widget.orderId);
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onStepChanged(int step) {
    ref.read(walkaroundControllerProvider.notifier).setStep(step);
    _pageController.animateToPage(
      step,
      duration: const Duration(milliseconds: 350),
      curve: Curves.fastLinearToSlowEaseIn,
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;
    final topSafeArea = MediaQuery.of(context).padding.top;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                color: isDark
                    ? Colors.black.withValues(alpha: 0.05)
                    : Colors.white.withValues(alpha: 0.05),
                border: Border(
                  bottom: BorderSide(
                    color: Colors.white.withValues(alpha: 0.15),
                    width: 0.5,
                  ),
                ),
              ),
              child: ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                  child: Padding(
                    padding: EdgeInsets.only(
                      top: topSafeArea + 8,
                      bottom: 12,
                      left: 20,
                      right: 20,
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            GlassNavBackButton(
                              onPressed: () {
                                HapticFeedback.lightImpact();
                                context.pop();
                              },
                            ),
                            Text(
                              'Tiếp Nhận Xe'.tr(),
                              style: theme.textTheme.headlineSmall?.copyWith(
                                fontWeight: FontWeight.w700,
                                letterSpacing: -0.5,
                              ),
                            ),
                            const SizedBox(width: 36),
                          ],
                        ),
                        const SizedBox(height: 16),
                        WalkaroundTabSwitcher(
                          currentStep: state.currentStep,
                          onStepChanged: _onStepChanged,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: const [
                  CustomerVoiceSection(),
                  VehicleStateSection(),
                  HotspotsSection(),
                  ChecklistSection(),
                ],
              ),
            ),
            Container(
              decoration: BoxDecoration(
                color: isDark
                    ? Colors.black.withValues(alpha: 0.05)
                    : Colors.white.withValues(alpha: 0.05),
                border: Border(
                  top: BorderSide(
                    color: Colors.white.withValues(alpha: 0.15),
                    width: 0.5,
                  ),
                ),
              ),
              child: ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                  child: Padding(
                    padding: EdgeInsets.only(
                      left: 24,
                      right: 24,
                      top: 16,
                      bottom: bottomSafeArea > 0 ? bottomSafeArea : 24,
                    ),
                    child: AdvisorPrimaryButton(
                      isLoading: state.isLoading,
                      icon: CupertinoIcons.checkmark_seal_fill,
                      onPressed: controller.canSubmit() && !state.isLoading
                          ? () async {
                              final success = await controller.submit();
                              if (!context.mounted) return;
                              if (success) {
                                HapticFeedback.mediumImpact();
                                GlassToast.show(
                                  context,
                                  title: 'Tiếp nhận xe thành công'.tr(),
                                  subtitle: 'Xe đã được đưa vào quy trình dịch vụ'.tr(),
                                  icon: CupertinoIcons.checkmark_seal_fill,
                                  color: const Color(0xFF30B0C7),
                                  duration: const Duration(seconds: 4),
                                );
                                context.pop();
                              } else {
                                HapticFeedback.heavyImpact();
                                final err = ref.read(walkaroundControllerProvider).submitError
                                    ?? 'Có lỗi xảy ra, vui lòng thử lại.';
                                GlassToast.show(
                                  context,
                                  title: 'Tiếp nhận thất bại'.tr(),
                                  subtitle: err,
                                  icon: CupertinoIcons.exclamationmark_circle_fill,
                                  color: const Color(0xFFFF3B30),
                                  duration: const Duration(seconds: 5),
                                );
                              }
                            }
                          : null,
                      child: Text('Hoàn Thành Tiếp Nhận'.tr()),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
