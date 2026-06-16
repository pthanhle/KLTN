import express from 'express'
import {
  createSalesCommission,
  getSalesCommissionById,
  getSalesCommissions,
  updateSalesCommissionStatus,
} from '../../controllers/admin/salesCommission.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
  .get(getSalesCommissions)
  .post(createSalesCommission)

router.route('/:id')
  .get(getSalesCommissionById)

router.put('/:id/status', updateSalesCommissionStatus)

export default router
