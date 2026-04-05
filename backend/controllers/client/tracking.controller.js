import RepairProgress from '../../models/repairprogressModel.js'
import Booking from '../../models/bookingModel.js'
import asyncHandler from 'express-async-handler'


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
    const userId = req.user._id

    if (!booking_code || !license_plate) {
        res.status(400)
        throw new Error('Vui lòng cung cấp mã đơn hàng và biển số xe')
    }

    const booking = await Booking.findOne({
        booking_code: booking_code,
        'vehicle_info.license_plate': license_plate,
        user_id: userId
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

    progress.quotation.status = 'APPROVED'
    progress.quotation.approved_at = Date.now()

    if (progress.current_step === 'QUOTING') {
        progress.current_step = 'IN_PROGRESS'
    }

    progress.system_logs.push({
        time: Date.now(),
        type: 'INF',
        message: 'Khách hàng đã phê duyệt báo giá. Hệ thống đang tiến hành sửa chữa.'
    })

    await progress.save()

    res.json({ message: 'Đã phê duyệt báo giá thành công', progress })
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

export const getTrackingStats = asyncHandler(async (req, res) => {
    const activeOrdersStatus = ['RECEIVED', 'IN_PROGRESS', 'QC_TESTING']
    const activeOrders = await Booking.countDocuments({
        booking_status: { $in: activeOrdersStatus }
    })

    const avgSpeed = "4.2"

    res.json({
        active_orders: activeOrders,
        avg_speed: avgSpeed
    })
})
