import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/tech_task_model.dart';
import '../../../mpi/mpi_checklist_page.dart';
import '../../../job_execution/job_execution_page.dart';
import 'task_card/tech_task_card_header.dart';
import 'task_card/tech_task_card_detail_col.dart';

class TechAssignmentCard extends StatefulWidget {
  final TechTaskModel task;
  final int index;

  const TechAssignmentCard({
    super.key,
    required this.task,
    this.index = 0,
  });

  @override
  State<TechAssignmentCard> createState() => _TechAssignmentCardState();
}

class _TechAssignmentCardState extends State<TechAssignmentCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  late Animation<double> _fadeAnim;
  late Animation<Offset> _slideAnim;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _fadeAnim = CurvedAnimation(parent: _animController, curve: Curves.easeOut);
    _slideAnim = Tween<Offset>(
      begin: const Offset(0, 0.2),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOutCubic));

    Future.delayed(Duration(milliseconds: widget.index * 80), () {
      if (mounted) _animController.forward();
    });
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  void _navigate(BuildContext context) {
    if (widget.task.status == TechTaskStatus.diagnosing) {
      Navigator.of(context, rootNavigator: true).push(
        CupertinoPageRoute(
          builder: (_) => MpiChecklistPage(
            plate: widget.task.plate,
            progressId: widget.task.id,
          ),
        ),
      );
    } else {
      Navigator.of(context, rootNavigator: true).push(
        CupertinoPageRoute(
          builder: (_) => JobExecutionPage(
            plate: widget.task.plate,
            progressId: widget.task.id,
          ),
        ),
      );
    }
  }

  Color _urgencyColor(BuildContext context) {
    final theme = Theme.of(context);
    switch (widget.task.urgency) {
      case TechTaskUrgency.urgent:
        return theme.colorScheme.error;
      case TechTaskUrgency.standard:
        return theme.colorScheme.primary;
      case TechTaskUrgency.completed:
        return theme.colorScheme.onSurfaceVariant;
    }
  }

  String _urgencyText() {
    switch (widget.task.urgency) {
      case TechTaskUrgency.urgent:
        return 'KHẨN CẤP'.tr();
      case TechTaskUrgency.standard:
        return 'TIÊU CHUẨN'.tr();
      case TechTaskUrgency.completed:
        return 'HOÀN THÀNH'.tr();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final urgencyColor = _urgencyColor(context);

    return FadeTransition(
      opacity: _fadeAnim,
      child: SlideTransition(
        position: _slideAnim,
        child: AnimatedScale(
          scale: _isPressed ? 0.96 : 1.0,
          duration: const Duration(milliseconds: 150),
          curve: Curves.easeOutCubic,
          child: GestureDetector(
            onTapDown: (_) {
              HapticFeedback.lightImpact();
              setState(() => _isPressed = true);
            },
            onTapUp: (_) {
              setState(() => _isPressed = false);
              _navigate(context);
            },
            onTapCancel: () => setState(() => _isPressed = false),
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: ShapeDecoration(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.02)
                    : Colors.white.withValues(alpha: 0.15),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.30),
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
                radius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        TechTaskCardHeader(
                          task: widget.task,
                          urgencyColor: urgencyColor,
                          urgencyText: _urgencyText(),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          child: Divider(
                            height: 1,
                            thickness: 0.5,
                            color: isDark
                                ? Colors.white.withValues(alpha: 0.10)
                                : Colors.black.withValues(alpha: 0.05),
                          ),
                        ),
                        Row(
                          children: [
                            Expanded(
                              child: TechTaskCardDetailCol(
                                label: 'KHOANG'.tr(),
                                value: widget.task.bay,
                              ),
                            ),
                            Expanded(
                              child: TechTaskCardDetailCol(
                                label: 'GIỜ LÀM'.tr(),
                                value: '${widget.task.startTime} - ${widget.task.endTime}',
                              ),
                            ),
                            Expanded(
                              child: TechTaskCardDetailCol(
                                label: 'VAI TRÒ'.tr(),
                                value: widget.task.role.tr(),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
