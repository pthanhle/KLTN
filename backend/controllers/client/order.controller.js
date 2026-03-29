import asyncHandler from 'express-async-handler'
import Order from '../../models/orderModel.js'
import Product from '../../models/productModel.js'
import Cart from '../../models/cartModel.js'
import mongoose from 'mongoose'

// helper sinh order_code
const generateOrderCode = () => {
  const datePart = new Date().getFullYear()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${datePart}-${rand}`
}

// ─────────────────────────────────────────────
// GET /api/orders  – lịch sử đơn hàng của user
// Query: order_type, order_status, payment_status, page, limit
// ─────────────────────────────────────────────
export const getMyOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const { order_type, order_status, payment_status } = req.query

  const query = { user_id: req.user._id }
  if (order_type) query.order_type = order_type
  if (order_status) query.order_status = order_status
  if (payment_status) query.payment_status = payment_status

  const total = await Order.countDocuments(query)
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()

  res.json({
    orders,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  })
})


// ─────────────────────────────────────────────
// GET /api/orders/:id  – chi tiết đơn hàng
// ─────────────────────────────────────────────
export const getOrderById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Order ID không hợp lệ')
  }

  const order = await Order.findById(req.params.id).lean()
  if (!order) {
    res.status(404)
    throw new Error('Không tìm thấy đơn hàng')
  }

  if (order.user_id.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error('Không có quyền xem đơn hàng này')
  }

  res.json(order)
})


// ─────────────────────────────────────────────
// POST /api/orders  – tạo đơn hàng (checkout)
// Body:
//   items: [{ product_id, quantity }]
//   payment_method: 'CASH' | 'BANK_TRANSFER' | 'CARD' | 'E_WALLET'
//   order_type: 'CAR_PURCHASE' | 'ACCESSORIES'
//   shipping_fee: number (default 0)
//   discount_amount: number (default 0)
//   customer_info: { full_name, phone, address, email }
// ─────────────────────────────────────────────
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items, payment_method, order_type,
    shipping_fee, discount_amount, customer_info,
  } = req.body

  if (!items || items.length === 0) {
    res.status(400)
    throw new Error('Đơn hàng phải có ít nhất một sản phẩm')
  }

  if (!payment_method) {
    res.status(400)
    throw new Error('Vui lòng chọn phương thức thanh toán')
  }

  // Lấy thông tin sản phẩm thực tế từ DB để tính giá
  const productIds = items.map(i => i.product_id).filter(id => mongoose.Types.ObjectId.isValid(id))
  const dbProducts = await Product.find({ _id: { $in: productIds } }).lean()
  const productMap = Object.fromEntries(dbProducts.map(p => [p._id.toString(), p]))

  // Build items với snapshot và tính tổng tiền hàng
  let subtotal = 0
  const orderItems = items.map(item => {
    const p = productMap[item.product_id]
    if (!p) throw Object.assign(new Error(`Sản phẩm ${item.product_id} không tồn tại`), { status: 404 })
    if (p.stock < item.quantity) throw Object.assign(new Error(`Sản phẩm "${p.product_name}" không đủ hàng`), { status: 400 })

    const unit_price = p.price
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

  const resolvedCustomerInfo = customer_info || {
    full_name: req.user.full_name,
    phone: req.user.phone,
    address: req.user.address,
    email: req.user.email,
  }

  const order = await Order.create({
    order_code: generateOrderCode(),
    user_id: req.user._id,
    customer_info: resolvedCustomerInfo,
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
      Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: -item.quantity }
      })
    )
  )

  try {
    await Cart.findOneAndDelete({ user_id: req.user._id })
  } catch (e) {
    console.error('Lỗi xóa giỏ hàng:', e)
  }

  res.status(201).json({
    message: 'Tạo đơn hàng thành công',
    order,
  })
})


export const cancelOrder = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Order ID không hợp lệ')
  }

  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Không tìm thấy đơn hàng')
  }

  if (order.user_id.toString() !== req.user._id.toString()) {
    res.status(403)
    throw new Error('Không có quyền hủy đơn hàng này')
  }

  if (!['PENDING', 'CONFIRMED'].includes(order.order_status)) {
    res.status(400)
    throw new Error('Không thể hủy đơn hàng ở trạng thái này')
  }

  if (order.payment_status === 'PAID') {
    res.status(400)
    throw new Error('Đơn hàng đã thanh toán, không thể hủy trực tiếp')
  }

  order.order_status = 'CANCELLED'
  await order.save()

  await Promise.all(
    order.items.map(item =>
      Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: item.quantity }
      })
    )
  )

  res.json({ message: 'Hủy đơn hàng thành công', order })
})


export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { payment_status, invoice_url } = req.body

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Order ID không hợp lệ')
  }

  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Không tìm thấy đơn hàng')
  }

  if (payment_status) order.payment_status = payment_status
  if (invoice_url) order.invoice_url = invoice_url

  if (payment_status === 'PAID' && order.order_status === 'PENDING') {
    order.order_status = 'CONFIRMED'
  }

  await order.save()
  res.json({ message: 'Cập nhật thanh toán thành công', order })
})
