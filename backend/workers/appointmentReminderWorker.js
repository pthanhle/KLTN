import { Queue, Worker } from 'bullmq'
import redisConnection from '../config/redis.js'
import Booking from '../models/bookingModel.js'
import Notification from '../models/notificationModel.js'
import emailQueue from '../queues/emailQueue.js'
import { appointmentReminderEmail } from '../utils/emailTemplates.js'
import { createAndEmitNotification } from '../utils/notificationHelper.js'

const QUEUE_NAME = 'appointmentReminderQueue'

const appointmentReminderQueue = new Queue(QUEUE_NAME, { connection: redisConnection })

// Schedule daily at 7:00 AM server time
appointmentReminderQueue.add(
  'dailyReminder',
  {},
  {
    repeat: { pattern: '0 7 * * *' },
    jobId: 'appointment-reminder-daily',
    removeOnComplete: { count: 5 },
    removeOnFail: { count: 10 },
  }
)

const appointmentReminderWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    console.log('[AppointmentReminder] Bắt đầu gửi nhắc lịch hẹn hôm nay...')

    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)
    const startOfTomorrow = new Date(now)
    startOfTomorrow.setHours(24, 0, 0, 0)

    const bookingsToday = await Booking.find({
      booking_date: { $gte: startOfToday, $lt: startOfTomorrow },
      booking_status: { $in: ['PENDING', 'CONFIRMED'] },
    }).lean()

    console.log(`[AppointmentReminder] Tìm thấy ${bookingsToday.length} lịch hẹn hôm nay`)

    let reminded = 0
    for (const booking of bookingsToday) {
      const customerEmail = booking.customer_info?.email
      if (!customerEmail) continue

      // Skip if a reminder notification was already sent for this booking today
      const alreadySent = await Notification.findOne({
        reference_id: booking.booking_code,
        title: 'Nhắc lịch hẹn hôm nay',
        createdAt: { $gte: startOfToday },
      })
      if (alreadySent) continue

      const formattedDate = new Date(booking.booking_date).toLocaleDateString('vi-VN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })

      const locationInfo = booking.test_drive_type === 'home'
        ? (booking.delivery_address || '')
        : (booking.showroom_branch || 'Showroom TT AUTO')

      await emailQueue.add('sendEmail', {
        to: customerEmail,
        ...appointmentReminderEmail(
          booking.customer_info.full_name,
          booking.booking_code,
          booking.booking_type,
          formattedDate,
          booking.time_slot,
          locationInfo,
        ),
      })

      if (booking.user_id) {
        await createAndEmitNotification(booking.user_id, {
          title: 'Nhắc lịch hẹn hôm nay',
          message: `Bạn có lịch hẹn tại TT AUTO hôm nay (${booking.time_slot}). Mã: ${booking.booking_code}.`,
          type: 'BOOKING',
          reference_id: booking.booking_code,
          reference_link: '/profile/services',
        })
      } else {
        await Notification.create({
          title: 'Nhắc lịch hẹn hôm nay',
          message: `Lịch hẹn ${booking.booking_code} hôm nay (${booking.time_slot}).`,
          type: 'BOOKING',
          reference_id: booking.booking_code,
        })
      }

      reminded++
    }

    console.log(`[AppointmentReminder] Đã gửi nhắc lịch cho ${reminded} khách hàng`)
  },
  { connection: redisConnection }
)

appointmentReminderWorker.on('completed', (job) => {
  console.log(`[AppointmentReminder] Job ${job.id} hoàn thành`)
})

appointmentReminderWorker.on('failed', (job, err) => {
  console.error(`[AppointmentReminder] Job ${job?.id} thất bại:`, err.message)
})

export default appointmentReminderWorker
