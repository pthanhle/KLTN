import RepairProgress from '../../../../models/repairprogressModel.js'
import asyncHandler from 'express-async-handler'
import { createAndEmitNotification } from '../../../../utils/notificationHelper.js'

export const updateQC = asyncHandler(async (req, res) => {
    const { progress_id, qc_checklist, qc_metrics } = req.body

    const progress = await RepairProgress.findById(progress_id).populate('booking_id')
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (qc_checklist) {
        progress.qc_checklist = qc_checklist
    }

    if (qc_metrics) {
        progress.qc_metrics = qc_metrics
    }

    progress.current_step = 'QC_TESTING'
    progress.status = 'QC_TESTING'

    const stepExists = progress.timeline.find(t => t.step === 'QC_TESTING')
    if (!stepExists) {
        progress.timeline.push({
            step: 'QC_TESTING',
            status: 'COMPLETED',
            time: new Date(),
            note: 'Đang tiến hành kiểm tra chất lượng (QC)'
        })
    }

    await progress.save()

    // Notify customer that QC is done and final payment is needed
    const userId = progress.booking_id?.user_id
    if (userId) {
        createAndEmitNotification(userId, {
            title: 'Xe đã hoàn thành sửa chữa',
            message: 'Xe của bạn đã qua kiểm định chất lượng. Vui lòng thanh toán phần còn lại để nhận xe.',
            type: 'SERVICE',
            reference_id: progress._id.toString(),
            reference_link: `/service/tracking/${progress._id}`,
        }).catch(() => {})
    }

    res.json({
        message: 'Cập nhật QC thành công',
        repairProgress: progress
    })
})
