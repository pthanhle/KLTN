import OldVehicle from '../../models/oldvehicleModel.js'
import User from '../../models/userModel.js'
import Employee from '../../models/employeeModel.js'
import asyncHandler from 'express-async-handler'


export const getTradeinVehicles = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const status = req.query.status || '' // Lọc theo status

    const query = {
        $or: [
            { vehicle_info: { $regex: search, $options: 'i' } },
        ],
    }
    if (status) {
        query.status = status
    }

    const total = await OldVehicle.countDocuments(query)
    const vehicles = await OldVehicle.find(query)
        .populate('user_id', 'full_name email phone')
        .populate('employee_id', 'user_id position')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })

    res.json({
        tradeinVehicles: vehicles.map(v => ({
            ...v.toObject(),
            price_offered: v.price_offered ? parseFloat(v.price_offered) : null,
        })),
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getTradeinVehicleById = asyncHandler(async (req, res) => {
    const vehicle = await OldVehicle.findById(req.params.id)
        .populate('user_id', 'full_name email phone')
        .populate('employee_id', 'user_id position')

    if (!vehicle) {
        res.status(404)
        throw new Error('Xe trade-in không tồn tại')
    }

    res.json({
        ...vehicle.toObject(),
        price_offered: vehicle.price_offered ? parseFloat(vehicle.price_offered) : null,
    })
})


export const createTradeinVehicle = asyncHandler(async (req, res) => {
    const { user_id, vehicle_info, price_offered, employee_id, status } = req.body


    if (!user_id || !vehicle_info) {
        res.status(400)
        throw new Error('Vui lòng nhập user_id và thông tin xe')
    }

    const user = await User.findById(user_id)
    if (!user) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    let employee = null
    if (employee_id) {
        employee = await Employee.findById(employee_id)
        if (!employee) {
            res.status(404)
            throw new Error('Nhân viên không tồn tại')
        }
    }

    const vehicle = await OldVehicle.create({
        user_id,
        vehicle_info,
        price_offered: price_offered ? parseFloat(price_offered) : null,
        employee_id: employee_id || null,
        status: status || 'pending',
    })

    res.status(201).json({
        message: 'Tạo yêu cầu trade-in thành công',
        tradeinVehicle: {
            ...vehicle.toObject(),
            price_offered: vehicle.price_offered ? parseFloat(vehicle.price_offered) : null,
        },
    })
})


export const updateTradeinVehicle = asyncHandler(async (req, res) => {
    const { vehicle_info, price_offered, employee_id, status } = req.body

    const vehicle = await OldVehicle.findById(req.params.id)
    if (!vehicle) {
        res.status(404)
        throw new Error('Xe trade-in không tồn tại')
    }


    if (employee_id) {
        const employee = await Employee.findById(employee_id)
        if (!employee) {
            res.status(404)
            throw new Error('Nhân viên không tồn tại')
        }
        vehicle.employee_id = employee_id
    }

    vehicle.vehicle_info = vehicle_info || vehicle.vehicle_info
    vehicle.price_offered = price_offered ? parseFloat(price_offered) : vehicle.price_offered
    vehicle.status = status || vehicle.status

    const updated = await vehicle.save()

    res.json({
        message: 'Cập nhật yêu cầu trade-in thành công',
        tradeinVehicle: {
            ...updated.toObject(),
            price_offered: updated.price_offered ? parseFloat(updated.price_offered) : null,
        },
    })
})


export const deleteTradeinVehicle = asyncHandler(async (req, res) => {
    const vehicle = await OldVehicle.findById(req.params.id)
    if (!vehicle) {
        res.status(404)
        throw new Error('Xe trade-in không tồn tại')
    }

    await vehicle.deleteOne()
    res.json({ message: 'Xóa yêu cầu trade-in thành công' })
})