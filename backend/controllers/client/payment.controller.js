import asyncHandler from 'express-async-handler'
import Payment from '../../models/paymentModel.js'
import Order from '../../models/orderModel.js'
import { vnpayConfig } from '../../config/vnpayConfig.js'
import { isVNPayMethod, validatePaymentMethodDetailed } from '../../utils/paymentValidation.js'
import crypto from 'crypto'
import moment from 'moment'


export const createVNPayPayment = asyncHandler(async (req, res) => {
  const { order_id, amount } = req.body

  // Log incoming payment request
  console.log(`VNPay payment request received:`, {
    orderId: order_id,
    amount: amount,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '127.0.0.1'
  })

  try {
    const order = await Order.findById(order_id)
    if (!order) {
      console.error(`VNPay payment failed: Order not found`, { orderId: order_id })
      res.status(404)
      throw new Error('Không tìm thấy đơn hàng')
    }

    const validAmount = Math.floor(Number(amount))

    if (validAmount < 5000 || validAmount >= 1000000000) {
      console.error(`VNPay payment failed: Invalid amount`, {
        orderId: order_id,
        requestedAmount: amount,
        validAmount: validAmount
      })
      res.status(400)
      throw new Error('Số tiền phải từ 5,000đ đến dưới 1 tỷ đồng')
    }

    // Use normalized payment method for consistency
    const paymentValidation = validatePaymentMethodDetailed('vnpay')

    // Log payment method validation results
    console.log(`Payment method validation for VNPay:`, {
      originalMethod: 'vnpay',
      isValid: paymentValidation.isValid,
      isVNPay: paymentValidation.isVNPay,
      normalizedMethod: paymentValidation.normalizedMethod,
      displayName: paymentValidation.displayName,
      errors: paymentValidation.errors,
      orderId: order_id
    })

    if (!paymentValidation.isValid) {
      console.error(`VNPay payment failed: Invalid payment method`, {
        orderId: order_id,
        errors: paymentValidation.errors
      })
      res.status(400)
      throw new Error('Phương thức thanh toán không hợp lệ')
    }

    const payment = await Payment.create({
      order_id,
      amount: validAmount,
      method: paymentValidation.normalizedMethod,
      status: 'pending',
    })

    let ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket?.remoteAddress ||
      '127.0.0.1'

    if (ipAddr === '::1' || ipAddr === '::ffff:127.0.0.1') {
      ipAddr = '127.0.0.1'
    }

    const createDate = moment().format('YYYYMMDDHHmmss')

    // Validate VNPay configuration
    if (!vnpayConfig.vnp_TmnCode || !vnpayConfig.vnp_HashSecret || !vnpayConfig.vnp_Url) {
      console.error(`VNPay payment failed: Missing VNPay configuration`, {
        orderId: order_id,
        paymentId: payment._id,
        hasTmnCode: !!vnpayConfig.vnp_TmnCode,
        hasHashSecret: !!vnpayConfig.vnp_HashSecret,
        hasUrl: !!vnpayConfig.vnp_Url
      })

      // Update payment status to failed
      payment.status = 'failed'
      await payment.save()

      res.status(500)
      throw new Error('Cấu hình VNPay không hợp lệ. Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.')
    }

    let vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = vnpayConfig.vnp_TmnCode
    vnp_Params['vnp_Locale'] = 'vn'
    vnp_Params['vnp_CurrCode'] = 'VND'
    vnp_Params['vnp_TxnRef'] = payment._id.toString()
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + order_id
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = validAmount * 100
    vnp_Params['vnp_ReturnUrl'] = vnpayConfig.vnp_ReturnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate

    vnp_Params = sortObject(vnp_Params)

    const signData = new URLSearchParams(vnp_Params).toString()

    try {
      const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
      vnp_Params['vnp_SecureHash'] = signed

      const paymentUrl = vnpayConfig.vnp_Url + '?' + new URLSearchParams(vnp_Params).toString()

      // Validate generated URL
      if (!paymentUrl || paymentUrl.length < 100) {
        throw new Error('Generated VNPay URL is invalid')
      }

      // Log VNPay URL generation success
      console.log(`VNPay payment URL created successfully for order ${order_id}`, {
        paymentId: payment._id,
        orderId: order._id,
        amount: validAmount,
        paymentMethod: paymentValidation.normalizedMethod,
        urlLength: paymentUrl.length,
        timestamp: new Date().toISOString()
      })

      res.status(200).json({
        message: 'Tạo URL VNPay thành công',
        order_id: order._id,
        payment_id: payment._id,
        url: paymentUrl,
      })

    } catch (signatureError) {
      console.error(`VNPay payment failed: Signature generation error`, {
        orderId: order_id,
        paymentId: payment._id,
        error: signatureError.message,
        signData: signData
      })

      // Update payment status to failed
      payment.status = 'failed'
      await payment.save()

      res.status(500)
      throw new Error('Không thể tạo chữ ký VNPay. Vui lòng thử lại sau.')
    }

  } catch (error) {
    // Enhanced error logging for VNPay-specific issues
    console.error(`VNPay payment creation failed:`, {
      orderId: order_id,
      amount: amount,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

    // If it's a validation error, provide specific guidance
    if (error.message.includes('Không tìm thấy đơn hàng')) {
      res.status(404).json({
        success: false,
        message: error.message,
        errorCode: 'ORDER_NOT_FOUND',
        suggestion: 'Vui lòng kiểm tra lại đơn hàng và thử lại.'
      })
      return
    }

    if (error.message.includes('Số tiền phải')) {
      res.status(400).json({
        success: false,
        message: error.message,
        errorCode: 'INVALID_AMOUNT',
        suggestion: 'Vui lòng kiểm tra lại số tiền thanh toán.'
      })
      return
    }

    if (error.message.includes('Cấu hình VNPay')) {
      res.status(500).json({
        success: false,
        message: 'Dịch vụ VNPay tạm thời không khả dụng.',
        errorCode: 'VNPAY_CONFIG_ERROR',
        suggestion: 'Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.'
      })
      return
    }

    if (error.message.includes('chữ ký VNPay')) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi khi xử lý thanh toán VNPay.',
        errorCode: 'VNPAY_SIGNATURE_ERROR',
        suggestion: 'Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.'
      })
      return
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi tạo thanh toán VNPay.',
      errorCode: 'VNPAY_GENERAL_ERROR',
      suggestion: 'Vui lòng thử lại sau hoặc liên hệ hỗ trợ khách hàng.'
    })
  }
})


export const vnpayReturn = asyncHandler(async (req, res) => {
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000'

  // Log VNPay return callback
  console.log(`VNPay return callback received:`, {
    queryParams: req.query,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    referer: req.headers['referer']
  })

  let vnp_Params = req.query
  const secureHash = vnp_Params['vnp_SecureHash']

  delete vnp_Params['vnp_SecureHash']
  delete vnp_Params['vnp_SecureHashType']

  vnp_Params = sortObject(vnp_Params)

  const signData = new URLSearchParams(vnp_Params).toString()

  const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  if (secureHash !== signed) {
    console.error('VNPay return: Invalid signature', {
      expectedSignature: signed,
      receivedSignature: secureHash,
      signData: signData,
      params: vnp_Params
    })
    return res.redirect(`${frontendUrl}/payment/failed?reason=invalid_signature`)
  }

  const paymentId = vnp_Params['vnp_TxnRef']
  const rspCode = vnp_Params['vnp_ResponseCode']

  console.log(`VNPay return processing:`, {
    paymentId: paymentId,
    responseCode: rspCode,
    transactionNo: vnp_Params['vnp_TransactionNo'],
    amount: vnp_Params['vnp_Amount']
  })

  const payment = await Payment.findById(paymentId)
  if (!payment) {
    console.error(`VNPay return: Payment not found for ID ${paymentId}`, {
      paymentId: paymentId,
      responseCode: rspCode
    })
    return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found`)
  }

  const order = await Order.findById(payment.order_id)

  if (rspCode === '00') {
    payment.status = 'completed'
    payment.transaction_id = vnp_Params['vnp_TransactionNo']
    await payment.save()

    if (order) {
      order.status = 'processing'
      // Use normalized payment method
      const paymentValidation = validatePaymentMethodDetailed('vnpay')
      order.payment_method = paymentValidation.normalizedMethod
      await order.save()
    }

    console.log(`VNPay payment completed successfully for order ${order?._id}`, {
      paymentId: payment._id,
      orderId: order?._id,
      transactionId: vnp_Params['vnp_TransactionNo'],
      amount: vnp_Params['vnp_Amount'],
      paymentMethod: order?.payment_method
    })

    return res.redirect(
      `${frontendUrl}/payment/success?order_id=${order?._id}&payment_id=${payment._id}`
    )
  } else {
    payment.status = 'failed'
    await payment.save()

    console.error(`VNPay payment failed for order ${order?._id}`, {
      paymentId: payment._id,
      orderId: order?._id,
      responseCode: rspCode,
      errorMessage: getVNPayErrorMessage(rspCode)
    })

    return res.redirect(
      `${frontendUrl}/payment/failed?reason=payment_failed&code=${rspCode}`
    )
  }
})

function sortObject(obj) {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

function getVNPayErrorMessage(responseCode) {
  const errorMessages = {
    '01': 'Giao dịch chưa hoàn tất',
    '02': 'Giao dịch bị lỗi',
    '04': 'Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)',
    '05': 'VNPAY đang xử lý giao dịch này (GD hoàn tiền)',
    '06': 'VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)',
    '07': 'Giao dịch bị nghi ngờ gian lận',
    '09': 'GD Hoàn trả bị từ chối',
    '10': 'Đã giao hàng',
    '11': 'Giao dịch không thành công do: Khách hàng nhập sai mật khẩu xác thực giao dịch (OTP)',
    '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa',
    '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP)',
    '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
    '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch',
    '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày',
    '75': 'Ngân hàng thanh toán đang bảo trì',
    '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định',
    '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)'
  }

  return errorMessages[responseCode] || `Lỗi không xác định (${responseCode})`
}