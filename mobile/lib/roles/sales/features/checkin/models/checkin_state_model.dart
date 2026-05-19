import 'dart:typed_data';

class CheckInStateModel {
  final String? driverLicensePath;
  final Uint8List? signatureBytes;
  final bool isSubmitting;
  final bool isSuccess;
  final String? error;

  const CheckInStateModel({
    this.driverLicensePath,
    this.signatureBytes,
    this.isSubmitting = false,
    this.isSuccess = false,
    this.error,
  });

  CheckInStateModel copyWith({
    String? driverLicensePath,
    Uint8List? signatureBytes,
    bool? isSubmitting,
    bool? isSuccess,
    String? error,
    bool clearSignature = false,
  }) {
    return CheckInStateModel(
      driverLicensePath: driverLicensePath ?? this.driverLicensePath,
      signatureBytes: clearSignature ? null : (signatureBytes ?? this.signatureBytes),
      isSubmitting: isSubmitting ?? this.isSubmitting,
      isSuccess: isSuccess ?? this.isSuccess,
      error: error ?? this.error,
    );
  }

  // Payload structure for future BE integration
  Map<String, dynamic> toJson() {
    return {
      'driverLicensePath': driverLicensePath,
      // Khi gửi API thật sẽ parse signatureBytes ra Base64 String
      // 'signatureData': base64Encode(signatureBytes!),
    };
  }
}
