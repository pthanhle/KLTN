import express from 'express'
import {
    getBookings,
    getBookingById,
    createBooking,
    cancelBooking,
    rescheduleBooking,
    rateBooking,
    getAvailableTimeSlots,
} from '../../controllers/client/booking.controller.js'
import { protect, customer } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, customer)

router.get('/available-slots', getAvailableTimeSlots)

router.route('/')
    .get(getBookings)
    .post(createBooking)

router.route('/:id')
    .get(getBookingById)

router.put('/:id/cancel', cancelBooking)
router.put('/:id/reschedule', rescheduleBooking)
router.put('/:id/rate', rateBooking)

export default router