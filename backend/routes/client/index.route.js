import express from 'express'
import authRoutes from './auth.route.js'
import bookingRoutes from './booking.route.js'
import cartRoutes from './cart.route.js'
import categoryRoutes from './category.routes.js'
import feedbackRoutes from './feedback.route.js'
import notificationRoutes from './notification.route.js'
import orderRoutes from './order.route.js'
import paymentRoutes from './payment.route.js'
import productRoutes from './product.route.js'
import profileRoutes from './profile.route.js'
import serviceRoutes from './service.route.js'
import supportRoutes from './support.route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/bookings', bookingRoutes)
router.use('/cart', cartRoutes)
router.use('/categories', categoryRoutes)
router.use('/feedbacks', feedbackRoutes)
router.use('/notifications', notificationRoutes)
router.use('/orders', orderRoutes)
router.use('/payments', paymentRoutes)
router.use('/products', productRoutes)
router.use('/profile', profileRoutes)
router.use('/services', serviceRoutes)
router.use('/support', supportRoutes)

export default router
