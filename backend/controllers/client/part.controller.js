import asyncHandler from 'express-async-handler';
import Part from '../../models/partModel.js';


export const getActiveParts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 9;
  const search = req.query.search || '';
  const sortState = req.query.sortBy || 'newest';

  const categoryFilter = req.query.category || 'all';
  const brandFilter = req.query.brand || 'all';
  const includeUniversal = req.query.includeUniversal === 'true';
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || 999999999;

  const pipeline = [];

  const matchFilters = { status: 'active' };

  if (categoryFilter !== 'all') {
    matchFilters.category = categoryFilter;
  }

  if (search) {
    matchFilters.$or = [
      { name: { $regex: search, $options: 'i' } },
      { seo_description: { $regex: search, $options: 'i' } }
    ];
  }

  pipeline.push({ $match: matchFilters });

  pipeline.push({
    $match: {
      price: { $gte: minPrice, $lte: maxPrice }
    }
  });

  if (brandFilter !== 'all' && brandFilter) {
    const selectedBrands = brandFilter.split(',').map(b => b.trim());
    pipeline.push({
      $match: {
        $or: [
          { compatible_brands: { $in: selectedBrands.map(b => new RegExp(`^${b}$`, 'i')) } },
          ...(includeUniversal ? [{ compatible_brands: { $size: 0 } }] : [])
        ]
      }
    });
  } else if (!includeUniversal) {
    pipeline.push({
      $match: {
        "compatible_brands.0": { $exists: true }
      }
    });
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
      stock: { $ifNull: ["$inventory.available_stock", 0] },
      image: { $arrayElemAt: ["$images", 0] },
      description: "$seo_description",
      condition_name: { $ifNull: [{ $arrayElemAt: ["$condition_data.name", 0] }, "$condition", "Mới 100%"] }
    }
  });

  pipeline.push({
    $project: { condition_data: 0 }
  });

  let sortObj = { createdAt: -1 };
  if (sortState === 'price_asc') sortObj = { price: 1 };
  if (sortState === 'price_desc') sortObj = { price: -1 };
  if (sortState === 'popular') sortObj = { stock: -1 };
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

  res.json({
    success: true,
    data: {
      parts,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  });
});

export const getPartBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const isObjId = (slug.length === 24 && /^[0-9a-fA-F]{24}$/.test(slug));
  const query = { status: 'active' };
  if (isObjId) {
    query.$or = [{ _id: slug }, { slug: slug }];
  } else {
    query.slug = slug;
  }

  const part = await Part.findOne(query);
  if (!part) {
    res.status(404);
    throw new Error('Không tìm thấy phụ tùng');
  }

  const partObj = part.toJSON();
  partObj.stock = part.inventory?.available_stock || 0;

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const feedbacks = await PartReview.find({ part_id: part._id, status: 'approved' })
    .populate('user_id', 'full_name avatar')
    .populate('replies.user_id', 'full_name avatar role')
    .sort({ createdAt: -1 })
    .lean();

  partObj.reviews = feedbacks.map(f => ({
    id: f._id,
    user_id: f.user_id?._id,
    user: f.user_id?.full_name || 'Khách Hàng',
    avatar: f.user_id?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(f.user_id?.full_name || 'K')}&background=random`,
    rating: f.rating,
    date: f.createdAt ? new Date(f.createdAt).toLocaleDateString('vi-VN') : '',
    variant: f.variant || 'Tiêu chuẩn',
    content: f.comment,
    images: f.images || [],
    likes: f.likes || 0,
    replies: (f.replies || []).map(r => ({
      _id: r._id,
      user_id: r.user_id?._id,
      user: r.user_id?.full_name || 'Khách Hàng',
      avatar: r.user_id?.avatar,
      role: r.user_id?.role || 'customer',
      content: r.content,
      createdAt: r.createdAt
    }))
  }));

  // Parse distribution to Array format natively
  if (partObj.reviews_summary?.distribution) {
    const d = partObj.reviews_summary.distribution;
    partObj.reviews_summary.distribution = [
      { stars: 5, percentage: d['5'] || 0 },
      { stars: 4, percentage: d['4'] || 0 },
      { stars: 3, percentage: d['3'] || 0 },
      { stars: 2, percentage: d['2'] || 0 },
      { stars: 1, percentage: d['1'] || 0 }
    ];

    // Override root rating and count with the accurate summary values
    partObj.rating = partObj.reviews_summary.average || partObj.rating || 0;
    partObj.reviews_count = partObj.reviews_summary.total || partObj.reviews_count || 0;
  }

  try {
    const PartCondition = (await import('../../models/partConditionModel.js')).default;
    const mappedCondition = await PartCondition.findOne({ value: partObj.condition }).lean();
    if (mappedCondition) {
      partObj.condition_name = mappedCondition.name;
    }
  } catch (err) {
    console.error("Condition lookup failed in client API", err);
  }

  res.json({ success: true, data: partObj });
});

export const createPartReview = asyncHandler(async (req, res) => {
  const { rating, comment, variant, images } = req.body;
  const partId = req.params.id;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Đánh giá phải từ 1 đến 5 sao');
  }

  const isObjId = (partId.length === 24 && /^[0-9a-fA-F]{24}$/.test(partId));
  const query = { status: 'active' };
  if (isObjId) {
    query.$or = [{ _id: partId }, { slug: partId }];
  } else {
    query.slug = partId;
  }

  const part = await Part.findOne(query);
  if (!part) {
    res.status(404);
    throw new Error('Phụ tùng không tồn tại');
  }

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.create({
    user_id: req.user._id,
    part_id: part._id,
    rating,
    comment: comment || '',
    variant: variant || '',
    images: images || [],
  });

  const populated = await PartReview.findById(review._id)
    .populate('user_id', 'full_name avatar')
    .lean();

  const reviewData = {
    id: populated._id,
    user_id: populated.user_id?._id,
    user: populated.user_id?.full_name || 'Khách Hàng',
    avatar: populated.user_id?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(populated.user_id?.full_name || 'K')}&background=random`,
    rating: populated.rating,
    date: new Date(populated.createdAt).toLocaleDateString('vi-VN'),
    variant: populated.variant || 'Tiêu chuẩn',
    content: populated.comment,
    images: populated.images || [],
    likes: 0,
    replies: []
  };

  res.status(201).json({
    success: true,
    message: 'Gửi đánh giá thành công!',
    data: reviewData
  });
});

/**
 * @desc    Delete a Part Review
 * @route   DELETE /api/v1/client/parts/reviews/:reviewId
 * @access  Private/Customer
 */
export const deletePartReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  // Ensure the customer owns the review
  if (review.user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error('Bạn không có quyền xóa đánh giá này');
  }

  await review.deleteOne(); // Use deleteOne() for modern mongoose

  res.json({
    success: true,
    message: 'Đã xóa đánh giá thành công'
  });
});

/**
 * @desc    Toggle Like on a Part Review
 * @route   POST /api/v1/client/parts/reviews/:reviewId/like
 * @access  Private/Customer
 */
export const likePartReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  const isLiked = review.liked_by.includes(userId);
  if (isLiked) {
    review.liked_by = review.liked_by.filter((id) => id.toString() !== userId.toString());
    review.likes = Math.max(0, review.liked_by.length);
  } else {
    review.liked_by.push(userId);
    review.likes = review.liked_by.length;
  }

  await review.save();

  res.json({
    success: true,
    message: isLiked ? 'Đã bỏ thích đánh giá' : 'Đã thích đánh giá',
    likes: review.likes
  });
});

/**
 * @desc    Reply to a Part Review
 * @route   POST /api/v1/client/parts/reviews/:reviewId/reply
 * @access  Private/Customer
 */
export const replyPartReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || !content.trim()) {
    res.status(400);
    throw new Error('Nội dung phản hồi không được để trống');
  }

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  review.replies.push({
    user_id: userId,
    content: content.trim(),
    createdAt: Date.now()
  });

  await review.save();

  res.status(201).json({
    success: true,
    message: 'Đã gửi phản hồi thành công',
    data: review
  });
});

/**
 * @desc    Delete a Reply from a Part Review
 * @route   DELETE /api/v1/client/parts/reviews/:reviewId/reply/:replyId
 * @access  Private/Customer
 */
export const deletePartReviewReply = asyncHandler(async (req, res) => {
  const { reviewId, replyId } = req.params;
  const userId = req.user._id;

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  const replyIndex = review.replies.findIndex(r => r._id.toString() === replyId);
  if (replyIndex === -1) {
    res.status(404);
    throw new Error('Phản hồi không tồn tại');
  }

  // Ensure the customer owns the reply (or is admin, but this route is customer restricted)
  if (review.replies[replyIndex].user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error('Bạn không có quyền xóa phản hồi này');
  }

  review.replies.splice(replyIndex, 1);
  await review.save();

  res.json({
    success: true,
    message: 'Đã xóa phản hồi thành công'
  });
});

/**
 * @desc    Edit a Part Review
 * @route   PUT /api/v1/client/parts/reviews/:reviewId
 * @access  Private/Customer
 */
export const editPartReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment, images } = req.body;
  const userId = req.user._id;

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  if (review.user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error('Bạn không có quyền chỉnh sửa đánh giá này');
  }

  if (rating) review.rating = rating;
  if (comment !== undefined) review.comment = comment;
  if (images) review.images = images;

  await review.save();

  res.json({
    success: true,
    message: 'Đã cập nhật đánh giá thành công',
    data: review
  });
});

/**
 * @desc    Edit a Reply in a Part Review
 * @route   PUT /api/v1/client/parts/reviews/:reviewId/reply/:replyId
 * @access  Private/Customer
 */
export const editPartReviewReply = asyncHandler(async (req, res) => {
  const { reviewId, replyId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || !content.trim()) {
    res.status(400);
    throw new Error('Nội dung phản hồi không được để trống');
  }

  const mongoose = await import('mongoose');
  import('../../models/partReviewModel.js');
  const PartReview = mongoose.model('PartReview');

  const review = await PartReview.findById(reviewId);
  if (!review) {
    res.status(404);
    throw new Error('Đánh giá không tồn tại');
  }

  const replyIndex = review.replies.findIndex(r => r._id.toString() === replyId);
  if (replyIndex === -1) {
    res.status(404);
    throw new Error('Phản hồi không tồn tại');
  }

  if (review.replies[replyIndex].user_id.toString() !== userId.toString()) {
    res.status(403);
    throw new Error('Bạn không có quyền chỉnh sửa phản hồi này');
  }

  review.replies[replyIndex].content = content.trim();

  await review.save();

  res.json({
    success: true,
    message: 'Đã cập nhật phản hồi thành công',
    data: review
  });
});

