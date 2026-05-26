import Order from '../../models/orderModel.js'
import Part from '../../models/partModel.js'
import User from '../../models/userModel.js'
import { loyaltyService } from '../../services/loyalty.service.js'
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
    if (payment_status) query['payment.status'] = payment_status
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

    const startDate = req.query.startDate
    const endDate = req.query.endDate
    if (startDate || endDate) {
        query.createdAt = {}
        if (startDate) query.createdAt.$gte = new Date(startDate)
        if (endDate) {
            const end = new Date(endDate)
            end.setHours(23, 59, 59, 999)
            query.createdAt.$lte = end
        }
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
    const { user_id, financials, payment, shipping, delivery, items, order_type, vat_info, cancel_reason } = req.body

    if (!user_id || !items || !items.length) {
        res.status(400)
        throw new Error('Thiếu thông tin bắt buộc: user_id, items')
    }

    if (!payment || !payment.method) {
        res.status(400)
        throw new Error('Vui lòng chọn phương thức thanh toán')
    }

    const user = await User.findById(user_id)
    if (!user) {
        res.status(404)
        throw new Error('Khách hàng không tồn tại')
    }

    const partIds = items.map(i => i.part_id)
    const dbParts = await Part.find({ _id: { $in: partIds } }).lean()
    const partMap = Object.fromEntries(dbParts.map(p => [p._id.toString(), p]))

    let computedSubtotal = 0
    const orderItems = items.map(item => {
        const p = partMap[item.part_id]
        if (!p) throw Object.assign(new Error(`Sản phẩm ${item.part_id} không tồn tại`), { statusCode: 404 })

        const currentStock = p.inventory?.available_stock || 0
        if (currentStock < item.quantity) throw Object.assign(new Error(`Sản phẩm "${p.name}" không đủ tồn kho`), { statusCode: 400 })

        const unit_price = Number(item.price || p.price)
        const total_price = unit_price * item.quantity
        computedSubtotal += total_price

        return {
            part_id: p._id,
            sku: p.sku,
            name: p.name,
            image: p.images?.[0] || '',
            properties: item.properties || p.description || '',
            quantity: item.quantity,
            original_price: item.original_price || p.original_price || null,
            unit_price,
            total_price,
            selected_options: item.selected_options || {},
            is_reviewed: false
        }
    })

    const generateOrderCode = () => {
        const datePart = new Date().getFullYear()
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
        return `ORD-${datePart}-${rand}`
    }

    const final_total = financials?.grand_total && typeof financials.grand_total === 'number'
        ? financials.grand_total
        : computedSubtotal

    const order = await Order.create({
        order_code: generateOrderCode(),
        user_id,
        order_type: order_type || 'ACCESSORIES',
        order_status: 'PENDING',
        cancel_reason: cancel_reason || null,
        financials: {
            subtotal: financials?.subtotal || computedSubtotal,
            shipping_fee: financials?.shipping_fee || 0,
            discount: financials?.discount || 0,
            vat: financials?.vat || 0,
            grand_total: final_total
        },
        payment: {
            method: payment.method,
            method_name: payment.method_name || '',
            card_tail: payment.card_tail || '',
            transaction_id: payment.transaction_id || '',
            status: payment.status || 'UNPAID'
        },
        shipping: {
            provider: shipping?.provider || '',
            tracking_code: shipping?.tracking_code || '',
            estimated_delivery: shipping?.estimated_delivery || ''
        },
        delivery: {
            receiver_name: delivery?.receiver_name || user.full_name,
            phone: delivery?.phone || user.phone,
            email: delivery?.email || user.email,
            masked_email: delivery?.masked_email || '',
            address: delivery?.address || user.address || '',
            note: delivery?.note || ''
        },
        vat_info: vat_info || null,
        items: orderItems,
        order_date: new Date(),
    })

    await Promise.all(
        orderItems.map(item =>
            Part.findByIdAndUpdate(item.part_id, { $inc: { 'inventory.allocated': item.quantity, 'inventory.available_stock': -item.quantity } })
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

    const validOrderStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED']
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
                    Part.findByIdAndUpdate(item.part_id, { $inc: { 'inventory.allocated': -item.quantity, 'inventory.available_stock': item.quantity } })
                )
            )
        }

        if (order_status === 'COMPLETED' && order.order_status !== 'COMPLETED') {
            try {
                const totalAmount = order.financials?.grand_total || 0;
                await loyaltyService.processOrderCompletion(order.user_id, order._id, totalAmount, 'Order');
            } catch (err) {
                console.error('Failed to process loyalty for order:', err);
            }
        }

        order.order_status = order_status
    }

    if (payment_status) {
        if (!validPaymentStatuses.includes(payment_status)) {
            res.status(400)
            throw new Error(`Trạng thái thanh toán không hợp lệ. Hợp lệ: ${validPaymentStatuses.join(', ')}`)
        }
        if (!order.payment) order.payment = {}
        order.payment.status = payment_status

        if (payment_status === 'PAID' && order.order_status === 'PENDING') {
            order.order_status = 'CONFIRMED'
        }
    }

    if (tracking_info) {
        if (!order.shipping) order.shipping = {}
        if (tracking_info.provider) order.shipping.provider = tracking_info.provider
        if (tracking_info.tracking_code) order.shipping.tracking_code = tracking_info.tracking_code
    }

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