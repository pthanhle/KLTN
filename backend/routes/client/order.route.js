import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  confirmReceipt,
  updatePaymentStatus,
} from '../../controllers/client/order.controller.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/cancel', protect, cancelOrder)
router.put('/:id/confirm-receipt', protect, confirmReceipt)
router.put('/:id/payment-status', protect, updatePaymentStatus)

export default router