import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../controllers/walkaround_controller.dart';
import '../widgets/shared/walkaround_tab_switcher.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
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
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: Column(
          children: [
            // Top App Bar
            ClipRect(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                child: Container(
                  color: theme.scaffoldBackgroundColor.withValues(alpha: 0.6),
                  padding: EdgeInsets.only(
                    top: MediaQuery.of(context).padding.top + 8,
                    bottom: 12,
                    left: 20,
                    right: 20,
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          GestureDetector(
                            onTap: () => context.pop(),
                            child: Container(
                              width: 40,
                              height: 40,
                              decoration: ShapeDecoration(
                                color: theme.colorScheme.surface,
                                shape: SmoothRectangleBorder(
                                  borderRadius: SmoothBorderRadius(
                                    cornerRadius: 20,
                                    cornerSmoothing: 1.0,
                                  ),
                                  side: BorderSide(
                                    color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                                    width: 0.5,
                                  ),
                                ),
                              ),
                              child: Icon(
                                CupertinoIcons.back,
                                color: theme.colorScheme.onSurface,
                              ),
                            ),
                          ),
                          Text(
                            'Tiếp Nhận Xe'.tr(),
                            style: theme.textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.w700,
                              letterSpacing: -0.5,
                            ),
                          ),
                          const SizedBox(width: 40),
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
            
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                  const CustomerVoiceSection(),
                  const VehicleStateSection(),
                  const HotspotsSection(),
                  const ChecklistSection(),
                ],
              ),
            ),

            // Bottom Sticky Button
            ClipRect(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: Container(
                  padding: EdgeInsets.only(
                    left: 24,
                    right: 24,
                    top: 16,
                    bottom: bottomSafeArea > 0 ? bottomSafeArea : 24,
                  ),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                      colors: [
                        theme.scaffoldBackgroundColor,
                        theme.scaffoldBackgroundColor.withValues(alpha: 0.5),
                      ],
                    ),
                    border: Border(
                      top: BorderSide(
                        color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: GestureDetector(
                    onTap: controller.canSubmit() && !state.isLoading 
                      ? () => controller.submit() 
                      : null,
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeOutCubic,
                      height: 56,
                      width: double.infinity,
                      decoration: ShapeDecoration(
                        color: controller.canSubmit() 
                            ? theme.colorScheme.primary.withValues(alpha: 0.85)
                            : theme.colorScheme.surfaceContainerHighest,
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                            cornerRadius: 28,
                            cornerSmoothing: 1.0,
                          ),
                          side: controller.canSubmit()
                              ? BorderSide(
                                  color: Colors.white.withValues(alpha: 0.6),
                                  width: 1.0,
                                )
                              : BorderSide.none,
                        ),
                        shadows: controller.canSubmit()
                            ? [
                                BoxShadow(
                                  color: theme.colorScheme.primary.withValues(alpha: 0.4),
                                  blurRadius: 24,
                                  offset: const Offset(0, 8),
                                )
                              ]
                            : [],
                      ),
                      child: Center(
                        child: state.isLoading 
                          ? const CupertinoActivityIndicator(color: Colors.white)
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Hoàn Thành Tiếp Nhận'.tr(),
                                  style: TextStyle(
                                    fontSize: 17,
                                    fontWeight: FontWeight.w700,
                                    color: controller.canSubmit()
                                        ? Colors.white
                                        : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Icon(
                                  CupertinoIcons.check_mark_circled_solid, 
                                  size: 22,
                                  color: controller.canSubmit()
                                        ? Colors.white
                                        : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                                ),
                              ],
                            ),
                      ),
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
