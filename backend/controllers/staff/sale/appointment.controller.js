import Booking from '../../../models/bookingModel.js'
import User from '../../../models/userModel.js'
import Notification from '../../../models/notificationModel.js'
import asyncHandler from 'express-async-handler'
import dayjs from 'dayjs'
import { getIO } from '../../../config/socket.js'
import { cloudinary, ensureConfigured } from '../../../config/cloudinary.js'

const STATUS_MAP = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  RECEIVED: 'Received',
  IN_PROGRESS: 'InProgress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'RECEIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

const normalizeBooking = (b) => {
  const obj = b.toObject ? b.toObject() : b
  const car = obj.product_id
  return {
    _id: obj._id,
    booking_code: obj.booking_code,
    fullName: obj.customer_info?.full_name || obj.user_id?.full_name || '',
    phoneNumber: obj.customer_info?.contact_phone || obj.user_id?.phone || '',
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
    driverLicenseUrl: obj.driver_license_url || null,
    signatureUrl: obj.signature_url || null,
    interestLevel: obj.interest_level ?? null,
    evaluationFeedback: obj.evaluation_feedback || null,
    createdAt: obj.createdAt,
  }
}

const toTaskModel = (b) => {
  const obj = b.toObject ? b.toObject() : b
  const car = obj.product_id
  const statusToTask = {
    CONFIRMED: 'confirmed',
    RECEIVED: 'customer_arrived',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'post_drive',
    CANCELLED: 'done',
  }
  const addr = obj.delivery_address
  let addressStr = ''
  let city = ''
  let district = ''
  let ward = ''
  let street = ''

  if (obj.test_drive_type === 'home' && addr) {
    if (typeof addr === 'string') {
      addressStr = addr
    } else {
      city = addr.city || ''
      district = addr.district || ''
      ward = addr.ward || ''
      street = addr.street || ''
      addressStr = [street, ward, district, city].filter(Boolean).join(', ')
    }
  } else {
    if (obj.showroom_branch) {
      addressStr = obj.showroom_branch
    }
    if (obj.user_id && obj.user_id.addresses && obj.user_id.addresses.length > 0) {
      const defaultAddr = obj.user_id.addresses.find((a) => a.is_default) || obj.user_id.addresses[0]
      city = defaultAddr.city || ''
      district = defaultAddr.district || ''
      ward = defaultAddr.ward || ''
      street = defaultAddr.street || ''
    }
  }

  return {
    id: String(obj._id),
    title: `Lịch lái thử xe ${car?.name || car?.sku || ''}`,
    priority: obj.priority || 'MEDIUM',
    status: statusToTask[obj.booking_status] || 'confirmed',
    sla: null,
    customerId: obj.user_id?._id ? String(obj.user_id._id) : null,
    customerName: obj.customer_info?.full_name || obj.user_id?.full_name || '',
    customerPhone: obj.customer_info?.contact_phone || obj.user_id?.phone || '',
    customerEmail: obj.customer_info?.email || obj.user_id?.email || '',
    customerTaxCode: obj.user_id?.tax_info?.tax_code || '',
    customerCompanyName: obj.user_id?.tax_info?.company_name || '',
    customerCity: city,
    customerDistrict: district,
    customerWard: ward,
    customerStreet: street,
    productId: car?._id ? String(car._id) : null,
    vehicleModel: car?.name || car?.sku || '',
    licensePlate: '',
    appointmentDate: obj.booking_date ? dayjs(obj.booking_date).format('DD/MM/YYYY') : '',
    appointmentTime: obj.time_slot || '',
    description: obj.customer_note || obj.assignment_note || '',
    locationType: obj.test_drive_type === 'home' ? 'HOME' : 'SHOWROOM',
    address: addressStr,
    isBlinking: false,
    taskType: 'TEST_DRIVE',
  }
}

// GET /staff/sale/appointments — my assigned bookings (for mobile tasks)
export const getAppointments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 50
  const dateStr = req.query.date || ''
  const search = req.query.search || req.query.q || ''

  const query = {
    booking_type: 'test_drive',
    advisor_id: req.user._id,
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
    query.$or = [
      { user_id: { $in: userIds } },
      { 'customer_info.full_name': { $regex: search, $options: 'i' } },
      { 'customer_info.contact_phone': { $regex: search, $options: 'i' } }
    ]
  }

  const total = await Booking.countDocuments(query)
  const bookingsRaw = await Booking.find(query)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('requested_staff.user_id', 'full_name avatar')
    .sort({ booking_date: 1 })
    .skip((page - 1) * limit)
    .limit(limit)

  const tasks = bookingsRaw.map(toTaskModel)
  const bookings = bookingsRaw.map(normalizeBooking)

  res.json({
    tasks,
    bookings,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
})

// GET /staff/sale/appointments/pool — unassigned PENDING bookings
export const getPool = asyncHandler(async (req, res) => {
  const query = {
    booking_type: 'test_drive',
    booking_status: 'PENDING',
    advisor_id: { $in: [null, undefined] },
  }

  const bookingsRaw = await Booking.find(query)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('requested_staff.user_id', 'full_name avatar')
    .sort({ booking_date: 1, createdAt: 1 })

  const data = bookingsRaw.map(normalizeBooking)
  res.json(data)
})

// GET /staff/sale/appointments/:id
export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Booking.findById(req.params.id)
    .populate('user_id', 'full_name email phone avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('requested_staff.user_id', 'full_name avatar')

  if (!appointment || appointment.booking_type !== 'test_drive') {
    res.status(404)
    throw new Error('Lịch lái thử không tồn tại hoặc không hợp lệ')
  }

  res.json(normalizeBooking(appointment))
})

// POST /staff/sale/appointments/:id/request — sales staff requests a job
export const requestJob = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    booking_type: 'test_drive',
    booking_status: 'PENDING',
  })

  if (!booking) {
    res.status(404)
    throw new Error('Booking không tồn tại hoặc đã được phân công')
  }

  const alreadyRequested = booking.requested_staff.some(
    (r) => String(r.user_id) === String(req.user._id)
  )
  if (alreadyRequested) {
    return res.json({ message: 'Đã yêu cầu nhận việc này trước đó' })
  }

  booking.requested_staff.push({ user_id: req.user._id, requested_at: new Date() })
  await booking.save()

  try {
    const io = getIO()
    io.to('room_admin').emit('test_drive_job_requested', {
      bookingId: booking._id,
      staffId: req.user._id,
      staffName: req.user.full_name,
      staffAvatar: req.user.avatar,
    })
  } catch (_) { }

  const updated = await Booking.findById(booking._id)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('requested_staff.user_id', 'full_name avatar')

  res.json(normalizeBooking(updated))
})

// POST /staff/sale/appointments/:id/checkin
export const submitCheckin = asyncHandler(async (req, res) => {
  const { driver_license_base64, signature_base64 } = req.body

  const appointment = await Booking.findById(req.params.id)
  if (!appointment || appointment.booking_type !== 'test_drive') {
    res.status(404)
    throw new Error('Lịch lái thử không tồn tại')
  }

  if (String(appointment.advisor_id) !== String(req.user._id)) {
    res.status(403)
    throw new Error('Bạn không được phân công cho lịch lái thử này')
  }

  try {
    ensureConfigured()
    if (driver_license_base64) {
      const prefix = driver_license_base64.startsWith('data:') ? '' : 'data:image/jpeg;base64,'
      const result = await cloudinary.uploader.upload(`${prefix}${driver_license_base64}`, {
        folder: 'carshop/checkin/license',
        resource_type: 'image',
      })
      appointment.driver_license_url = result.secure_url
    }

    if (signature_base64) {
      const prefix = signature_base64.startsWith('data:') ? '' : 'data:image/png;base64,'
      const result = await cloudinary.uploader.upload(`${prefix}${signature_base64}`, {
        folder: 'carshop/checkin/signature',
        resource_type: 'image',
      })
      appointment.signature_url = result.secure_url
    }
  } catch (uploadErr) {
    console.error('Cloudinary upload error:', uploadErr.message)
  }

  appointment.booking_status = 'RECEIVED'
  await appointment.save()

  const final = await Booking.findById(appointment._id)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')

  res.json({ message: 'Check-in thành công', appointment: normalizeBooking(final), task: toTaskModel(final) })
})

// POST /staff/sale/appointments/:id/post-drive
export const submitPostDrive = asyncHandler(async (req, res) => {
  const { interest_level, feedback } = req.body

  const appointment = await Booking.findById(req.params.id)
  if (!appointment || appointment.booking_type !== 'test_drive') {
    res.status(404)
    throw new Error('Lịch lái thử không tồn tại')
  }

  if (String(appointment.advisor_id) !== String(req.user._id)) {
    res.status(403)
    throw new Error('Bạn không được phân công cho lịch lái thử này')
  }

  if (interest_level !== undefined && interest_level !== null) {
    appointment.interest_level = Number(interest_level)
  }
  if (feedback !== undefined) {
    appointment.evaluation_feedback = feedback
  }
  appointment.booking_status = 'COMPLETED'
  await appointment.save()

  if (appointment.user_id) {
    try {
      await Notification.create({
        user_id: appointment.user_id,
        title: 'Hoàn thành lái thử',
        message: `Cảm ơn bạn đã lái thử xe ngày ${dayjs(appointment.booking_date).format('DD/MM/YYYY')}. Hy vọng bạn có trải nghiệm tốt!`,
        type: 'BOOKING',
        reference_id: appointment.booking_code,
        reference_link: '/profile/services',
        is_read: false,
      })
    } catch (_) { }
  }

  const final = await Booking.findById(appointment._id)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')

  res.json({ message: 'Đánh giá lái thử đã được lưu', appointment: normalizeBooking(final), task: toTaskModel(final) })
})

// PUT /staff/sale/appointments/:id — update status
export const updateAppointment = asyncHandler(async (req, res) => {
  const { status, note } = req.body

  const appointment = await Booking.findById(req.params.id)
  if (!appointment || appointment.booking_type !== 'test_drive') {
    res.status(404)
    throw new Error('Lịch lái thử không tồn tại hoặc không hợp lệ')
  }

  // Verify this staff is the assigned advisor
  if (String(appointment.advisor_id) !== String(req.user._id)) {
    res.status(403)
    throw new Error('Bạn không được phân công cho lịch lái thử này')
  }

  const upperStatus = status?.toUpperCase()
  if (!VALID_STATUSES.includes(upperStatus)) {
    res.status(400)
    throw new Error('Trạng thái không hợp lệ')
  }

  appointment.booking_status = upperStatus
  if (note) appointment.customer_note = note

  await appointment.save()

  if (upperStatus === 'CANCELLED') {
    const message = `Lịch lái thử xe của bạn vào ngày ${dayjs(appointment.booking_date).format('DD/MM/YYYY')} đã bị hủy.${note ? ` Lý do: ${note}` : ''}`
    try {
      await Notification.create({
        user_id: appointment.user_id,
        title: 'Hủy lịch lái thử',
        message,
        type: 'BOOKING',
        reference_id: appointment.booking_code,
        reference_link: '/profile/services',
        is_read: false,
      })
    } catch (_) { }
  } else if (upperStatus === 'COMPLETED') {
    const message = `Cảm ơn bạn đã lái thử xe ngày ${dayjs(appointment.booking_date).format('DD/MM/YYYY')}. Hy vọng bạn có trải nghiệm tốt!`
    try {
      await Notification.create({
        user_id: appointment.user_id,
        title: 'Hoàn thành lái thử',
        message,
        type: 'BOOKING',
        reference_id: appointment.booking_code,
        reference_link: '/profile/services',
        is_read: false,
      })
    } catch (_) { }
  }

  const final = await Booking.findById(appointment._id)
    .populate('user_id', 'full_name phone email avatar addresses tax_info')
    .populate('product_id', 'name sku images')
    .populate('advisor_id', 'full_name avatar')
    .populate('requested_staff.user_id', 'full_name avatar')

  res.json({
    message: 'Cập nhật lịch lái thử thành công',
    appointment: normalizeBooking(final),
    task: toTaskModel(final),
  })
})
