import asyncHandler from 'express-async-handler';
import PartBrand from '../../models/partBrandModel.js';
import PartCategory from '../../models/partCategoryModel.js';
import PartCondition from '../../models/partConditionModel.js';

export const getPartCategories = asyncHandler(async (req, res) => {
  const categories = await PartCategory.find({}).sort('name').lean();
  res.json({ success: true, data: categories });
});

export const getPartConditions = asyncHandler(async (req, res) => {
  let conditions = await PartCondition.find({}).sort('name').lean();
  
  // If no conditions exist yet in the DB, gracefully seed the base enterprise taxonomies
  if (conditions.length === 0) {
    const baseConditions = [
      { name: 'Mới 100%', value: 'new', description: 'Hàng chính hãng mới 100%' },
      { name: 'Tháo xe (Used)', value: 'used', description: 'Phụ tùng tháo từ xe cũ' },
      { name: 'Tân trang (Refurbished)', value: 'refurbished', description: 'Đã qua sửa chữa phục hồi' },
      { name: 'Hàng Nhà Máy (OEM)', value: 'oem', description: 'Hàng tiêu chuẩn nhà máy thay thế' },
      { name: 'Hàng Độ (Aftermarket)', value: 'aftermarket', description: 'Hàng nâng cấp hiệu suất' }
    ];
    await PartCondition.insertMany(baseConditions);
    conditions = await PartCondition.find({}).sort('name').lean();
  }
  
  res.json({ success: true, data: conditions });
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

export const createPartCondition = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Vui lòng nhập tên tình trạng');
  }

  const normalizedName = name.trim();
  const value = normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  const exists = await PartCondition.findOne({ value });

  if (exists) {
    res.status(400);
    throw new Error('Tình trạng này đã tồn tại');
  }

  const condition = await PartCondition.create({ name: normalizedName, value });
  res.status(201).json({
    success: true,
    data: condition,
    message: `Đã thêm tình trạng phụ tùng ${condition.name}`
  });
});
