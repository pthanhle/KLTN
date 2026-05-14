import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import Role from '../../models/roleModel.js'
import crypto from 'crypto'
import sendEmail from '../../utils/sendEmail.js'
import emailQueue from '../../queues/emailQueue.js'
import { OAuth2Client } from 'google-auth-library'
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js'
import { registerOtpEmail, resendRegisterOtpEmail, resetPasswordEmail } from '../../utils/emailTemplates.js'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/client/auth',
  })
}

const formatUserResponse = (user) => {
  const isAdmin =
    user.role_id?.role_name === 'admin' ||
    user.role_id?.role_name === 'manager'

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    avatar: user.avatar,
    phone: user.phone,
    role: user.role_id?.role_name || 'Customer',
    isAdmin,
    authProvider: user.authProvider || 'local',
  }
}

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).populate('role_id', 'role_name')

  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Email hoặc mật khẩu không đúng')
  }

  if (!user.isEmailVerified && user.status === 'inactive') {
    res.status(403)
    throw new Error('Vui lòng xác nhận email bằng OTP')
  }

  if (user.status !== 'active') {
    res.status(403)
    throw new Error('Tài khoản đã bị khóa hoặc chưa kích hoạt')
  }

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5)
  await user.save()

  setRefreshTokenCookie(res, refreshToken)

  res.json({
    ...formatUserResponse(user),
    accessToken,
  })
})

export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, full_name, phone } = req.body

  if (!email || !username || !password || !phone) {
    res.status(400)
    throw new Error('Vui lòng điền đầy đủ thông tin')
  }

  if (await User.findOne({ email })) throw new Error('Email đã tồn tại')
  if (await User.findOne({ username })) throw new Error('Username đã tồn tại')

  let customerRole = await Role.findOne({ role_name: 'Customer' })
  if (!customerRole) {
    customerRole = await Role.create({ role_name: 'Customer' })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

  const user = await User.create({
    email,
    username,
    password,
    phone,
    full_name,
    role_id: customerRole._id,
    status: 'inactive',
    isEmailVerified: false,
    emailOTP: otpHash,
    emailOTPExpire: Date.now() + 10 * 60 * 1000,
  })

  try {
    const template = registerOtpEmail(user.full_name, otp)
    await emailQueue.add('sendEmail', {
      to: user.email,
      ...template,
    })
  } catch (error) {
    console.log('Error queuing email:', error.message)
  }

  res.status(201).json({
    message: 'Đăng ký thành công. Vui lòng nhập OTP được gửi qua email.',
    email: user.email,
  })
})

export const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    res.status(400)
    throw new Error('Thiếu email hoặc OTP')
  }

  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

  const user = await User.findOne({
    email,
    emailOTP: otpHash,
    emailOTPExpire: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error('OTP không hợp lệ hoặc đã hết hạn')
  }

  user.isEmailVerified = true
  user.status = 'active'
  user.emailOTP = undefined
  user.emailOTPExpire = undefined
  await user.save()

  res.json({ message: 'Xác nhận email thành công. Bạn có thể đăng nhập.' })
})

export const resendEmailOTP = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  if (!user) throw new Error('Không tìm thấy tài khoản')
  if (user.isEmailVerified) throw new Error('Email đã được xác nhận')

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

  user.emailOTP = otpHash
  user.emailOTPExpire = Date.now() + 10 * 60 * 1000
  await user.save()

  const template = resendRegisterOtpEmail(otp)
  await emailQueue.add('sendEmail', {
    to: user.email,
    ...template,
  })

  res.json({ message: 'OTP mới đã được gửi' })
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password -refreshTokens')
    .populate('role_id', 'role_name')

  res.json(user)
})

export const loginWithGoogle = asyncHandler(async (req, res) => {
  const { idToken } = req.body

  if (!idToken) {
    res.status(400)
    throw new Error('Thiếu Google ID Token')
  }

  let payload
  try {
    if (idToken.split('.').length === 3) {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      payload = ticket.getPayload()
    } else {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${idToken}` }
      })
      if (!response.ok) throw new Error('Invalid Access Token')
      payload = await response.json()
    }
  } catch (error) {
    res.status(401)
    throw new Error('Xác thực Google thất bại')
  }

  const { sub: googleId, email, name, picture } = payload

  let user = await User.findOne({ email }).populate('role_id', 'role_name')

  let customerRole = await Role.findOne({ role_name: 'Customer' })
  if (!customerRole) {
    customerRole = await Role.create({ role_name: 'Customer' })
  }

  if (!user) {
    const randomPassword = crypto.randomBytes(16).toString('hex')
    user = await User.create({
      email,
      username: email.split('@')[0],
      full_name: name,
      avatar: picture,
      googleId,
      password: randomPassword,
      phone: '0000000000',
      role_id: customerRole._id,
      authProvider: 'google',
      isEmailVerified: true,
      status: 'active',
    })
    user.role_id = customerRole
  }

  if (!user.role_id) {
    user.role_id = customerRole._id
    await user.save()
    user.role_id = customerRole
  }

  if (user && !user.googleId) {
    user.googleId = googleId
    user.authProvider = 'google'
    user.isEmailVerified = true
    if (!user.password) {
      user.password = crypto.randomBytes(16).toString('hex')
    }
    await user.save()
  }

  if (user.status !== 'active') {
    res.status(403)
    throw new Error('Tài khoản đã bị khóa hoặc chưa kích hoạt')
  }

  const accessToken = generateAccessToken(user._id)
  const refreshToken = generateRefreshToken(user._id)

  user.refreshTokens = [...(user.refreshTokens || []), refreshToken].slice(-5)
  await user.save()

  setRefreshTokenCookie(res, refreshToken)

  res.json({
    ...formatUserResponse(user),
    accessToken,
  })
})

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken

  if (!token) {
    res.status(401)
    throw new Error('Không có refresh token')
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  } catch (error) {
    res.status(401)
    throw new Error('Refresh token không hợp lệ hoặc đã hết hạn')
  }

  const user = await User.findById(decoded.id).populate('role_id', 'role_name')
  if (!user || !user.refreshTokens.includes(token)) {
    if (user) {
      user.refreshTokens = []
      await user.save()
    }
    res.status(401)
    throw new Error('Refresh token đã bị thu hồi')
  }

  if (user.status !== 'active') {
    res.status(403)
    throw new Error('Tài khoản đã bị khóa')
  }

  const newRefreshToken = generateRefreshToken(user._id)
  user.refreshTokens = user.refreshTokens
    .filter(t => t !== token)
    .concat(newRefreshToken)
    .slice(-5)
  await user.save()

  setRefreshTokenCookie(res, newRefreshToken)

  res.json({
    accessToken: generateAccessToken(user._id),
    user: formatUserResponse(user),
  })
})

export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken

  if (token) {
    const user = await User.findOne({ refreshTokens: token })
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(t => t !== token)
      await user.save()
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/client/auth',
  })

  res.json({ message: 'Đăng xuất thành công' })
})

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    res.status(400)
    throw new Error('Vui lòng điền đầy đủ thông tin')
  }

  if (newPassword.length < 6) {
    res.status(400)
    throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự')
  }

  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    throw new Error('Không tìm thấy người dùng')
  }

  const isPasswordMatch = await user.matchPassword(currentPassword)
  if (!isPasswordMatch) {
    res.status(401)
    throw new Error('Mật khẩu hiện tại không đúng')
  }

  const isSamePassword = await user.matchPassword(newPassword)
  if (isSamePassword) {
    res.status(400)
    throw new Error('Mật khẩu mới không được trùng với mật khẩu hiện tại')
  }

  user.password = newPassword
  user.refreshTokens = []
  await user.save()

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/client/auth',
  })

  res.json({ message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error('Vui lòng nhập email')
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('Không tìm thấy tài khoản với email này')
  }

  const resetToken = jwt.sign(
    { userId: user._id, email: user.email, purpose: 'reset_password' },
    process.env.JWT_SECRET,
    { expiresIn: '5m' }
  )

  user.passwordResetToken = resetToken
  user.passwordResetExpire = Date.now() + 5 * 60 * 1000
  await user.save()

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  try {
    const template = resetPasswordEmail(user.full_name || user.username, resetUrl)
    await emailQueue.add('sendEmail', {
      to: user.email,
      ...template,
    })

    res.json({ message: 'Link đặt lại mật khẩu đã được gửi đến email của bạn' })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    await user.save()
    res.status(500)
    throw new Error('Không thể thêm vào hàng đợi gửi mail. Vui lòng thử lại sau')
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    res.status(400)
    throw new Error('Thiếu thông tin')
  }

  if (newPassword.length < 6) {
    res.status(400)
    throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.purpose !== 'reset_password') {
      res.status(401)
      throw new Error('Token không hợp lệ')
    }

    const user = await User.findOne({
      _id: decoded.userId,
      passwordResetToken: token,
      passwordResetExpire: { $gt: Date.now() },
    })

    if (!user) {
      res.status(401)
      throw new Error('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn')
    }

    const isSamePassword = await user.matchPassword(newPassword)
    if (isSamePassword) {
      res.status(400)
      throw new Error('Mật khẩu mới không được trùng với mật khẩu cũ')
    }

    user.password = newPassword
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    user.refreshTokens = []
    await user.save()

    res.json({ message: 'Đặt lại mật khẩu thành công' })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401)
      throw new Error('Link đặt lại mật khẩu đã hết hạn')
    }
    if (error.name === 'JsonWebTokenError') {
      res.status(401)
      throw new Error('Link đặt lại mật khẩu không hợp lệ')
    }
    throw error
  }
})

export const verifyResetToken = asyncHandler(async (req, res) => {
  const { token } = req.body

  if (!token) {
    res.status(400)
    throw new Error('Thiếu token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({
      _id: decoded.userId,
      passwordResetToken: token,
      passwordResetExpire: { $gt: Date.now() },
    })

    if (!user) {
      res.status(401)
      throw new Error('Link không hợp lệ hoặc đã hết hạn')
    }

    res.json({ valid: true, email: user.email })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401)
      throw new Error('Link đã hết hạn')
    }
    res.status(401)
    throw new Error('Link không hợp lệ')
  }
})