import asyncHandler from 'express-async-handler'
import Product from '../../models/productModel.js'
import mongoose from 'mongoose'


export const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 10;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;

  const pipeline = [];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { product_name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    });
  }

  pipeline.push(
    {
      $lookup: {
        from: 'inventories',
        localField: '_id',
        foreignField: 'product_id',
        as: 'inventory_data'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'category_doc'
      }
    },
    {
      $addFields: {
        inventory_quantity: {
          $ifNull: [{ $arrayElemAt: ["$inventory_data.quantity_available", 0] }, 0]
        },
        category_id: { $arrayElemAt: ["$category_doc", 0] },
        cleanPrice: {
          $cond: {
            if: { $eq: [{ $type: "$price" }, "object"] },
            then: { $toDouble: { $getField: { field: { $literal: "$numberDecimal" }, input: "$price" } } },
            else: { $toDouble: "$price" }
          }
        }
      }
    },
    {
      $project: {
        inventory_data: 0,
        category_doc: 0,
        cleanPrice: 0
      }
    }
  );

  const sortObj = {};
  sortObj[sortField === 'price' ? 'cleanPrice' : sortField] = sortOrder;
  pipeline.push({ $sort: sortObj });

  pipeline.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
    }
  });

  const result = await Product.aggregate(pipeline);
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
  const { categoryId } = req.params;
  const page = parseInt(req.query.current || req.query.page) || 1;
  const limit = parseInt(req.query.pageSize || req.query.limit) || 10;
  const search = req.query.search || '';
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = (req.query.sortOrder === 'ascend' || req.query.sortOrder === 'asc') ? 1 : -1;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error('Category ID không hợp lệ');
  }

  const pipeline = [
    {
      $match: { category_id: new mongoose.Types.ObjectId(categoryId) }
    }
  ];

  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { product_name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    });
  }

  pipeline.push(
    {
      $lookup: {
        from: 'inventories',
        localField: '_id',
        foreignField: 'product_id',
        as: 'inventory_data'
      }
    },
    {
      $addFields: {
        inventory_quantity: {
          $ifNull: [{ $arrayElemAt: ["$inventory_data.quantity_available", 0] }, 0]
        },
        cleanPrice: {
          $cond: {
            if: { $eq: [{ $type: "$price" }, "object"] },
            then: { $toDouble: { $getField: { field: { $literal: "$numberDecimal" }, input: "$price" } } },
            else: { $toDouble: "$price" }
          }
        }
      }
    },
    {
      $project: {
        inventory_data: 0,
        cleanPrice: 0
      }
    }
  );

  const sortObj = {};
  sortObj[sortField === 'price' ? 'cleanPrice' : sortField] = sortOrder;
  pipeline.push({ $sort: sortObj });

  pipeline.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
    }
  });

  const result = await Product.aggregate(pipeline);
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


export const createProduct = asyncHandler(async (req, res) => {
  const {
    category_id,
    type,
    sku,
    product_name,
    tagline,
    description,
    price,
    stock,
    isNew,
    brandId,
    brandName,
    year,
    odo,
    engine,
    fuel,
    seats,
    bodyStyle,
    isDemoAvailable,
    versions,
    colors,
    gallery,
    features,
    specs,
    threeSixty,
    images: bodyImages,
  } = req.body

  if (!category_id || !product_name || !price || !type) {
    res.status(400)
    throw new Error('Thiếu thông tin bắt buộc của sản phẩm (Category, Tên, Giá, Loại)')
  }

  let finalImages = bodyImages || []
  if (req.file) {
    finalImages = [req.file.path, ...finalImages]
  }

  const product = new Product({
    category_id,
    type,
    sku,
    product_name,
    tagline,
    description,
    price,
    stock: stock || 0,
    isNew: isNew || false,
    brandId,
    brandName,
    year,
    odo: odo || 0,
    engine,
    fuel,
    seats,
    bodyStyle,
    isDemoAvailable: isDemoAvailable !== undefined ? isDemoAvailable : true,
    versions: versions || [],
    colors: colors || [],
    gallery: gallery || { photos: [], videos: [] },
    features: features || [],
    specs: specs || [],
    threeSixty: threeSixty || [],
    images: finalImages,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
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
    throw new Error('Sản phẩm không tồn tại')
  }

  const allowedFields = [
    'category_id', 'type', 'sku', 'product_name', 'tagline', 'description',
    'price', 'stock', 'isNew',
    'brandId', 'brandName', 'year', 'odo', 'engine', 'fuel', 'seats', 'bodyStyle',
    'isDemoAvailable', 'versions', 'colors', 'gallery', 'features', 'specs',
    'threeSixty', 'images'
  ]

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field]
    }
  })

  if (req.file) {
    product.images = [req.file.path, ...(product.images || [])]
  }

  const updatedProduct = await product.save()
  res.json(updatedProduct)
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
    throw new Error('Sản phẩm không tồn tại')
  }

  await product.deleteOne()
  res.json({ message: 'Sản phẩm đã được xóa' })
})