import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:go_router/go_router.dart';

import '../../../../shared/widgets/containers/glass_card.dart';
import '../../../../shared/widgets/inputs/glass_text_field.dart';
import '../../../../shared/widgets/buttons/liquid_button.dart';
import '../../controllers/auth_controller.dart';

class LoginForm extends ConsumerStatefulWidget {
  const LoginForm({super.key});

  @override
  ConsumerState<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends ConsumerState<LoginForm> {
  final _employeeIdController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _employeeIdController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleLogin() {
    final employeeId = _employeeIdController.text;
    final password = _passwordController.text;
    
    if (employeeId.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Vui lòng nhập đầy đủ thông tin')),
      );
      return;
    }

    ref.read(authControllerProvider.notifier).login(employeeId, password);
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);
    final isLoading = authState.isLoading;

    // Listen to state changes to show errors
    ref.listen(authControllerProvider, (previous, next) {
      if (next.hasError) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(next.error.toString().replaceAll("Exception: ", "")),
            backgroundColor: Theme.of(context).colorScheme.error,
          ),
        );
      } else if (next.hasValue && next.value != null) {
        final role = next.value!.role;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Đăng nhập thành công: ${next.value!.fullName}')),
        );
        
        // We now use StatefulShellRoute, so just go to the generic /dashboard
        // The DynamicDashboard widget will handle showing the correct component
        context.go('/dashboard');
      }
    });

    return GlassCard(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Inputs
          GlassTextField(
            controller: _employeeIdController,
            hintText: 'auth_employee_id_placeholder'.tr(),
            prefixIcon: Icons.person_outline,
          ),
          const SizedBox(height: 16),
          GlassTextField(
            controller: _passwordController,
            hintText: 'auth_password_placeholder'.tr(),
            prefixIcon: Icons.lock_outline,
            isPassword: true,
          ),
          
          // Action Area
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: () {},
              child: Text(
                'auth_forgot_password'.tr(),
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),
          
          // Submit
          LiquidButton(
            onPressed: _handleLogin,
            isLoading: isLoading,
            child: Text('auth_login_btn'.tr()),
          ),
        ],
      ),
    );
  }
}
