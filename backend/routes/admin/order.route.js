import express from 'express'
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getInventoryStaff,
} from '../../controllers/admin/order.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

// Named sub-routes must come before /:id
router.get('/inventory-staff', getInventoryStaff)

router.route('/')
    .get(getOrders)
    .post(createOrder)

router.route('/:id')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder)

export default router
