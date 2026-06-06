import Booking from '../../models/bookingModel.js'
import User from '../../models/userModel.js'
import Role from '../../models/roleModel.js'
import Notification from '../../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
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
  return {
    _id: obj._id,
    booking_code: obj.booking_code,
    fullName: obj.customer_info?.full_name || obj.user_id?.full_name || '',
    phoneNumber: obj.customer_info?.contact_phone || obj.user_id?.phone || '',
    email: obj.customer_info?.email || obj.user_id?.email || '',
    bookingType: obj.test_drive_type || 'showroom',
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
    delivery_address: obj.delivery_address || null,
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
