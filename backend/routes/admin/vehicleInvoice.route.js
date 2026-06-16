import express from 'express'
import {
  createVehicleInvoice,
  getVehicleInvoiceById,
  getVehicleInvoices,
  updateVehicleInvoice,
} from '../../controllers/admin/vehicleInvoice.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
  .get(getVehicleInvoices)
  .post(createVehicleInvoice)

router.route('/:id')
  .get(getVehicleInvoiceById)
  .put(updateVehicleInvoice)

export default router
