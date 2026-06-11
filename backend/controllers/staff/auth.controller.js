import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import Staff from '../../models/staffModel.js'
import Employee from '../../models/employeeModel.js'
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js'
import jwt from 'jsonwebtoken'
import Role from '../../models/roleModel.js'

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('staffRefreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/staff/auth',
  })
}

export const staffLogin = asyncHandler(async (req, res) => {
  const { employeeId, password } = req.body

  let user = await User.findOne({ email: employeeId }).populate('role_id', 'role_name')
  let staffDoc = null;

  if (!user) {
    staffDoc = await Staff.findOne({ employeeId: employeeId })
    if (staffDoc) {
      user = await User.findById(staffDoc.user_id).populate('role_id', 'role_name')
    }
  } else {
    staffDoc = await Staff.findOne({ user_id: user._id })
  }

  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Tài khoản hoặc mật khẩu không chính xác')
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

  const employeeDoc = await Employee.findOne({ user_id: user._id })
  let formattedPerformance = null
  if (staffDoc && staffDoc.performance) {
    const perf = staffDoc.performance
    const kanban = perf.kanban || {}
    const tasks = [
      ...(kanban.todo || []).map(t => ({ ...(t.toObject ? t.toObject() : t), status: 'todo' })),
      ...(kanban.inProgress || []).map(t => ({ ...(t.toObject ? t.toObject() : t), status: 'in_progress' })),
      ...(kanban.done || []).map(t => ({ ...(t.toObject ? t.toObject() : t), status: 'done' })),
    ]

    formattedPerformance = {
      kpis: {
        ...(perf.kpis ? (perf.kpis.toObject ? perf.kpis.toObject() : perf.kpis) : {}),
        inventoryAccuracy: typeof perf.kpis?.inventoryAccuracy === 'object' && perf.kpis?.inventoryAccuracy !== null
          ? perf.kpis.inventoryAccuracy
          : { score: Number(perf.kpis?.inventoryAccuracy) || 0, target: 100 },
        avgSla: typeof perf.kpis?.avgSla === 'object' && perf.kpis?.avgSla !== null
          ? perf.kpis.avgSla
          : { time: Number(perf.kpis?.avgSla) || 0, unit: 'h' },
      },
      kanban: { tasks }
    }
  }

  res.json({
    id: user._id,
    employeeId: staffDoc ? staffDoc.employeeId : 'EMP-000',
    fullName: user.full_name || '',
    email: user.email || '',
    phone: user.phone || '',
    avatarUrl: user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
    role: user.role_id?.role_name || (staffDoc ? staffDoc.roleName : 'STAFF'),
    department: staffDoc ? (staffDoc.department || '') : (employeeDoc ? (employeeDoc.position || '') : 'General'),
    status: user.status.toUpperCase(),
    joinDate: staffDoc
      ? staffDoc.createdAt?.toISOString()
      : (employeeDoc ? employeeDoc.hired_date?.toISOString() : null),
    baseSalary: staffDoc ? staffDoc.baseSalary : (employeeDoc ? parseFloat(employeeDoc.salary) : 0),
    kpiType: staffDoc ? staffDoc.kpiType : 'SALARY_ONLY',
    kpiValue: staffDoc ? staffDoc.kpiValue : 0,
    isOvertimeEligible: staffDoc ? staffDoc.isOvertimeEligible : false,
    accessLevel: staffDoc ? staffDoc.accessLevel : 'STANDARD_USER',
    lastLogin: new Date().toISOString(),
    accessToken: accessToken,
    performance: formattedPerformance
  })
})


export const staffLogout = asyncHandler(async (req, res) => {
  const token = req.cookies?.staffRefreshToken

  if (token) {
    const user = await User.findOne({ refreshTokens: token })
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(t => t !== token)
      await user.save()
    }
  }

  res.clearCookie('staffRefreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/staff/auth',
  })

  res.json({ message: 'Đăng xuất thành công' })
})
