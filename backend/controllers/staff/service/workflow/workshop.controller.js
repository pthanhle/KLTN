import RepairProgress from '../../../../models/repairprogressModel.js'
import Part from '../../../../models/partModel.js'
import asyncHandler from 'express-async-handler'
import { getIO } from '../../../../config/socket.js'

// Payload: { progress_id, diagnostics: [{id, title, icon, technician_note, items:[{name,status,action_required}]}], conclusion }
export const updateDiagnostics = asyncHandler(async (req, res) => {
    const { progress_id, diagnostics, conclusion } = req.body

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    // Store diagnostics inside the DIAGNOSING timeline step (SSOT)
    const diagIdx = progress.timeline.findIndex(t => t.step === 'DIAGNOSING')
    if (diagIdx !== -1) {
        progress.timeline[diagIdx].status = 'COMPLETED'
        progress.timeline[diagIdx].diagnostics = diagnostics || []
        if (conclusion) progress.timeline[diagIdx].notes = conclusion
    } else {
        progress.timeline.push({
            step: 'DIAGNOSING',
            status: 'COMPLETED',
            time: new Date(),
            note: 'Đã hoàn tất chẩn đoán',
            diagnostics: diagnostics || [],
            notes: conclusion || '',
        })
    }

    // KTV done → hand off to SA for quoting
    progress.current_step = 'QUOTING'
    progress.status = 'QUOTING'

    const quotingStepExists = progress.timeline.some(t => t.step === 'QUOTING')
    if (!quotingStepExists) {
        progress.timeline.push({
            step: 'QUOTING',
            status: 'IN_PROGRESS',
            time: new Date(),
            note: 'Chờ cố vấn lập báo giá',
        })
    }

    await progress.save()

    // Notify SA via socket
    try {
        const io = getIO()
        if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('diagnosis_completed', {
                progress_id: progress._id,
                message: 'KTV đã hoàn tất chẩn đoán. Vui lòng lập báo giá.',
            })
        }
    } catch (_) {}

    res.json({
        message: 'Hoàn tất chẩn đoán thành công',
        repairProgress: progress,
    })
})

export const markJobDone = asyncHandler(async (req, res) => {
    const { progress_id } = req.body

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (progress.status !== 'IN_PROGRESS') {
        res.status(400)
        throw new Error(`Không thể hoàn tất: trạng thái hiện tại là ${progress.status}`)
    }

    progress.current_step = 'QC_TESTING'
    progress.status = 'QC_TESTING'

    const stepExists = progress.timeline.some(t => t.step === 'QC_TESTING')
    if (!stepExists) {
        progress.timeline.push({
            step: 'QC_TESTING',
            status: 'IN_PROGRESS',
            time: new Date(),
            note: 'KTV đã hoàn tất thi công, chờ SA nghiệm thu QC',
        })
    }

    await progress.save()

    try {
        const io = getIO()
        if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('job_completed', {
                progress_id: progress._id,
                message: 'KTV đã hoàn tất thi công. Vui lòng thực hiện QC nghiệm thu.',
            })
        }
        io.to('room_admin').emit('job_completed', {
            progress_id: progress._id,
            message: 'KTV hoàn tất thi công. Xe đợi QC.',
        })
    } catch (_) {}

    res.json({
        message: 'Đã đánh dấu hoàn tất thi công',
        repairProgress: progress,
    })
})

export const createQuotation = asyncHandler(async (req, res) => {
    const { progress_id, parts, labors, vat_rate, service_package_total } = req.body

    const progress = await RepairProgress.findById(progress_id).populate('booking_id')
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    const vatRate = vat_rate || 0.1
    const pkgTotal = service_package_total != null
        ? Number(service_package_total)
        : (progress.booking_id?.total_cost || 0)

    const partsTotal = (parts || []).reduce((s, p) => s + (p.quantity || 0) * (p.unit_price || 0), 0)
    const laborsTotal = (labors || []).reduce((s, l) => s + (l.hours || 0) * (l.rate || 0), 0)
    const subtotal = pkgTotal + partsTotal + laborsTotal
    const vat = subtotal * vatRate
    const finalAmount = subtotal + vat
    const depositAmount = Math.round(finalAmount * 0.5)

    progress.quotation = {
        service_package_total: pkgTotal,
        parts: parts || [],
        labors: labors || [],
        vat_rate: vatRate,
        deposit_amount: depositAmount,
        final_amount: finalAmount,
        status: 'PENDING',
    }
    progress.current_step = 'QUOTING'
    progress.status = 'QUOTING'

    await progress.save()

    res.json({
        message: 'Tạo báo giá thành công',
        repairProgress: progress,
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

    // Notify tech and SA via socket
    try {
        const io = getIO()
        if (progress.mechanic_id) {
            io.to(`user_${progress.mechanic_id}`).emit('quotation_approved', {
                progress_id: progress._id,
                message: 'Báo giá đã được duyệt. Bắt đầu thi công!',
            })
        }
        if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('quotation_approved', {
                progress_id: progress._id,
                message: 'Báo giá đã được phê duyệt thành công.',
            })
        }
    } catch (_) {}

    res.json({
        message: 'Phê duyệt báo giá và xuất kho thành công',
        repairProgress: progress
    })
})
