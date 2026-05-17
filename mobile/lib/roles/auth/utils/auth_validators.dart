class AuthValidators {
  static bool isValidEmployeeId(String id) {
    return id.trim().isNotEmpty;
  }

  static bool isValidPassword(String password) {
    return password.length >= 6;
  }
}
