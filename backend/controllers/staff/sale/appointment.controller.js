import Booking from '../../../models/bookingModel.js'
import User from '../../../models/userModel.js'
import Notification from '../../../models/notificationModel.js'
import asyncHandler from 'express-async-handler'


export const getAppointments = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status || ''
    const search = req.query.search || ''

    const query = { booking_type: 'vehicle' }
    if (status) query.status = status

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
        .populate('product_id', 'product_name price images')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ booking_date: 1 })

    const appointments = appointmentsData.map(app => {
        const appObj = app.toObject();

        if (appObj.product_id) {
            appObj.product_id.name = appObj.product_id.product_name || 'Unknown Car';
            if (Array.isArray(appObj.product_id.images) && appObj.product_id.images.length > 0) {
                appObj.product_id.image = appObj.product_id.images[0];
            } else {
                appObj.product_id.image = '';
            }
        }
        return appObj;
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
        .populate('product_id', 'product_name price images')

    if (!appointment || appointment.booking_type !== 'vehicle') {
        res.status(404)
        throw new Error('Lịch lái thử không tồn tại hoặc không hợp lệ')
    }

    const appObj = appointment.toObject();

    if (appObj.product_id) {
        appObj.product_id.name = appObj.product_id.product_name || 'Unknown Car';
        if (Array.isArray(appObj.product_id.images) && appObj.product_id.images.length > 0) {
            appObj.product_id.image = appObj.product_id.images[0];
        } else {
            appObj.product_id.image = '';
        }
    }

    res.json(appObj)
})


export const updateAppointment = asyncHandler(async (req, res) => {
    const { status, note } = req.body

    const appointment = await Booking.findById(req.params.id)
    if (!appointment || appointment.booking_type !== 'vehicle') {
        res.status(404)
        throw new Error('Lịch lái thử không tồn tại hoặc không hợp lệ')
    }

    if (!['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    appointment.status = status
    if (note) {
        appointment.note = note
    }

    const updated = await appointment.save()

    if (status === 'cancelled') {
        console.log('--- CANCELLED STATUS DETECTED ---');
        console.log('Appt ID:', appointment._id);
        console.log('User ID:', appointment.user_id);

        const message = `Lịch lái thử xe của bạn vào ngày ${new Date(appointment.booking_date).toLocaleDateString("vi-VN")} đã bị hủy.${note ? ` Lý do: ${note}` : ''}`;

        console.log('Notification Message:', message);

        try {
            await Notification.create({
                user_id: appointment.user_id,
                message: message,
                is_read: false,
            })
            console.log('Notification created successfully');
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }
    else if (status === 'confirmed') {
        console.log('--- CONFIRMED STATUS DETECTED ---');
        const message = `Lịch lái thử xe của bạn vào ngày ${new Date(appointment.booking_date).toLocaleDateString("vi-VN")} đã được xác nhận. Vui lòng đến đúng giờ.`;
        await Notification.create({
            user_id: appointment.user_id,
            message: message,
            is_read: false,
        })
    }


    const finalAppointment = await Booking.findById(updated._id)
        .populate('user_id', 'full_name email phone')
        .populate('product_id', 'product_name price images');

    const appObj = finalAppointment.toObject();
    if (appObj.product_id) {
        appObj.product_id.name = appObj.product_id.product_name || 'Unknown Car';
        if (Array.isArray(appObj.product_id.images) && appObj.product_id.images.length > 0) {
            appObj.product_id.image = appObj.product_id.images[0];
        } else {
            appObj.product_id.image = '';
        }
    }

    res.json({
        message: 'Cập nhật lịch lái thử thành công',
        appointment: appObj,
    })
})
