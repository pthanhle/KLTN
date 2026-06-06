import Part from '../../../models/partModel.js'
import ServiceItem from '../../../models/serviceItemModel.js'
import asyncHandler from 'express-async-handler'

export const searchParts = asyncHandler(async (req, res) => {
    const search = req.query.search || ''
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1

    const query = { status: 'active' }
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
        ]
    }

    const total = await Part.countDocuments(query)
    const parts = await Part.find(query)
        .select('_id sku name price images category inventory')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ name: 1 })

    res.json({
        parts,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
})

export const searchServiceItems = asyncHandler(async (req, res) => {
    const search = req.query.search || ''
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1

    const query = { isActive: true }
    if (search) {
        query.$or = [
            { serviceName: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
        ]
    }

    const total = await ServiceItem.countDocuments(query)
    const items = await ServiceItem.find(query)
        .populate('category', 'name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ serviceName: 1 })

    const mapped = items.map(item => ({
        id: item._id,
        sku: item.sku,
        name: item.serviceName,
        category: item.category?.name || '',
        price: item.basePrice || 0,
        estimated_hours: item.estimatedDuration ? item.estimatedDuration / 60 : 1,
        price_type: item.priceType,
    }))

    res.json({
        serviceItems: mapped,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
})
