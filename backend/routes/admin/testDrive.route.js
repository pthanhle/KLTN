import express from 'express'
import {
  getTestDriveBookings,
  getTestDriveBookingById,
  getSalesStaff,
  assignTestDriveBooking,
  searchCars,
  createTestDriveBookingByAdmin,
} from '../../controllers/admin/testDrive.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.get('/cars/search', searchCars)
router.get('/staff/sales', getSalesStaff)
router.get('/', getTestDriveBookings)
router.post('/', createTestDriveBookingByAdmin)
router.get('/:id', getTestDriveBookingById)
router.put('/:id/assign', assignTestDriveBooking)

export default router
