import express from 'express'
import { updateContactInfo } from '../../controllers/admin/settings.controller.js'
import { getCostEstimateConfig, updateCostEstimateConfig } from '../../controllers/admin/costEstimate.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.put('/contact', protect, admin, updateContactInfo)
router.get('/cost-estimate', protect, admin, getCostEstimateConfig)
router.put('/cost-estimate', protect, admin, updateCostEstimateConfig)

export default router
