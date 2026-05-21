import asyncHandler from 'express-async-handler'
import Category from '../../models/categoryModel.js'
import Car from '../../models/carModel.js'

export const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 12;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;
  const all = req.query.all === 'true';

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

  let query = Category.find(filter).sort(sortObj);
  if (!all) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const categories = await query.lean();

  const categoryNames = categories.map(c => c.category_name);
  const carCounts = await Car.aggregate([
    {
      $match: {
        bodyStyle: { $in: categoryNames }
      }
    },
    {
      $group: {
        _id: '$bodyStyle',
        count: { $sum: 1 }
      }
    }
  ]);

  const countMap = {};
  carCounts.forEach(item => {
    countMap[item._id] = item.count;
  });

  const categoriesWithCount = categories.map(c => ({
    ...c,
    count: countMap[c.category_name] || 0
  }));

  res.json({
    categories: categoriesWithCount,
    pagination: {
      current: page,
      pageSize: all ? total : limit,
      total
    }
  });
})