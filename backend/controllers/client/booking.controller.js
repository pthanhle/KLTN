import Booking from '../../models/bookingModel.js'
import Part from '../../models/partModel.js'
import Notification from '../../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const generateBookingCode = (prefix = 'BK') => {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}-${Date.now()}-${rand}`
}


export const getBookings = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const { booking_type, booking_status } = req.query

    const query = { user_id: req.user._id }
    if (booking_type) query.booking_type = booking_type
    if (booking_status) query.booking_status = booking_status

    const total = await Booking.countDocuments(query)
    const bookings = await Booking.find(query)
        .populate('product_id', 'product_name brandName images price isDemoAvailable')
        .populate('advisor_id', 'full_name phone avatar')
        .populate('mechanic_id', 'full_name phone avatar')
        .sort({ booking_date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)

    res.json({
        bookings,
        pagination: {
            page, limit, total,
            pages: Math.ceil(total / limit),
        },
    })
})



export const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate('product_id', 'product_name brandName images price isDemoAvailable')
        .populate('advisor_id', 'full_name phone avatar')
        .populate('mechanic_id', 'full_name phone avatar')
        .populate('user_id', 'full_name email phone')

    if (!booking) {
        res.status(404)
        throw new Error('Booking không tồn tại')
    }

    if (booking.user_id._id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền xem booking này')
    }

    res.json(booking)
})



export const createBooking = asyncHandler(async (req, res) => {
    const {
        booking_type, product_id, vehicle_info,
        booking_date, time_slot,
        test_drive_type, delivery_address,
        service_type, services,
        customer_note,
    } = req.body

    if (!booking_date || !time_slot) {
        res.status(400)
        throw new Error('Vui lòng chọn ngày và khung giờ')
    }

    if (!booking_type || !['test_drive', 'service', 'maintenance'].includes(booking_type)) {
        res.status(400)
        throw new Error('Loại booking không hợp lệ')
    }

    const customer_info = {
        full_name: req.user.full_name,
        contact_phone: req.user.phone,
        email: req.user.email,
    }

    let resolvedProductId = undefined
    let total_cost = 0

    if (booking_type === 'test_drive') {
        if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
            res.status(400)
            throw new Error('Vui lòng chọn xe để lái thử')
        }

        const car = await Product.findById(product_id)
        if (!car || car.type !== 'car') {
            res.status(404)
            throw new Error('Xe không tồn tại hoặc không hợp lệ')
        }

        resolvedProductId = product_id
    }

    if ((booking_type === 'service' || booking_type === 'maintenance') && services?.length > 0) {
        total_cost = services.reduce((sum, s) => sum + (s.price || 0), 0)
    }

    const prefix = booking_type === 'test_drive' ? 'TD' : 'SRV'
    const booking_code = generateBookingCode(prefix)

    const booking = await Booking.create({
        booking_code,
        user_id: req.user._id,
        customer_info,
        booking_type,
        product_id: resolvedProductId,
        vehicle_info: vehicle_info || undefined,
        booking_date: new Date(booking_date),
        time_slot,
        test_drive_type: test_drive_type || 'showroom',
        delivery_address: delivery_address || '',
        service_type: service_type || undefined,
        services: services || [],
        total_cost,
        customer_note: customer_note || '',
        booking_status: 'PENDING',
    })

    try {
        await Notification.create({
            user_id: req.user._id,
            title: 'Đặt lịch thành công',
            message: `Bạn đã đặt lịch thành công. Mã: ${booking_code}. Chờ xác nhận từ đội ngũ TT AUTO.`,
            type: 'BOOKING',
            reference_id: booking_code,
            reference_link: '/profile/services',
            is_read: false,
        })
    } catch (e) {
        console.error('Notification error:', e)
    }

    res.status(201).json({
        message: 'Đặt lịch thành công',
        booking: await Booking.findById(booking._id)
            .populate('product_id', 'product_name brandName images price'),
    })
})


export const rescheduleBooking = asyncHandler(async (req, res) => {
    const { booking_date, time_slot, reschedule_reason, test_drive_type, delivery_address } = req.body

    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        res.status(404)
        throw new Error('Booking không tồn tại')
    }

    if (booking.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền dời lịch này')
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.booking_status)) {
        res.status(400)
        throw new Error('Chỉ có thể dời lịch khi đang ở trạng thái Chờ xác nhận hoặc Đã chốt')
    }

    if (booking_date) booking.booking_date = new Date(booking_date)
    if (time_slot) booking.time_slot = time_slot
    if (reschedule_reason) booking.reschedule_reason = reschedule_reason
    if (test_drive_type) booking.test_drive_type = test_drive_type
    if (delivery_address) booking.delivery_address = delivery_address

    booking.booking_status = 'PENDING'

    await booking.save()

    res.json({
        message: 'Dời lịch thành công',
        booking,
    })
})


export const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        res.status(404)
        throw new Error('Booking không tồn tại')
    }

    if (booking.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền hủy booking này')
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.booking_status)) {
        res.status(400)
        throw new Error('Không thể hủy booking ở trạng thái này')
    }

    booking.booking_status = 'CANCELLED'
    await booking.save()

    res.json({ message: 'Hủy booking thành công' })
})


export const rateBooking = asyncHandler(async (req, res) => {
    const { rating } = req.body

    if (!rating || rating < 1 || rating > 5) {
        res.status(400)
        throw new Error('Rating phải từ 1 đến 5')
    }

    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        res.status(404)
        throw new Error('Booking không tồn tại')
    }

    if (booking.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền đánh giá booking này')
    }

    if (booking.booking_status !== 'COMPLETED') {
        res.status(400)
        throw new Error('Chỉ có thể đánh giá sau khi dịch vụ hoàn thành')
    }

    booking.rating = rating
    await booking.save()

    res.json({ message: 'Đánh giá thành công', rating })
})