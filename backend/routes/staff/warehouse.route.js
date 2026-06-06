import express from 'express'
import { getPickLists, dispatchParts } from '../../controllers/staff/warehouse.controller.js'
import { getMyOrders, packOrder, dispatchOrder } from '../../controllers/staff/warehouseOrder.controller.js'
import { protect, anyStaff as staff, inventoryStaff } from '../../middleware/authMiddleware.js'

const router = express.Router()

// Service repair pick-lists (for repair bookings)
router.route('/pick-lists')
    .get(protect, staff, getPickLists)

router.route('/pick-lists/dispatch')
    .post(protect, staff, dispatchParts)

// Product order routes (for accessories orders assigned to inventory staff)
router.get('/orders', protect, inventoryStaff, getMyOrders)
router.put('/orders/:id/pack', protect, inventoryStaff, packOrder)
router.put('/orders/:id/dispatch', protect, inventoryStaff, dispatchOrder)

export default router
