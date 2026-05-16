import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/login_request.dart';
import '../models/user_model.dart';
import '../data/auth_mock.dart';

final authControllerProvider =
    AsyncNotifierProvider<AuthController, UserModel?>(() => AuthController());

class AuthController extends AsyncNotifier<UserModel?> {
  @override
  Future<UserModel?> build() async {
    // Initial state: not logged in
    return null;
  }

  Future<void> login(String employeeId, String password) async {
    state = const AsyncValue.loading();
    try {
      final repository = ref.read(authRepositoryProvider);
      final req = LoginRequest(employeeId: employeeId, password: password);
      final user = await repository.login(req);
      state = AsyncValue.data(user);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> logout() async {
    state = const AsyncValue.loading();
    try {
      final repository = ref.read(authRepositoryProvider);
      await repository.logout();
      state = const AsyncValue.data(null);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}
