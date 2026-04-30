import express from 'express'
import categoryRoutes from './category.route.js'
import brandRoutes from './brandRoutes.js'
import productRoutes from './product.route.js'
import partRoutes from './part.route.js'
import partMetaRoutes from './partMeta.route.js'
import customerRoutes from './customer.route.js'
import orderRoutes from './order.route.js'
import dashboardRoutes from './dashboard.route.js'
import staffRoutes from './staff.route.js'
import serviceItemRoutes from './serviceItem.route.js'
import serviceCategoryRoutes from './serviceCategory.route.js'
import promotionRoutes from './promotion.route.js'
import tradeinVehicleRoutes from './tradeinVehicle.route.js'
import revenueReportRoutes from './revenuereport.route.js'
import supportRoutes from './support.route.js'
import settingsRoutes from './settings.route.js'

const router = express.Router()

router.use('/categories', categoryRoutes)
router.use('/brands', brandRoutes)
router.use('/products', productRoutes)
router.use('/parts', partRoutes)
router.use('/part-meta', partMetaRoutes)
router.use('/customers', customerRoutes)
router.use('/orders', orderRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/staff', staffRoutes)
router.use('/service-items', serviceItemRoutes)
router.use('/service-categories', serviceCategoryRoutes)
router.use('/promotions', promotionRoutes)
router.use('/tradein-vehicles', tradeinVehicleRoutes)
router.use('/revenue-reports', revenueReportRoutes)
router.use('/support', supportRoutes)
router.use('/settings', settingsRoutes)

export default router