import User from '../../models/userModel.js'
import Order from '../../models/orderModel.js'
import Booking from '../../models/bookingModel.js'
import Role from '../../models/roleModel.js'
import LoyaltyHistory from '../../models/loyaltyHistoryModel.js'
import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import emailQueue from '../../queues/emailQueue.js'
import { customerOtpCreationEmail, customerOtpResendEmail } from '../../utils/emailTemplates.js'
import { loyaltyService } from '../../services/loyalty.service.js'


export const getCustomerStats = asyncHandler(async (req, res) => {
    const customerRoleIds = await getCustomerRoleIds()
    const query = { role_id: { $in: customerRoleIds } }

    const totalCustomers = await User.countDocuments(query)

    const vipCustomers = await User.countDocuments({
        role_id: { $in: customerRoleIds },
        'loyalty.tier': { $in: ['GOLD', 'PLATINUM', 'DIAMOND', 'TITANIUM'] }
    })

    const startOfWeek = new Date()
    startOfWeek.setHours(0, 0, 0, 0)
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() || 7))

    const newThisWeek = await User.countDocuments({
        role_id: { $in: customerRoleIds },
        createdAt: { $gte: startOfWeek }
    })

    const debtStats = await User.aggregate([
        { $match: query },
        { $group: { _id: null, totalDebt: { $sum: "$debt" } } }
    ])
    const totalDebt = debtStats.length > 0 ? debtStats[0].totalDebt : 0

    res.json({
        totalCustomers,
        vipCustomers,
        totalDebt,
        newThisWeek
    })
})


export const getCustomers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const query = {
        role_id: { $in: await getCustomerRoleIds() },
        $or: [
            { full_name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
        ],
    }

    const total = await User.countDocuments(query)
    const customers = await User.find(query)
        .select('-password')
        .populate('role_id', 'role_name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })

    res.json({
        customers,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const getCustomerById = asyncHandler(async (req, res) => {
    const customer = await User.findById(req.params.id)
        .select('-password')
        .populate('role_id', 'role_name')

    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    const customerRoleIds = await getCustomerRoleIds()

    const roleIdStr = customer.role_id?._id?.toString() || customer.role_id?.toString();

    if (!roleIdStr || !customerRoleIds.includes(roleIdStr)) {
        res.status(400)
        throw new Error('Người dùng này không phải là khách hàng hoặc không có vai trò hợp lệ')
    }

    const orderCount = await Order.countDocuments({ user_id: customer._id })
    const bookingCount = await Booking.countDocuments({ user_id: customer._id })

    res.json({
        ...customer.toObject(),
        orderCount,
        bookingCount,
    })
})


export const updateCustomer = asyncHandler(async (req, res) => {
    const {
        full_name, email, phone, address, status,
        addresses, garage, customer_type, tax_info,
        loyalty, debt, source, admin_notes, last_visit_date
    } = req.body

    const customer = await User.findById(req.params.id)
    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    const customerRoleIds = await getCustomerRoleIds()
    if (!customerRoleIds.includes(customer.role_id.toString())) {
        res.status(400)
        throw new Error('Không thể cập nhật: không phải khách hàng')
    }

    if (full_name !== undefined) customer.full_name = full_name
    if (email !== undefined) customer.email = email
    if (phone !== undefined) customer.phone = phone
    if (address !== undefined) customer.address = address
    if (status !== undefined) customer.status = status

    if (addresses !== undefined) customer.addresses = addresses
    if (garage !== undefined) customer.garage = garage
    if (customer_type !== undefined) customer.customer_type = customer_type
    if (tax_info !== undefined) customer.tax_info = tax_info

    if (loyalty !== undefined) {
        if (loyalty.points !== undefined) customer.loyalty.points = loyalty.points
        if (loyalty.tier !== undefined) customer.loyalty.tier = loyalty.tier
        if (loyalty.total_spent !== undefined) customer.loyalty.total_spent = loyalty.total_spent
        if (loyalty.active_vouchers !== undefined) customer.loyalty.active_vouchers = loyalty.active_vouchers
    }

    if (debt !== undefined) customer.debt = debt
    if (source !== undefined) customer.source = source
    if (admin_notes !== undefined) customer.admin_notes = admin_notes
    if (last_visit_date !== undefined) customer.last_visit_date = last_visit_date

    if (req.file) {
        customer.avatar = req.file.path
    }

    const updated = await customer.save()
    res.json({
        message: 'Cập nhật khách hàng thành công',
        customer: updated,
    })
})


export const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await User.findById(req.params.id)
    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    const customerRoleIds = await getCustomerRoleIds()
    if (!customerRoleIds.includes(customer.role_id.toString())) {
        res.status(400)
        throw new Error('Không thể xóa: không phải khách hàng')
    }

    const activeOrder = await Order.findOne({
        user_id: customer._id,
        order_status: { $in: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED'] }
    })
    if (activeOrder) {
        res.status(400)
        throw new Error('Không thể khóa: Khách hàng đang có đơn hàng chưa hoàn thành')
    }

    const activeBooking = await Booking.findOne({
        user_id: customer._id,
        status: { $in: ['pending', 'confirmed', 'in_progress'] }
    })
    if (activeBooking) {
        res.status(400)
        throw new Error('Không thể khóa: Khách hàng đang có lịch hẹn/dịch vụ chưa hoàn thành')
    }

    customer.status = 'suspended'
    await customer.save()

    res.json({ message: 'Đã vô hiệu hóa khách hàng' })
})


const assertIsCustomer = async (id) => {
    const customer = await User.findById(id)
    if (!customer) {
        const err = new Error('Khách hàng không tồn tại')
        err.statusCode = 404
        throw err
    }
    const customerRoleIds = await getCustomerRoleIds()
    if (!customerRoleIds.includes(customer.role_id.toString())) {
        const err = new Error('Người dùng này không phải là khách hàng')
        err.statusCode = 400
        throw err
    }
    return customer
}

export const getOrdersByCustomer = asyncHandler(async (req, res) => {
    const customerId = req.params.id
    await assertIsCustomer(customerId)

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const total = await Order.countDocuments({ user_id: customerId })
    const orders = await Order.find({ user_id: customerId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

    res.json({
        orders,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
})


export const getBookingsByCustomer = asyncHandler(async (req, res) => {
    const customerId = req.params.id
    await assertIsCustomer(customerId)

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status || ''

    const query = { user_id: customerId }
    if (status) query.status = status

    const total = await Booking.countDocuments(query)
    const bookings = await Booking.find(query)
        .populate('service_id', 'service_name price duration description')
        .populate('product_id', 'product_name price type description')
        .sort({ booking_date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)

    const books = bookings.map(b => {
        const bookingObj = b.toObject()
        const snapshotPrice = bookingObj.price
        if (snapshotPrice !== undefined && snapshotPrice !== null) {
            if (bookingObj.service_id) bookingObj.service_id.price = snapshotPrice
            if (bookingObj.product_id) bookingObj.product_id.price = snapshotPrice
        }
        return bookingObj
    })

    res.json({
        bookings: books,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})


export const createCustomer = asyncHandler(async (req, res) => {
    const { full_name, email, phone, username, address, source, tier, admin_notes } = req.body
    let avatar = typeof req.body.avatar === 'string' ? req.body.avatar : undefined

    if (req.file) {
        avatar = req.file.path
    }

    if (!email || !full_name || !phone) {
        res.status(400)
        throw new Error('Vui lòng điền đầy đủ thông tin (Họ tên, Email, Số điện thoại)')
    }

    const emailExists = await User.findOne({ email })
    if (emailExists) {
        if (emailExists.status === 'inactive' && !emailExists.isEmailVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

            emailExists.emailOTP = otpHash
            emailExists.emailOTPExpire = Date.now() + 10 * 60 * 1000
            await emailExists.save()

            const resendTemplate = customerOtpResendEmail(otp)
            await emailQueue.add('sendEmail', {
                to: emailExists.email,
                ...resendTemplate,
            })

            return res.status(200).json({
                message: 'Mã OTP mới đã được gửi đến email.',
                email: emailExists.email,
            })
        }
        res.status(400)
        throw new Error('Email đã tồn tại và đã được kích hoạt')
    }

    const finalUsername = username || email.split('@')[0] + Math.floor(Math.random() * 1000)
    const usernameExists = await User.findOne({ username: finalUsername })
    if (usernameExists) {
        res.status(400)
        throw new Error('Username đã tồn tại, vui lòng chọn username khác')
    }

    let customerRole = await Role.findOne({ role_name: { $in: ['Customer', 'customer'] } })
    if (!customerRole) {
        customerRole = await Role.create({ role_name: 'Customer' })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const tempPassword = crypto.randomBytes(8).toString('hex')

    const customer = await User.create({
        full_name,
        email,
        phone,
        username: finalUsername,
        password: tempPassword,
        address,
        avatar,
        role_id: customerRole._id,
        status: 'inactive',
        isEmailVerified: false,
        emailOTP: otpHash,
        emailOTPExpire: Date.now() + 10 * 60 * 1000,
        source,
        admin_notes,
        loyalty: {
            tier: tier || 'BRONZE',
            accumulated_points: loyaltyService.getMinPoints(tier || 'BRONZE'),
            points: loyaltyService.getMinPoints(tier || 'BRONZE')
        }
    })

    try {
        const creationTemplate = customerOtpCreationEmail(customer.full_name, otp, tempPassword)
        await emailQueue.add('sendEmail', {
            to: customer.email,
            ...creationTemplate,
        })
    } catch (error) {
        console.error('Error queuing customer welcome email:', error.message)
    }

    res.status(201).json({
        message: 'Đã tạo hồ sơ khách hàng. Vui lòng xác thực OTP gửi đến email.',
        email: customer.email,
        tempPassword: tempPassword
    })
})

export const verifyCustomerOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        res.status(400)
        throw new Error('Thiếu email hoặc OTP')
    }

    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

    const customer = await User.findOne({
        email,
        emailOTP: otpHash,
        emailOTPExpire: { $gt: Date.now() },
    })

    if (!customer) {
        res.status(400)
        throw new Error('OTP không hợp lệ hoặc đã hết hạn')
    }

    customer.isEmailVerified = true
    customer.status = 'active'
    customer.emailOTP = undefined
    customer.emailOTPExpire = undefined
    await customer.save()

    res.json({
        message: 'Xác thực khách hàng thành công',
        customer: {
            _id: customer._id,
            full_name: customer.full_name,
            email: customer.email,
            status: customer.status
        }
    })
})

const getCustomerRoleIds = async () => {
    const customerRoles = await Role.find({ role_name: { $in: ['customer', 'Customer'] } })
    return customerRoles.map(r => r._id.toString())
}

export const toggleLockStatus = asyncHandler(async (req, res) => {
    const { status } = req.body
    const customer = await User.findById(req.params.id)
    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }
    customer.status = status
    await customer.save()
    res.json({ message: 'Cập nhật trạng thái thành công', status: customer.status })
})

export const upgradeTier = asyncHandler(async (req, res) => {
    const { tier } = req.body
    const customer = await User.findById(req.params.id)
    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }
    const minPointsNeeded = loyaltyService.getMinPoints(tier)
    if (customer.loyalty.accumulated_points < minPointsNeeded) {
        const pointsToAdd = minPointsNeeded - customer.loyalty.accumulated_points
        customer.loyalty.accumulated_points = minPointsNeeded
        customer.loyalty.points += pointsToAdd
    }

    customer.loyalty.tier = tier
    await customer.save()
    res.json({ message: 'Nâng hạng thành công', loyalty: customer.loyalty })
})

export const addLoyaltyPoints = asyncHandler(async (req, res) => {
    const { points, reason } = req.body
    const customer = await User.findById(req.params.id)
    if (!customer) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    if (!points || points <= 0) {
        res.status(400)
        throw new Error('Số điểm phải lớn hơn 0')
    }

    customer.loyalty.points += parseInt(points)
    customer.loyalty.accumulated_points += parseInt(points)

    const newTier = loyaltyService.checkAndUpgradeTier(customer.loyalty.accumulated_points);
    if (newTier !== customer.loyalty.tier) {
        customer.loyalty.tier = newTier;
    }

    await customer.save()

    const history = await LoyaltyHistory.create({
        user: customer._id,
        points_change: parseInt(points),
        transaction_type: 'GIFT',
        description: reason || 'Admin tặng điểm',
        reference_model: 'Admin'
    })

    res.json({ message: 'Tặng điểm thành công', loyalty: customer.loyalty, history })
})
