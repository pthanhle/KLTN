import asyncHandler from 'express-async-handler';
import PartBrand from '../../models/partBrandModel.js';
import PartCategory from '../../models/partCategoryModel.js';


export const getPartCategories = asyncHandler(async (req, res) => {
  const categories = await PartCategory.find({}).sort('name').lean();
  res.json({ success: true, data: categories });
});


export const getPartBrands = asyncHandler(async (req, res) => {
  const brands = await PartBrand.find({}).sort('name').lean();
  res.json({ success: true, data: brands });
});


export const createPartBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Vui lòng nhập tên thương hiệu');
  }

  const normalizedName = name.trim();
  const exists = await PartBrand.findOne({ name: { $regex: new RegExp(`^${normalizedName}$`, 'i') } });

  if (exists) {
    res.status(400);
    throw new Error('Thương hiệu này đã tồn tại');
  }

  const brand = await PartBrand.create({ name: normalizedName });
  res.status(201).json({
    success: true,
    data: brand,
    message: `Đã thêm thương hiệu phụ tùng ${brand.name}`
  });
});
