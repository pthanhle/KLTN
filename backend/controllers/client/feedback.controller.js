import Feedback from '../../models/feedbackModel.js'
import Product from '../../models/productModel.js'
import Booking from '../../models/bookingModel.js'
import Order from '../../models/orderModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Part from '../../models/partModel.js'

export const getMyFeedbacks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const { product_id, booking_id, order_id } = req.query

    const query = { user_id: req.user._id }
    if (product_id && mongoose.Types.ObjectId.isValid(product_id)) query.product_id = product_id
    if (booking_id && mongoose.Types.ObjectId.isValid(booking_id)) query.booking_id = booking_id
    if (order_id && mongoose.Types.ObjectId.isValid(order_id)) query.order_id = order_id

    const total = await Feedback.countDocuments(query)
    const feedbacks = await Feedback.find(query)
        .populate('product_id', 'product_name images')
        .populate('booking_id', 'booking_code booking_type booking_date')
        .populate('order_id', 'order_code order_date')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)

    res.json({
        feedbacks,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
})



export const getPublicFeedbacks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const { product_id, booking_id } = req.query

    const query = { status: 'approved' }
    if (product_id && mongoose.Types.ObjectId.isValid(product_id)) query.product_id = product_id
    if (booking_id && mongoose.Types.ObjectId.isValid(booking_id)) query.booking_id = booking_id

    const total = await Feedback.countDocuments(query)
    const feedbacks = await Feedback.find(query)
        .populate('user_id', 'full_name avatar')
        .populate('product_id', 'product_name images')
        .populate('booking_id', 'booking_code booking_type')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)

    res.json({
        feedbacks,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
})



export const getFeedbackById = asyncHandler(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id)
        .populate('product_id', 'product_name images')
        .populate('booking_id', 'booking_code booking_type booking_date')
        .populate('order_id', 'order_code order_date')

    if (!feedback) {
        res.status(404)
        throw new Error('Phản hồi không tồn tại')
    }

    if (feedback.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền xem phản hồi này')
    }

    res.json(feedback)
})



export const createFeedback = asyncHandler(async (req, res) => {
    const { rating, product_id, booking_id, order_id, comment, images } = req.body

    if (!rating || rating < 1 || rating > 5) {
        res.status(400)
        throw new Error('Rating phải từ 1 đến 5')
    }

    if (!product_id && !booking_id && !order_id) {
        res.status(400)
        throw new Error('Cần cung cấp product_id, booking_id hoặc order_id')
    }


    if (product_id) {
        const exists = await Product.exists({ _id: product_id })
        if (!exists) { res.status(404); throw new Error('Sản phẩm không tồn tại') }
    }

    if (booking_id) {
        const booking = await Booking.findById(booking_id)
        if (!booking) { res.status(404); throw new Error('Booking không tồn tại') }
        if (booking.user_id.toString() !== req.user._id.toString()) {
            res.status(403)
            throw new Error('Bạn không có quyền đánh giá booking này')
        }
        if (booking.booking_status !== 'COMPLETED') {
            res.status(400)
            throw new Error('Chỉ đánh giá được sau khi dịch vụ hoàn thành')
        }
    }

    if (order_id) {
        const order = await Order.findById(order_id)
        if (!order) { res.status(404); throw new Error('Đơn hàng không tồn tại') }
        if (order.user_id.toString() !== req.user._id.toString()) {
            res.status(403)
            throw new Error('Bạn không có quyền đánh giá đơn hàng này')
        }
    }

    const feedback = await Feedback.create({
        user_id: req.user._id,
        product_id: product_id || null,
        booking_id: booking_id || null,
        order_id: order_id || null,
        rating,
        comment: comment || '',
        images: images || [],
        status: 'pending',
    })

    res.status(201).json({
        message: 'Gửi đánh giá thành công. Đánh giá sẽ hiển thị sau khi được duyệt.',
        feedback: await Feedback.findById(feedback._id)
            .populate('product_id', 'product_name images')
            .populate('booking_id', 'booking_code'),
    })
})


export const updateFeedback = asyncHandler(async (req, res) => {
    const { rating, comment, images } = req.body

    const feedback = await Feedback.findById(req.params.id)
    if (!feedback) {
        res.status(404)
        throw new Error('Phản hồi không tồn tại')
    }

    if (feedback.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền chỉnh sửa phản hồi này')
    }

    if (rating && (rating < 1 || rating > 5)) {
        res.status(400)
        throw new Error('Rating phải từ 1 đến 5')
    }

    if (rating !== undefined) feedback.rating = rating
    if (comment !== undefined) feedback.comment = comment
    if (images !== undefined) feedback.images = images

    feedback.status = 'pending'

    const updated = await feedback.save()

    res.json({
        message: 'Cập nhật đánh giá thành công',
        feedback: updated,
    })
})


export const deleteFeedback = asyncHandler(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id)
    if (!feedback) {
        res.status(404)
        throw new Error('Phản hồi không tồn tại')
    }

    if (feedback.user_id.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error('Không có quyền xóa phản hồi này')
    }

    await feedback.deleteOne()
    res.json({ message: 'Xóa đánh giá thành công' })
})