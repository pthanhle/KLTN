import asyncHandler from 'express-async-handler'
import Car from '../../models/carModel.js'
import mongoose from 'mongoose'

export const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 10;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;
  const brand = req.query.brand || '';
  const bodyStyle = req.query.bodyStyle || '';
  const status = req.query.status || '';

  const pipeline = [];
  const matchStage = {};
  
  if (search) {
    matchStage.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (brand && brand !== 'all') {
    matchStage.brandName = { $regex: brand, $options: 'i' };
  }
  
  if (bodyStyle && bodyStyle !== 'all') {
    matchStage.bodyStyle = bodyStyle;
  }
  
  if (status && status !== 'all') {
    matchStage.status = status;
  }

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  const sortObj = {};
  sortObj[sortField] = sortOrder;
  pipeline.push({ $sort: sortObj });

  pipeline.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
    }
  });

  const result = await Car.aggregate(pipeline);
  const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
  const products = result[0].data;

  res.json({
    products,
    pagination: {
      current: page,
      pageSize: limit,
      total
    }
  });
})

export const getProductsByCategory = asyncHandler(async (req, res) => {
  res.json({ products: [], pagination: { current: 1, pageSize: 10, total: 0 } });
})

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name, product_name, type, sku, tagline, description,
    price, stock, isNew, brandId, brandName, year, odo, engine, power, fuel,
    seats, bodyStyle, isDemoAvailable, status, versions, colors,
    gallery, features, specs, threeSixty, images: bodyImages,
  } = req.body

  const finalName = name || product_name;

  if (!finalName || !price) {
    res.status(400)
    throw new Error('Thiếu thông tin bắt buộc của xe (Tên, Giá)')
  }

  let finalImages = bodyImages || []
  if (req.file) {
    finalImages = [req.file.path, ...finalImages]
  }
  
  let slug = finalName.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const count = await Car.countDocuments({ slug: new RegExp(`^${slug}`, 'i') });
  if (count > 0) slug = `${slug}-${count + 1}`;

  const car = new Car({
    name: finalName,
    slug,
    sku,
    status: status || 'Published',
    tagline,
    description,
    price,
    stock: stock || 0,
    isNew: isNew || false,
    brandId: brandId || slug.split('-')[0],
    brandName,
    year,
    odo: odo || 0,
    engine,
    power,
    fuel,
    seats,
    bodyStyle,
    isDemoAvailable: isDemoAvailable !== undefined ? isDemoAvailable : true,
    versions: versions || [],
    colors: colors || [],
    gallery: gallery || { photos: finalImages, videos: [] },
    features: features || [],
    specs: specs || [],
    threeSixty: threeSixty || { images: [], lighting: 'Studio', environment: 'Minimalist Studio' },
    image: finalImages[0] || null,
  })

  // Ensure primary image exists
  if (finalImages.length > 0 && !car.image) {
    car.image = finalImages[0];
  }

  const createdProduct = await car.save()
  res.status(201).json(createdProduct)
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('ID không hợp lệ')
  }

  const car = await Car.findById(id)
  if (!car) {
    res.status(404)
    throw new Error('Xe không tồn tại')
  }

  const allowedFields = [
    'name', 'product_name', 'sku', 'status', 'tagline', 'description',
    'price', 'salePrice', 'stock', 'isNew', 'brandId', 'brandName',
    'year', 'odo', 'engine', 'power', 'fuel', 'seats', 'bodyStyle',
    'isDemoAvailable', 'versions', 'colors', 'gallery', 'features', 'specs',
    'threeSixty'
  ]

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      if (field === 'product_name') car.name = req.body[field];
      else car[field] = req.body[field]
    }
  })

  if (req.file) {
    if (car.gallery && car.gallery.photos) {
      car.gallery.photos = [req.file.path, ...(car.gallery.photos || [])];
    } else {
      car.gallery = { photos: [req.file.path], videos: [] };
    }
    car.image = req.file.path;
  }

  const updatedProduct = await car.save()
  res.json(updatedProduct)
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('ID không hợp lệ')
  }

  const car = await Car.findById(id)
  if (!car) {
    res.status(404)
    throw new Error('Xe không tồn tại')
  }

  await car.deleteOne()
  res.json({ message: 'Xe đã được xóa' })
})
