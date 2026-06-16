import express from 'express'
import { getCostEstimateConfig } from '../../../controllers/admin/costEstimate.controller.js'
import { protect, saleStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, saleStaff)

router.route('/')
  .get(getCostEstimateConfig)

export default router
