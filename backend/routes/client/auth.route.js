import express from 'express'
import {
  loginUser,
  registerUser,
  getMe,
  verifyEmailOTP,
  resendEmailOTP,
  loginWithGoogle,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  refreshToken,
  logoutUser,
} from '../../controllers/client/auth.controller.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/verify-email-otp', verifyEmailOTP)
router.post('/resend-email-otp', resendEmailOTP)
router.post('/google-login', loginWithGoogle)
router.post('/refresh', refreshToken)
router.post('/logout', logoutUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/verify-reset-token', verifyResetToken)

router.get('/me', protect, getMe)
router.put('/change-password', protect, changePassword)

export default router