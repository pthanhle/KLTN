import Order from '../../models/orderModel.js'
import Product from '../../models/productModel.js'
import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'



export const getOrders = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const order_status = req.query.order_status || ''
    const payment_status = req.query.payment_status || ''
    const order_type = req.query.order_type || ''

    const query = {}
    if (order_status) query.order_status = order_status
    if (payment_status) query.payment_status = payment_status
    if (order_type) query.order_type = order_type

    if (search) {
        const users = await User.find({
            $or: [
                { full_name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        }).select('_id')
        const userIds = users.map(u => u._id)
        query.$or = [
            { user_id: { $in: userIds } },
            { order_code: { $regex: search, $options: 'i' } },
        ]
    }

    const total = await Order.countDocuments(query)
    const orders = await Order.find(query)
        .populate('user_id', 'full_name email phone')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

    res.json({
        orders,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    })
})



export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user_id', 'full_name email phone address')
        .lean()

    if (!order) {
        res.status(404)
        throw new Error('Đơn hàng không tồn tại')
    }

    res.json(order)
})



export const createOrder = asyncHandler(async (req, res) => {
    const { user_id, items, payment_method, order_type, shipping_fee, discount_amount } = req.body

    if (!user_id || !items || !items.length || !payment_method) {
        res.status(400)
        throw new Error('Thiếu thông tin bắt buộc: user_id, items, payment_method')
    }

    const user = await User.findById(user_id)
    if (!user) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    const productIds = items.map(i => i.product_id)
    const dbProducts = await Product.find({ _id: { $in: productIds } }).lean()
    const productMap = Object.fromEntries(dbProducts.map(p => [p._id.toString(), p]))

    let subtotal = 0
    const orderItems = items.map(item => {
        const p = productMap[item.product_id]
        if (!p) throw Object.assign(new Error(`Sản phẩm ${item.product_id} không tồn tại`), { statusCode: 404 })
        if (p.stock < item.quantity) throw Object.assign(new Error(`Sản phẩm "${p.product_name}" không đủ tồn kho`), { statusCode: 400 })

        const unit_price = Number(item.price || p.price)
        const total_price = unit_price * item.quantity
        subtotal += total_price

        return {
            product_id: p._id,
            sku: p.sku,
            name: p.product_name,
            image: p.images?.[0] || '',
            quantity: item.quantity,
            unit_price,
            total_price,
        }
    })

    const fee = Number(shipping_fee || 0)
    const discount = Number(discount_amount || 0)
    const total_amount = subtotal + fee - discount

    const generateOrderCode = () => {
        const datePart = new Date().getFullYear()
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `ORD-${datePart}-${rand}`
    }

    const order = await Order.create({
        order_code: generateOrderCode(),
        user_id,
        customer_info: {
            full_name: user.full_name,
            phone: user.phone,
            address: user.address,
            email: user.email,
        },
        order_type: order_type || 'ACCESSORIES',
        items: orderItems,
        shipping_fee: fee,
        discount_amount: discount,
        total_amount,
        payment_method,
        payment_status: 'UNPAID',
        order_status: 'PENDING',
        order_date: new Date(),
    })

    await Promise.all(
        orderItems.map(item =>
            Product.findByIdAndUpdate(item.product_id, { $inc: { stock: -item.quantity } })
        )
    )

    res.status(201).json({ message: 'Tạo đơn hàng thành công', order })
})



export const updateOrder = asyncHandler(async (req, res) => {
    const { order_status, payment_status, tracking_info, invoice_url } = req.body

    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error('Đơn hàng không tồn tại')
    }

    const validOrderStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED']
    const validPaymentStatuses = ['UNPAID', 'PAID', 'REFUNDED', 'PARTIAL']

    if (order_status) {
        if (!validOrderStatuses.includes(order_status)) {
            res.status(400)
            throw new Error(`Trạng thái đơn hàng không hợp lệ. Hợp lệ: ${validOrderStatuses.join(', ')}`)
        }
        if (['COMPLETED', 'CANCELLED'].includes(order.order_status)) {
            res.status(400)
            throw new Error('Không thể cập nhật đơn hàng đã hoàn thành hoặc đã hủy')
        }

        if (order_status === 'CANCELLED' && order.order_status !== 'CANCELLED') {
            await Promise.all(
                order.items.map(item =>
                    Product.findByIdAndUpdate(item.product_id, { $inc: { stock: item.quantity } })
                )
            )
        }

        order.order_status = order_status
    }

    if (payment_status) {
        if (!validPaymentStatuses.includes(payment_status)) {
            res.status(400)
            throw new Error(`Trạng thái thanh toán không hợp lệ. Hợp lệ: ${validPaymentStatuses.join(', ')}`)
        }
        order.payment_status = payment_status

        if (payment_status === 'PAID' && order.order_status === 'PENDING') {
            order.order_status = 'CONFIRMED'
        }
    }

    if (tracking_info) order.tracking_info = tracking_info
    if (invoice_url) order.invoice_url = invoice_url

    const updated = await order.save()
    res.json({ message: 'Cập nhật đơn hàng thành công', order: updated })
})



export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error('Đơn hàng không tồn tại')
    }

    if (order.order_status !== 'CANCELLED') {
        res.status(400)
        throw new Error('Chỉ có thể xóa đơn hàng đã hủy')
    }

    await order.deleteOne()
    res.json({ message: 'Xóa đơn hàng thành công' })
})