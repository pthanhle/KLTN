import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../core/views/components/navigation/header/header_avatar_button.dart';
import '../../../../../core/views/components/navigation/header/header_notification_button.dart';

class AdvisorAppointmentsPage extends StatelessWidget {
  const AdvisorAppointmentsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: theme.brightness == Brightness.dark
                      ? [
                          const Color(0xFF0F172A),
                          const Color(0xFF1E293B),
                        ]
                      : [
                          const Color(0xFFF7F9FB),
                          const Color(0xFFE0E3E5),
                        ],
                ),
              ),
            ),
          ),
          
          CustomScrollView(
            physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
            slivers: [
              SliverAppBar.large(
                backgroundColor: Colors.transparent,
                elevation: 0,
                pinned: true,
                stretch: false,
                flexibleSpace: FlexibleSpaceBar(
                  stretchModes: const [], 
                  titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  title: Text(
                    'Lịch hẹn dịch vụ'.tr(),
                    style: theme.textTheme.headlineLarge?.copyWith(
                      fontSize: 34,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -1.2,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ),
                actions: [
                  HeaderNotificationButton(
                    unreadCount: 0,
                    onPressed: () {},
                  ),
                ],
                leading: HeaderAvatarButton(
                  onPressed: () {},
                ),
              ),
              
              SliverFillRemaining(
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.calendar_month_outlined,
                        size: 64,
                        color: Colors.grey,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Không có lịch hẹn nào.'.tr(),
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 16,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
