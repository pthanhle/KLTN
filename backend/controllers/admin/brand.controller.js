import Brand from '../../models/brandModel.js';
import mongoose from 'mongoose';
import Car from '../../models/carModel.js';

export const getBrands = async (req, res) => {
    try {
        const { search, is_partner } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (is_partner !== undefined) {
            query.is_partner = is_partner === 'true';
        }

        const brands = await Brand.find(query).sort({ createdAt: -1 }).lean();

        const brandIds = brands.map(b => b._id.toString());
        const carCounts = await Car.aggregate([
            {
                $match: {
                    brandId: { $in: brandIds }
                }
            },
            {
                $group: {
                    _id: '$brandId',
                    count: { $sum: 1 }
                }
            }
        ]);

        const countMap = {};
        carCounts.forEach(item => {
            countMap[item._id] = item.count;
        });

        const enrichedBrands = brands.map(b => ({
            ...b,
            count: countMap[b._id.toString()] || 0
        }));

        res.status(200).json(enrichedBrands);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải danh sách thương hiệu', error: error.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);
        if (!brand) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

export const createBrand = async (req, res) => {
    try {
        const { name, image, is_partner, description } = req.body;

        const existingBrand = await Brand.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingBrand) {
            return res.status(400).json({ message: 'Thương hiệu này đã tồn tại' });
        }

        const newBrand = new Brand({
            name,
            image: image || '',
            is_partner: is_partner || false,
            description: description || ''
        });

        await newBrand.save();
        res.status(201).json({ message: 'Thêm thương hiệu thành công', brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo thương hiệu mới', error: error.message });
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const brand = await Brand.findById(id);
        if (!brand) return res.status(404).json({ message: 'Không tìm thấy thương hiệu' });

        if (updates.name && updates.name !== brand.name) {
            const existing = await Brand.findOne({ 
                name: { $regex: new RegExp(`^${updates.name}$`, 'i') },
                _id: { $ne: id }
            });
            if (existing) return res.status(400).json({ message: 'Tên thương hiệu đã tồn tại' });
        }

        Object.assign(brand, updates);
        await brand.save();

        res.status(200).json({ message: 'Cập nhật thành công', brand });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật', error: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            return res.status(404).json({ message: 'Thương hiệu không tồn tại' });
        }
        res.status(200).json({ message: 'Xóa thương hiệu thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa thương hiệu', error: error.message });
    }
};
