import express from 'express'
import categoryRoutes from './inventory/category.route.js'
import itemRoutes from './inventory/item.route.js'
import stockRoutes from './inventory/stock.route.js'
import saleAppointmentRoutes from './sale/appointment.route.js'
import saleContractRoutes from './sale/contract.route.js'
import saleFeedbackRoutes from './sale/feedback.route.js'
import saleSupportRoutes from './sale/support.route.js'
import serviceAppointmentRoutes from './service/appointment.route.js'
import serviceRepairRoutes from './service/repair.route.js'
import serviceBayRoutes from './service/serviceBay.route.js'
import warehouseRoutes from './warehouse.route.js'
import authRoutes from './auth.route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/warehouse', warehouseRoutes)
router.use('/inventory/categories', categoryRoutes)
router.use('/inventory/items', itemRoutes)
router.use('/inventory/stock', stockRoutes)
router.use('/sale/appointments', saleAppointmentRoutes)
router.use('/sale/contracts', saleContractRoutes)
router.use('/sale/feedbacks', saleFeedbackRoutes)
router.use('/sale/support', saleSupportRoutes)
router.use('/service/appointments', serviceAppointmentRoutes)
router.use('/service/repair-progress', serviceRepairRoutes)
router.use('/service/service-bays', serviceBayRoutes)

export default router
