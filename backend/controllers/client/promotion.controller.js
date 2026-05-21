import asyncHandler from 'express-async-handler'
import Promotion from '../../models/promotionModel.js'

const getActivePromotions = asyncHandler(async (req, res) => {
  const { is_loyalty } = req.query

  const filter = { status: 'ACTIVE' }
  if (is_loyalty !== undefined) {
    filter.is_loyalty = is_loyalty === 'true'
  }

  const promotions = await Promotion.find(filter).sort({ createdAt: -1 })
  res.json(promotions)
})


const getPromotionDetail = asyncHandler(async (req, res) => {
  const promotion = await Promotion.findById(req.params.id)
  if (!promotion || promotion.status !== 'ACTIVE') {
    res.status(404)
    throw new Error('Không tìm thấy khuyến mãi')
  }
  res.json(promotion)
})

export { getActivePromotions, getPromotionDetail }
