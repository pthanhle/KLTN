import express from 'express'
import { getMyProgressList, getTrackingDetail, lookupTracking, getTrackingStats, approveQuotation, rejectQuotation, confirmPayment } from '../../controllers/client/tracking.controller.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/stats', getTrackingStats)
router.post('/lookup', lookupTracking)
router.get('/', getMyProgressList)
router.get('/:bookingCode', getTrackingDetail)

router.put('/:bookingCode/approve-quotation', approveQuotation)
router.put('/:bookingCode/reject-quotation', rejectQuotation)
router.put('/:bookingCode/confirm-payment', confirmPayment)

export default router
