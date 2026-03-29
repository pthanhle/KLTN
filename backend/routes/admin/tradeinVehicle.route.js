// backend/routes/admin/tradeinVehicle.routes.js
import express from 'express'
import {
    getTradeinVehicles,
    getTradeinVehicleById,
    createTradeinVehicle,
    updateTradeinVehicle,
    deleteTradeinVehicle,
} from '../../controllers/admin/tradeinVehicle.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
    .get(getTradeinVehicles)
    .post(createTradeinVehicle)

router.route('/:id')
    .get(getTradeinVehicleById)
    .put(updateTradeinVehicle)
    .delete(deleteTradeinVehicle)

export default router