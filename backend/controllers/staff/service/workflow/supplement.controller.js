import RepairProgress from '../../../../models/repairprogressModel.js'
import asyncHandler from 'express-async-handler'
import { getIO } from '../../../../config/socket.js'

export const createSupplement = asyncHandler(async (req, res) => {
    const { progress_id, title, description, parts, labors, total_price, delay_reason, evidence_images } = req.body

    const progress = await RepairProgress.findById(progress_id).populate('mechanic_id', 'full_name')
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (progress.status !== 'IN_PROGRESS') {
        res.status(400)
        throw new Error('Chỉ có thể tạo yêu cầu bổ sung khi xe đang trong trạng thái thi công')
    }

    const supplement = {
        title,
        description,
        mechanic_name: progress.mechanic_id?.full_name || 'KTV',
        evidence_images: evidence_images || [],
        parts: parts || [],
        labors: labors || [],
        total_price: total_price || 0,
        delay_reason: delay_reason || '',
        status: 'PENDING',
        created_at: new Date(),
    }

    progress.supplement_requests.push(supplement)
    progress.status = 'IN_PROGRESS'

    await progress.save()

    try {
        const io = getIO()
        if (progress.advisor_id) {
            io.to(`user_${progress.advisor_id}`).emit('supplement_requested', {
                progress_id: progress._id,
                title,
                message: 'KTV có yêu cầu bổ sung sửa chữa. Vui lòng xem xét.',
            })
        }
        io.to('room_admin').emit('supplement_requested', {
            progress_id: progress._id,
            title,
            message: 'Có yêu cầu bổ sung sửa chữa mới.',
        })
    } catch (_) {}

    res.status(201).json({
        message: 'Đã tạo yêu cầu bổ sung thành công',
        supplement: progress.supplement_requests[progress.supplement_requests.length - 1],
    })
})

export const resolveSupplement = asyncHandler(async (req, res) => {
    const { progress_id, supplement_id, action } = req.body

    if (!['APPROVED', 'REJECTED'].includes(action)) {
        res.status(400)
        throw new Error('action phải là APPROVED hoặc REJECTED')
    }

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    const supplement = progress.supplement_requests.id(supplement_id)
    if (!supplement) {
        res.status(404)
        throw new Error('Không tìm thấy yêu cầu bổ sung')
    }

    supplement.status = action
    supplement.resolved_at = new Date()

    if (action === 'APPROVED') {
        const approvedParts = supplement.parts || []
        const approvedLabors = supplement.labors || []

        progress.quotation.parts = [...(progress.quotation.parts || []), ...approvedParts]
        progress.quotation.labors = [...(progress.quotation.labors || []), ...approvedLabors]

        const supplementTotal = supplement.total_price || 0
        const currentParts = progress.quotation.parts.reduce((s, p) => s + (p.unit_price * p.quantity), 0)
        const currentLabors = progress.quotation.labors.reduce((s, l) => s + (l.hours * l.rate), 0)
        progress.quotation.deposit_amount = (progress.quotation.deposit_amount || 0) + supplementTotal * 0.1
    }

    progress.status = 'IN_PROGRESS'
    await progress.save()

    try {
        const io = getIO()
        if (progress.mechanic_id) {
            io.to(`user_${progress.mechanic_id}`).emit('supplement_resolved', {
                progress_id: progress._id,
                action,
                message: action === 'APPROVED' ? 'Yêu cầu bổ sung đã được duyệt. Tiếp tục thi công.' : 'Yêu cầu bổ sung bị từ chối. Tiếp tục với hạng mục đã duyệt.',
            })
        }
    } catch (_) {}

    res.json({
        message: action === 'APPROVED' ? 'Đã duyệt yêu cầu bổ sung' : 'Đã từ chối yêu cầu bổ sung',
        progress_id,
        action,
    })
})
