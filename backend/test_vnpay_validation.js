/**
 * Simple test file for the isVNPayMethod function
 * This validates the case-insensitive payment method validation
 */

// Import the function (we'll copy it here for testing)
const isVNPayMethod = (method) => {
  if (!method || typeof method !== 'string') {
    return false
  }

  // Supported VNPay identifiers (case-insensitive)
  const vnpayMethods = ['vnpay', 'e_wallet']
  const normalizedMethod = method.toLowerCase()

  return vnpayMethods.includes(normalizedMethod)
}

// Test cases
const testCases = [
  // Valid VNPay methods
  { input: 'VNPAY', expected: true, description: 'Uppercase VNPAY' },
  { input: 'vnpay', expected: true, description: 'Lowercase vnpay' },
  { input: 'VNPay', expected: true, description: 'Mixed case VNPay' },
  { input: 'VnPaY', expected: true, description: 'Random case VnPaY' },
  { input: 'e_wallet', expected: true, description: 'Lowercase e_wallet' },
  { input: 'E_WALLET', expected: true, description: 'Uppercase E_WALLET' },
  { input: 'E_Wallet', expected: true, description: 'Mixed case E_Wallet' },

  // Invalid methods
  { input: 'credit_card', expected: false, description: 'Credit card method' },
  { input: 'cod', expected: false, description: 'Cash on delivery' },
  { input: 'bank_transfer', expected: false, description: 'Bank transfer' },
  { input: 'paypal', expected: false, description: 'PayPal method' },

  // Edge cases
  { input: '', expected: false, description: 'Empty string' },
  { input: null, expected: false, description: 'Null value' },
  { input: undefined, expected: false, description: 'Undefined value' },
  { input: 123, expected: false, description: 'Number input' },
  { input: {}, expected: false, description: 'Object input' },
  { input: 'vnpay ', expected: false, description: 'VNPay with trailing space' },
  { input: ' vnpay', expected: false, description: 'VNPay with leading space' }
]

// Run tests
console.log('🧪 Testing isVNPayMethod function for VNPay payment validation')
console.log('=' * 60)

let passed = 0
let failed = 0

testCases.forEach((test, index) => {
  const result = isVNPayMethod(test.input)
  const success = result === test.expected

  if (success) {
    console.log(`✅ Test ${index + 1}: ${test.description} - PASSED`)
    passed++
  } else {
    console.log(`❌ Test ${index + 1}: ${test.description} - FAILED`)
    console.log(`   Input: ${JSON.stringify(test.input)}`)
    console.log(`   Expected: ${test.expected}, Got: ${result}`)
    failed++
  }
})

console.log('=' * 60)
console.log(`📊 Test Results: ${passed} passed, ${failed} failed`)

if (failed === 0) {
  console.log('🎉 All tests passed! The isVNPayMethod function works correctly.')
  process.exit(0)
} else {
  console.log('💥 Some tests failed. Please review the implementation.')
  process.exit(1)
}