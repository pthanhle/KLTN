import express from 'express'
import {
    getServiceBays,
    getServiceBayById,
    createServiceBay,
    updateServiceBay,
    deleteServiceBay,
} from '../../../controllers/staff/service/serviceBay.controller.js'
import { protect, serviceStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, serviceStaff)

router.route('/')
    .get(getServiceBays)
    .post(createServiceBay)

router.route('/:id')
    .get(getServiceBayById)
    .put(updateServiceBay)
    .delete(deleteServiceBay)

export default router