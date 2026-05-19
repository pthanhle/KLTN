import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../shared/widgets/inputs/glass_text_field.dart';
import '../controllers/login_form_controller.dart';

class LoginInputs extends ConsumerStatefulWidget {
  const LoginInputs({super.key});

  @override
  ConsumerState<LoginInputs> createState() => _LoginInputsState();
}

class _LoginInputsState extends ConsumerState<LoginInputs> {
  final _employeeIdController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _employeeIdController.addListener(() {
      ref.read(loginFormControllerProvider.notifier).setEmployeeId(_employeeIdController.text);
    });
    
    _passwordController.addListener(() {
      ref.read(loginFormControllerProvider.notifier).setPassword(_passwordController.text);
    });
  }

  @override
  void dispose() {
    _employeeIdController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        GlassTextField(
          controller: _employeeIdController,
          hintText: 'Mã nhân viên / Email'.tr(),
          prefixIcon: CupertinoIcons.person,
        ),
        const SizedBox(height: 16),
        GlassTextField(
          controller: _passwordController,
          hintText: 'Mật khẩu'.tr(),
          prefixIcon: CupertinoIcons.lock,
          isPassword: true,
        ),
      ],
    );
  }
}
