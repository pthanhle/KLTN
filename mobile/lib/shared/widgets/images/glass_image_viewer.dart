import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void showGlassImageViewer(BuildContext context, String imageUrl) {
  HapticFeedback.lightImpact();
  Navigator.of(context).push(
    PageRouteBuilder(
      opaque: false,
      barrierDismissible: true,
      barrierColor: Colors.transparent,
      transitionDuration: const Duration(milliseconds: 300),
      reverseTransitionDuration: const Duration(milliseconds: 250),
      pageBuilder: (context, animation, secondaryAnimation) {
        return _GlassImageViewerPage(imageUrl: imageUrl);
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: CurvedAnimation(parent: animation, curve: Curves.easeOutCubic),
          child: child,
        );
      },
    ),
  );
}

void showGlassImageContextMenu(BuildContext context, String imageUrl) {
  HapticFeedback.mediumImpact();
  final theme = Theme.of(context);
  final isDark = theme.brightness == Brightness.dark;
  const appleBlue = Color(0xFF007AFF);
  const appleRed = Color(0xFFFF3B30);

  Widget glassBlock({required Widget child}) {
    return Container(
      width: double.infinity,
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.05)
            : Colors.white.withValues(alpha: 0.72),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.80),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.06),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: child,
        ),
      ),
    );
  }

  Widget _divider() => Container(
    height: 0.5,
    color: theme.dividerColor.withValues(alpha: 0.15),
  );

  Widget _actionRow({
    required String label,
    required IconData icon,
    required VoidCallback onTap,
    Color? color,
    bool isLast = false,
  }) {
    final c = color ?? appleBlue;
    return Column(
      children: [
        GestureDetector(
          onTap: onTap,
          behavior: HitTestBehavior.opaque,
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
            color: Colors.transparent,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 20, color: c),
                const SizedBox(width: 10),
                Text(
                  label,
                  style: TextStyle(
                    color: c,
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.3,
                  ),
                ),
              ],
            ),
          ),
        ),
        if (!isLast) _divider(),
      ],
    );
  }

  showCupertinoModalPopup<void>(
    context: context,
    builder: (ctx) => Material(
      type: MaterialType.transparency,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              glassBlock(
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 16, 20, 10),
                      child: Text(
                        'Chứng từ hợp đồng',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.5,
                          color: theme.colorScheme.onSurface,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    _divider(),
                    _actionRow(
                      label: 'Xem ảnh',
                      icon: CupertinoIcons.eye,
                      onTap: () {
                        Navigator.pop(ctx);
                        showGlassImageViewer(context, imageUrl);
                      },
                    ),
                    _actionRow(
                      label: 'Sao chép đường dẫn',
                      icon: CupertinoIcons.link,
                      onTap: () {
                        HapticFeedback.lightImpact();
                        Clipboard.setData(ClipboardData(text: imageUrl));
                        Navigator.pop(ctx);
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: const Text('Đã sao chép đường dẫn'),
                            duration: const Duration(seconds: 2),
                            behavior: SnackBarBehavior.floating,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        );
                      },
                    ),
                    _actionRow(
                      label: 'Mở trong trình duyệt',
                      icon: CupertinoIcons.globe,
                      isLast: true,
                      onTap: () {
                        HapticFeedback.lightImpact();
                        Navigator.pop(ctx);
                        Clipboard.setData(ClipboardData(text: imageUrl));
                      },
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 10),

              glassBlock(
                child: GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    Navigator.pop(ctx);
                  },
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 17),
                    color: Colors.transparent,
                    child: const Text(
                      'Huỷ',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: appleBlue,
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    ),
  );
}

class _GlassImageViewerPage extends StatelessWidget {
  final String imageUrl;
  const _GlassImageViewerPage({required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          GestureDetector(
            onTap: () {
              HapticFeedback.lightImpact();
              Navigator.of(context).pop();
            },
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
              child: Container(
                color: isDark
                    ? Colors.black.withValues(alpha: 0.4)
                    : Colors.white.withValues(alpha: 0.4),
              ),
            ),
          ),

          Center(
            child: InteractiveViewer(
              minScale: 0.5,
              maxScale: 4.0,
              child: Hero(
                tag: imageUrl,
                flightShuttleBuilder: (flightContext, animation, flightDirection,
                    fromHeroContext, toHeroContext) {
                  return AnimatedBuilder(
                    animation: animation,
                    builder: (context, child) {
                      final v = Curves.easeOutCubic.transform(animation.value);
                      return Transform.scale(
                        scale: flightDirection == HeroFlightDirection.push
                            ? (0.95 + 0.05 * v)
                            : (1.0 - 0.05 * (1 - v)),
                        child: toHeroContext.widget,
                      );
                    },
                  );
                },
                child: GestureDetector(
                  onLongPress: () => showGlassImageContextMenu(context, imageUrl),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Container(
                      decoration: ShapeDecoration(
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(
                              cornerRadius: 24, cornerSmoothing: 1.0),
                          side: BorderSide(
                            color: Colors.white
                                .withValues(alpha: isDark ? 0.15 : 0.4),
                            width: 0.5,
                          ),
                        ),
                        shadows: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.2),
                            blurRadius: 40,
                            offset: const Offset(0, 20),
                          ),
                        ],
                      ),
                      child: ClipSmoothRect(
                        radius: SmoothBorderRadius(
                            cornerRadius: 24, cornerSmoothing: 1.0),
                        child: Image.network(
                          imageUrl,
                          fit: BoxFit.contain,
                          loadingBuilder: (context, child, loadingProgress) {
                            if (loadingProgress == null) return child;
                            return const SizedBox(
                              width: 200,
                              height: 200,
                              child: Center(
                                  child: CupertinoActivityIndicator(radius: 14)),
                            );
                          },
                          errorBuilder: (_, __, ___) => Container(
                            width: double.infinity,
                            height: 300,
                            color: (isDark ? Colors.white : Colors.black)
                                .withValues(alpha: 0.05),
                            child: const Center(
                              child: Icon(
                                  CupertinoIcons.exclamationmark_triangle,
                                  size: 40,
                                  color: Colors.grey),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),

          Positioned(
            bottom: MediaQuery.of(context).padding.bottom + 24,
            right: 20,
            child: GestureDetector(
              onTap: () => showGlassImageContextMenu(context, imageUrl),
              child: Container(
                width: 44,
                height: 44,
                decoration: ShapeDecoration(
                  color: isDark
                      ? Colors.white.withValues(alpha: 0.08)
                      : Colors.black.withValues(alpha: 0.05),
                  shape: SmoothRectangleBorder(
                    borderRadius:
                        SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: Colors.white
                          .withValues(alpha: isDark ? 0.12 : 0.50),
                      width: 0.5,
                    ),
                  ),
                ),
                child: ClipSmoothRect(
                  radius:
                      SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.share,
                        size: 18,
                        color: theme.colorScheme.onSurface.withValues(alpha: 0.75),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),

          // Close Button — top right (§12 GlassCloseButton spec)
          Positioned(
            top: MediaQuery.of(context).padding.top + 16,
            right: 20,
            child: GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                Navigator.of(context).pop();
              },
              child: Container(
                width: 32,
                height: 32,
                decoration: ShapeDecoration(
                  color: isDark
                      ? Colors.white.withValues(alpha: 0.08)
                      : Colors.black.withValues(alpha: 0.05),
                  shape: SmoothRectangleBorder(
                    borderRadius:
                        SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                    side: BorderSide(
                      color: Colors.white
                          .withValues(alpha: isDark ? 0.12 : 0.50),
                      width: 0.5,
                    ),
                  ),
                ),
                child: ClipSmoothRect(
                  radius:
                      SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                    child: Center(
                      child: Icon(
                        CupertinoIcons.xmark,
                        size: 14,
                        color: theme.colorScheme.onSurface.withValues(alpha: 0.70),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
