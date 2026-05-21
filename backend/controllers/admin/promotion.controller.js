import asyncHandler from 'express-async-handler'
import Promotion from '../../models/promotionModel.js'


const getPromotions = asyncHandler(async (req, res) => {
  const { status, discount_type, is_loyalty, search, page = 1, limit = 50 } = req.query

  const filter = {}
  if (status && status !== 'ALL') filter.status = status
  if (discount_type && discount_type !== 'ALL') filter.discount_type = discount_type
  if (is_loyalty !== undefined && is_loyalty !== 'ALL') {
    filter.is_loyalty = is_loyalty === 'true'
  }
  if (search) {
    filter.title = { $regex: search, $options: 'i' }
  }

  const skip = (Number(page) - 1) * Number(limit)
  const [promotions, total] = await Promise.all([
    Promotion.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Promotion.countDocuments(filter),
  ])

  res.json({ promotions, total, page: Number(page), limit: Number(limit) })
})


const getPromotionStats = asyncHandler(async (req, res) => {
  const [active_campaigns, claimedAgg, pointsAgg] = await Promise.all([
    Promotion.countDocuments({ status: 'ACTIVE' }),
    Promotion.aggregate([{ $group: { _id: null, total: { $sum: '$claimed_count' } } }]),
    Promotion.aggregate([
      { $match: { is_loyalty: true } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$used_count', '$points_required'] } } } },
    ]),
  ])

  res.json({
    active_campaigns,
    total_claimed: claimedAgg[0]?.total || 0,
    points_burned: pointsAgg[0]?.total || 0,
  })
})


const getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id)
  if (!promotion) {
    res.status(404)
    throw new Error('Không tìm thấy khuyến mãi')
  }
  res.json(promotion)
})


const createPromotion = asyncHandler(async (req, res) => {
  const {
    title, description, discount_type, discount_value, max_discount,
    is_loyalty, points_required, validity_days, code, min_order_value,
    start_date, end_date, status,
  } = req.body

  if (code) {
    const existing = await Promotion.findOne({ code })
    if (existing) {
      res.status(400)
      throw new Error('Mã khuyến mãi đã tồn tại')
    }
  }

  const promotion = await Promotion.create({
    title,
    description,
    discount_type,
    discount_value,
    max_discount: max_discount || null,
    is_loyalty: is_loyalty || false,
    points_required: points_required || 0,
    validity_days: validity_days || 0,
    code: code || null,
    min_order_value: min_order_value || 0,
    start_date: start_date || null,
    end_date: end_date || null,
    status: status || 'ACTIVE',
  })

  res.status(201).json({ message: 'Tạo khuyến mãi thành công', promotion })
})


const updatePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id)
  if (!promotion) {
    res.status(404)
    throw new Error('Không tìm thấy khuyến mãi để cập nhật')
  }

  const {
    title, description, discount_type, discount_value, max_discount,
    is_loyalty, points_required, validity_days, code, min_order_value,
    start_date, end_date, status,
  } = req.body

  if (code && code !== promotion.code) {
    const existing = await Promotion.findOne({ code, _id: { $ne: req.params.id } })
    if (existing) {
      res.status(400)
      throw new Error('Mã khuyến mãi đã tồn tại')
    }
  }

  Object.assign(promotion, {
    title: title ?? promotion.title,
    description: description ?? promotion.description,
    discount_type: discount_type ?? promotion.discount_type,
    discount_value: discount_value ?? promotion.discount_value,
    max_discount: max_discount !== undefined ? max_discount : promotion.max_discount,
    is_loyalty: is_loyalty !== undefined ? is_loyalty : promotion.is_loyalty,
    points_required: points_required ?? promotion.points_required,
    validity_days: validity_days ?? promotion.validity_days,
    code: code !== undefined ? code : promotion.code,
    min_order_value: min_order_value ?? promotion.min_order_value,
    start_date: start_date !== undefined ? start_date : promotion.start_date,
    end_date: end_date !== undefined ? end_date : promotion.end_date,
    status: status ?? promotion.status,
  })

  const updated = await promotion.save()
  res.json({ message: 'Cập nhật khuyến mãi thành công', promotion: updated })
})


const togglePromotionStatus = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id)
  if (!promotion) {
    res.status(404)
    throw new Error('Không tìm thấy khuyến mãi')
  }

  promotion.status = promotion.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
  await promotion.save()
  res.json({ message: 'Cập nhật trạng thái thành công', status: promotion.status })
})


const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id)
  if (!promotion) {
    res.status(404)
    throw new Error('Không tìm thấy khuyến mãi để xóa')
  }

  await promotion.deleteOne()
  res.json({ message: 'Xóa khuyến mãi thành công' })
})

export {
  getPromotions,
  getPromotionStats,
  getPromotionById,
  createPromotion,
  updatePromotion,
  togglePromotionStatus,
  deletePromotion,
}
