/**
 * Payment Method Validation Utilities
 *
 * This module provides standardized payment method validation functions
 * to ensure consistency across the system and handle various payment
 * method identifier formats.
 */

/**
 * Case-insensitive payment method validation function for VNPay
 * Supports multiple VNPay identifier formats for backward compatibility
 *
 * @param {string} method - Payment method identifier to validate
 * @returns {boolean} - True if the method is a VNPay payment method
 *
 * Supported formats:
 * - 'VNPAY' (uppercase, standard format)
 * - 'vnpay' (lowercase, legacy format)
 * - 'e_wallet' (legacy VNPay identifier)
 */
export const isVNPayMethod = (method) => {
  if (!method || typeof method !== 'string') {
    return false
  }

  // Supported VNPay identifiers (case-insensitive)
  // Includes 'VNPAY', 'vnpay', and 'e_wallet' for backward compatibility
  const vnpayMethods = ['vnpay', 'e_wallet']
  const normalizedMethod = method.toLowerCase()

  return vnpayMethods.includes(normalizedMethod)
}

/**
 * Validates if a payment method is supported by the system
 *
 * @param {string} method - Payment method identifier to validate
 * @returns {boolean} - True if the payment method is supported
 */
export const isValidPaymentMethod = (method) => {
  if (!method || typeof method !== 'string') {
    return false
  }

  const validMethods = [
    // VNPay methods
    'vnpay', 'VNPAY', 'e_wallet',
    // Traditional payment methods
    'credit_card', 'bank_transfer', 'cod'
  ]

  return validMethods.includes(method)
}

/**
 * Normalizes payment method identifier to standard format
 *
 * @param {string} method - Payment method identifier to normalize
 * @returns {string|null} - Normalized payment method or null if invalid
 */
export const normalizePaymentMethod = (method) => {
  if (!method || typeof method !== 'string') {
    return null
  }

  // Normalize VNPay methods to 'vnpay'
  if (isVNPayMethod(method)) {
    return 'vnpay'
  }

  // Return other methods as-is if valid
  const validMethods = ['credit_card', 'bank_transfer', 'cod']
  return validMethods.includes(method) ? method : null
}

/**
 * Gets human-readable payment method name
 *
 * @param {string} method - Payment method identifier
 * @returns {string} - Human-readable payment method name
 */
export const getPaymentMethodName = (method) => {
  if (!method) {
    return 'Unknown Payment Method'
  }

  const methodNames = {
    'vnpay': 'VNPay E-Wallet',
    'VNPAY': 'VNPay E-Wallet',
    'e_wallet': 'VNPay E-Wallet',
    'credit_card': 'Credit Card',
    'bank_transfer': 'Bank Transfer',
    'cod': 'Cash on Delivery'
  }

  return methodNames[method] || 'Unknown Payment Method'
}

/**
 * Validates payment method and provides detailed validation result
 *
 * @param {string} method - Payment method identifier to validate
 * @returns {Object} - Validation result with details
 */
export const validatePaymentMethodDetailed = (method) => {
  const result = {
    isValid: false,
    isVNPay: false,
    normalizedMethod: null,
    displayName: null,
    errors: []
  }

  if (!method) {
    result.errors.push('Payment method is required')
    result.displayName = getPaymentMethodName(null)
    return result
  }

  if (typeof method !== 'string') {
    result.errors.push('Payment method must be a string')
    result.displayName = getPaymentMethodName(null)
    return result
  }

  result.isVNPay = isVNPayMethod(method)
  result.isValid = isValidPaymentMethod(method)
  result.normalizedMethod = normalizePaymentMethod(method)
  result.displayName = getPaymentMethodName(method)

  if (!result.isValid) {
    result.errors.push(`Unsupported payment method: ${method}`)
  }

  return result
}

// Default export for backward compatibility
export default {
  isVNPayMethod,
  isValidPaymentMethod,
  normalizePaymentMethod,
  getPaymentMethodName,
  validatePaymentMethodDetailed
}