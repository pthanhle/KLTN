import express from 'express'
import { getActivePromotions, getPromotionDetail } from '../../controllers/client/promotion.controller.js'

const router = express.Router()

router.get('/', getActivePromotions)
router.get('/:id', getPromotionDetail)

export default router
