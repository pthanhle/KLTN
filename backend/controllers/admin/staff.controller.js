import User from '../../models/userModel.js'
import Employee from '../../models/employeeModel.js'
import Staff from '../../models/staffModel.js'
import asyncHandler from 'express-async-handler'
import Role from '../../models/roleModel.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import emailQueue from '../../queues/emailQueue.js'
import { resetPasswordEmail } from '../../utils/emailTemplates.js'


export const getStaff = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id)

    if (!staffRoles.length) {
        res.status(404)
        throw new Error('Chưa có role nhân viên (inventory, service, sale, advisor) nào trong hệ thống')
    }

    const query = {
        role_id: { $in: staffRoleIds },
        $or: [
            { full_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
        ],
    }

    const total = await User.countDocuments(query)
    const users = await User.find(query)
        .select('-password')
        .populate('role_id', 'role_name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })

    const staff = await Promise.all(
        users.map(async (user) => {
            const emp = await Employee.findOne({ user_id: user._id })
            const staffDoc = await Staff.findOne({ user_id: user._id })
            return {
                ...user.toObject(),
                position: emp ? emp.position : (staffDoc ? staffDoc.roleName : null),
                salary: emp ? parseFloat(emp.salary) : (staffDoc ? staffDoc.baseSalary : null),
                hired_date: emp ? emp.hired_date : (staffDoc ? staffDoc.createdAt : null),
                employeeId: staffDoc ? staffDoc.employeeId : null,
            }
        })
    )

    res.json({
        staff,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getStaffById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password')
        .populate('role_id', 'role_name')

    if (!user) {
        res.status(404)
        throw new Error('Nhân viên không tồn tại')
    }

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id.toString())

    if (!staffRoleIds.includes(user.role_id._id.toString())) {
        res.status(400)
        throw new Error('Người dùng này không phải là nhân viên')
    }

    const emp = await Employee.findOne({ user_id: user._id })
    const staff = {
        ...user.toObject(),
        position: emp ? emp.position : null,
        salary: emp ? parseFloat(emp.salary) : null,
        hired_date: emp ? emp.hired_date : null,
    }

    res.json(staff)
})


export const createStaff = asyncHandler(async (req, res) => {
    const { email, phone, full_name, role_name, salary, department } = req.body

    if (!email || !phone || !full_name || !role_name) {
        res.status(400)
        throw new Error('Vui lòng nhập đầy đủ email, số điện thoại, họ tên và vai trò')
    }

    const exists = await User.findOne({ $or: [{ email }, { phone }] })
    if (exists) {
        res.status(400)
        throw new Error('Email hoặc số điện thoại đã được sử dụng')
    }

    const targetRole = await Role.findOne({ role_name: role_name })
    if (!targetRole) {
        res.status(404)
        throw new Error(`Vai trò ${role_name} không tồn tại trong hệ thống`)
    }

    // Tự sinh username từ email
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000)
    const randomPassword = crypto.randomBytes(8).toString('hex')

    const user = await User.create({
        username,
        password: randomPassword,
        email,
        phone,
        full_name,
        zalo_url: req.body.zalo_url || `https://zalo.me/${phone}`,
        role_id: targetRole._id,
        status: 'active',
        isEmailVerified: true
    })

    const employeeIdStr = `EMP-${Math.floor(100 + Math.random() * 900)}`

    // Duy trì tương thích với Employee cũ nếu cần, và tạo Staff mới cho app Mobile
    const employee = await Employee.create({
        user_id: user._id,
        position: role_name,
        salary: salary ? parseFloat(salary) : 0,
        hired_date: new Date(),
    })

    const staffDoc = await Staff.create({
        user_id: user._id,
        employeeId: employeeIdStr,
        department: department || 'General',
        baseSalary: salary ? parseFloat(salary) : 0,
        status: 'ACTIVE',
        performance: {
            kpis: {},
            kanban: { todo: [], inProgress: [], done: [] }
        }
    })

    // Gửi email cấp tài khoản/Reset password
    const resetToken = jwt.sign(
        { userId: user._id, email: user.email, purpose: 'reset_password' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    user.passwordResetToken = resetToken
    user.passwordResetExpire = Date.now() + 24 * 60 * 60 * 1000
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

    try {
        const template = resetPasswordEmail(user.full_name, resetUrl)
        await emailQueue.add('sendEmail', {
            to: user.email,
            ...template,
        })
    } catch (error) {
        console.error('Không thể gửi email OTP/Reset:', error)
    }

    res.status(201).json({
        message: 'Tạo nhân viên thành công. Email thiết lập mật khẩu đã được gửi.',
        staff: {
            _id: user._id,
            employeeId: staffDoc.employeeId,
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            role_name: targetRole.role_name,
        },
    })
})


export const updateStaff = asyncHandler(async (req, res) => {
    const { full_name, email, phone, position, salary, hired_date, status } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('Nhân viên không tồn tại')
    }

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id.toString())

    if (!staffRoleIds.includes(user.role_id.toString())) {
        res.status(400)
        throw new Error('Không thể cập nhật: không phải nhân viên')
    }

    if (position && position !== (await Employee.findOne({ user_id: user._id }))?.position) {
        const newRole = await Role.findOne({ role_name: position })
        if (newRole) {
            user.role_id = newRole._id
        }
    }

    user.full_name = full_name || user.full_name
    user.email = email || user.email
    user.phone = phone || user.phone
    user.status = status || user.status
    user.zalo_url = req.body.zalo_url || user.zalo_url

    const updatedUser = await user.save()

    let updatedEmp = await Employee.findOne({ user_id: user._id })
    if (updatedEmp) {
        updatedEmp.position = position || updatedEmp.position
        updatedEmp.salary = salary ? parseFloat(salary) : updatedEmp.salary
        updatedEmp.hired_date = hired_date ? new Date(hired_date) : updatedEmp.hired_date
        await updatedEmp.save()
    }

    res.json({
        message: 'Cập nhật nhân viên thành công',
        staff: {
            _id: updatedUser._id,
            username: updatedUser.username,
            full_name: updatedUser.full_name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            position: updatedEmp ? updatedEmp.position : null,
            salary: updatedEmp ? parseFloat(updatedEmp.salary) : null,
            hired_date: updatedEmp ? updatedEmp.hired_date : null,
            status: updatedUser.status,
        },
    })
})


export const deleteStaff = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('Nhân viên không tồn tại')
    }

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id.toString())

    if (!staffRoleIds.includes(user.role_id.toString())) {
        res.status(400)
        throw new Error('Không thể xóa: không phải nhân viên')
    }

    user.status = 'suspended'
    await user.save()

    res.json({ message: 'Đã vô hiệu hóa nhân viên' })
})