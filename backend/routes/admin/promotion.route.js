import express from 'express'
import {
  getPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
  addProductToPromotion,
  removeProductFromPromotion,
} from '../../controllers/admin/promotion.controller.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)
router.use(admin)

router.route('/')
  .get(getPromotions)
  .post(createPromotion)

router.route('/:id')
  .get(getPromotionById)
  .put(updatePromotion)
  .delete(deletePromotion)

router
  .route('/:promotionId/products')
  .post(addProductToPromotion)

router
  .route('/:promotionId/products/:productId')
  .delete(removeProductFromPromotion)

export default router
