import asyncHandler from 'express-async-handler'
import Car from '../../models/carModel.js'
import mongoose from 'mongoose'

export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword, minPrice, maxPrice,
    brand, bodyStyle, fuel, seats, isNew,
  } = req.query
  const page = parseInt(req.query.current || req.query.page) || 1
  const limit = parseInt(req.query.pageSize || req.query.limit) || 12
  const search = req.query.search || keyword || ''
  const sortParam = req.query.sort || 'newest';
  
  let sortField = 'createdAt';
  let sortOrder = -1;
  if(sortParam === 'price_asc') { sortField = 'price'; sortOrder = 1; }
  else if(sortParam === 'price_desc') { sortField = 'price'; sortOrder = -1; }
  else if(sortParam === 'name_asc') { sortField = 'name'; sortOrder = 1; }
  else if(sortParam === 'name_desc') { sortField = 'name'; sortOrder = -1; }

  let matchQuery = { status: 'Published' }

  if (bodyStyle && bodyStyle !== 'Tất cả') matchQuery.bodyStyle = bodyStyle
  if (fuel) matchQuery.fuel = fuel
  if (isNew !== undefined) matchQuery.isNew = isNew === 'true'
  if (seats) matchQuery.seats = parseInt(seats)

  if (brand) {
    const brands = Array.isArray(brand) ? brand : brand.split(',');
    if(brands.length > 0 && brands[0] !== '') {
       matchQuery.$or = brands.map(b => ({ brandId: b }))
    }
  }

  if (search) {
    const searchOr = [
      { name: { $regex: search, $options: 'i' } },
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

  if (minPrice || maxPrice) {
    matchQuery.price = {}
    if (minPrice) matchQuery.price.$gte = Number(minPrice)
    if (maxPrice) matchQuery.price.$lte = Number(maxPrice)
  }

  const pipeline = [
    { $match: matchQuery },
    { $sort: { [sortField]: sortOrder } },
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit }
        ]
      }
    }
  ]

  const [result] = await Car.aggregate(pipeline)
  const total = result.metadata.length > 0 ? result.metadata[0].total : 0
  const products = result.data.map(d => ({ ...d, id: d._id }))

  res.json({
    success: true,
    data: {
      products,
      pagination: { 
        current: page, 
        pageSize: limit, 
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  })
})

export const getProductFilters = asyncHandler(async (req, res) => {
  const stats = await Car.aggregate([
    { $match: { status: 'Published' } },
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
    priceRange: result.priceRange[0] || { min: 0, max: 0 }
  })
})

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Car.find({ status: 'Published' })
  res.json(products)
})

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params

  let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

  const car = await Car.findOne(query)

  if (!car) {
    res.status(404)
    throw new Error('Không tìm thấy xe')
  }

  const carObj = car.toJSON();
  carObj.id = carObj._id;

  res.json({ success: true, data: carObj })
})

export const getProductsByCategory = asyncHandler(async (req, res) => {
  res.json([])
})
