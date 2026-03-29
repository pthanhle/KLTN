// backend/controllers/staff/service/serviceBay.controller.js
import ServiceBay from '../../../models/serviceBayModel.js'
import Booking from '../../../models/bookingModel.js'
import RepairProgress from '../../../models/repairProgressModel.js'
import asyncHandler from 'express-async-handler'


export const getServiceBays = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status || ''

    const query = {}
    if (status) query.status = status

    const total = await ServiceBay.countDocuments(query)
    const serviceBays = await ServiceBay.find(query)
        .populate({
            path: 'current_booking',
            populate: [
                { path: 'user_id', select: 'full_name email phone' },
                { path: 'service_id', select: 'service_name price duration' },
            ],
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ bay_number: 1 })

    res.json({
        serviceBays,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getServiceBayById = asyncHandler(async (req, res) => {
    const serviceBay = await ServiceBay.findById(req.params.id).populate({
        path: 'current_booking',
        populate: [
            { path: 'user_id', select: 'full_name email phone' },
            { path: 'service_id', select: 'service_name price duration' },
        ],
    })

    if (!serviceBay) {
        res.status(404)
        throw new Error('Khu vực dịch vụ không tồn tại')
    }

    res.json(serviceBay)
})


export const createServiceBay = asyncHandler(async (req, res) => {
    const { bay_number, status, notes } = req.body

    if (!bay_number) {
        res.status(400)
        throw new Error('Vui lòng cung cấp số hiệu khu vực')
    }

    const existing = await ServiceBay.findOne({ bay_number })
    if (existing) {
        res.status(400)
        throw new Error('Khu vực dịch vụ với số hiệu này đã tồn tại')
    }

    if (status && !['available', 'occupied', 'maintenance'].includes(status)) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    const serviceBay = await ServiceBay.create({
        bay_number,
        status: status || 'available',
        notes: notes || '',
    })

    res.status(201).json({
        message: 'Tạo khu vực dịch vụ thành công',
        serviceBay,
    })
})


export const updateServiceBay = asyncHandler(async (req, res) => {
    const { status, current_booking, last_maintenance, notes } = req.body

    const serviceBay = await ServiceBay.findById(req.params.id)
    if (!serviceBay) {
        res.status(404)
        throw new Error('Khu vực dịch vụ không tồn tại')
    }

    if (status && !['available', 'occupied', 'maintenance'].includes(status)) {
        res.status(400)
        throw new Error('Trạng thái không hợp lệ')
    }

    if (current_booking) {
        const booking = await Booking.findById(current_booking)
        if (!booking) {
            res.status(404)
            throw new Error('Lịch hẹn không tồn tại')
        }

        if (booking.status !== 'confirmed') {
            res.status(400)
            throw new Error(`Không thể đưa xe vào khoang. Lịch hẹn đang là: ${booking.status} (Yêu cầu: confirmed)`)
        }

        const existingBay = await ServiceBay.findOne({
            current_booking: current_booking,
            _id: { $ne: req.params.id },
        })
        if (existingBay) {
            res.status(400)
            throw new Error(`Lịch hẹn này đã được gán cho khu vực ${existingBay.bay_number}`)
        }

        if (status !== 'occupied') {
            res.status(400)
            throw new Error('Khi gán lịch hẹn, trạng thái khoang phải là occupied')
        }
    }

    if (current_booking === null && status === 'occupied') {
        res.status(400)
        throw new Error('Không thể set occupied khi không có lịch hẹn')
    }

    serviceBay.status = status || serviceBay.status
    serviceBay.current_booking = current_booking !== undefined ? current_booking : serviceBay.current_booking
    if (last_maintenance) serviceBay.last_maintenance = new Date(last_maintenance)
    if (notes !== undefined) serviceBay.notes = notes

    const updatedBay = await serviceBay.save()

    if (status === 'occupied' && current_booking) {
        await Booking.findByIdAndUpdate(current_booking, { status: 'in_progress' });

        const existingProgress = await RepairProgress.findOne({ booking_id: current_booking });
        if (!existingProgress) {
            await RepairProgress.create({
                booking_id: current_booking,
                staff_id: req.user._id,
                status: 'in_progress',
                notes: `Xe được đưa vào khoang ${serviceBay.bay_number}`
            });
        }
    }

    res.json({
        message: 'Cập nhật khu vực dịch vụ thành công',
        serviceBay: await ServiceBay.findById(updatedBay._id).populate({
            path: 'current_booking',
            populate: [
                { path: 'user_id', select: 'full_name email phone' },
                { path: 'service_id', select: 'service_name price duration' },
            ],
        }),
    })
})


export const deleteServiceBay = asyncHandler(async (req, res) => {
    const serviceBay = await ServiceBay.findById(req.params.id)
    if (!serviceBay) {
        res.status(404)
        throw new Error('Khu vực dịch vụ không tồn tại')
    }

    if (serviceBay.status === 'occupied') {
        res.status(400)
        throw new Error('Không thể xóa khu vực đang được sử dụng')
    }

    await serviceBay.deleteOne()

    res.json({ message: 'Xóa khu vực dịch vụ thành công' })
})