import Booking from '../../models/bookingModel.js'
import User from '../../models/userModel.js'
import Car from '../../models/carModel.js'
import Role from '../../models/roleModel.js'
import Notification from '../../models/notificationModel.js'
import { getNextSequence } from '../../models/counterModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import dayjs from 'dayjs'
import { getIO } from '../../config/socket.js'

const STATUS_MAP = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  RECEIVED: 'Received',
  IN_PROGRESS: 'InProgress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

const normalizeBooking = (b) => {
  const obj = b.toObject ? b.toObject() : b
  const car = obj.product_id
  // delivery_address may be an object {street,ward,district,city} or legacy string
  const addr = obj.delivery_address && typeof obj.delivery_address === 'object' ? obj.delivery_address : null
  return {
    _id: obj._id,
    booking_code: obj.booking_code,
    sequence_number: obj.sequence_number,
    fullName: obj.customer_info?.full_name || obj.user_id?.full_name || '',
    phoneNumber: obj.customer_info?.contact_phone || obj.user_id?.phone || '',
    email: obj.customer_info?.email || obj.user_id?.email || '',
    bookingType: obj.test_drive_type || 'showroom',
    showroomBranch: obj.showroom_branch || null,
    selectedDate: obj.booking_date ? dayjs(obj.booking_date).format('DD/MM/YYYY') : '',
    selectedTimeSlot: obj.time_slot || '',
    targetCarSku: car?.sku || '',
    targetCar: car ? { _id: car._id, name: car.name, sku: car.sku, image: car.images?.[0] || '' } : null,
    status: STATUS_MAP[obj.booking_status] || obj.booking_status,
    assignedStaff: obj.advisor_id
      ? { _id: obj.advisor_id._id, name: obj.advisor_id.full_name, avatar: obj.advisor_id.avatar || null }
      : null,
    requestedStaff: (obj.requested_staff || []).map((r) => ({
      _id: r.user_id?._id,
      fullName: r.user_id?.full_name || '',
      avatarUrl: r.user_id?.avatar || null,
    })),
    note: obj.customer_note || '',
    priority: obj.priority || 'MEDIUM',
    assignment_note: obj.assignment_note || '',
    // Nested object for BookingDetailDrawer
    delivery_address: addr,
    // Flat fields for LocationCell
    addressDetail: addr?.street || (typeof obj.delivery_address === 'string' ? obj.delivery_address : ''),
    ward: addr?.ward || '',
    district: addr?.district || '',
    city: addr?.city || '',
    hasDriverLicense: obj.has_driver_license || false,
    driverLicenseUrl: obj.driver_license_url || null,
    signatureUrl: obj.signature_url || null,
    interestLevel: obj.interest_level ?? null,
    evaluationFeedback: obj.evaluation_feedback || null,
    createdAt: obj.createdAt,
  }
}

export const getTestDriveBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const status = req.query.status || ''
  const search = req.query.search || ''
  const type = req.query.type || ''
  const dateStr = req.query.date || ''

  const query = { booking_type: 'test_drive' }

  if (status && status !== 'all') {
    const dbStatus = Object.keys(STATUS_MAP).find((k) => STATUS_MAP[k] === status) || status.toUpperCase()
    query.booking_status = dbStatus
  }

  if (type && type !== 'all') {
    query.test_drive_type = type
  }

  if (dateStr) {
    const start = dayjs(dateStr, 'DD/MM/YYYY').startOf('day').toDate()
    const end = dayjs(dateStr, 'DD/MM/YYYY').endOf('day').toDate()
    query.booking_date = { $gte: start, $lte: end }
  }

  if (search) {
    const users = await User.find({
      $or: [
        { full_name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ],
    }).select('_id')
    const userIds = users.map((u) => u._id)
    query.$or = [{ user_id: { $in: userIds } }, { 'customer_info.full_name': { $regex: search, $options: 'i' } }, { 'customer_info.contact_phone': { $regex: search, $options: 'i' } }]
  }

  const total = await Booking.countDocuments(query)

  const bookingsRaw = await Booking.find(query)
    .populate('user_id', 'full_name phone email avatar')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('requested_staff.user_id', 'full_name avatar')
    .sort({ booking_date: 1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  const data = bookingsRaw.map(normalizeBooking)

  // Stats (counts without pagination)
  const today = dayjs().startOf('day').toDate()
  const todayEnd = dayjs().endOf('day').toDate()
  const [todayCount, pendingCount, homeCount, showroomCount] = await Promise.all([
    Booking.countDocuments({ booking_type: 'test_drive', booking_date: { $gte: today, $lte: todayEnd } }),
    Booking.countDocuments({ booking_type: 'test_drive', booking_status: 'PENDING' }),
    Booking.countDocuments({ booking_type: 'test_drive', test_drive_type: 'home' }),
    Booking.countDocuments({ booking_type: 'test_drive', test_drive_type: 'showroom' }),
  ])

  res.json({
    data,
    stats: { today: todayCount, pending: pendingCount, home: homeCount, showroom: showroomCount },
    pagination: { current: page, pageSize: limit, total },
  })
})

const toKanbanTask = (b) => {
  const obj = b.toObject ? b.toObject() : b
  const car = obj.product_id
  const addr = obj.delivery_address
  const addressStr = addr
    ? [addr.street, addr.ward, addr.district, addr.city].filter(Boolean).join(', ')
    : ''
  return {
    id: String(obj._id),
    sequence_number: obj.sequence_number,
    title: `Lịch lái thử xe ${car?.name || car?.sku || ''}`,
    priority: obj.priority || 'MEDIUM',
    sla: null,
    vehicleModel: car?.name || car?.sku || '',
    licensePlate: '',
    customerName: obj.customer_info?.full_name || '',
    customerPhone: obj.customer_info?.contact_phone || '',
    appointmentDate: obj.booking_date ? dayjs(obj.booking_date).format('DD/MM/YYYY') : '',
    appointmentTime: obj.time_slot || '',
    description: obj.customer_note || '',
    locationType: obj.test_drive_type === 'home' ? 'HOME' : 'SHOWROOM',
    address: addressStr,
    status: obj.booking_status,
  }
}

export const getSalesStaff = asyncHandler(async (req, res) => {
  const saleRole = await Role.findOne({ role_name: 'sale' })
  if (!saleRole) {
    return res.json([])
  }

  const staffUsers = await User.find({ role_id: saleRole._id, is_active: { $ne: false } })
    .select('full_name avatar email phone')

  const staffWithWorkload = await Promise.all(
    staffUsers.map(async (u) => {
      const activeBookings = await Booking.find({
        booking_type: 'test_drive',
        advisor_id: u._id,
        booking_status: { $in: ['CONFIRMED', 'RECEIVED', 'IN_PROGRESS'] },
      })
        .populate('product_id', 'name sku images')
        .sort({ booking_date: 1 })

      const kanbanTasks = activeBookings.map(toKanbanTask)

      return {
        _id: u._id,
        fullName: u.full_name,
        avatarUrl: u.avatar || null,
        email: u.email,
        phone: u.phone,
        role: 'SALES_EXECUTIVE',
        status: 'ACTIVE',
        workload: kanbanTasks.length,
        performance: { kanban: { todo: kanbanTasks, inProgress: [] } },
      }
    })
  )

  res.json(staffWithWorkload)
})

export const assignTestDriveBooking = asyncHandler(async (req, res) => {
  const { staffId, priority, note } = req.body

  const booking = await Booking.findOne({ _id: req.params.id, booking_type: 'test_drive' })
  if (!booking) {
    res.status(404)
    throw new Error('Booking không tồn tại')
  }

  const staff = await User.findById(staffId)
  if (!staff) {
    res.status(404)
    throw new Error('Nhân viên không tồn tại')
  }

  booking.advisor_id = staffId
  booking.booking_status = 'CONFIRMED'
  if (priority) booking.priority = priority
  if (note) booking.assignment_note = note

  await booking.save()

  const dateStr = dayjs(booking.booking_date).format('DD/MM/YYYY')
  try {
    await Notification.create({
      user_id: booking.user_id,
      title: 'Xác nhận lịch lái thử',
      message: `Lịch lái thử của bạn vào ngày ${dateStr} (${booking.time_slot}) đã được xác nhận. Nhân viên phụ trách: ${staff.full_name}.`,
      type: 'BOOKING',
      reference_id: booking.booking_code,
      reference_link: '/profile/services',
      is_read: false,
    })
  } catch (_) {}

  try {
    const io = getIO()
    io.to('room_sale').emit('test_drive_assigned', {
      bookingId: booking._id,
      staffId,
    })
  } catch (_) {}

  const updated = await Booking.findById(booking._id)
    .populate('user_id', 'full_name phone email avatar')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('requested_staff.user_id', 'full_name avatar')

  res.json(normalizeBooking(updated))
})

export const getTestDriveBookingById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID không hợp lệ')
  }

  const booking = await Booking.findOne({ _id: req.params.id, booking_type: 'test_drive' })
    .populate('user_id', 'full_name phone email avatar')
    .populate('product_id', 'name sku images brandName price')
    .populate('advisor_id', 'full_name avatar email phone')
    .populate('requested_staff.user_id', 'full_name avatar')

  if (!booking) {
    res.status(404)
    throw new Error('Lịch lái thử không tồn tại')
  }

  res.json(normalizeBooking(booking))
})

export const searchCars = asyncHandler(async (req, res) => {
  const q = (req.query.q || '').trim()
  if (q.length < 1) return res.json([])

  const cars = await Car.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { sku: { $regex: q, $options: 'i' } },
      { brandName: { $regex: q, $options: 'i' } },
    ],
  })
    .select('_id name sku images brandName price')
    .limit(10)

  res.json(
    cars.map((c) => ({
      _id: c._id,
      name: c.name,
      sku: c.sku,
      brandName: c.brandName || '',
      image: c.images?.[0] || '',
      price: c.price || 0,
    }))
  )
})

export const createTestDriveBookingByAdmin = asyncHandler(async (req, res) => {
  const {
    full_name, contact_phone, email,
    product_id,
    test_drive_type, showroom_branch, delivery_address,
    booking_date, time_slot,
    advisor_id, priority, note,
  } = req.body

  if (!full_name || !contact_phone) {
    res.status(400)
    throw new Error('Vui lòng nhập tên và số điện thoại khách hàng')
  }
  if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
    res.status(400)
    throw new Error('Vui lòng chọn xe lái thử hợp lệ')
  }
  if (!booking_date || !time_slot) {
    res.status(400)
    throw new Error('Vui lòng chọn ngày và khung giờ')
  }

  const car = await Car.findById(product_id).select('name sku')
  if (!car) {
    res.status(404)
    throw new Error('Xe không tồn tại trong hệ thống')
  }

  // Try to link booking to an existing user account via phone
  let userId = null
  try {
    const existingUser = await User.findOne({ phone: contact_phone.trim() }).select('_id')
    if (existingUser) userId = existingUser._id
  } catch (_) {}

  // Validate optional staff assignment
  let assignedAdvisorId = null
  if (advisor_id && mongoose.Types.ObjectId.isValid(advisor_id)) {
    const staffUser = await User.findById(advisor_id).select('_id full_name')
    if (staffUser) assignedAdvisorId = staffUser._id
  }

  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  const booking_code = `TD-${Date.now()}-${rand}`
  const sequence_number = await getNextSequence('booking_seq_test_drive')

  const deliveryAddressObj =
    test_drive_type === 'home' && delivery_address && typeof delivery_address === 'object'
      ? delivery_address
      : null

  const booking = await Booking.create({
    booking_code,
    sequence_number,
    user_id: userId,
    customer_info: {
      full_name: full_name.trim(),
      contact_phone: contact_phone.trim(),
      email: (email || '').trim(),
    },
    booking_type: 'test_drive',
    product_id,
    booking_date: new Date(booking_date),
    time_slot,
    test_drive_type: test_drive_type || 'showroom',
    showroom_branch: test_drive_type !== 'home' ? (showroom_branch || '') : null,
    delivery_address: deliveryAddressObj || '',
    advisor_id: assignedAdvisorId,
    booking_status: assignedAdvisorId ? 'CONFIRMED' : 'PENDING',
    priority: priority || 'MEDIUM',
    assignment_note: note || '',
    customer_note: '',
  })

  // Notify linked user account if found
  if (userId) {
    try {
      const dateStr = dayjs(booking_date).format('DD/MM/YYYY')
      await Notification.create({
        user_id: userId,
        title: 'Lịch lái thử đã được đặt',
        message: `Admin đã tạo lịch lái thử xe ${car.name} cho bạn vào ${dateStr} (${time_slot}). Mã: ${booking_code}.`,
        type: 'BOOKING',
        reference_id: booking_code,
        reference_link: '/profile/services',
        is_read: false,
      })
    } catch (_) {}
  }

  try {
    const io = getIO()
    if (assignedAdvisorId) {
      io.to('room_sale').emit('test_drive_assigned', { bookingId: booking._id, staffId: assignedAdvisorId })
    }
    io.to('room_admin').emit('booking_updated', { bookingId: booking._id })
  } catch (_) {}

  const populated = await Booking.findById(booking._id)
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('user_id', 'full_name phone email')

  res.status(201).json(normalizeBooking(populated))
})
