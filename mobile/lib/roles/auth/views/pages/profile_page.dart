import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../controllers/auth_controller.dart';
import '../components/profile/profile_avatar.dart';
import '../components/profile/profile_details_card.dart';
import '../components/profile/profile_header.dart';
import '../components/profile/profile_logout_button.dart';
import '../components/profile/profile_settings_card.dart';

class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;

    return Scaffold(
      body: MeshBackground(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(
            parent: AlwaysScrollableScrollPhysics(),
          ),
          slivers: [
            SliverAppBar.large(
              backgroundColor: Colors.transparent,
              surfaceTintColor: Colors.transparent,
              centerTitle: true,
              title: Text(
                'profile_title'.tr(),
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  children: [
                    const SizedBox(height: 24),
                    ProfileAvatar(avatarUrl: user?.avatarUrl),
                    ProfileHeader(user: user),
                    const SizedBox(height: 32),
                    ProfileDetailsCard(user: user),
                    const SizedBox(height: 32),
                    const ProfileSettingsCard(),
                    const SizedBox(height: 48),
                    const ProfileLogoutButton(),
                    const SizedBox(height: 100),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
