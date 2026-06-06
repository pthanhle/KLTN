import RepairProgress from '../../../../models/repairprogressModel.js'
import Booking from '../../../../models/bookingModel.js'
import asyncHandler from 'express-async-handler'

export const processReception = asyncHandler(async (req, res) => {
    const { booking_id, odometer, fuel_level, customer_notes, damage_map, belongings, advisor_signature_data, customer_signature_data } = req.body

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

    booking.booking_status = 'IN_PROGRESS'
    await booking.save()

    let progress = await RepairProgress.findOne({ booking_id })

    const receptionInfoData = {
        odometer,
        fuel_level,
        customer_notes,
        damage_map: damage_map || [],
        belongings: belongings || []
    }

    const signaturesData = {}
    if (customer_signature_data) {
        signaturesData.customer = {
            name: 'Khách hàng',
            signature_url: customer_signature_data
        }
    }
    if (advisor_signature_data) {
        signaturesData.advisor = {
            name: 'Cố vấn dịch vụ',
            signature_url: advisor_signature_data
        }
    }

    if (progress) {
        // Only reset to RECEIVED if mechanic hasn't been assigned yet.
        // If admin already assigned (DIAGNOSING), keep that status so the
        // workshop dispatch board isn't disrupted.
        if (progress.status === 'RECEIVED') {
            progress.current_step = 'RECEIVED'
            progress.status = 'RECEIVED'
        }
        // If DIAGNOSING (mechanic already assigned), status stays DIAGNOSING.

        const receivedStepIndex = progress.timeline.findIndex(t => t.step === 'RECEIVED')
        if (receivedStepIndex !== -1) {
            progress.timeline[receivedStepIndex].status = 'COMPLETED'
            progress.timeline[receivedStepIndex].reception_info = receptionInfoData
            if (Object.keys(signaturesData).length > 0) {
                progress.timeline[receivedStepIndex].signatures = {
                    ...progress.timeline[receivedStepIndex].signatures,
                    ...signaturesData
                }
            }
        } else {
            progress.timeline.push({
                step: 'RECEIVED',
                status: 'COMPLETED',
                time: new Date(),
                note: 'Đã tiếp nhận xe',
                reception_info: receptionInfoData,
                signatures: signaturesData
            })
        }
    } else {
        progress = new RepairProgress({
            booking_id,
            advisor_id: req.user._id,
            current_step: 'RECEIVED',
            status: 'RECEIVED',
            timeline: [{
                step: 'RECEIVED',
                status: 'COMPLETED',
                time: new Date(),
                note: 'Đã tiếp nhận xe',
                reception_info: receptionInfoData,
                signatures: signaturesData
            }]
        })
    }

    await progress.save()

    res.status(201).json({
        message: 'Tiếp nhận xe thành công',
        repairProgress: await RepairProgress.findById(progress._id).populate('booking_id')
    })
})
