# Requirements Document

## Introduction

This document specifies the requirements for fixing the VNPay payment redirect issue in the e-commerce checkout system. Currently, when Vietnamese customers select VNPay QR payment method during checkout, the system incorrectly redirects to the success page instead of the VNPay QR code payment page due to a payment method ID mismatch between frontend and backend systems.

## Glossary

- **VNPay_System**: The VNPay payment gateway integration that generates QR codes for Vietnamese customers
- **Checkout_System**: The e-commerce checkout flow that handles payment method selection and order processing
- **Payment_Method_ID**: The unique identifier used to distinguish different payment methods in the system
- **QR_Payment_Flow**: The complete user journey from payment method selection to QR code display and payment completion
- **Frontend_Client**: The React-based customer-facing checkout interface
- **Backend_API**: The Node.js/Express server that processes orders and integrates with VNPay

## Requirements

### Requirement 1: Payment Method ID Standardization

**User Story:** As a Vietnamese customer, I want to select VNPay QR payment method and be redirected to the VNPay QR code page, so that I can complete my payment using my VNPay mobile app.

#### Acceptance Criteria

1. WHEN a customer selects VNPay payment method in the checkout interface, THE Frontend_Client SHALL send a consistent payment method identifier to the Backend_API
2. WHEN the Backend_API receives a VNPay payment request, THE Backend_API SHALL recognize the payment method identifier and generate a VNPay payment URL
3. WHEN VNPay payment method is processed, THE Checkout_System SHALL redirect the customer to the VNPay QR code page instead of the success page
4. THE Payment_Method_ID SHALL be consistent between frontend and backend systems for VNPay payments
5. WHEN payment method validation occurs, THE Backend_API SHALL accept the standardized VNPay identifier without case sensitivity issues

### Requirement 2: VNPay Payment Flow Restoration

**User Story:** As a Vietnamese customer, I want the VNPay payment option to work correctly, so that I can pay for my automotive parts using my preferred payment method.

#### Acceptance Criteria

1. WHEN a customer completes checkout with VNPay selected, THE VNPay_System SHALL generate a valid payment URL with QR code
2. WHEN the payment URL is generated, THE Backend_API SHALL return the URL with a redirect flag to the Frontend_Client
3. WHEN the Frontend_Client receives a VNPay payment response, THE Frontend_Client SHALL redirect the browser to the VNPay payment URL
4. WHEN VNPay payment is initiated, THE QR_Payment_Flow SHALL display the VNPay QR code interface for customer scanning
5. WHEN payment is completed or cancelled, THE VNPay_System SHALL redirect back to the configured return URL

### Requirement 3: Payment Method Configuration Consistency

**User Story:** As a system administrator, I want payment method identifiers to be consistent across all system components, so that payment integrations work reliably without ID mismatches.

#### Acceptance Criteria

1. THE Frontend_Client SHALL use the same payment method identifier format as expected by the Backend_API
2. WHEN payment methods are configured, THE Checkout_System SHALL maintain consistent naming conventions across frontend and backend
3. THE Backend_API SHALL validate payment method identifiers using a standardized comparison method
4. WHEN new payment methods are added, THE Checkout_System SHALL enforce consistent identifier formatting
5. THE Payment_Method_ID validation SHALL be case-insensitive to prevent similar issues in the future

### Requirement 4: Error Handling and Fallback Behavior

**User Story:** As a customer, I want clear error messages if VNPay payment fails, so that I can understand what went wrong and try alternative payment methods.

#### Acceptance Criteria

1. WHEN VNPay URL generation fails, THE Backend_API SHALL return an appropriate error message to the Frontend_Client
2. WHEN VNPay payment URL cannot be created, THE Checkout_System SHALL allow the customer to select an alternative payment method
3. IF VNPay service is unavailable, THE Checkout_System SHALL display a user-friendly error message
4. WHEN payment method validation fails, THE Backend_API SHALL log the specific validation error for debugging
5. THE Frontend_Client SHALL handle VNPay redirect failures gracefully without breaking the checkout flow

### Requirement 5: Payment Method Integration Validation

**User Story:** As a developer, I want to validate that VNPay integration works correctly after the fix, so that customers can successfully complete payments without issues.

#### Acceptance Criteria

1. WHEN VNPay payment method is selected, THE VNPay_System SHALL generate valid payment URLs with correct parameters
2. WHEN payment URLs are created, THE Backend_API SHALL include all required VNPay parameters (amount, order ID, return URL)
3. THE VNPay_System SHALL accept the generated payment requests and display QR codes correctly
4. WHEN customers scan VNPay QR codes, THE VNPay_System SHALL process payments and return appropriate status responses
5. THE QR_Payment_Flow SHALL complete successfully from selection to payment confirmation

### Requirement 6: Backward Compatibility and System Stability

**User Story:** As a system administrator, I want the VNPay fix to not break existing payment methods, so that customers can continue using other payment options without disruption.

#### Acceptance Criteria

1. WHEN VNPay payment method identifiers are updated, THE Checkout_System SHALL continue supporting existing payment methods (COD, credit card, bank transfer)
2. THE Backend_API SHALL maintain compatibility with existing order processing logic for non-VNPay payments
3. WHEN payment method changes are deployed, THE Checkout_System SHALL not affect existing pending orders
4. THE Frontend_Client SHALL display all payment methods correctly after VNPay identifier fixes
5. WHEN customers use non-VNPay payment methods, THE Checkout_System SHALL process them exactly as before the fix