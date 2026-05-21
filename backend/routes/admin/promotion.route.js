import express from 'express'
import {
  getPromotions,
  getPromotionStats,
  getPromotionById,
  createPromotion,
  updatePromotion,
  togglePromotionStatus,
  deletePromotion,
} from '../../controllers/admin/promotion.controller.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)
router.use(admin)

router.get('/stats', getPromotionStats)

router.route('/')
  .get(getPromotions)
  .post(createPromotion)

router.route('/:id')
  .get(getPromotionById)
  .put(updatePromotion)
  .delete(deletePromotion)

router.patch('/:id/toggle-status', togglePromotionStatus)

export default router
