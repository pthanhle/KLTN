import express from 'express'
import {
    getDashboardStats,
    getPendingCounts,
    getRevenueReport,
    getTopProducts,
} from '../../controllers/admin/dashboard.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.get('/', getDashboardStats)
router.get('/pending-counts', getPendingCounts)
router.get('/revenue-report', getRevenueReport)
router.get('/top-products', getTopProducts)

export default router