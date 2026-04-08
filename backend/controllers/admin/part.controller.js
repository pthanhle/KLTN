import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Part from '../../models/partModel.js';
import PartCategory from '../../models/partCategoryModel.js';


export const getAllParts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 10;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;

  const categoryFilter = req.query.category || 'all';
  const brandFilter = req.query.brand || 'all';
  const statusFilter = req.query.status || 'all';

  const pipeline = [];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } }
        ]
      }
    });
  }

  const matchFilters = {};
  if (categoryFilter !== 'all') matchFilters.category = categoryFilter;
  if (statusFilter !== 'all') matchFilters.status = statusFilter;
  if (brandFilter !== 'all') {
    matchFilters.compatible_brands = { $regex: new RegExp(`^${brandFilter}$`, 'i') };
  }

  if (Object.keys(matchFilters).length > 0) {
    pipeline.push({ $match: matchFilters });
  }

  pipeline.push({
    $lookup: {
      from: 'partconditions',
      localField: 'condition',
      foreignField: 'value',
      as: 'condition_data'
    }
  });

  pipeline.push({
    $addFields: {
      id: "$_id",
      stock: { $add: [{ $ifNull: ["$inventory.warehouse", 0] }, { $ifNull: ["$inventory.showroom", 0] }] },
      image: { $arrayElemAt: ["$images", 0] },
      condition_name: { $ifNull: [{ $arrayElemAt: ["$condition_data.name", 0] }, "$condition", "Mới 100%"] }
    }
  });

  pipeline.push({
    $project: { condition_data: 0 }
  });

  const sortObj = {};
  if (sortField === 'stock') {
    sortObj['stock'] = sortOrder;
  } else {
    sortObj[sortField] = sortOrder;
  }
  pipeline.push({ $sort: sortObj });

  pipeline.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
    }
  });

  const result = await Part.aggregate(pipeline);
  const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
  const parts = result[0].data;
  const globalStatsPipeline = [
    {
      $addFields: {
        stock: { $add: [{ $ifNull: ["$inventory.warehouse", 0] }, { $ifNull: ["$inventory.showroom", 0] }] }
      }
    },
    {
      $group: {
        _id: null,
        totalParts: { $sum: 1 },
        outOfStock: { $sum: { $cond: [{ $eq: ["$stock", 0] }, 1, 0] } },
        totalValue: { $sum: { $multiply: [{ $ifNull: ["$price", 0] }, { $ifNull: ["$stock", 0] }] } }
      }
    }
  ];
  
  const [globalStatsResult, absoluteCategoryCount] = await Promise.all([
      Part.aggregate(globalStatsPipeline),
      PartCategory.countDocuments()
  ]);
  
  const rawStats = globalStatsResult[0] || { totalParts: 0, outOfStock: 0, totalValue: 0 };

  const stats = {
    totalParts: rawStats.totalParts,
    outOfStock: rawStats.outOfStock,
    totalValue: rawStats.totalValue,
    totalCategories: absoluteCategoryCount
  };

  res.json({
    parts,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    stats
  });
});


export const getPartById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Part ID không hợp lệ');
  }

  const part = await Part.findById(id);
  if (!part) {
    res.status(404);
    throw new Error('Không tìm thấy phụ tùng');
  }

  res.json({ success: true, data: part });
});


export const createPart = asyncHandler(async (req, res) => {
  try {
    const part = new Part(req.body);
    const createdPart = await part.save();

    res.status(201).json({
      success: true,
      data: createdPart,
      message: 'Tạo phụ tùng thành công'
    });
  } catch (error) {
    console.error("Create Part Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: `Mã SKU hoặc thông tin bị trùng lặp: ${Object.keys(error.keyValue).join(', ')}` });
    }
    res.status(500).json({ success: false, message: error.message, stack: error.stack });
  }
});


export const updatePart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Part ID không hợp lệ');
  }

  try {
    const part = await Part.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!part) {
      res.status(404);
      throw new Error('Không tìm thấy phụ tùng để cập nhật');
    }

    res.json({
      success: true,
      data: part,
      message: 'Cập nhật phụ tùng thành công'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: `Mã SKU hoặc thông tin bị trùng lặp: ${Object.keys(error.keyValue).join(', ')}` });
    }
    throw error; // Let the async handler catch it
  }
});


export const updatePartStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'draft'].includes(status)) {
    res.status(400);
    throw new Error('Trạng thái không hợp lệ');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Part ID không hợp lệ');
  }

  const part = await Part.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!part) {
    res.status(404);
    throw new Error('Không tìm thấy phụ tùng để cập nhật');
  }

  res.json({
    success: true,
    data: part,
    message: `Đã chuyển đổi trạng thái thành ${status}`
  });
});


export const deletePart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Part ID không hợp lệ');
  }

  const part = await Part.findByIdAndDelete(id);

  if (!part) {
    res.status(404);
    throw new Error('Không tìm thấy phụ tùng để xóa');
  }

  res.json({ success: true, message: 'Phụ tùng đã được xóa vĩnh viễn' });
});


export const bulkDeleteParts = asyncHandler(async (req, res) => {
  const { ids } = req.body; // Array of IDs

  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error('Vui lòng cung cấp danh sách ID hợp lệ');
  }

  await Part.deleteMany({ _id: { $in: ids } });

  res.json({ success: true, message: `Đã xóa thành công ${ids.length} phụ tùng` });
});


export const replyPartReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content) {
    res.status(400);
    throw new Error('Nội dung phản hồi không được để trống');
  }

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Không tìm thấy đánh giá');
  }

  review.replies.push({
    user_id: userId,
    content,
    createdAt: Date.now()
  });

  await review.save();

  res.json({
    success: true,
    message: 'Đã gửi phản hồi thành công',
    data: review
  });
});
