import RepairProgress from '../../models/repairprogressModel.js'
import Booking from '../../models/bookingModel.js'
import Part from '../../models/partModel.js'
import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import moment from 'moment'
import { vnpayConfig } from '../../config/vnpayConfig.js'
import { getIO } from '../../config/socket.js'


export const getMyProgressList = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const bookings = await Booking.find({ user_id: userId }).select('_id')
    const bookingIds = bookings.map(b => b._id)

    const progresses = await RepairProgress.find({ booking_id: { $in: bookingIds } })
        .populate({
            path: 'booking_id',
            select: 'booking_code booking_date service_type services total_cost',
        })
        .populate('advisor_id', 'full_name phone email')
        .populate('mechanic_id', 'full_name phone email')
        .sort({ createdAt: -1 })

    res.json(progresses)
})


export const getTrackingDetail = asyncHandler(async (req, res) => {
    const { bookingCode } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({
        booking_code: bookingCode,
        user_id: userId
    })

    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy lịch hẹn hoặc bạn không có quyền xem')
    }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
        .populate({
            path: 'booking_id',
            select: 'booking_code customer_info vehicle_info booking_date time_slot service_type services total_cost customer_note',
        })
        .populate('advisor_id', 'full_name phone email avatar')
        .populate('mechanic_id', 'full_name phone email avatar')

    if (!progress) {
        res.status(404)
        throw new Error('Thông tin tiến độ chưa được cập nhật cho lịch hẹn này')
    }

    if (progress.quotation) {
        const partsTotal = progress.quotation.parts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0)
        const laborsTotal = progress.quotation.labors.reduce((sum, l) => sum + (l.hours * l.rate), 0)
        const subtotal = partsTotal + laborsTotal
        const vat = subtotal * (progress.quotation.vat_rate || 0.1)
        const total = subtotal + vat

        if (progress.delivery && progress.delivery.invoice_ledger) {
            progress.delivery.invoice_ledger.total_amount = total
        }
    }

    res.json({
        ...progress.toObject(),
        garage_zalo_url: process.env.GARAGE_ZALO_PHONE ? `https://zalo.me/${process.env.GARAGE_ZALO_PHONE}` : null
    })
})


export const lookupTracking = asyncHandler(async (req, res) => {
    const { booking_code, license_plate } = req.body

    if (!booking_code || !license_plate) {
        res.status(400)
        throw new Error('Vui lòng cung cấp mã đơn hàng và biển số xe')
    }

    const booking = await Booking.findOne({
        booking_code: booking_code,
        'vehicle_info.license_plate': license_plate
    })

    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy thông tin đơn hàng khớp với mã và biển số này, hoặc bạn không có quyền xem')
    }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
        .populate({
            path: 'booking_id',
            select: 'booking_code customer_info vehicle_info booking_date time_slot service_type services total_cost customer_note',
        })
        .populate('advisor_id', 'full_name phone email avatar')
        .populate('mechanic_id', 'full_name phone email avatar')

    if (!progress) {
        res.status(404)
        throw new Error('Đơn hàng tồn tại nhưng chưa có thông tin tiến độ chi tiết')
    }

    // Tính toán lại tổng tiền
    if (progress.quotation) {
        const partsTotal = progress.quotation.parts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0)
        const laborsTotal = progress.quotation.labors.reduce((sum, l) => sum + (l.hours * l.rate), 0)
        const subtotal = partsTotal + laborsTotal
        const vat = subtotal * (progress.quotation.vat_rate || 0.1)
        const total = subtotal + vat

        if (progress.delivery && progress.delivery.invoice_ledger) {
            progress.delivery.invoice_ledger.total_amount = total
        }
    }

    res.json({
        ...progress.toObject(),
        garage_zalo_url: process.env.GARAGE_ZALO_PHONE ? `https://zalo.me/${process.env.GARAGE_ZALO_PHONE}` : null
    })
})


export const approveQuotation = asyncHandler(async (req, res) => {
    const { bookingCode } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({ booking_code: bookingCode, user_id: userId })
    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy đơn hàng')
    }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy tiến độ')
    }

    if (progress.quotation.status === 'APPROVED') {
        res.status(400)
        throw new Error('Báo giá này đã được duyệt')
    }

    const partsTotal = progress.quotation.parts.reduce((sum, p) => sum + (p.quantity * p.unit_price), 0)
    const laborsTotal = progress.quotation.labors.reduce((sum, l) => sum + (l.hours * l.rate), 0)
    const subtotal = partsTotal + laborsTotal
    const vat = subtotal * (progress.quotation.vat_rate || 0.1)
    const total = subtotal + vat

    const depositAmount = progress.quotation.deposit_amount > 0 ? progress.quotation.deposit_amount : total

    const validAmount = Math.floor(Number(depositAmount))

    if (validAmount < 5000 || validAmount >= 1000000000) {
        res.status(400)
        throw new Error('Số tiền thanh toán phải từ 5,000đ đến dưới 1 tỷ đồng')
    }

    let ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1'
    if (ipAddr === '::1' || ipAddr === '::ffff:127.0.0.1') {
        ipAddr = '127.0.0.1'
    }
    const createDate = moment().format('YYYYMMDDHHmmss')

    if (!vnpayConfig.vnp_TmnCode || !vnpayConfig.vnp_HashSecret || !vnpayConfig.vnp_Url) {
        res.status(500)
        throw new Error('Cấu hình VNPay không hợp lệ. Vui lòng thử lại sau.')
    }

    let vnp_Params = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = vnpayConfig.vnp_TmnCode
    vnp_Params['vnp_Locale'] = 'vn'
    vnp_Params['vnp_CurrCode'] = 'VND'
    vnp_Params['vnp_TxnRef'] = progress._id.toString() // Dùng progress._id thay cho order_id
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan dat coc bao gia ' + bookingCode
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = validAmount * 100
    vnp_Params['vnp_ReturnUrl'] = vnpayConfig.vnp_ReturnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate

    // Sort params
    let sorted = {}
    let str = []
    for (let key in vnp_Params) {
        if (vnp_Params.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (let key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(vnp_Params[str[key]]).replace(/%20/g, '+')
    }
    vnp_Params = sorted

    const signData = Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed

    const paymentUrl = vnpayConfig.vnp_Url + '?' + Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')

    res.status(200).json({
        message: 'Tạo URL thanh toán VNPay thành công. Vui lòng thanh toán để duyệt báo giá.',
        url: paymentUrl,
        progressId: progress._id
    })
})

export const rejectQuotation = asyncHandler(async (req, res) => {
    const { bookingCode } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({ booking_code: bookingCode, user_id: userId })
    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy đơn hàng')
    }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy tiến độ')
    }

    progress.quotation.status = 'REJECTED'
    progress.system_logs.push({
        time: Date.now(),
        type: 'WRN',
        message: 'Khách hàng đã từ chối báo giá. Vui lòng liên hệ cố vấn để trao đổi thêm.'
    })

    await progress.save()

    res.json({ message: 'Đã từ chối báo giá', progress })
})

export const confirmPayment = asyncHandler(async (req, res) => {
    const { bookingCode } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({ booking_code: bookingCode, user_id: userId })
    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy đơn hàng')
    }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy tiến độ')
    }

    if (progress.delivery && progress.delivery.invoice_ledger) {
        progress.delivery.invoice_ledger.payment_status = 'PAID'
        progress.delivery.invoice_ledger.paid_amount = progress.delivery.invoice_ledger.total_amount

        progress.system_logs.push({
            time: Date.now(),
            type: 'INF',
            message: 'Khách hàng đã xác nhận thanh toán. Vui lòng kiểm tra đối soát.'
        })

        await progress.save()
    }

    res.json({ message: 'Đã gửi xác nhận thanh toán thành công', progress })
})

export const approveSupplementRequest = asyncHandler(async (req, res) => {
    const { bookingCode, supplementId } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({ booking_code: bookingCode, user_id: userId })
    if (!booking) { res.status(404); throw new Error('Không tìm thấy đơn hàng') }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
    if (!progress) { res.status(404); throw new Error('Không tìm thấy tiến độ') }

    const supplement = progress.supplement_requests.id(supplementId)
    if (!supplement) { res.status(404); throw new Error('Không tìm thấy yêu cầu phát sinh') }
    if (supplement.status !== 'PENDING') { res.status(400); throw new Error('Yêu cầu này đã được xử lý') }

    supplement.status = 'APPROVED'
    supplement.resolved_at = new Date()

    // Append new parts to quotation and allocate from inventory
    for (const p of (supplement.parts || [])) {
        progress.quotation.parts.push(p)
        const partDB = await Part.findOne({ sku: p.sku })
        let isBackordered = true
        if (partDB && partDB.inventory.available_stock >= p.quantity) {
            partDB.inventory.allocated += p.quantity
            partDB.inventory.available_stock -= p.quantity
            await partDB.save()
            isBackordered = false
        }
        progress.parts_usage.push({
            name: p.name, sku: p.sku, quantity: p.quantity,
            progress: 0, status: 'WAITING',
            eta: isBackordered ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : new Date()
        })
    }

    for (const l of (supplement.labors || [])) {
        progress.quotation.labors.push(l)
    }

    progress.system_logs.push({
        time: new Date(), type: 'INF',
        message: `Khách hàng đã duyệt phát sinh: ${supplement.title}`
    })

    await progress.save()

    try {
        const io = getIO()
        const payload = { progress_id: progress._id, supplement_id: supplementId, message: `Khách hàng đã duyệt phát sinh: ${supplement.title}` }
        if (progress.mechanic_id) io.to(`user_${progress.mechanic_id}`).emit('supplement_approved', payload)
        if (progress.advisor_id) io.to(`user_${progress.advisor_id}`).emit('supplement_approved', payload)
    } catch (_) {}

    res.json({ message: 'Đã phê duyệt yêu cầu phát sinh', progress })
})

export const rejectSupplementRequest = asyncHandler(async (req, res) => {
    const { bookingCode, supplementId } = req.params
    const userId = req.user._id

    const booking = await Booking.findOne({ booking_code: bookingCode, user_id: userId })
    if (!booking) { res.status(404); throw new Error('Không tìm thấy đơn hàng') }

    const progress = await RepairProgress.findOne({ booking_id: booking._id })
    if (!progress) { res.status(404); throw new Error('Không tìm thấy tiến độ') }

    const supplement = progress.supplement_requests.id(supplementId)
    if (!supplement) { res.status(404); throw new Error('Không tìm thấy yêu cầu phát sinh') }
    if (supplement.status !== 'PENDING') { res.status(400); throw new Error('Yêu cầu này đã được xử lý') }

    supplement.status = 'REJECTED'
    supplement.resolved_at = new Date()

    progress.system_logs.push({
        time: new Date(), type: 'WRN',
        message: `Khách hàng đã từ chối phát sinh: ${supplement.title}`
    })

    await progress.save()

    try {
        const io = getIO()
        const payload = { progress_id: progress._id, supplement_id: supplementId, message: `Khách hàng đã từ chối phát sinh: ${supplement.title}` }
        if (progress.mechanic_id) io.to(`user_${progress.mechanic_id}`).emit('supplement_rejected', payload)
        if (progress.advisor_id) io.to(`user_${progress.advisor_id}`).emit('supplement_rejected', payload)
    } catch (_) {}

    res.json({ message: 'Đã từ chối yêu cầu phát sinh', progress })
})

export const getTrackingStats = asyncHandler(async (req, res) => {
    const realCompleted = await Booking.countDocuments({ booking_status: 'COMPLETED' })

    const baseNumber = 1250
    const totalServiced = realCompleted + baseNumber

    res.json({
        total_serviced: totalServiced,
        years_experience: 5,
        service_standard: 'Chính hãng'
    })
})
