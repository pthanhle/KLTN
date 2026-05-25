# Design Document

## Overview

This design document outlines the technical solution for fixing the VNPay payment redirect issue in the e-commerce checkout system. The core problem is a payment method identifier mismatch between the frontend and backend systems, where the frontend sends 'vnpay' (lowercase) but the backend expects 'VNPAY' (uppercase) or 'e_wallet' for VNPay QR code payment processing.

The solution involves standardizing payment method identifiers across both systems while maintaining backward compatibility with existing payment methods and ensuring proper VNPay URL generation and redirect functionality.

## Architecture

### Current System Flow
```
Frontend (checkout.mock.js) → Payment Method: 'vnpay'
    ↓
Backend (order.controller.js) → Checks for: 'VNPAY' || 'e_wallet'
    ↓
Mismatch → No VNPay URL generation → Redirect to success page (incorrect)
```

### Fixed System Flow
```
Frontend (checkout.mock.js) → Payment Method: 'VNPAY' (standardized)
    ↓
Backend (order.controller.js) → Checks for: 'VNPAY' || 'vnpay' (case-insensitive)
    ↓
Match → VNPay URL generation → Redirect to VNPay QR page (correct)
```

### System Components

1. **Frontend Payment Configuration** (`checkout.mock.js`)
   - Contains payment method definitions with IDs and labels
   - Currently uses lowercase 'vnpay' identifier
   - Needs standardization to match backend expectations

2. **Backend Order Processing** (`order.controller.js`)
   - Handles order creation and payment method validation
   - Contains VNPay URL generation logic
   - Currently checks for 'VNPAY' or 'e_wallet' identifiers

3. **VNPay Integration Layer** (`payment.controller.js`, `vnpayConfig.js`)
   - Manages VNPay payment URL generation
   - Handles payment callbacks and status updates
   - Already functional, just needs proper triggering

## Components and Interfaces

### Frontend Components

#### Payment Method Configuration
```javascript
// File: frontend/src/pages/Customer/Checkout/data/checkout.mock.js
export const mockPaymentMethods = [
    { id: 'VNPAY', label: 'Ví điện tử VNPay (QR)', tags: [] }, // Updated from 'vnpay'
    // ... other payment methods remain unchanged
];
```

#### Order Submission Handler
```javascript
// File: frontend/src/pages/Customer/Checkout/hooks/useOrderSubmit.js
// No changes needed - already handles payment_url and requires_redirect correctly
```

### Backend Components

#### Order Controller Enhancement
```javascript
// File: backend/controllers/client/order.controller.js
// Enhanced payment method validation with case-insensitive checking
const isVNPayMethod = (method) => {
    const vnpayMethods = ['VNPAY', 'vnpay', 'e_wallet'];
    return vnpayMethods.includes(method);
};

// Usage in createOrder function:
if (isVNPayMethod(payment.method)) {
    // Generate VNPay URL logic (already exists)
}
```

#### Payment Method Validation
```javascript
// Enhanced validation function
const validatePaymentMethod = (method) => {
    const validMethods = {
        'VNPAY': 'vnpay',
        'vnpay': 'vnpay',
        'e_wallet': 'vnpay',
        'credit_card': 'credit_card',
        'bank_transfer': 'bank_transfer',
        'cod': 'cod'
    };

    return validMethods[method] || null;
};
```

## Data Models

### Payment Method Structure
```javascript
{
    id: string,           // Standardized identifier (e.g., 'VNPAY')
    label: string,        // Display name for users
    tags: string[],       // Additional metadata
    enabled: boolean      // Feature flag for enabling/disabling
}
```

### Order Payment Information
```javascript
{
    method: string,       // Payment method ID (standardized)
    method_name: string,  // Human-readable method name
    status: string,       // Payment status (PAID, UNPAID, PENDING)
    transaction_id: string, // VNPay transaction reference
    card_tail: string     // For credit card payments
}
```

### VNPay Response Structure
```javascript
{
    message: string,
    order: Object,
    payment_url: string,      // VNPay payment URL
    requires_redirect: boolean // Flag to trigger frontend redirect
}
```

## Error Handling

### Frontend Error Handling
1. **Payment URL Generation Failure**
   - Display user-friendly error message
   - Allow selection of alternative payment methods
   - Log error details for debugging

2. **VNPay Redirect Failure**
   - Graceful fallback to order summary page
   - Show payment pending status
   - Provide manual payment instructions

### Backend Error Handling
1. **Invalid Payment Method**
   - Return 400 Bad Request with descriptive error
   - Log validation failure details
   - Suggest valid payment method options

2. **VNPay Configuration Issues**
   - Fallback to order creation without payment URL
   - Log configuration errors
   - Return order with manual payment instructions

3. **VNPay Service Unavailability**
   - Detect VNPay service errors
   - Provide alternative payment options
   - Queue payment for retry if applicable

### Error Response Format
```javascript
{
    success: false,
    message: string,        // User-friendly error message
    error_type: string,     // Error category for frontend handling
    error_code: string,     // Specific error identifier
    suggested_actions: string[] // Recommended user actions
}
```

## Testing Strategy

### Unit Testing Approach
- **Frontend Tests**: Verify payment method configuration and order submission logic
- **Backend Tests**: Test payment method validation, VNPay URL generation, and error handling
- **Integration Tests**: End-to-end payment flow validation with mock VNPay responses

### Test Coverage Areas
1. **Payment Method Validation**
   - Test case-insensitive payment method matching
   - Verify backward compatibility with existing methods
   - Test invalid payment method rejection

2. **VNPay URL Generation**
   - Test successful URL creation with valid parameters
   - Test error handling for invalid amounts or missing data
   - Verify URL parameter encoding and signature generation

3. **Order Flow Integration**
   - Test complete checkout flow with VNPay selection
   - Verify redirect behavior for VNPay vs other methods
   - Test error scenarios and fallback behavior

4. **Backward Compatibility**
   - Ensure existing payment methods continue working
   - Test migration scenarios with mixed payment method formats
   - Verify no regression in non-VNPay payment flows

### Testing Configuration
- Use Jest for unit tests with appropriate mocking
- Implement integration tests with test database
- Mock VNPay service responses for consistent testing
- Test both success and failure scenarios comprehensively