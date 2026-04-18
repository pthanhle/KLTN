import asyncHandler from 'express-async-handler'
import Car from '../../models/carModel.js'
import mongoose from 'mongoose'

const safeParse = (data, defaultValue = null) => {
  if (typeof data === 'string') {
    if (data === 'undefined' || data === 'null' || data === '') return defaultValue;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn(`Failed to parse JSON: ${data}`);
      return defaultValue;
    }
  }
  return data || defaultValue;
};

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

  if (brand && brand !== 'all' && brand !== 'Tất cả') {
    matchStage.brandName = { $regex: brand, $options: 'i' };
  }

  if (bodyStyle && bodyStyle !== 'all' && bodyStyle !== 'Tất cả') {
    matchStage.bodyStyle = bodyStyle;
  }

  if (status && status !== 'all' && status !== 'Tất cả') {
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
  const products = result[0].data.map(d => ({ ...d, id: d._id }));

  const globalStatsPipeline = [
    {
      $group: {
        _id: null,
        totalCars: { $sum: 1 },
        outOfStock: { $sum: { $cond: [{ $lte: ["$stock", 0] }, 1, 0] } },
        totalValue: { $sum: { $multiply: [{ $ifNull: ["$price", 0] }, { $ifNull: ["$stock", 0] }] } },
        activeTestDrives: { $sum: { $cond: [{ $eq: ["$isDemoAvailable", true] }, 1, 0] } }
      }
    }
  ];

  const [globalStatsResult] = await Car.aggregate(globalStatsPipeline);
  const rawStats = globalStatsResult || { totalCars: 0, outOfStock: 0, totalValue: 0, activeTestDrives: 0 };

  const stats = {
    totalFleet: rawStats.totalCars || total,
    totalValue: rawStats.totalValue || 0,
    lowStockModels: rawStats.outOfStock || 0,
    demoCars: rawStats.activeTestDrives || 0,
    fleetGrowthPercentage: 0,
    activeDemoChange: 0,
    lastUpdateVi: new Date().toLocaleTimeString('vi-VN'),
    lastUpdateEn: new Date().toLocaleTimeString('en-US')
  };

  res.json({
    products,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    stats
  });
})

export const getProductsByCategory = asyncHandler(async (req, res) => {
  res.json({ products: [], pagination: { current: 1, pageSize: 10, total: 0 } });
})

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

  const car = await Car.findOne(query);
  if (!car) {
    res.status(404);
    throw new Error('Không tìm thấy xe');
  }

  const carObj = car.toJSON();
  carObj.id = carObj._id;

  res.json({ success: true, data: carObj });
})

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name, product_name, type, sku, tagline, description,
    price, stock, isNew, brandId, brandName, year, odo, engine, power, fuel,
    seats, bodyStyle, isDemoAvailable, status, images: bodyImages,
  } = req.body

  const versions = safeParse(req.body.versions, []);
  let colors = safeParse(req.body.colors, []);
  if (req.files) {
    colors = colors.map((color, index) => {
      const colorFile = req.files.find(f => f.fieldname === `color_image_${index}`);
      const { filterStyle, ...rest } = color;
      if (colorFile) return { ...rest, image: colorFile.path };
      return rest;
    });
  }
  const gallery = safeParse(req.body.gallery, { photos: [], videos: [] });
  const features = safeParse(req.body.features, []);
  const specs = safeParse(req.body.specs, []);
  const threeSixty = safeParse(req.body.threeSixty, { images: [], lighting: 'Studio', environment: 'Minimalist Studio' });

  const finalName = name || product_name;

  if (!finalName || !price) {
    res.status(400)
    throw new Error('Thiếu thông tin bắt buộc của xe (Tên, Giá)')
  }

  let heroImage = null;
  let galleryPhotos = gallery.photos || [];

  if (req.files) {
    const singleFile = req.files.find(f => f.fieldname === 'image');
    if (singleFile) heroImage = singleFile.path;
    
    const photoFiles = req.files.filter(f => f.fieldname === 'photos');
    if (photoFiles.length > 0) {
      const newPhotos = photoFiles.map(file => file.path);
      galleryPhotos = [...galleryPhotos, ...newPhotos];
    }
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
    versions,
    colors,
    gallery: { photos: galleryPhotos, videos: gallery.videos || [] },
    features,
    specs,
    threeSixty,
    image: heroImage || galleryPhotos[0] || null,
  })

  const createdProduct = await car.save()
  res.status(201).json({ success: true, data: createdProduct, message: 'Thêm xe mới thành công' })
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
    'threeSixty', 'image'
  ]

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      if (field === 'product_name') car.name = req.body[field];
      else if (['versions', 'colors', 'features'].includes(field)) {
        let parsed = safeParse(req.body[field], []);
        if (field === 'colors' && req.files && Array.isArray(req.files)) {
          parsed = parsed.map((color, index) => {
            const colorFile = req.files.find(f => f.fieldname === `color_image_${index}`);
            const { filterStyle, ...rest } = color;
            if (colorFile) return { ...rest, image: colorFile.path };
            return rest;
          });
        }
        car[field] = parsed;
      }
      else if (['gallery', 'threeSixty'].includes(field)) {
        car[field] = safeParse(req.body[field], field === 'gallery' ? { photos: [], videos: [] } : { images: [], lighting: 'Studio', environment: 'Minimalist Studio' });
      }
      else if (field === 'specs') {
        car[field] = safeParse(req.body[field], []);
      }
      else if (field === 'isDemoAvailable' || field === 'isNew') {
        car[field] = req.body[field] === 'true' || req.body[field] === true;
      }
      else if (['price', 'salePrice', 'stock', 'year', 'odo', 'seats'].includes(field)) {
        const numVal = Number(req.body[field]);
        if (!isNaN(numVal)) car[field] = numVal;
      }
      else if (field === 'image') {
        if (typeof req.body[field] === 'string' && (req.body[field].startsWith('http') || req.body[field].startsWith('/') || req.body[field].startsWith('blob:'))) {
          car[field] = req.body[field];
        }
      }
      else car[field] = req.body[field]
    }
  })

  if (req.files && Array.isArray(req.files)) {
    const singleFile = req.files.find(f => f.fieldname === 'image');
    if (singleFile) {
      const newImagePath = singleFile.path;
      car.image = newImagePath;
      
      if (!car.gallery) car.gallery = { photos: [], videos: [] };
      if (!Array.isArray(car.gallery.photos)) car.gallery.photos = [];
      
      if (!car.gallery.photos.includes(newImagePath)) {
        car.gallery.photos = [newImagePath, ...car.gallery.photos];
      }
    }
    
    const photoFiles = req.files.filter(f => f.fieldname === 'photos');
    if (photoFiles.length > 0) {
      const newPhotos = photoFiles.map(file => file.path);
      if (!car.gallery) car.gallery = { photos: [], videos: [] };
      if (!Array.isArray(car.gallery.photos)) car.gallery.photos = [];
      car.gallery.photos = [...car.gallery.photos, ...newPhotos];
    }
  }

  const updatedProduct = await car.save()
  res.json({ success: true, data: updatedProduct, message: 'Cập nhật xe thành công' })
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
  res.json({ success: true, message: 'Xe đã được xóa thành công' })
})
