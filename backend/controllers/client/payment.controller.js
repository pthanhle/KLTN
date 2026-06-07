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
import { getIO } from '../../config/socket.js'

export const createVNPayPayment = asyncHandler(async (req, res) => {
  const { order_id, progress_id, amount } = req.body

  // --- Repair progress payment flow (deposit or final) ---
  if (progress_id) {
    const paymentTypeReq = req.body.payment_type || 'quotation_deposit'
    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
      res.status(404)
      throw new Error('Không tìm thấy đơn sửa chữa')
    }

    let validAmount, orderInfo, paymentType
    if (paymentTypeReq === 'final_payment') {
      if (progress.status !== 'QC_TESTING') {
        res.status(400)
        throw new Error('Xe chưa hoàn thành kiểm định QC')
      }
      const remaining = (progress.quotation?.final_amount || 0) - (progress.quotation?.deposit_amount || 0)
      validAmount = Math.floor(remaining)
      orderInfo = `Thanh toan con lai dich vu ${progress_id}`
      paymentType = 'final_payment'
    } else {
      if (progress.status !== 'QUOTING') {
        res.status(400)
        throw new Error('Báo giá chưa được lập hoặc đã xử lý')
      }
      if (!progress.quotation?.deposit_amount || progress.quotation.deposit_amount <= 0) {
        res.status(400)
        throw new Error('Báo giá chưa có số tiền cọc')
      }
      validAmount = Math.floor(progress.quotation.deposit_amount)
      orderInfo = `Dat coc bao gia ${progress_id}`
      paymentType = 'quotation_deposit'
    }

    if (validAmount < 5000 || validAmount >= 1000000000) {
      res.status(400)
      throw new Error('Số tiền không hợp lệ')
    }

    const paymentValidation = validatePaymentMethodDetailed('vnpay')
    if (!paymentValidation.isValid) {
      res.status(400)
      throw new Error('Phương thức thanh toán không hợp lệ')
    }

    const payment = await Payment.create({
      progress_id,
      payment_type: paymentType,
      amount: validAmount,
      method: paymentValidation.normalizedMethod,
      status: 'pending',
    })

    const paymentUrl = _buildVNPayUrl(req, payment._id.toString(), validAmount, orderInfo)
    return res.status(200).json({
      message: 'Tạo URL VNPay thành công',
      progress_id,
      payment_id: payment._id,
      url: paymentUrl,
    })
  }

  // --- Product order flow ---
  console.log(`VNPay payment request received:`, {
    orderId: order_id,
    amount: amount,
    timestamp: new Date().toISOString(),
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
      res.status(400)
      throw new Error('Số tiền phải từ 5,000đ đến dưới 1 tỷ đồng')
    }

    const paymentValidation = validatePaymentMethodDetailed('vnpay')
    if (!paymentValidation.isValid) {
      res.status(400)
      throw new Error('Phương thức thanh toán không hợp lệ')
    }

    const payment = await Payment.create({
      order_id,
      payment_type: 'order',
      amount: validAmount,
      method: paymentValidation.normalizedMethod,
      status: 'pending',
    })

    if (!vnpayConfig.vnp_TmnCode || !vnpayConfig.vnp_HashSecret || !vnpayConfig.vnp_Url) {
      payment.status = 'failed'
      await payment.save()
      res.status(500)
      throw new Error('Cấu hình VNPay không hợp lệ. Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.')
    }

    const paymentUrl = _buildVNPayUrl(req, payment._id.toString(), validAmount, `Thanh toan don hang ${order_id}`)

    console.log(`VNPay payment URL created successfully for order ${order_id}`, {
      paymentId: payment._id, orderId: order._id, amount: validAmount
    })

    return res.status(200).json({
      message: 'Tạo URL VNPay thành công',
      order_id: order._id,
      payment_id: payment._id,
      url: paymentUrl,
    })

  } catch (error) {
    console.error(`VNPay payment creation failed:`, { orderId: order_id, error: error.message })

    if (res.statusCode === 200) res.status(500)
    return res.json({
      success: false,
      message: error.message || 'Có lỗi xảy ra khi tạo thanh toán VNPay.',
      errorCode: 'VNPAY_GENERAL_ERROR',
    })
  }
})

function _buildVNPayUrl(req, txnRef, amount, orderInfo) {
  if (!vnpayConfig.vnp_TmnCode || !vnpayConfig.vnp_HashSecret || !vnpayConfig.vnp_Url) {
    throw new Error('Cấu hình VNPay không hợp lệ. Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.')
  }

  let ipAddr = req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  if (ipAddr === '::1' || ipAddr === '::ffff:127.0.0.1') ipAddr = '127.0.0.1'

  let vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnpayConfig.vnp_TmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: txnRef,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'other',
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
  }
  vnp_Params = sortObject(vnp_Params)
  const signData = Object.keys(vnp_Params).map(k => k + '=' + vnp_Params[k]).join('&')
  const signed = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
    .update(Buffer.from(signData, 'utf-8')).digest('hex')
  vnp_Params['vnp_SecureHash'] = signed
  return vnpayConfig.vnp_Url + '?' + Object.keys(vnp_Params).map(k => k + '=' + vnp_Params[k]).join('&')
}


export const vnpayReturn = asyncHandler(async (req, res) => {
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000'

  try {
    let vnp_Params = { ...req.query }
    const secureHash = vnp_Params['vnp_SecureHash']
    const paymentId = vnp_Params['vnp_TxnRef']
    const rspCode = vnp_Params['vnp_ResponseCode']
    const transactionNo = vnp_Params['vnp_TransactionNo']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']
    vnp_Params = sortObject(vnp_Params)

    const signData = Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')
    const signed = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
      .update(Buffer.from(signData, 'utf-8')).digest('hex')

    if (secureHash !== signed) {
      console.error('VNPay return: Invalid signature')
      return res.redirect(`${frontendUrl}/payment/failed?reason=invalid_signature`)
    }

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found`)
    }

    const payment = await Payment.findById(paymentId)
    if (!payment) {
      return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found&order_id=${paymentId}`)
    }

    // --- Repair progress payment flow (deposit or final) ---
    if (payment.progress_id) {
      const progress = await RepairProgress.findById(payment.progress_id).populate('booking_id')
      if (!progress) {
        return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found`)
      }

      if (rspCode !== '00') {
        payment.status = 'failed'
        await payment.save()
        progress.system_logs.push({
          time: new Date(),
          type: 'ERR',
          message: `Thanh toán VNPay thất bại (${payment.payment_type}). Mã lỗi: ${rspCode}`,
        })
        await progress.save()
        return res.redirect(`${frontendUrl}/payment/failed?reason=payment_failed&code=${rspCode}&order_id=${progress.booking_id?.booking_code || progress._id}&type=quotation`)
      }

      payment.status = 'completed'
      await payment.save()

      if (payment.payment_type === 'final_payment') {
        // Final payment — mark COMPLETED
        progress.current_step = 'COMPLETED'
        progress.status = 'COMPLETED'
        if (progress.timeline) {
          const completedStep = progress.timeline.find(t => t.step === 'COMPLETED')
          if (!completedStep) {
            progress.timeline.push({
              step: 'COMPLETED',
              status: 'COMPLETED',
              time: new Date(),
              note: 'Khách hàng đã thanh toán toàn bộ. Xe sẵn sàng bàn giao.',
            })
          }
        }
        if (!progress.delivery) progress.delivery = {}
        if (!progress.delivery.invoice_ledger) progress.delivery.invoice_ledger = {}
        progress.delivery.invoice_ledger.payment_status = 'PAID'
        progress.delivery.invoice_ledger.paid_amount = progress.quotation?.final_amount || 0
        progress.delivery.invoice_ledger.total_amount = progress.quotation?.final_amount || 0

        progress.system_logs.push({
          time: new Date(),
          type: 'INF',
          message: 'Khách hàng đã thanh toán toàn bộ. Xe sẵn sàng bàn giao.',
        })
        await progress.save()

        try {
          const io = getIO()
          if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('final_payment_received', {
              progress_id: progress._id,
              message: 'Khách hàng đã thanh toán toàn bộ. Tiến hành bàn giao xe.',
            })
          }
        } catch (_) {}

        if (progress.booking_id?.user_id) {
          await createAndEmitNotification(progress.booking_id.user_id, {
            title: 'Thanh toán thành công',
            message: 'Cảm ơn bạn đã thanh toán. Vui lòng đến nhận xe.',
            type: 'SERVICE',
            reference_id: progress._id.toString(),
            reference_link: `/tracking/${progress.booking_id?.booking_code || progress._id}`,
          }).catch(() => {})
        }

        return res.redirect(`${frontendUrl}/payment/success?order_id=${progress.booking_id?.booking_code || progress._id}&type=quotation`)
      }

      // Deposit flow — build parts_usage first to decide if warehouse step is needed
      progress.quotation.status = 'APPROVED'
      progress.quotation.approved_at = new Date()

      progress.parts_usage = []
      for (const qPart of progress.quotation.parts) {
        const partDB = await Part.findOne({ sku: qPart.sku })
        let isBackordered = false
        if (partDB) {
          if (partDB.inventory.available_stock < qPart.quantity) isBackordered = true
          partDB.inventory.allocated += qPart.quantity
          partDB.inventory.available_stock -= qPart.quantity
          await partDB.save()
        } else {
          isBackordered = true
        }
        progress.parts_usage.push({
          name: qPart.name,
          sku: qPart.sku,
          quantity: qPart.quantity,
          progress: 0,
          status: 'WAITING',
          eta: isBackordered ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : new Date(),
        })
      }

      // No physical parts → skip warehouse and start repair immediately
      if (progress.parts_usage.length === 0) {
        progress.current_step = 'IN_PROGRESS'
        progress.status = 'IN_PROGRESS'
        progress.timeline.push({
          step: 'IN_PROGRESS',
          status: 'IN_PROGRESS',
          time: new Date(),
          note: 'Không có phụ tùng cần xuất kho. Bắt đầu thi công.',
        })
        progress.system_logs.push({
          time: new Date(),
          type: 'INF',
          message: 'Không có phụ tùng cần xuất kho. Xe chuyển thẳng sang Đang thi công.',
        })
      } else {
        progress.current_step = 'WAITING_PARTS'
        progress.status = 'WAITING_PARTS'
        progress.timeline.push({
          step: 'WAITING_PARTS',
          status: 'IN_PROGRESS',
          time: new Date(),
          note: 'Khách hàng đã thanh toán cọc. Chờ xuất kho phụ tùng.',
        })
        progress.system_logs.push({
          time: new Date(),
          type: 'INF',
          message: 'Khách hàng đã thanh toán tiền cọc báo giá. Đang chờ xuất kho phụ tùng.',
        })
      }

      await progress.save()

      try {
        const io = getIO()
        if (progress.parts_usage.length === 0) {
          // No parts — notify tech to start immediately
          if (progress.mechanic_id) {
            io.to(`user_${progress.mechanic_id}`).emit('parts_ready', {
              progress_id: progress._id,
              message: 'Không cần phụ tùng. Bắt đầu thi công ngay!',
            })
          }
          if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('parts_ready', {
              progress_id: progress._id,
              message: 'Khách hàng đã thanh toán cọc. Không cần phụ tùng, xe đang thi công.',
            })
          }
        } else {
          // Has parts — notify warehouse and staff to wait for dispatch
          io.to('room_inventory').emit('parts_request', {
            progress_id: progress._id,
            message: 'Đơn sửa chữa cần xuất kho phụ tùng.',
          })
          if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('quotation_paid', {
              progress_id: progress._id,
              message: 'Khách hàng đã thanh toán cọc. Đang chờ xuất kho phụ tùng.',
            })
          }
          if (progress.mechanic_id) {
            io.to(`user_${progress.mechanic_id}`).emit('quotation_paid', {
              progress_id: progress._id,
              message: 'Báo giá đã được thanh toán. Xe sẽ vào xưởng sau khi có đủ phụ tùng.',
            })
          }
        }
      } catch (_) {}

      const customerMsg = progress.parts_usage.length === 0
        ? 'Bạn đã đặt cọc thành công. Kỹ thuật viên sẽ bắt đầu thi công ngay.'
        : 'Bạn đã đặt cọc thành công. Chúng tôi đang chuẩn bị phụ tùng cho xe của bạn.'

      if (progress.booking_id?.user_id) {
        await createAndEmitNotification(progress.booking_id.user_id, {
          title: 'Thanh toán cọc thành công',
          message: customerMsg,
          type: 'SERVICE',
          reference_id: progress._id.toString(),
          reference_link: `/tracking/${progress.booking_id?.booking_code || progress._id}`,
        }).catch(() => {})
      }

      console.log(`VNPay quotation deposit completed`, { progressId: progress._id, transactionNo, hasPartsUsage: progress.parts_usage.length > 0 })
      return res.redirect(`${frontendUrl}/payment/success?order_id=${progress.booking_id?.booking_code || progress._id}&type=quotation`)
    }

    // --- Product order flow ---
    const order = await Order.findById(payment.order_id)
    if (!order) {
      return res.redirect(`${frontendUrl}/payment/failed?reason=payment_not_found`)
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

      return res.redirect(`${frontendUrl}/payment/success?order_id=${order._id}&payment_id=${payment._id}`)

    } else {
      payment.status = 'failed'
      await payment.save()
      return res.redirect(`${frontendUrl}/payment/failed?reason=payment_failed&code=${rspCode}&order_id=${order._id}`)
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