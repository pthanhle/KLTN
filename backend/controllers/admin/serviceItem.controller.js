import ServiceItem from '../../models/serviceItemModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all service items
// @route   GET /api/admin/service-items
// @access  Private/Admin
export const getServiceItems = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.current || req.query.page) || 1;
    const limit = parseInt(req.query.pageSize || req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const priceType = req.query.priceType || '';
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;

    const query = {};
    if (search) {
        query.$or = [
            { serviceName: { $regex: search, $options: 'i' } },
            { sku: { $regex: search, $options: 'i' } },
        ];
    }
    if (category) query.category = category;
    if (priceType) query.priceType = priceType;

    const sortObj = {};
    sortObj[sortField] = sortOrder;

    const total = await ServiceItem.countDocuments(query);
    const serviceItems = await ServiceItem.find(query)
        .populate('category', 'name icon')
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
        serviceItems,
        pagination: {
            current: page,
            pageSize: limit,
            total,
        },
    });
});

// @desc    Get unique service categories
// @route   GET /api/admin/service-items/categories
// @access  Private/Admin
export const getServiceCategories = asyncHandler(async (req, res) => {
    const categories = await ServiceItem.distinct('category');
    res.json(categories.filter(Boolean));
});

// @desc    Get service item by ID
// @route   GET /api/admin/service-items/:id
// @access  Private/Admin
export const getServiceItemById = asyncHandler(async (req, res) => {
    const serviceItem = await ServiceItem.findById(req.params.id).populate('category', 'name icon');
    if (!serviceItem) {
        res.status(404);
        throw new Error('Dịch vụ không tồn tại');
    }
    res.json(serviceItem);
});

// @desc    Create new service item
// @route   POST /api/admin/service-items
// @access  Private/Admin
export const createServiceItem = asyncHandler(async (req, res) => {
    const { sku, serviceName, priceType, basePrice, estimatedDuration, isPackage, category, description, isActive } = req.body;

    const exists = await ServiceItem.findOne({ sku });
    if (exists) {
        res.status(400);
        throw new Error('Mã SKU đã tồn tại');
    }

    const serviceItem = await ServiceItem.create({
        sku,
        serviceName,
        priceType: priceType || 'CONTACT',
        basePrice: basePrice || 0,
        estimatedDuration: estimatedDuration || null,
        isPackage: isPackage || false,
        category: category || '',
        description: description || '',
        isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
        message: 'Tạo dịch vụ thành công',
        serviceItem
    });
});

// @desc    Update service item
// @route   PUT /api/admin/service-items/:id
// @access  Private/Admin
export const updateServiceItem = asyncHandler(async (req, res) => {
    const { sku, serviceName, priceType, basePrice, estimatedDuration, isPackage, category, description, isActive } = req.body;

    const serviceItem = await ServiceItem.findById(req.params.id);
    if (!serviceItem) {
        res.status(404);
        throw new Error('Dịch vụ không tồn tại');
    }

    if (sku && sku !== serviceItem.sku) {
        const exists = await ServiceItem.findOne({ sku });
        if (exists) {
            res.status(400);
            throw new Error('Mã SKU đã tồn tại');
        }
    }

    serviceItem.sku = sku || serviceItem.sku;
    serviceItem.serviceName = serviceName || serviceItem.serviceName;
    serviceItem.priceType = priceType || serviceItem.priceType;
    serviceItem.basePrice = basePrice !== undefined ? basePrice : serviceItem.basePrice;
    serviceItem.estimatedDuration = estimatedDuration !== undefined ? estimatedDuration : serviceItem.estimatedDuration;
    serviceItem.isPackage = isPackage !== undefined ? isPackage : serviceItem.isPackage;
    serviceItem.category = category !== undefined ? category : serviceItem.category;
    serviceItem.description = description !== undefined ? description : serviceItem.description;
    serviceItem.isActive = isActive !== undefined ? isActive : serviceItem.isActive;

    const updated = await serviceItem.save();

    res.json({
        message: 'Cập nhật dịch vụ thành công',
        serviceItem: updated
    });
});

// @desc    Delete service item
// @route   DELETE /api/admin/service-items/:id
// @access  Private/Admin
export const deleteServiceItem = asyncHandler(async (req, res) => {
    const serviceItem = await ServiceItem.findById(req.params.id);
    if (!serviceItem) {
        res.status(404);
        throw new Error('Dịch vụ không tồn tại');
    }

    await serviceItem.deleteOne();
    res.json({ message: 'Xóa dịch vụ thành công' });
});

// @desc    Toggle service item status
// @route   PATCH /api/admin/service-items/:id/toggle-status
// @access  Private/Admin
export const toggleServiceItemStatus = asyncHandler(async (req, res) => {
    const serviceItem = await ServiceItem.findById(req.params.id);
    if (!serviceItem) {
        res.status(404);
        throw new Error('Dịch vụ không tồn tại');
    }

    serviceItem.isActive = !serviceItem.isActive;
    await serviceItem.save();

    res.json({ 
        message: `Đã ${serviceItem.isActive ? 'bật' : 'tắt'} dịch vụ`,
        serviceItem 
    });
});
