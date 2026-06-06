import express from 'express'
import {
    getAppointments,
    getPool,
    getAppointmentById,
    requestJob,
    updateAppointment,
    submitCheckin,
    submitPostDrive,
} from '../../../controllers/staff/sale/appointment.controller.js'
import { protect, saleStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, saleStaff)

router.get('/pool', getPool)
router.get('/', getAppointments)
router.get('/:id', getAppointmentById)
router.post('/:id/request', requestJob)
router.post('/:id/checkin', submitCheckin)
router.post('/:id/post-drive', submitPostDrive)
router.put('/:id', updateAppointment)

export default router
