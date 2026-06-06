import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Payment from '../../models/paymentModel.js'
import Order from '../../models/orderModel.js'
import RepairProgress from '../../models/repairprogressModel.js'
import Part from '../../models/partModel.js'
import { vnpayConfig } from '../../config/vnpayConfig.js'
import { isVNPayMethod, validatePaymentMethodDetailed } from '../../utils/paymentValidation.js'
import crypto from 'crypto'
import moment from 'moment'
import { createAndEmitNotification } from '../../utils/notificationHelper.js'


export const createVNPayPayment = asyncHandler(async (req, res) => {
  const { order_id, amount } = req.body

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

    const paymentValidation = validatePaymentMethodDetailed('vnpay')

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

    if (!vnpayConfig.vnp_TmnCode || !vnpayConfig.vnp_HashSecret || !vnpayConfig.vnp_Url) {
      console.error(`VNPay payment failed: Missing VNPay configuration`, {
        orderId: order_id,
        paymentId: payment._id,
        hasTmnCode: !!vnpayConfig.vnp_TmnCode,
        hasHashSecret: !!vnpayConfig.vnp_HashSecret,
        hasUrl: !!vnpayConfig.vnp_Url
      })

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

    const signData = Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')

    try {
      const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
      vnp_Params['vnp_SecureHash'] = signed

      const paymentUrl = vnpayConfig.vnp_Url + '?' + Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')

      if (!paymentUrl || paymentUrl.length < 100) {
        throw new Error('Generated VNPay URL is invalid')
      }

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

      payment.status = 'failed'
      await payment.save()

      res.status(500)
      throw new Error('Không thể tạo chữ ký VNPay. Vui lòng thử lại sau.')
    }

  } catch (error) {
    console.error(`VNPay payment creation failed:`, {
      orderId: order_id,
      amount: amount,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    })

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

  console.log(`VNPay return callback received:`, {
    queryParams: req.query,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    referer: req.headers['referer']
  })

  import('fs').then(fs => {
    fs.appendFileSync('vnpay_debug.log', JSON.stringify({
      time: new Date().toISOString(),
      event: 'vnpayReturn',
      query: req.query
    }) + '\n');
  }).catch(console.error);

  try {
    let vnp_Params = { ...req.query }
    const secureHash = vnp_Params['vnp_SecureHash']
    const paymentId = vnp_Params['vnp_TxnRef']
    const rspCode = vnp_Params['vnp_ResponseCode']
    const transactionNo = vnp_Params['vnp_TransactionNo']
    const vnpAmount = vnp_Params['vnp_Amount']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = sortObject(vnp_Params)

    const signData = Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')

    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

    import('fs').then(fs => {
      fs.appendFileSync('vnpay_debug.log', JSON.stringify({
        event: 'vnpayReturn_signature',
        signData,
        expectedHash: secureHash,
        actualHash: signed
      }) + '\n');
    }).catch(console.error);

    if (secureHash !== signed) {
      console.error('VNPay return: Invalid signature', {
        expectedSignature: signed,
        receivedSignature: secureHash,
        signData: signData
      })
      return res.redirect(`${frontendUrl}/payment/failed?reason=invalid_signature`)
    }

    console.log(`VNPay return processing:`, {
      paymentId, responseCode: rspCode, transactionNo, amount: vnpAmount
    })

    let payment = null
    let order = null
    let repairProgress = null

    if (mongoose.Types.ObjectId.isValid(paymentId)) {
      payment = await Payment.findById(paymentId)

      if (!payment) {
        repairProgress = await RepairProgress.findById(paymentId).populate('booking_id')
      }
    }

    if (payment) {
      order = await Order.findById(payment.order_id)
    } else if (!repairProgress) {
      if (mongoose.Types.ObjectId.isValid(paymentId)) {
        order = await Order.findById(paymentId)
        if (order) {
          payment = await Payment.findOne({ order_id: order._id })
          if (!payment) {
            payment = await Payment.create({
              order_id: order._id,
              amount: order.financials?.grand_total || 0,
              method: 'vnpay',
              status: 'pending',
            })
          }
        }
      }
    }

    if (!payment && !order && !repairProgress) {
      console.error(`VNPay return: Payment/Order/Quotation not found`, {
        paymentId, rspCode, paymentFound: !!payment, orderFound: !!order, progressFound: !!repairProgress
      })
      return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found&order_id=${paymentId}`)
    }

    if (repairProgress) {
      if (rspCode === '00') {
        repairProgress.quotation.status = 'APPROVED'
        repairProgress.quotation.approved_at = Date.now()

        if (repairProgress.current_step === 'QUOTING') {
          repairProgress.current_step = 'IN_PROGRESS'
        }

        repairProgress.system_logs.push({
          time: Date.now(),
          type: 'INF',
          message: 'Khách hàng đã thanh toán và phê duyệt báo giá. Hệ thống đã tạo lệnh xuất kho.'
        })


        for (const qPart of repairProgress.quotation.parts) {
          const partDB = await Part.findOne({ sku: qPart.sku });
          let isBackordered = false;

          if (partDB) {
            if (partDB.inventory.available_stock < qPart.quantity) {
              isBackordered = true;
            }

            partDB.inventory.allocated += qPart.quantity;
            partDB.inventory.available_stock -= qPart.quantity;
            await partDB.save();
          } else {
            isBackordered = true;
          }

          const etaDate = isBackordered ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : new Date();

          repairProgress.parts_usage.push({
            name: qPart.name,
            sku: qPart.sku,
            quantity: qPart.quantity,
            progress: 0,
            status: 'WAITING',
            eta: etaDate
          });
        }

        await repairProgress.save();

        console.log(`VNPay quotation payment completed successfully`, {
          progressId: repairProgress._id,
          transactionNo, amount: vnpAmount
        })

        return res.redirect(
          `${frontendUrl}/payment/success?order_id=${repairProgress._id}&type=quotation`
        )
      } else {
        repairProgress.system_logs.push({
          time: Date.now(),
          type: 'ERR',
          message: 'Thanh toán báo giá thất bại. Vui lòng thử lại.'
        })
        await repairProgress.save()

        return res.redirect(
          `${frontendUrl}/payment/failed?reason=payment_failed&code=${rspCode}&order_id=${repairProgress._id}&type=quotation`
        )
      }
    }


    if (rspCode === '00') {
      payment.status = 'completed'
      await payment.save()

      order.order_status = 'CONFIRMED'
      if (!order.payment) order.payment = {}
      order.payment.status = 'PAID'
      order.payment.transaction_id = transactionNo || ''
      const paymentValidation = validatePaymentMethodDetailed('vnpay')
      order.payment.method = paymentValidation.normalizedMethod
      order.payment.method_name = paymentValidation.displayName
      await order.save()

      if (order.user_id) {
        await createAndEmitNotification(order.user_id, {
          title: 'Thanh toán thành công',
          message: `Đơn hàng ${order.order_code} đã được thanh toán thành công. Cảm ơn bạn đã mua hàng!`,
          type: 'ORDER',
          reference_id: order.order_code,
          reference_link: '/profile/orders',
        }).catch(() => {})
      }

      console.log(`VNPay payment completed successfully`, {
        paymentId: payment._id,
        orderId: order._id,
        orderCode: order.order_code,
        transactionNo, amount: vnpAmount
      })

      return res.redirect(
        `${frontendUrl}/payment/success?order_id=${order._id}&payment_id=${payment._id}`
      )
    } else {
      payment.status = 'failed'
      await payment.save()

      console.error(`VNPay payment failed`, {
        paymentId: payment._id,
        orderId: order._id,
        responseCode: rspCode,
        errorMessage: getVNPayErrorMessage(rspCode)
      })

      return res.redirect(
        `${frontendUrl}/payment/failed?reason=payment_failed&code=${rspCode}&order_id=${order._id}`
      )
    }
  } catch (error) {
    console.error('VNPay return handler error:', error)
    return res.redirect(`${frontendUrl}/payment/failed?reason=server_error`)
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