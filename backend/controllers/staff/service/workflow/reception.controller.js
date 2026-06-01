import RepairProgress from '../../../../models/repairprogressModel.js'
import Booking from '../../../../models/bookingModel.js'
import asyncHandler from 'express-async-handler'

export const processReception = asyncHandler(async (req, res) => {
    const { booking_id, odometer, fuel_level, customer_notes, damage_map, belongings } = req.body

    if (!booking_id) {
        res.status(400)
        throw new Error('Vui lòng cung cấp booking_id')
    }

    const booking = await Booking.findById(booking_id)
    if (!booking) {
        res.status(404)
        throw new Error('Không tìm thấy lịch hẹn')
    }

    if (booking.booking_status === 'CANCELLED' || booking.booking_status === 'COMPLETED') {
        res.status(400)
        throw new Error(`Không thể tiếp nhận booking đang ở trạng thái ${booking.booking_status}`)
    }

    booking.booking_status = 'RECEIVED'
    await booking.save()

    let progress = await RepairProgress.findOne({ booking_id })

    if (progress) {
        progress.reception_info = {
            odometer,
            fuel_level,
            customer_notes,
            damage_map: damage_map || [],
            belongings: belongings || []
        }
        progress.current_step = 'RECEIVED'
        progress.status = 'RECEIVED'
    } else {
        progress = new RepairProgress({
            booking_id,
            advisor_id: req.user._id,
            current_step: 'RECEIVED',
            status: 'RECEIVED',
            reception_info: {
                odometer,
                fuel_level,
                customer_notes,
                damage_map: damage_map || [],
                belongings: belongings || []
            },
            timeline: [{
                step: 'RECEIVED',
                status: 'COMPLETED',
                time: new Date(),
                note: 'Đã tiếp nhận xe'
            }]
        })
    }

    await progress.save()

    res.status(201).json({
        message: 'Tiếp nhận xe thành công',
        repairProgress: await RepairProgress.findById(progress._id).populate('booking_id')
    })
})
