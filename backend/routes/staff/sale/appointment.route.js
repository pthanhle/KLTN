import express from 'express'
import {
    getAppointments,
    getAppointmentById,
    updateAppointment,
} from '../../../controllers/staff/sale/appointment.controller.js'
import { protect, saleStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, saleStaff)

router.route('/')
    .get(getAppointments)

router.route('/:id')
    .get(getAppointmentById)
    .put(updateAppointment)

export default router
