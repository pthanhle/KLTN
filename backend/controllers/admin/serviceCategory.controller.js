import ServiceCategory from '../../models/serviceCategoryModel.js';
import ServiceItem from '../../models/serviceItemModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all service categories
// @route   GET /api/admin/service-categories
// @access  Private/Admin
export const getServiceCategories = asyncHandler(async (req, res) => {
    const search = req.query.search || '';

    const query = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const categories = await ServiceCategory.find(query).sort({ createdAt: -1 });

    const result = await Promise.all(categories.map(async (cat) => {
        const usageCount = await ServiceItem.countDocuments({ category: cat._id });
        return {
            ...cat.toObject(),
            usageCount
        };
    }));

    res.json(result);
});

// @desc    Create new service category
// @route   POST /api/admin/service-categories
// @access  Private/Admin
export const createServiceCategory = asyncHandler(async (req, res) => {
    const { name, description, icon, isActive } = req.body;

    const exists = await ServiceCategory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
        res.status(400);
        throw new Error('Danh mục này đã tồn tại');
    }

    let assignedIcon = icon;
    if (!assignedIcon) {
        const catName = name.toLowerCase();
        if (catName.includes('sửa')) assignedIcon = 'Wrench';
        else if (catName.includes('bảo dưỡng')) assignedIcon = 'Wrench';
        else if (catName.includes('chăm sóc') || catName.includes('làm đẹp') || catName.includes('sơn')) assignedIcon = 'Sparkles';
        else if (catName.includes('lốp') || catName.includes('mâm') || catName.includes('phụ kiện')) assignedIcon = 'CircleDashed';
        else assignedIcon = 'Wrench';
    }

    const category = await ServiceCategory.create({
        name,
        description: description || '',
        icon: assignedIcon,
        isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
        message: 'Tạo danh mục thành công',
        category
    });
});

// @desc    Update service category
// @route   PUT /api/admin/service-categories/:id
// @access  Private/Admin
export const updateServiceCategory = asyncHandler(async (req, res) => {
    const { name, description, icon, isActive } = req.body;

    const category = await ServiceCategory.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Danh mục không tồn tại');
    }

    if (name && name !== category.name) {
        const exists = await ServiceCategory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (exists) {
            res.status(400);
            throw new Error('Tên danh mục này đã tồn tại');
        }
    }

    category.name = name || category.name;
    category.description = description !== undefined ? description : category.description;
    category.icon = icon || category.icon;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    const updated = await category.save();

    res.json({
        message: 'Cập nhật danh mục thành công',
        category: updated
    });
});

// @desc    Delete service category
// @route   DELETE /api/admin/service-categories/:id
// @access  Private/Admin
export const deleteServiceCategory = asyncHandler(async (req, res) => {
    const category = await ServiceCategory.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Danh mục không tồn tại');
    }

    // Check if category is used by any service items
    const inUse = await ServiceItem.exists({ category: req.params.id });
    if (inUse) {
        res.status(400);
        throw new Error('Không thể xoá danh mục đang có dịch vụ liên kết');
    }

    await category.deleteOne();
    res.json({ message: 'Xóa danh mục thành công' });
});

// @desc    Toggle service category status
// @route   PATCH /api/admin/service-categories/:id/toggle-status
// @access  Private/Admin
export const toggleServiceCategoryStatus = asyncHandler(async (req, res) => {
    const category = await ServiceCategory.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Danh mục không tồn tại');
    }

    category.isActive = !category.isActive;
    await category.save();

    res.json({
        message: `Đã ${category.isActive ? 'bật' : 'tắt'} danh mục`,
        category
    });
});
