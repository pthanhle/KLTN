import express from 'express'
import { getPickLists, dispatchParts } from '../../controllers/staff/warehouse.controller.js'
import { protect, staff } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.route('/pick-lists')
    .get(protect, staff, getPickLists)

router.route('/pick-lists/dispatch')
    .post(protect, staff, dispatchParts)

export default router
