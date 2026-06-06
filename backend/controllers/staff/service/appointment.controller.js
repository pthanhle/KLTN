import Booking from '../../../models/bookingModel.js'
import ServiceItem from '../../../models/serviceItemModel.js'
import User from '../../../models/userModel.js'
import Notification from '../../../models/notificationModel.js'
import RepairProgress from '../../../models/repairprogressModel.js'
import emailQueue from '../../../queues/emailQueue.js'
import { serviceTrackingEmail } from '../../../utils/emailTemplates.js'
import asyncHandler from 'express-async-handler'


export const getAppointments = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status || ''
    const search = req.query.search || ''

    const query = { booking_type: { $in: ['service', 'maintenance'] } }
    if (status) {
        if (status.includes(',')) {
            query.booking_status = { $in: status.split(',').map(s => s.trim().toUpperCase()) }
        } else {
            query.booking_status = status.toUpperCase()
        }
    }

    const startDate = req.query.startDate ? new Date(req.query.startDate) : null
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null

    const dateStr = req.query.date;
    if (dateStr) {
        const start = new Date(dateStr);
        start.setHours(0, 0, 0, 0);
        const end = new Date(dateStr);
        end.setHours(23, 59, 59, 999);
        query.booking_date = { $gte: start, $lte: end };
    } else if (startDate && endDate) {
        query.booking_date = { $gte: startDate, $lte: endDate }
    }

    if (search) {
        const users = await User.find({
            $or: [
                { full_name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        }).select('_id')
        query.user_id = { $in: users.map(u => u._id) }
    }

    const total = await Booking.countDocuments(query)
    const appointmentsData = await Booking.find(query)
        .populate('user_id', 'full_name email phone')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ booking_date: 1 })

    const appointments = appointmentsData.map(app => {
        return app.toObject();
    });

    res.json({
        appointments,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await Booking.findById(req.params.id)
        .populate('user_id', 'full_name email phone')

    if (!appointment || !['service', 'maintenance'].includes(appointment.booking_type)) {
        res.status(404)
        throw new Error('Lịch hẹn không tồn tại hoặc không phải lịch dịch vụ')
    }

    res.json(appointment)
})


export const updateAppointment = asyncHandler(async (req, res) => {
    const { status } = req.body

    const appointment = await Booking.findById(req.params.id)
    if (!appointment || !['service', 'maintenance'].includes(appointment.booking_type)) {
        res.status(404)
        throw new Error('Lịch hẹn không tồn tại hoặc không phải lịch dịch vụ')
    }

    const validStatuses = ['pending', 'confirmed', 'received', 'in_progress', 'completed', 'cancelled']
    if (!validStatuses.includes(status?.toLowerCase())) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    const newStatus = status.toUpperCase()
    appointment.booking_status = newStatus
    if (req.body.note) {
        appointment.customer_note = req.body.note
    }

    let isNewAssignment = false
    if (req.body.advisor_id !== undefined && appointment.advisor_id?.toString() !== req.body.advisor_id) {
        if (req.body.advisor_id === 'unassigned') {
            appointment.advisor_id = null
        } else {
            appointment.advisor_id = req.body.advisor_id
            isNewAssignment = true
        }
    }

    const updated = await appointment.save()

    if (isNewAssignment) {
        // Create RepairProgress if assigned
        let repairProgress = await RepairProgress.findOne({ booking_id: updated._id })
        if (!repairProgress) {
            await RepairProgress.create({
                booking_id: updated._id,
                advisor_id: updated.advisor_id,
                status: 'RECEIVED',
                current_step: 'RECEIVED',
                timeline: [{
                    step: 'RECEIVED',
                    status: 'IN_PROGRESS',
                    time: new Date(),
                    note: 'Tiếp nhận xe từ khách hàng'
                }]
            })
        } else {
            repairProgress.advisor_id = updated.advisor_id
            await repairProgress.save()
        }

        // Send email
        const user = await User.findById(updated.user_id)
        if (user && user.email) {
            const trackingUrl = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/tracking`
            const licensePlate = updated.vehicle_info?.license_plate || '';
            const serviceItems = updated.services || [];
            const template = serviceTrackingEmail(user.full_name, updated.booking_code, trackingUrl, licensePlate, serviceItems)

            await emailQueue.add('sendEmail', {
                to: user.email,
                ...template,
            })
        }
    }

    if (newStatus === 'CANCELLED') {
        const dateStr = new Date(appointment.booking_date).toLocaleDateString('vi-VN')
        await Notification.create({
            user_id: appointment.user_id,
            title: 'Hủy lịch hẹn dịch vụ',
            message: `Lịch hẹn dịch vụ ngày ${dateStr} đã bị từ chối.${req.body.note ? ` Lý do: ${req.body.note}` : ''}`,
            type: 'BOOKING',
            reference_id: appointment.booking_code,
            reference_link: '/profile/services',
            is_read: false,
        })
    } else if (newStatus === 'CONFIRMED') {
        const dateStr = new Date(appointment.booking_date).toLocaleDateString('vi-VN')
        await Notification.create({
            user_id: appointment.user_id,
            title: 'Xác nhận lịch hẹn dịch vụ',
            message: `Lịch hẹn dịch vụ ngày ${dateStr} đã được xác nhận. Xin vui lòng đến đúng giờ.`,
            type: 'BOOKING',
            reference_id: appointment.booking_code,
            reference_link: '/profile/services',
            is_read: false,
        })
    }

    res.json({
        message: 'Cập nhật lịch hẹn thành công',
        appointment: await Booking.findById(updated._id)
            .populate('user_id', 'full_name email phone'),
    })
})