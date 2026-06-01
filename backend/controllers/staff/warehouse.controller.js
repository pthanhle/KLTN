import asyncHandler from 'express-async-handler'
import RepairProgress from '../../models/repairprogressModel.js'
import Part from '../../models/partModel.js'

export const getPickLists = asyncHandler(async (req, res) => {
    const progresses = await RepairProgress.find({
        'parts_usage.status': 'WAITING'
    }).populate({
        path: 'booking_id',
        select: 'booking_code vehicle_info customer_info',
    })

    const pickLists = progresses.map(p => ({
        progress_id: p._id,
        booking_code: p.booking_id?.booking_code,
        license_plate: p.booking_id?.vehicle_info?.license_plate,
        customer_name: p.booking_id?.customer_info?.full_name,
        parts: p.parts_usage.filter(part => part.status === 'WAITING')
    }))

    res.json(pickLists)
})


export const dispatchParts = asyncHandler(async (req, res) => {
    const { progress_id, part_ids } = req.body

    if (!progress_id || !part_ids || !Array.isArray(part_ids)) {
        res.status(400)
        throw new Error('Vui lòng cung cấp progress_id và danh sách part_ids cần xuất')
    }

    const progress = await RepairProgress.findById(progress_id)
    if (!progress) {
        res.status(404)
        throw new Error('Không tìm thấy tiến độ sửa chữa')
    }

    let dispatchedCount = 0;

    for (let part of progress.parts_usage) {
        if (part_ids.includes(part._id.toString()) && part.status === 'WAITING') {
            const partDB = await Part.findOne({ sku: part.sku })
            if (partDB) {
                const qty = part.quantity || 1;
                partDB.inventory.stock_on_hand -= qty;
                partDB.inventory.allocated -= qty;

                if (partDB.inventory.stock_on_hand < 0) partDB.inventory.stock_on_hand = 0;
                if (partDB.inventory.allocated < 0) partDB.inventory.allocated = 0;

                await partDB.save();
            }

            part.status = 'IN_PROGRESS';
            dispatchedCount++;
        }
    }

    if (dispatchedCount > 0) {
        progress.system_logs.push({
            time: Date.now(),
            type: 'INF',
            message: `Thủ kho đã xuất kho ${dispatchedCount} phụ tùng đến khoang sửa chữa.`
        })
        await progress.save()
    }

    res.json({ message: `Đã xuất kho thành công ${dispatchedCount} phụ tùng` })
})
