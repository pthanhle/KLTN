import express from 'express'
import {
    getAppointments,
    getAppointmentById,
    updateAppointment,
} from '../../../controllers/staff/service/appointment.controller.js'
import { protect, serviceStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, serviceStaff)

router.route('/')
    .get(getAppointments)

router.route('/:id')
    .get(getAppointmentById)
    .put(updateAppointment)

export default router