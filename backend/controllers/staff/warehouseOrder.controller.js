import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel.js'
import Staff from '../../models/staffModel.js'

// Map DB order_status to mobile OrderStatus enum
const toMobileStatus = (order_status) => {
    if (order_status === 'CONFIRMED') return 'pendingPick'
    if (order_status === 'PROCESSING') return 'pendingDelivery'
    if (order_status === 'SHIPPED') return 'shipping'
    if (order_status === 'COMPLETED') return 'completed'
    if (order_status === 'CANCELLED') return 'cancelled'
    return 'pendingPick'
}

// GET /staff/warehouse/orders — orders assigned to the logged-in inventory staff
export const getMyOrders = asyncHandler(async (req, res) => {
    const staffRecord = await Staff.findOne({ user_id: req.user._id }).lean()
    if (!staffRecord) return res.json([])

    const orders = await Order.find({
        'assignment.assigned_staff_id': staffRecord._id,
        order_status: { $in: ['CONFIRMED', 'PROCESSING', 'SHIPPED'] },
    })
        .populate('user_id', 'full_name phone')
        .sort({ createdAt: -1 })
        .lean()

    const result = orders.map(o => ({
        id: o._id,
        code: o.order_code,
        customer_name: o.delivery?.receiver_name || o.user_id?.full_name || 'N/A',
        customer_type: 'b2c',
        total_items: o.items?.length || 0,
        priority: 'standard',
        status: toMobileStatus(o.order_status),
        created_at: o.createdAt,
        shipping_provider: o.shipping?.provider || null,
        tracking_code: o.shipping?.tracking_code || null,
        assigned_staff_id: staffRecord.employeeId,
        items: (o.items || []).map(item => ({
            part_id: item.part_id?.toString(),
            sku: item.sku,
            name: item.name,
            image: item.image || null,
            properties: item.properties || null,
            quantity: item.quantity,
            original_price: item.original_price || null,
            unit_price: item.unit_price,
            total_price: item.total_price,
            selected_options: item.selected_options || {},
        })),
    }))

    res.json(result)
})

// PUT /staff/warehouse/orders/:id/pack — CONFIRMED → PROCESSING
export const packOrder = asyncHandler(async (req, res) => {
    const staffRecord = await Staff.findOne({ user_id: req.user._id }).lean()
    if (!staffRecord) {
        res.status(403)
        throw new Error('Không tìm thấy thông tin nhân viên')
    }

    const order = await Order.findOne({
        _id: req.params.id,
        'assignment.assigned_staff_id': staffRecord._id,
    })

    if (!order) {
        res.status(404)
        throw new Error('Đơn hàng không tồn tại hoặc bạn không có quyền thực hiện')
    }

    if (order.order_status !== 'CONFIRMED') {
        res.status(400)
        throw new Error('Đơn hàng phải ở trạng thái CONFIRMED để tiến hành đóng gói')
    }

    order.order_status = 'PROCESSING'
    await order.save()

    res.json({ message: 'Đã xác nhận đóng gói đơn hàng', order_id: order._id, order_status: order.order_status })
})

// PUT /staff/warehouse/orders/:id/dispatch — PROCESSING → SHIPPED
export const dispatchOrder = asyncHandler(async (req, res) => {
    const { provider, tracking_code } = req.body

    const staffRecord = await Staff.findOne({ user_id: req.user._id }).lean()
    if (!staffRecord) {
        res.status(403)
        throw new Error('Không tìm thấy thông tin nhân viên')
    }

    const order = await Order.findOne({
        _id: req.params.id,
        'assignment.assigned_staff_id': staffRecord._id,
    })

    if (!order) {
        res.status(404)
        throw new Error('Đơn hàng không tồn tại hoặc bạn không có quyền thực hiện')
    }

    if (order.order_status !== 'PROCESSING') {
        res.status(400)
        throw new Error('Đơn hàng phải ở trạng thái PROCESSING để xác nhận giao hàng')
    }

    order.order_status = 'SHIPPED'
    if (!order.shipping) order.shipping = {}
    if (provider) order.shipping.provider = provider
    if (tracking_code) order.shipping.tracking_code = tracking_code

    await order.save()

    res.json({ message: 'Đã xác nhận bàn giao giao hàng', order_id: order._id, order_status: order.order_status })
})
