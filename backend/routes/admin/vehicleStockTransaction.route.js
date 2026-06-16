import express from 'express'
import {
  getVehicleStockTransactionById,
  getVehicleStockTransactions,
} from '../../controllers/admin/vehicleStockTransaction.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
  .get(getVehicleStockTransactions)

router.route('/:id')
  .get(getVehicleStockTransactionById)

export default router
