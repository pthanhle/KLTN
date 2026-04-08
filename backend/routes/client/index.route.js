import express from 'express'
import authRoutes from './auth.route.js'
import bookingRoutes from './booking.route.js'
import brandRoutes from './brandRoutes.js'
import cartRoutes from './cart.route.js'
import categoryRoutes from './category.routes.js'
import feedbackRoutes from './feedback.route.js'
import notificationRoutes from './notification.route.js'
import orderRoutes from './order.route.js'
import paymentRoutes from './payment.route.js'
import productRoutes from './product.route.js'
import partRoutes from './part.route.js'
import profileRoutes from './profile.route.js'
import serviceRoutes from './service.route.js'
import supportRoutes from './support.route.js'
import wishlistRoutes from './wishlist.route.js'
import contactRoutes from './contact.route.js'
import trackingRoutes from './tracking.route.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/bookings', bookingRoutes)
router.use('/brands', brandRoutes)
router.use('/cart', cartRoutes)
router.use('/categories', categoryRoutes)
router.use('/feedbacks', feedbackRoutes)
router.use('/notifications', notificationRoutes)
router.use('/orders', orderRoutes)
router.use('/payments', paymentRoutes)
router.use('/products', productRoutes)
router.use('/parts', partRoutes)
router.use('/profile', profileRoutes)
router.use('/services', serviceRoutes)
router.use('/support', supportRoutes)
router.use('/wishlist', wishlistRoutes)
router.use('/contact', contactRoutes)
router.use('/tracking', trackingRoutes)

export default router
