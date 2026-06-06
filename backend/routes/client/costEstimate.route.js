import express from 'express'
import { getCostEstimateConfig } from '../../controllers/admin/costEstimate.controller.js'

const router = express.Router()

router.get('/', getCostEstimateConfig)

export default router
