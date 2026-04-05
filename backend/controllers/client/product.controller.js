import asyncHandler from 'express-async-handler'
import Product from '../../models/productModel.js'
import mongoose from 'mongoose'


export const getProducts = asyncHandler(async (req, res) => {
  const {
    category, minPrice, maxPrice,
    type, brand, bodyStyle, fuel, seats, isNew,
  } = req.query
  const page = parseInt(req.query.current || req.query.page) || 1
  const limit = parseInt(req.query.pageSize || req.query.limit) || 12
  const search = req.query.search || ''
  const sortField = req.query.sortField || 'createdAt'
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1

  let matchQuery = {}

  if (type) matchQuery.type = type
  if (bodyStyle) matchQuery.bodyStyle = bodyStyle
  if (fuel) matchQuery.fuel = fuel
  if (isNew !== undefined) matchQuery.isNew = isNew === 'true'
  if (seats) matchQuery.seats = parseInt(seats)

  if (brand) {
    const brands = Array.isArray(brand) ? brand : [brand]
    matchQuery.$or = brands.map(b => ({
      $or: [
        { brandId: { $regex: b, $options: 'i' } },
        { brandName: { $regex: b, $options: 'i' } },
      ]
    }))
  }

  if (category && mongoose.Types.ObjectId.isValid(category)) {
    matchQuery.category_id = new mongoose.Types.ObjectId(category)
  }

  if (search) {
    const searchOr = [
      { product_name: { $regex: search, $options: 'i' } },
      { brandName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
    ]
    if (matchQuery.$or) {
      matchQuery.$and = [{ $or: matchQuery.$or }, { $or: searchOr }]
      delete matchQuery.$or
    } else {
      matchQuery.$or = searchOr
    }
  }

  const pipeline = [
    { $match: matchQuery },
    {
      $addFields: {
        cleanPrice: { $toDouble: '$price' }
      }
    }
  ]

  if (minPrice || maxPrice) {
    const priceFilter = {}
    if (minPrice) priceFilter.$gte = Number(minPrice)
    if (maxPrice) priceFilter.$lte = Number(maxPrice)
    pipeline.push({ $match: { cleanPrice: priceFilter } })
  }

  const sortKey = sortField === 'price' ? 'cleanPrice' : sortField
  pipeline.push({ $sort: { [sortKey]: sortOrder } })

  pipeline.push({
    $facet: {
      metadata: [{ $count: 'total' }],
      data: [
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category_info',
          }
        },
        { $unwind: { path: '$category_info', preserveNullAndEmptyArrays: true } },
        { $addFields: { category_id: '$category_info' } },
        { $project: { category_info: 0, cleanPrice: 0 } }
      ]
    }
  })

  const [result] = await Product.aggregate(pipeline)
  const total = result.metadata.length > 0 ? result.metadata[0].total : 0

  res.json({
    products: result.data,
    pagination: { current: page, pageSize: limit, total }
  })
})


// @desc    Lấy metadata cho bộ lọc (Brands, Styles, Price Range)
// @route   GET /api/client/products/filters
// @access  Public
export const getProductFilters = asyncHandler(async (req, res) => {
  const { type } = req.query // 'car', 'part', etc.

  let matchQuery = {}
  if (type) matchQuery.type = type

  const stats = await Product.aggregate([
    { $match: matchQuery },
    {
      $facet: {
        brands: [
          { $group: { _id: "$brandName", count: { $sum: 1 } } },
          { $project: { name: "$_id", count: 1, _id: 0 } },
          { $sort: { name: 1 } }
        ],
        bodyStyles: [
          { $match: { bodyStyle: { $exists: true, $ne: null } } },
          { $group: { _id: "$bodyStyle", count: { $sum: 1 } } },
          { $project: { name: "$_id", count: 1, _id: 0 } },
          { $sort: { name: 1 } }
        ],
        fuels: [
          { $match: { fuel: { $exists: true, $ne: null } } },
          { $group: { _id: "$fuel", count: { $sum: 1 } } },
          { $project: { name: "$_id", count: 1, _id: 0 } },
          { $sort: { name: 1 } }
        ],
        priceRange: [
          {
            $group: {
              _id: null,
              min: { $min: "$price" },
              max: { $max: "$price" }
            }
          },
          { $project: { _id: 0 } }
        ]
      }
    }
  ])

  const result = stats[0]
  res.json({
    brands: result.brands,
    bodyStyles: result.bodyStyles,
    fuels: result.fuels,
    priceRange: result.priceRange[0] || { min: 0, max: 0 }
  })
})


export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate('category_id', 'category_name')
    .select('-gallery -specs -features')
  res.json(products)
})


export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Product ID không hợp lệ')
  }

  const product = await Product.findById(id)
    .populate('category_id', 'category_name image')

  if (!product) {
    res.status(404)
    throw new Error('Không tìm thấy sản phẩm')
  }

  res.json(product)
})


export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400)
    throw new Error('Category ID không hợp lệ')
  }

  const products = await Product.find({ category_id: categoryId })
  res.json(products)
})


export const createProduct = asyncHandler(async (req, res) => {
  const {
    category_id, type, sku, product_name, tagline, description,
    price, stock, isNew, images,
    brandId, brandName, year, odo, engine, fuel, seats, bodyStyle,
    isDemoAvailable, versions, colors, gallery, features, specs,
    compatible_brands,
  } = req.body

  if (!product_name) {
    res.status(400)
    throw new Error('Tên sản phẩm là bắt buộc')
  }

  if (!price || price <= 0) {
    res.status(400)
    throw new Error('Giá sản phẩm phải lớn hơn 0')
  }

  if (category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
    res.status(400)
    throw new Error('Category ID không hợp lệ')
  }


  const product = await Product.create({
    category_id: category_id || null,
    type: type || 'part',
    sku: sku || undefined,
    product_name,
    tagline,
    description,
    price,
    stock: stock || 0,
    isNew: isNew || false,
    images: images || [],
    brandId, brandName, year,
    odo: odo || 0,
    engine, fuel, seats, bodyStyle,
    isDemoAvailable: isDemoAvailable !== undefined ? isDemoAvailable : true,
    versions: versions || [],
    colors: colors || [],
    gallery: gallery || { photos: [], videos: [] },
    features: features || [],
    specs: specs || [],
    compatible_brands: compatible_brands || [],
  })

  res.status(201).json(product)
})


export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Product ID không hợp lệ')
  }

  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error('Không tìm thấy sản phẩm')
  }

  const allowedFields = [
    'category_id', 'type', 'sku', 'product_name', 'tagline', 'description',
    'price', 'stock', 'isNew', 'images',
    'brandId', 'brandName', 'year', 'odo', 'engine', 'fuel', 'seats', 'bodyStyle',
    'isDemoAvailable', 'versions', 'colors', 'gallery', 'features', 'specs',
    'compatible_brands',
  ]

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field]
    }
  })

  const updated = await product.save()
  res.json(updated)
})



export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Product ID không hợp lệ')
  }

  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error('Không tìm thấy sản phẩm')
  }

  await product.deleteOne()
  res.json({ message: 'Xóa sản phẩm thành công' })
})