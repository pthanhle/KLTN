import express from 'express'
import {
  createVehicleContract,
  getVehicleContractById,
  getVehicleContracts,
  updateVehicleContract,
  updateVehicleContractStatus,
} from '../../controllers/admin/vehicleContract.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
  .get(getVehicleContracts)
  .post(createVehicleContract)

router.route('/:id')
  .get(getVehicleContractById)
  .put(updateVehicleContract)

router.put('/:id/status', updateVehicleContractStatus)

export default router
