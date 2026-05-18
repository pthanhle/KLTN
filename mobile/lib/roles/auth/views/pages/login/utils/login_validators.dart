class LoginValidators {
  static bool isValidEmployeeId(String employeeId) {
    return employeeId.trim().isNotEmpty;
  }

  static bool isValidPassword(String password) {
    return password.trim().isNotEmpty;
  }
}
