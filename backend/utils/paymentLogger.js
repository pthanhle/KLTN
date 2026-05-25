/**
 * Payment Processing Logger
 *
 * Provides comprehensive logging for payment method processing,
 * VNPay URL generation, and payment validation operations.
 *
 * This logger helps track payment method validation results,
 * VNPay URL generation success/failure, and payment processing
 * flow for debugging and monitoring purposes.
 */

import colors from 'colors'

/**
 * Log levels for payment processing
 */
const LOG_LEVELS = {
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
}

/**
 * Payment processing event types
 */
const EVENT_TYPES = {
  PAYMENT_VALIDATION: 'PAYMENT_VALIDATION',
  VNPAY_URL_GENERATION: 'VNPAY_URL_GENERATION',
  PAYMENT_METHOD_PROCESSING: 'PAYMENT_METHOD_PROCESSING',
  ORDER_CREATION: 'ORDER_CREATION',
  PAYMENT_CALLBACK: 'PAYMENT_CALLBACK'
}

/**
 * Format timestamp for logging
 */
const formatTimestamp = () => {
  return new Date().toISOString()
}

/**
 * Format log message with colors and structure
 */
const formatLogMessage = (level, eventType, message, data = null) => {
  const timestamp = formatTimestamp()
  const prefix = `[${timestamp}] [${level}] [${eventType}]`

  let coloredPrefix
  switch (level) {
    case LOG_LEVELS.SUCCESS:
      coloredPrefix = prefix.green
      break
    case LOG_LEVELS.WARNING:
      coloredPrefix = prefix.yellow
      break
    case LOG_LEVELS.ERROR:
      coloredPrefix = prefix.red
      break
    case LOG_LEVELS.DEBUG:
      coloredPrefix = prefix.gray
      break
    default:
      coloredPrefix = prefix.cyan
  }

  let logMessage = `${coloredPrefix} ${message}`

  if (data) {
    logMessage += `\n${JSON.stringify(data, null, 2).gray}`
  }

  return logMessage
}

/**
 * Core logging function
 */
const log = (level, eventType, message, data = null) => {
  const formattedMessage = formatLogMessage(level, eventType, message, data)
  console.log(formattedMessage)
}

/**
 * Payment method validation logging
 */
export const logPaymentValidation = {
  /**
   * Log successful payment method validation
   */
  success: (method, validationResult, orderId = null) => {
    const message = `Payment method validation successful: ${method} → ${validationResult.normalizedMethod}`
    const data = {
      orderId,
      originalMethod: method,
      normalizedMethod: validationResult.normalizedMethod,
      displayName: validationResult.displayName,
      isVNPay: validationResult.isVNPay
    }
    log(LOG_LEVELS.SUCCESS, EVENT_TYPES.PAYMENT_VALIDATION, message, data)
  },

  /**
   * Log failed payment method validation
   */
  failure: (method, errors, orderId = null) => {
    const message = `Payment method validation failed: ${method}`
    const data = {
      orderId,
      method,
      errors: Array.isArray(errors) ? errors : [errors]
    }
    log(LOG_LEVELS.ERROR, EVENT_TYPES.PAYMENT_VALIDATION, message, data)
  },

  /**
   * Log payment method validation attempt
   */
  attempt: (method, orderId = null) => {
    const message = `Validating payment method: ${method}`
    const data = { orderId, method }
    log(LOG_LEVELS.INFO, EVENT_TYPES.PAYMENT_VALIDATION, message, data)
  }
}

/**
 * VNPay URL generation logging
 */
export const logVNPayURL = {
  /**
   * Log successful VNPay URL generation
   */
  success: (orderId, orderCode, amount, paymentUrl) => {
    const message = `VNPay URL generated successfully for order ${orderCode}`
    const data = {
      orderId,
      orderCode,
      amount,
      paymentUrlLength: paymentUrl ? paymentUrl.length : 0,
      hasPaymentUrl: !!paymentUrl
    }
    log(LOG_LEVELS.SUCCESS, EVENT_TYPES.VNPAY_URL_GENERATION, message, data)
  },

  /**
   * Log VNPay URL generation failure
   */
  failure: (orderId, orderCode, error, amount = null) => {
    const message = `VNPay URL generation failed for order ${orderCode}`
    const data = {
      orderId,
      orderCode,
      amount,
      error: error.message || error,
      stack: error.stack
    }
    log(LOG_LEVELS.ERROR, EVENT_TYPES.VNPAY_URL_GENERATION, message, data)
  },

  /**
   * Log VNPay URL generation attempt
   */
  attempt: (orderId, orderCode, amount, paymentMethod) => {
    const message = `Attempting VNPay URL generation for order ${orderCode}`
    const data = {
      orderId,
      orderCode,
      amount,
      paymentMethod
    }
    log(LOG_LEVELS.INFO, EVENT_TYPES.VNPAY_URL_GENERATION, message, data)
  },

  /**
   * Log VNPay configuration details
   */
  config: (orderId, vnpParams) => {
    const message = `VNPay parameters configured for order`
    const data = {
      orderId,
      vnpVersion: vnpParams.vnp_Version,
      vnpCommand: vnpParams.vnp_Command,
      vnpTmnCode: vnpParams.vnp_TmnCode,
      vnpAmount: vnpParams.vnp_Amount,
      vnpTxnRef: vnpParams.vnp_TxnRef,
      vnpOrderInfo: vnpParams.vnp_OrderInfo,
      hasSecureHash: !!vnpParams.vnp_SecureHash
    }
    log(LOG_LEVELS.DEBUG, EVENT_TYPES.VNPAY_URL_GENERATION, message, data)
  }
}

/**
 * Payment method processing logging
 */
export const logPaymentProcessing = {
  /**
   * Log payment method selection
   */
  methodSelected: (method, orderId, userId) => {
    const message = `Payment method selected: ${method}`
    const data = { method, orderId, userId }
    log(LOG_LEVELS.INFO, EVENT_TYPES.PAYMENT_METHOD_PROCESSING, message, data)
  },

  /**
   * Log payment processing start
   */
  processingStart: (method, orderId, amount) => {
    const message = `Starting payment processing for method: ${method}`
    const data = { method, orderId, amount }
    log(LOG_LEVELS.INFO, EVENT_TYPES.PAYMENT_METHOD_PROCESSING, message, data)
  },

  /**
   * Log payment processing completion
   */
  processingComplete: (method, orderId, requiresRedirect = false) => {
    const message = `Payment processing completed for method: ${method}`
    const data = { method, orderId, requiresRedirect }
    log(LOG_LEVELS.SUCCESS, EVENT_TYPES.PAYMENT_METHOD_PROCESSING, message, data)
  },

  /**
   * Log payment method compatibility check
   */
  compatibilityCheck: (originalMethod, normalizedMethod, isVNPay) => {
    const message = `Payment method compatibility check: ${originalMethod} → ${normalizedMethod}`
    const data = { originalMethod, normalizedMethod, isVNPay }
    log(LOG_LEVELS.DEBUG, EVENT_TYPES.PAYMENT_METHOD_PROCESSING, message, data)
  }
}

/**
 * Order creation logging
 */
export const logOrderCreation = {
  /**
   * Log order creation start
   */
  start: (userId, itemCount, paymentMethod) => {
    const message = `Starting order creation for user ${userId}`
    const data = { userId, itemCount, paymentMethod }
    log(LOG_LEVELS.INFO, EVENT_TYPES.ORDER_CREATION, message, data)
  },

  /**
   * Log successful order creation
   */
  success: (orderId, orderCode, paymentMethod, grandTotal) => {
    const message = `Order created successfully: ${orderCode}`
    const data = { orderId, orderCode, paymentMethod, grandTotal }
    log(LOG_LEVELS.SUCCESS, EVENT_TYPES.ORDER_CREATION, message, data)
  },

  /**
   * Log order creation failure
   */
  failure: (error, paymentMethod, userId) => {
    const message = `Order creation failed`
    const data = {
      error: error.message || error,
      paymentMethod,
      userId,
      stack: error.stack
    }
    log(LOG_LEVELS.ERROR, EVENT_TYPES.ORDER_CREATION, message, data)
  }
}

/**
 * Payment callback logging
 */
export const logPaymentCallback = {
  /**
   * Log VNPay return callback
   */
  vnpayReturn: (paymentId, responseCode, isSuccess) => {
    const message = `VNPay return callback received: ${isSuccess ? 'SUCCESS' : 'FAILED'}`
    const data = { paymentId, responseCode, isSuccess }
    log(isSuccess ? LOG_LEVELS.SUCCESS : LOG_LEVELS.ERROR, EVENT_TYPES.PAYMENT_CALLBACK, message, data)
  },

  /**
   * Log payment status update
   */
  statusUpdate: (orderId, oldStatus, newStatus, paymentMethod) => {
    const message = `Payment status updated: ${oldStatus} → ${newStatus}`
    const data = { orderId, oldStatus, newStatus, paymentMethod }
    log(LOG_LEVELS.INFO, EVENT_TYPES.PAYMENT_CALLBACK, message, data)
  }
}

/**
 * General utility logging functions
 */
export const logInfo = (eventType, message, data = null) => {
  log(LOG_LEVELS.INFO, eventType, message, data)
}

export const logSuccess = (eventType, message, data = null) => {
  log(LOG_LEVELS.SUCCESS, eventType, message, data)
}

export const logWarning = (eventType, message, data = null) => {
  log(LOG_LEVELS.WARNING, eventType, message, data)
}

export const logError = (eventType, message, data = null) => {
  log(LOG_LEVELS.ERROR, eventType, message, data)
}

export const logDebug = (eventType, message, data = null) => {
  log(LOG_LEVELS.DEBUG, eventType, message, data)
}

// Export constants for external use
export { LOG_LEVELS, EVENT_TYPES }

// Default export
export default {
  logPaymentValidation,
  logVNPayURL,
  logPaymentProcessing,
  logOrderCreation,
  logPaymentCallback,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logDebug,
  LOG_LEVELS,
  EVENT_TYPES
}