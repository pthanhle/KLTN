import RepairProgress from '../../../../models/repairprogressModel.js'
import asyncHandler from 'express-async-handler'
import { createAndEmitNotification } from '../../../../utils/notificationHelper.js'

export const updateQC = asyncHandler(async (req, res) => {
    const { progress_id, qc_checklist, qc_metrics, advisor_signature } = req.body

    const progress = await RepairProgress.findById(progress_id).populate('booking_id')
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    // Map mobile format { id, label, passed } → schema format { task, status, checked_at }
    if (qc_checklist) {
        progress.qc_checklist = qc_checklist.map(item => ({
            task: item.label || item.task || '',
            status: item.passed ? 'passed' : (item.status || 'pending'),
            checked_at: item.passed ? new Date() : null,
        }))
    }

    if (advisor_signature) {
        progress.qc_advisor_signature = advisor_signature
    }

    if (qc_metrics) {
        progress.qc_metrics = {
            pass_rate: qc_metrics.items_total > 0
                ? Math.round((qc_metrics.items_passed / qc_metrics.items_total) * 100)
                : 0,
            ...qc_metrics,
        }
    }

    // Advisor has signed off — advance to COMPLETED (ready for handover)
    progress.current_step = 'COMPLETED'
    progress.status = 'COMPLETED'

    const stepExists = progress.timeline.find(t => t.step === 'QC_TESTING')
    if (!stepExists) {
        progress.timeline.push({
            step: 'QC_TESTING',
            status: 'COMPLETED',
            time: new Date(),
            note: 'Kiểm định chất lượng hoàn tất, xe sẵn sàng bàn giao'
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
