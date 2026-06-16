import express from 'express'
import {
  archiveVehicleUnit,
  createVehicleUnit,
  getVehicleUnitById,
  getVehicleUnits,
  transitionVehicleUnit,
  updateVehicleUnit,
} from '../../controllers/admin/vehicleUnit.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
  .get(getVehicleUnits)
  .post(createVehicleUnit)

router.route('/:id')
  .get(getVehicleUnitById)
  .put(updateVehicleUnit)

router.post('/:id/transition', transitionVehicleUnit)
router.put('/:id/archive', archiveVehicleUnit)

export default router
