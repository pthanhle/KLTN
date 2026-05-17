import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../controllers/auth_controller.dart';
import '../utils/login_validators.dart';

class LoginFormState {
  final String employeeId;
  final String password;
  final String? errorMessage;
  
  const LoginFormState({
    this.employeeId = '',
    this.password = '',
    this.errorMessage,
  });

  LoginFormState copyWith({
    String? employeeId,
    String? password,
    String? errorMessage,
    bool clearError = false,
  }) {
    return LoginFormState(
      employeeId: employeeId ?? this.employeeId,
      password: password ?? this.password,
      errorMessage: clearError ? null : (errorMessage ?? this.errorMessage),
    );
  }
}

class LoginFormController extends Notifier<LoginFormState> {
  @override
  LoginFormState build() {
    return const LoginFormState();
  }

  void setEmployeeId(String id) {
    state = state.copyWith(employeeId: id, clearError: true);
  }

  void setPassword(String password) {
    state = state.copyWith(password: password, clearError: true);
  }

  void submit() {
    if (!LoginValidators.isValidEmployeeId(state.employeeId) || 
        !LoginValidators.isValidPassword(state.password)) {
      state = state.copyWith(errorMessage: 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    ref.read(authControllerProvider.notifier).login(state.employeeId, state.password);
  }
}

final loginFormControllerProvider = NotifierProvider<LoginFormController, LoginFormState>(LoginFormController.new);
