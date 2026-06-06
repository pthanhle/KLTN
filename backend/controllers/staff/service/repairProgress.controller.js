import RepairProgress from '../../../models/repairprogressModel.js'
import Booking from '../../../models/bookingModel.js'
import ServiceBay from '../../../models/serviceBayModel.js'
import User from '../../../models/userModel.js'
import ServiceItem from '../../../models/serviceItemModel.js'
import Notification from '../../../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'


export const getRepairProgresses = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status || ''
    const search = req.query.search || ''

    const query = {}
    if (status) query.status = status
    if (search) {
        const bookings = await Booking.find({
            $or: [
                { user_id: { $in: await User.find({ full_name: { $regex: search, $options: 'i' } }).select('_id') } },
                { service_id: { $in: await ServiceItem.find({ serviceName: { $regex: search, $options: 'i' } }).select('_id') } },
            ],
            status: { $ne: 'cancelled' },
        }).select('_id')
        query.booking_id = { $in: bookings.map(b => b._id) }
    } else {
        const bookings = await Booking.find({ status: { $ne: 'cancelled' } }).select('_id')
        query.booking_id = { $in: bookings.map(b => b._id) }
    }

    if (req.user.role_id?.role_name === 'advisor') {
        query.advisor_id = req.user._id
    } else if (req.user.role_id?.role_name === 'service') {
        query.mechanic_id = req.user._id 
    }

    const total = await RepairProgress.countDocuments(query)
    const progresses = await RepairProgress.find(query)
        .populate({
            path: 'booking_id',
            populate: [
                { path: 'user_id', select: 'full_name email phone' }
            ],
        })
        .populate({
            path: 'advisor_id',
            select: 'full_name',
            match: { _id: { $exists: true } },
        })
        .populate({
            path: 'mechanic_id',
            select: 'full_name',
            match: { _id: { $exists: true } },
        })

    // Batch-resolve bay names (bay_id is stored as String → ObjectId of ServiceBay)
    const bayIds = [...new Set(progresses.map(p => p.bay_id).filter(Boolean))]
    let bayMap = {}
    if (bayIds.length > 0) {
        try {
            const bays = await ServiceBay.find({ _id: { $in: bayIds } }).select('bay_number')
            bays.forEach(b => { bayMap[b._id.toString()] = b.bay_number })
        } catch (_) {}
    }

    res.json({
        repairProgresses: progresses.map(p => {
            const obj = p.toObject()
            if (p.bay_id && bayMap[p.bay_id]) {
                obj.bay_name = `KHOANG ${bayMap[p.bay_id]}`
            }
            return obj
        }),
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getRepairProgressById = asyncHandler(async (req, res) => {
    const progress = await RepairProgress.findById(req.params.id)
        .populate({
            path: 'booking_id',
            populate: [
                { path: 'user_id', select: 'full_name email phone' },
                { path: 'service_id', select: 'service_name price duration' },
            ],
        })
        .populate('staff_id', 'full_name')

    if (!progress) {
        res.status(404)
        throw new Error('Tiến độ sửa chữa không tồn tại')
    }

    res.json(progress)
})


// @route   POST /api/staff/service/repair-progress
// @access  Private/Service Staff
export const createRepairProgress = asyncHandler(async (req, res) => {
    const { booking_id, status, notes, estimated_completion } = req.body

    if (!booking_id || !status) {
        res.status(400)
        throw new Error('Vui lòng cung cấp booking_id và trạng thái')
    }

    const booking = await Booking.findById(booking_id)
    if (!booking) {
        res.status(404)
        throw new Error('Lịch hẹn không tồn tại')
    }

    if (!['in_progress', 'waiting_parts', 'testing', 'completed'].includes(status)) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    const progress = await RepairProgress.create({
        booking_id,
        advisor_id: req.user._id,
        status,
        notes: notes || '',
        estimated_completion: estimated_completion ? new Date(estimated_completion) : null,
    })

    res.status(201).json({
        message: 'Tạo tiến độ sửa chữa thành công',
        repairProgress: await RepairProgress.findById(progress._id)
            .populate({
                path: 'booking_id',
                populate: [
                    { path: 'user_id', select: 'full_name email phone' },
                    { path: 'service_id', select: 'service_name price duration' },
                ],
            })
            .populate('advisor_id', 'full_name')
            .populate('mechanic_id', 'full_name'),
    })
})


export const updateRepairProgress = asyncHandler(async (req, res) => {
    const { status, notes, estimated_completion, free_bay } = req.body

    const progress = await RepairProgress.findById(req.params.id)
    if (!progress) {
        res.status(404)
        throw new Error('Tiến độ sửa chữa không tồn tại')
    }

    if (progress.advisor_id?.toString() !== req.user._id.toString() && progress.mechanic_id?.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền cập nhật tiến độ này')
    }

    if (progress.status === 'completed') {
        res.status(400)
        throw new Error('Tiến độ sửa chữa đã hoàn thành. Không thể cập nhật lại.')
    }

    if (status && !['in_progress', 'waiting_parts', 'testing', 'completed'].includes(status)) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    progress.status = status || progress.status
    progress.notes = notes !== undefined ? notes : progress.notes
    progress.estimated_completion = estimated_completion ? new Date(estimated_completion) : progress.estimated_completion

    if (status === 'completed') {
        await Booking.findByIdAndUpdate(progress.booking_id, { status: 'completed' });

        if (free_bay === true) {
            const bay = await ServiceBay.findOne({ current_booking: progress.booking_id });

            if (bay) {
                bay.status = 'available';
                bay.current_booking = null;
                await bay.save();
            }
        }
    }

    const updated = await progress.save()

    try {
        const booking = await Booking.findById(progress.booking_id);
        if (booking) {
            let message = '';
            const statusLabels = {
                'in_progress': 'đang được thực hiện',
                'waiting_parts': 'đang chờ linh kiện',
                'testing': 'đang được kiểm tra',
                'completed': 'đã hoàn thành'
            };

            const statusText = statusLabels[status] || 'đang được cập nhật';

            if (status && status !== 'completed') {
                message = `Tiến độ sửa chữa xe của bạn: ${statusText}.`;
            } else if (status === 'completed') {
                message = `Dịch vụ sửa chữa xe của bạn đã hoàn thành.`;
            }

            if (status !== 'completed' && estimated_completion) {
                const dateStr = new Date(estimated_completion).toLocaleString('vi-VN');
                message += ` Dự kiến hoàn thành vào: ${dateStr}.`;
            }

            if (message) {
                await Notification.create({
                    user_id: booking.user_id,
                    title: 'Cập nhật tiến độ dịch vụ',
                    message: message,
                    type: 'MAINTENANCE',
                    reference_id: booking.booking_code,
                    reference_link: `/profile/services/${booking.booking_code}`,
                    is_read: false,
                });
            }
        }
    } catch (notifError) {
        console.error('Failed to send notification:', notifError);
    }

    res.json({
        message: 'Cập nhật tiến độ sửa chữa thành công',
        repairProgress: await RepairProgress.findById(updated._id)
            .populate({
                path: 'booking_id',
                populate: [
                    { path: 'user_id', select: 'full_name email phone' },
                    { path: 'service_id', select: 'service_name price duration' },
                ],
            })
            .populate('advisor_id', 'full_name')
            .populate('mechanic_id', 'full_name'),
    })
})


export const deleteRepairProgress = asyncHandler(async (req, res) => {
    const progress = await RepairProgress.findById(req.params.id)
    if (!progress) {
        res.status(404)
        throw new Error('Tiến độ sửa chữa không tồn tại')
    }

    if (progress.advisor_id?.toString() !== req.user._id.toString() && progress.mechanic_id?.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền xóa tiến độ này')
    }

    await progress.deleteOne()

    res.json({ message: 'Xóa tiến độ sửa chữa thành công' })
})