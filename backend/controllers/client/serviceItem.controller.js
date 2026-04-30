import ServiceItem from '../../models/serviceItemModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Get all active service items (grouped or un-grouped)
// @route   GET /api/services
// @access  Public
export const getPublicServiceItems = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.current || req.query.page) || 1;
    const limit = parseInt(req.query.pageSize || req.query.limit) || 20;
    const search = req.query.search || '';

    const query = { isActive: true };
    if (search) {
        query.$or = [
            { serviceName: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    const total = await ServiceItem.countDocuments(query);
    const services = await ServiceItem.find(query)
        .populate('category', 'name icon')
        .sort({ category: 1, serviceName: 1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
        services,
        pagination: {
            current: page,
            pageSize: limit,
            total
        }
    });
});

// @desc    Get active service item by ID
// @route   GET /api/services/:id
// @access  Public
export const getPublicServiceItemById = asyncHandler(async (req, res) => {
    const service = await ServiceItem.findOne({ _id: req.params.id, isActive: true })
        .populate('category', 'name icon');
    
    if (!service) {
        res.status(404);
        throw new Error('Không tìm thấy dịch vụ');
    }
    
    res.json(service);
});

// @desc    Get active service categories
// @route   GET /api/services/categories
// @access  Public
export const getPublicServiceCategories = asyncHandler(async (req, res) => {
    const categories = await mongoose.model('ServiceCategory').find({ isActive: true }).sort({ createdAt: -1 });
    res.json(categories);
});
