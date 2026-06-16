import express from 'express'
import { getVehicleUnits } from '../../../controllers/admin/vehicleUnit.controller.js'
import { protect, saleStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, saleStaff)

router.route('/')
  .get(getVehicleUnits)

export default router
