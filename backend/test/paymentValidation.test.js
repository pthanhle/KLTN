import {
  isVNPayMethod,
  isValidPaymentMethod,
  normalizePaymentMethod,
  getPaymentMethodName,
  validatePaymentMethodDetailed
} from '../utils/paymentValidation.js'

// Simple test framework
function test(description, testFn) {
  try {
    testFn()
    console.log(`✅ ${description}`)
  } catch (error) {
    console.error(`❌ ${description}`)
    console.error(`   Error: ${error.message}`)
    process.exitCode = 1
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`)
  }
}

function assertTrue(actual, message) {
  if (!actual) {
    throw new Error(`${message}: expected true, got ${actual}`)
  }
}

function assertFalse(actual, message) {
  if (actual) {
    throw new Error(`${message}: expected false, got ${actual}`)
  }
}

function assertArrayEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

console.log('=== Payment Method Validation Tests ===\n')

// Test isVNPayMethod function
console.log('Testing isVNPayMethod function:')

test('should return true for "vnpay"', () => {
  assertTrue(isVNPayMethod('vnpay'), 'vnpay should be recognized as VNPay method')
})

test('should return true for "VNPAY"', () => {
  assertTrue(isVNPayMethod('VNPAY'), 'VNPAY should be recognized as VNPay method')
})

test('should return true for "e_wallet"', () => {
  assertTrue(isVNPayMethod('e_wallet'), 'e_wallet should be recognized as VNPay method')
})

test('should return true for "E_WALLET"', () => {
  assertTrue(isVNPayMethod('E_WALLET'), 'E_WALLET should be recognized as VNPay method')
})

test('should return false for "credit_card"', () => {
  assertFalse(isVNPayMethod('credit_card'), 'credit_card should not be recognized as VNPay method')
})

test('should return false for null', () => {
  assertFalse(isVNPayMethod(null), 'null should not be recognized as VNPay method')
})

test('should return false for undefined', () => {
  assertFalse(isVNPayMethod(undefined), 'undefined should not be recognized as VNPay method')
})

test('should return false for non-string', () => {
  assertFalse(isVNPayMethod(123), 'number should not be recognized as VNPay method')
})

// Test isValidPaymentMethod function
console.log('\nTesting isValidPaymentMethod function:')

test('should return true for valid VNPay methods', () => {
  assertTrue(isValidPaymentMethod('vnpay'), 'vnpay should be valid')
  assertTrue(isValidPaymentMethod('VNPAY'), 'VNPAY should be valid')
  assertTrue(isValidPaymentMethod('e_wallet'), 'e_wallet should be valid')
})

test('should return true for other valid methods', () => {
  assertTrue(isValidPaymentMethod('credit_card'), 'credit_card should be valid')
  assertTrue(isValidPaymentMethod('bank_transfer'), 'bank_transfer should be valid')
  assertTrue(isValidPaymentMethod('cod'), 'cod should be valid')
})

test('should return false for invalid methods', () => {
  assertFalse(isValidPaymentMethod('invalid_method'), 'invalid_method should not be valid')
  assertFalse(isValidPaymentMethod(''), 'empty string should not be valid')
  assertFalse(isValidPaymentMethod(null), 'null should not be valid')
})

// Test normalizePaymentMethod function
console.log('\nTesting normalizePaymentMethod function:')

test('should normalize VNPay methods to "vnpay"', () => {
  assertEqual(normalizePaymentMethod('vnpay'), 'vnpay', 'vnpay should normalize to vnpay')
  assertEqual(normalizePaymentMethod('VNPAY'), 'vnpay', 'VNPAY should normalize to vnpay')
  assertEqual(normalizePaymentMethod('e_wallet'), 'vnpay', 'e_wallet should normalize to vnpay')
  assertEqual(normalizePaymentMethod('E_WALLET'), 'vnpay', 'E_WALLET should normalize to vnpay')
})

test('should return other valid methods as-is', () => {
  assertEqual(normalizePaymentMethod('credit_card'), 'credit_card', 'credit_card should remain unchanged')
  assertEqual(normalizePaymentMethod('bank_transfer'), 'bank_transfer', 'bank_transfer should remain unchanged')
  assertEqual(normalizePaymentMethod('cod'), 'cod', 'cod should remain unchanged')
})

test('should return null for invalid methods', () => {
  assertEqual(normalizePaymentMethod('invalid_method'), null, 'invalid_method should return null')
  assertEqual(normalizePaymentMethod(''), null, 'empty string should return null')
  assertEqual(normalizePaymentMethod(null), null, 'null should return null')
})

// Test getPaymentMethodName function
console.log('\nTesting getPaymentMethodName function:')

test('should return correct display names for VNPay methods', () => {
  assertEqual(getPaymentMethodName('vnpay'), 'VNPay E-Wallet', 'vnpay should have correct display name')
  assertEqual(getPaymentMethodName('VNPAY'), 'VNPay E-Wallet', 'VNPAY should have correct display name')
  assertEqual(getPaymentMethodName('e_wallet'), 'VNPay E-Wallet', 'e_wallet should have correct display name')
})

test('should return correct display names for other methods', () => {
  assertEqual(getPaymentMethodName('credit_card'), 'Credit Card', 'credit_card should have correct display name')
  assertEqual(getPaymentMethodName('bank_transfer'), 'Bank Transfer', 'bank_transfer should have correct display name')
  assertEqual(getPaymentMethodName('cod'), 'Cash on Delivery', 'cod should have correct display name')
})

test('should return default for unknown methods', () => {
  assertEqual(getPaymentMethodName('unknown'), 'Unknown Payment Method', 'unknown method should have default display name')
})

// Test validatePaymentMethodDetailed function
console.log('\nTesting validatePaymentMethodDetailed function:')

test('should return correct validation for valid VNPay method', () => {
  const result = validatePaymentMethodDetailed('vnpay')
  assertTrue(result.isValid, 'vnpay should be valid')
  assertTrue(result.isVNPay, 'vnpay should be recognized as VNPay')
  assertEqual(result.normalizedMethod, 'vnpay', 'vnpay should normalize correctly')
  assertEqual(result.displayName, 'VNPay E-Wallet', 'vnpay should have correct display name')
  assertArrayEqual(result.errors, [], 'vnpay should have no errors')
})

test('should return correct validation for valid non-VNPay method', () => {
  const result = validatePaymentMethodDetailed('credit_card')
  assertTrue(result.isValid, 'credit_card should be valid')
  assertFalse(result.isVNPay, 'credit_card should not be recognized as VNPay')
  assertEqual(result.normalizedMethod, 'credit_card', 'credit_card should normalize correctly')
  assertEqual(result.displayName, 'Credit Card', 'credit_card should have correct display name')
  assertArrayEqual(result.errors, [], 'credit_card should have no errors')
})

test('should return correct validation for invalid method', () => {
  const result = validatePaymentMethodDetailed('invalid_method')
  assertFalse(result.isValid, 'invalid_method should not be valid')
  assertFalse(result.isVNPay, 'invalid_method should not be recognized as VNPay')
  assertEqual(result.normalizedMethod, null, 'invalid_method should not normalize')
  assertEqual(result.displayName, 'Unknown Payment Method', 'invalid_method should have default display name')
  assertTrue(result.errors.length > 0, 'invalid_method should have errors')
})

test('should return correct validation for null method', () => {
  const result = validatePaymentMethodDetailed(null)
  assertFalse(result.isValid, 'null should not be valid')
  assertFalse(result.isVNPay, 'null should not be recognized as VNPay')
  assertEqual(result.normalizedMethod, null, 'null should not normalize')
  assertEqual(result.displayName, 'Unknown Payment Method', 'null should have default display name')
  assertTrue(result.errors.length > 0, 'null should have errors')
})

test('should return correct validation for non-string method', () => {
  const result = validatePaymentMethodDetailed(123)
  assertFalse(result.isValid, 'number should not be valid')
  assertFalse(result.isVNPay, 'number should not be recognized as VNPay')
  assertEqual(result.normalizedMethod, null, 'number should not normalize')
  assertEqual(result.displayName, 'Unknown Payment Method', 'number should have default display name')
  assertTrue(result.errors.length > 0, 'number should have errors')
})

// Test case-insensitive matching
console.log('\nTesting case-insensitive matching:')

test('should handle mixed case VNPay methods', () => {
  assertTrue(isVNPayMethod('VnPay'), 'VnPay should be recognized')
  assertTrue(isVNPayMethod('vnPAY'), 'vnPAY should be recognized')
  assertTrue(isVNPayMethod('E_wallet'), 'E_wallet should be recognized')
  assertTrue(isVNPayMethod('e_WALLET'), 'e_WALLET should be recognized')
})

// Test backward compatibility
console.log('\nTesting backward compatibility:')

test('should support legacy e_wallet identifier', () => {
  const result = validatePaymentMethodDetailed('e_wallet')
  assertTrue(result.isValid, 'e_wallet should be valid for backward compatibility')
  assertTrue(result.isVNPay, 'e_wallet should be recognized as VNPay')
  assertEqual(result.normalizedMethod, 'vnpay', 'e_wallet should normalize to vnpay')
  assertEqual(result.displayName, 'VNPay E-Wallet', 'e_wallet should have VNPay display name')
})

console.log('\n=== Test Summary ===')
if (process.exitCode === 1) {
  console.log('❌ Some tests failed')
} else {
  console.log('✅ All tests passed')
}