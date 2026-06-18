import RepairProgress from '../../../../models/repairprogressModel.js'
import asyncHandler from 'express-async-handler'
import { getIO } from '../../../../config/socket.js'

export const assignMechanic = asyncHandler(async (req, res) => {
    const { progress_id, mechanic_id, bay_id, start_time, end_time } = req.body

    if (!progress_id || !mechanic_id) {
        res.status(400)
        throw new Error('Vui lòng cung cấp progress_id và mechanic_id')
    }

    const progress = await RepairProgress.findById(progress_id)
        .populate('booking_id')
        .populate('advisor_id', 'full_name')

    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (progress.status !== 'RECEIVED') {
        res.status(400)
        throw new Error(`Không thể phân công: trạng thái hiện tại là ${progress.status}`)
    }

    progress.mechanic_id = mechanic_id
    progress.current_step = 'DIAGNOSING'
    progress.status = 'DIAGNOSING'

    if (bay_id) progress.bay_id = bay_id
    if (start_time) progress.expected_start_datetime = new Date(start_time)
    if (end_time) progress.expected_end_datetime = new Date(end_time)

    const diagnosingStepExists = progress.timeline.some(t => t.step === 'DIAGNOSING')
    if (!diagnosingStepExists) {
        progress.timeline.push({
            step: 'DIAGNOSING',
            status: 'IN_PROGRESS',
            time: new Date(),
            note: `Đã phân công KTV, khoang ${bay_id || ''}`,
            ...(start_time && { expected_start: start_time }),
            ...(end_time && { expected_end: end_time }),
        })
    }

    await progress.save()

    if (progress.booking_id) {
        progress.booking_id.mechanic_id = mechanic_id;
        await progress.booking_id.save();
    }

    const populated = await RepairProgress.findById(progress._id)
        .populate('booking_id')
        .populate('mechanic_id', 'full_name')
        .populate('advisor_id', 'full_name')

    try {
        const io = getIO()
        io.to(`user_${mechanic_id}`).emit('new_task_assigned', {
            progress_id: progress._id,
            booking_code: progress.booking_id?.booking_code,
            bay_id,
            start_time,
            end_time,
            message: 'Bạn vừa được phân công một lệnh sửa chữa mới',
        })
    } catch (_) { }

    res.json({
        message: 'Phân công KTV thành công',
        repairProgress: populated,
    })
})
