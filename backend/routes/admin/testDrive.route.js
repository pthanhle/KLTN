import express from 'express'
import { getTestDriveBookings, getSalesStaff, assignTestDriveBooking } from '../../controllers/admin/testDrive.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.get('/', getTestDriveBookings)
router.get('/staff/sales', getSalesStaff)
router.put('/:id/assign', assignTestDriveBooking)

export default router
