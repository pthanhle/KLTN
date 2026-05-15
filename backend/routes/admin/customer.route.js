import express from 'express'
import {
    getCustomers,
    getCustomerStats,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getOrdersByCustomer,
    getBookingsByCustomer,
    createCustomer,
    verifyCustomerOTP,
    toggleLockStatus,
    upgradeTier,
    addLoyaltyPoints
} from '../../controllers/admin/customer.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'
import { upload } from '../../config/cloudinary.js'

const router = express.Router()

router.use(protect, admin)

router.route('/stats')
    .get(getCustomerStats)

router.route('/')
    .get(getCustomers)
    .post(upload.single('avatar'), createCustomer)

router.post('/verify-otp', verifyCustomerOTP)

router.route('/:id')
    .get(getCustomerById)
    .put(upload.single('avatar'), updateCustomer)
    .delete(deleteCustomer)

router.route('/:id/orders')
    .get(getOrdersByCustomer)

router.route('/:id/bookings')
    .get(getBookingsByCustomer)

router.patch('/:id/status', toggleLockStatus)
router.patch('/:id/tier', upgradeTier)
router.post('/:id/loyalty/points', addLoyaltyPoints)

export default router