import RepairProgress from '../../../../models/repairprogressModel.js'
import asyncHandler from 'express-async-handler'

export const updateQC = asyncHandler(async (req, res) => {
    const { progress_id, qc_checklist, qc_metrics } = req.body

    const progress = await RepairProgress.findById(progress_id)
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

    res.json({
        message: 'Cập nhật QC thành công',
        repairProgress: progress
    })
})
