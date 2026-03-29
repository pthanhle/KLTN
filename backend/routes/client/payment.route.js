import express from 'express'
import { protect } from '../../middleware/authMiddleware.js'
import {
  createVNPayPayment,
  vnpayReturn,
} from '../../controllers/client/payment.controller.js'

const router = express.Router()

router.post('/vnpay', protect, createVNPayPayment)

router.get('/vnpay_return', vnpayReturn)

export default router
