import asyncHandler from 'express-async-handler'
import Category from '../../models/categoryModel.js'
import Part from '../../models/partModel.js'

export const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 12;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;

  let filter = {};
  if (search) {
    filter.$or = [
      { category_name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const sortObj = {};
  sortObj[sortField] = sortOrder;

  const total = await Category.countDocuments(filter);
  const categories = await Category.find(filter)
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const count = await Part.countDocuments({ category: category.category_name });
      return { ...category, count };
    })
  );

  res.json({
    categories: categoriesWithCount,
    pagination: {
      current: page,
      pageSize: limit,
      total
    }
  });
})