import User from '../../models/userModel.js'
import Employee from '../../models/employeeModel.js'
import Staff from '../../models/staffModel.js'
import RepairProgress from '../../models/repairprogressModel.js'
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
    const filterRole = req.query.role || ''
    const filterStatus = req.query.status || ''
    const filterDepartment = req.query.department || ''

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id)

    if (!staffRoles.length) {
        res.status(404)
        throw new Error('Chưa có role nhân viên nào trong hệ thống')
    }

    let roleFilter = { $in: staffRoleIds }
    if (filterRole && filterRole !== 'ALL') {
        const specificRole = staffRoles.find(r => r.role_name === filterRole)
        if (specificRole) roleFilter = specificRole._id
    }

    // Build staff sub-query filters (employeeId search + department filter)
    const staffSubQuery = {}
    if (search) {
        staffSubQuery.employeeId = { $regex: search, $options: 'i' }
    }
    if (filterDepartment && filterDepartment !== 'ALL') {
        staffSubQuery.department = filterDepartment
    }

    let restrictedUserIds = null
    if (Object.keys(staffSubQuery).length > 0) {
        const matchingStaff = await Staff.find(staffSubQuery).select('user_id')
        const matchedIds = matchingStaff.map(s => s.user_id)

        if (filterDepartment && filterDepartment !== 'ALL') {
            // Department filter is exclusive — only show users in that dept
            restrictedUserIds = matchedIds
        } else if (search) {
            // For search, merge employee-id matches with text matches below
            restrictedUserIds = { employeeIdMatches: matchedIds }
        }
    }

    const orConditions = search
        ? [
            { full_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
          ]
        : [{}]

    if (restrictedUserIds?.employeeIdMatches?.length) {
        orConditions.push({ _id: { $in: restrictedUserIds.employeeIdMatches } })
    }

    const query = {
        role_id: roleFilter,
        $or: orConditions,
    }

    if (filterStatus && filterStatus !== 'ALL') {
        query.status = filterStatus.toLowerCase()
    }

    if (Array.isArray(restrictedUserIds)) {
        query._id = { $in: restrictedUserIds }
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
                _id: user._id,
                fullName: user.full_name,
                email: user.email,
                phone: user.phone,
                avatarUrl: user.avatar || null,
                role: user.role_id?.role_name || null,
                department: staffDoc?.department || (emp ? emp.position : null),
                status: user.status.toUpperCase(),
                employeeId: staffDoc?.employeeId || null,
                baseSalary: staffDoc?.baseSalary ?? (emp ? parseFloat(emp.salary) : 0),
                kpiType: staffDoc?.kpiType || 'SALARY_ONLY',
                kpiValue: staffDoc?.kpiValue || 0,
                isOvertimeEligible: staffDoc?.isOvertimeEligible || false,
                accessLevel: staffDoc?.accessLevel || 'STANDARD_USER',
                joinDate: emp?.hired_date || staffDoc?.createdAt || user.createdAt,
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
    const staffDoc = await Staff.findOne({ user_id: user._id })

    // Build performance from real RepairProgress records
    const repairOrders = await RepairProgress.find({
        $or: [{ advisor_id: user._id }, { mechanic_id: user._id }]
    })
        .populate('booking_id', 'customer_info vehicle_info booking_code')
        .sort({ createdAt: -1 })
        .limit(100)

    const mapToTask = (order) => {
        const booking = order.booking_id
        return {
            id: booking?.booking_code || order._id.toString().slice(-6),
            title: `${booking?.vehicle_info?.brand || ''} ${booking?.vehicle_info?.model || ''}`.trim() || 'Sửa chữa',
            priority: 'MEDIUM',
            customerName: booking?.customer_info?.full_name || 'N/A',
            licensePlate: booking?.vehicle_info?.license_plate || 'N/A',
            customerPhone: booking?.customer_info?.contact_phone || 'N/A',
            vehicleModel: `${booking?.vehicle_info?.brand || ''} ${booking?.vehicle_info?.model || ''}`.trim() || 'N/A',
            appointmentTime: order.expected_start_datetime
                ? new Date(order.expected_start_datetime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                : 'N/A',
            description: order.notes || '',
            status: order.status,
        }
    }

    const todoStatuses = ['RECEIVED', 'DIAGNOSING', 'QUOTING']
    const inProgressStatuses = ['IN_PROGRESS', 'QC_TESTING']
    const doneStatuses = ['COMPLETED']

    const todo = repairOrders.filter(o => todoStatuses.includes(o.status)).map(mapToTask)
    const inProgress = repairOrders.filter(o => inProgressStatuses.includes(o.status)).map(mapToTask)
    const done = repairOrders.filter(o => doneStatuses.includes(o.status)).map(mapToTask)

    const totalRepairs = repairOrders.length
    const completedRepairs = done.length
    const completionRate = totalRepairs > 0 ? Math.round((completedRepairs / totalRepairs) * 100) : 0

    res.json({
        _id: user._id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatar || null,
        role: user.role_id?.role_name || null,
        status: user.status.toUpperCase(),
        // From Staff doc
        employeeId: staffDoc?.employeeId || null,
        department: staffDoc?.department || (emp ? emp.position : null),
        baseSalary: staffDoc?.baseSalary ?? (emp ? parseFloat(emp.salary) : 0),
        kpiType: staffDoc?.kpiType || 'SALARY_ONLY',
        kpiValue: staffDoc?.kpiValue || 0,
        isOvertimeEligible: staffDoc?.isOvertimeEligible || false,
        accessLevel: staffDoc?.accessLevel || 'STANDARD_USER',
        lastSetPassword: staffDoc?.lastSetPassword || null,
        // From Employee doc
        joinDate: emp?.hired_date || staffDoc?.createdAt || user.createdAt,
        lastLogin: user.updatedAt || null,
        // Real performance from RepairProgress
        performance: {
            completionRate,
            totalRepairs,
            completedRepairs,
            kanban: { todo, inProgress, done },
        },
    })
})


export const createStaff = asyncHandler(async (req, res) => {
    const { email, phone, full_name, role_name, salary } = req.body

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
        throw new Error(`Vai trò "${role_name}" không tồn tại trong hệ thống`)
    }

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

    await Employee.create({
        user_id: user._id,
        position: role_name,
        salary: salary ? parseFloat(salary) : 0,
        hired_date: new Date(),
    })

    const staffDoc = await Staff.create({
        user_id: user._id,
        employeeId: employeeIdStr,
        department: req.body.department || null,
        baseSalary: salary ? parseFloat(salary) : 0,
        status: 'ACTIVE',
        lastSetPassword: randomPassword,
        performance: {
            kpis: {},
            kanban: { todo: [], inProgress: [], done: [] }
        }
    })

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
        console.error('Không thể gửi email:', error)
    }

    res.status(201).json({
        message: 'Tạo nhân viên thành công. Email thiết lập mật khẩu đã được gửi.',
        staff: {
            _id: user._id,
            employeeId: staffDoc.employeeId,
            fullName: user.full_name,
            email: user.email,
            phone: user.phone,
            role: targetRole.role_name,
            initialPassword: randomPassword,
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

    if (position) {
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
            fullName: updatedUser.full_name,
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

    const staffDoc = await Staff.findOne({ user_id: user._id })
    if (staffDoc) {
        staffDoc.status = 'SUSPENDED'
        await staffDoc.save()
    }

    res.json({ message: 'Đã vô hiệu hóa nhân viên' })
})


export const getStaffDepartments = asyncHandler(async (req, res) => {
    const departments = await Staff.distinct('department')
    const filtered = departments.filter(d => d && d.trim())
    res.json({ departments: filtered })
})


export const updateStaffProfile = asyncHandler(async (req, res) => {
    const { full_name, phone, avatar } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('Nhân viên không tồn tại')
    }

    if (full_name) user.full_name = full_name
    if (phone) user.phone = phone
    if (avatar !== undefined) user.avatar = avatar

    await user.save()

    res.json({
        message: 'Cập nhật hồ sơ thành công',
        fullName: user.full_name,
        phone: user.phone,
        avatarUrl: user.avatar || null,
    })
})


export const getStaffCompliance = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) { res.status(404); throw new Error('Nhân viên không tồn tại') }

    const staffDoc = await Staff.findOne({ user_id: user._id })
    if (!staffDoc) { res.status(404); throw new Error('Không tìm thấy hồ sơ nhân viên') }

    res.json({
        identity: staffDoc.identity || {},
        financial: staffDoc.financial || {},
        emergency: staffDoc.emergency || {},
    })
})


export const updateStaffCompliance = asyncHandler(async (req, res) => {
    const { identity, financial, emergency } = req.body

    const user = await User.findById(req.params.id)
    if (!user) { res.status(404); throw new Error('Nhân viên không tồn tại') }

    const staffDoc = await Staff.findOne({ user_id: user._id })
    if (!staffDoc) { res.status(404); throw new Error('Không tìm thấy hồ sơ nhân viên') }

    if (identity !== undefined) {
        staffDoc.identity = { ...(staffDoc.identity?.toObject?.() || {}), ...identity }
    }
    if (financial !== undefined) {
        staffDoc.financial = { ...(staffDoc.financial?.toObject?.() || {}), ...financial }
    }
    if (emergency !== undefined) {
        staffDoc.emergency = { ...(staffDoc.emergency?.toObject?.() || {}), ...emergency }
    }

    await staffDoc.save()

    res.json({
        message: 'Cập nhật thành công',
        identity: staffDoc.identity,
        financial: staffDoc.financial,
        emergency: staffDoc.emergency,
    })
})


export const resetStaffPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('Nhân viên không tồn tại')
    }

    const staffRoles = await Role.find({ role_name: { $in: ['inventory', 'service', 'sale', 'advisor'] } })
    const staffRoleIds = staffRoles.map(role => role._id.toString())

    if (!staffRoleIds.includes(user.role_id.toString())) {
        res.status(400)
        throw new Error('Người dùng này không phải là nhân viên')
    }

    const { newPassword: customPassword } = req.body
    if (customPassword !== undefined && customPassword.length < 6) {
        res.status(400)
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
    }

    const newPassword = customPassword || crypto.randomBytes(8).toString('hex')
    user.password = newPassword
    await user.save()

    const staffDoc = await Staff.findOne({ user_id: user._id })
    if (staffDoc) {
        staffDoc.lastSetPassword = newPassword
        await staffDoc.save()
    }

    res.json({
        message: 'Đặt lại mật khẩu thành công',
        newPassword,
    })
})
