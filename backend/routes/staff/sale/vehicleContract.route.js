import express from 'express'
import {
  createVehicleContract,
  getVehicleContractById,
  getVehicleContracts,
  updateVehicleContract,
  updateVehicleContractStatus,
} from '../../../controllers/admin/vehicleContract.controller.js'
import { protect, saleStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, saleStaff)

router.route('/')
  .get(getVehicleContracts)
  .post(createVehicleContract)

router.route('/:id')
  .get(getVehicleContractById)
  .put(updateVehicleContract)

router.put('/:id/status', updateVehicleContractStatus)

export default router
