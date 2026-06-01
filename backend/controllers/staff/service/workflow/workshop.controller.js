import RepairProgress from '../../../../models/repairprogressModel.js'
import Part from '../../../../models/partModel.js'
import asyncHandler from 'express-async-handler'

export const updateDiagnostics = asyncHandler(async (req, res) => {
    const { progress_id, diagnostics } = req.body

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    progress.diagnostics = diagnostics || []
    progress.current_step = 'DIAGNOSING'
    progress.status = 'DIAGNOSING'

    const stepExists = progress.timeline.find(t => t.step === 'DIAGNOSING')
    if (!stepExists) {
        progress.timeline.push({
            step: 'DIAGNOSING',
            status: 'COMPLETED',
            time: new Date(),
            note: 'Đã hoàn tất chuẩn đoán'
        })
    }

    await progress.save()

    res.json({
        message: 'Cập nhật chuẩn đoán thành công',
        repairProgress: progress
    })
})

export const createQuotation = asyncHandler(async (req, res) => {
    const { progress_id, parts, labors, vat_rate, deposit_amount } = req.body

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    progress.quotation = {
        parts: parts || [],
        labors: labors || [],
        vat_rate: vat_rate || 0.1,
        deposit_amount: deposit_amount || 0,
        status: 'PENDING'
    }
    progress.current_step = 'QUOTING'
    progress.status = 'QUOTING'

    await progress.save()

    res.json({
        message: 'Tạo báo giá thành công',
        repairProgress: progress
    })
})


export const approveQuotation = asyncHandler(async (req, res) => {
    const { progress_id } = req.body

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (progress.quotation.status === 'APPROVED') {
        res.status(400)
        throw new Error('Báo giá đã được phê duyệt trước đó')
    }

    progress.quotation.status = 'APPROVED'
    progress.quotation.approved_at = new Date()
    progress.current_step = 'IN_PROGRESS'
    progress.status = 'IN_PROGRESS'

    progress.timeline.push({
        step: 'IN_PROGRESS',
        status: 'COMPLETED',
        time: new Date(),
        note: 'Báo giá đã được duyệt, bắt đầu sửa chữa'
    })

    const partsToUse = progress.quotation.parts || []

    progress.parts_usage = []

    for (const qPart of partsToUse) {
        const partDB = await Part.findOne({ sku: qPart.sku })

        let isBackordered = false
        if (partDB) {
            if (partDB.inventory.available_stock < qPart.quantity) {
                isBackordered = true
            }

            partDB.inventory.allocated += qPart.quantity
            partDB.inventory.available_stock -= qPart.quantity
            await partDB.save()
        } else {
            isBackordered = true
        }

        const etaDate = isBackordered ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : new Date()

        progress.parts_usage.push({
            name: qPart.name,
            sku: qPart.sku,
            quantity: qPart.quantity,
            progress: 0,
            status: 'WAITING',
            eta: etaDate
        })
    }

    await progress.save()

    res.json({
        message: 'Phê duyệt báo giá và xuất kho thành công',
        repairProgress: progress
    })
})
