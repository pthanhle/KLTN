import '../models/login_request.dart';
import '../models/user_model.dart';

abstract class AuthRepository {
  Future<UserModel> login(LoginRequest request);
  Future<void> logout();
}
