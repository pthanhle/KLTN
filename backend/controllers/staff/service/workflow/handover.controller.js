import RepairProgress from '../../../../models/repairprogressModel.js'
import Booking from '../../../../models/bookingModel.js'
import Part from '../../../../models/partModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const processHandover = asyncHandler(async (req, res) => {
    const { progress_id, delivery, payment_method } = req.body

    const progress = await RepairProgress.findById(progress_id).populate('booking_id')
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy RepairProgress')
    }

    if (progress.status === 'COMPLETED') {
        res.status(400)
        throw new Error('Dịch vụ này đã hoàn thành')
    }

    if (delivery) {
        progress.delivery = delivery
    }
    if (!progress.delivery.invoice_ledger) {
        progress.delivery.invoice_ledger = {}
    }

    if (progress.delivery.invoice_ledger.payment_status !== 'PAID') {
        progress.delivery.invoice_ledger.payment_method = payment_method || 'CASH'
        progress.delivery.invoice_ledger.payment_status = 'PAID'
        progress.delivery.invoice_ledger.paid_amount = progress.delivery.invoice_ledger.total_amount || 0
    }

    progress.current_step = 'COMPLETED'
    progress.status = 'COMPLETED'

    const stepExists = progress.timeline.find(t => t.step === 'COMPLETED')
    if (!stepExists) {
        progress.timeline.push({
            step: 'COMPLETED',
            status: 'COMPLETED',
            time: new Date(),
            note: 'Đã bàn giao xe và thanh toán hoàn tất'
        })
    }

    if (progress.quotation && progress.quotation.parts) {
        for (const qPart of progress.quotation.parts) {
            await Part.findOneAndUpdate(
                { sku: qPart.sku },
                {
                    $inc: {
                        'inventory.allocated': -qPart.quantity,
                        'inventory.stock_on_hand': -qPart.quantity
                    }
                }
            )
        }
    }

    await progress.save()

    if (progress.booking_id) {
        const booking = await Booking.findById(progress.booking_id._id)
        if (booking) {
            booking.booking_status = 'COMPLETED'
            await booking.save()
        }
    }

    res.json({
        message: 'Bàn giao xe thành công',
        repairProgress: progress
    })
})
