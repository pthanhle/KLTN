import asyncHandler from 'express-async-handler'
import Car from '../../models/carModel.js'
import Brand from '../../models/brandModel.js'
import mongoose from 'mongoose'
import { addImageUploadJob } from '../../queues/imageQueue.js'
import { getIO } from '../../config/socket.js'
import path from 'path'

const VALID_CAR_STATUSES = ['Draft', 'Published', 'Archived'];
const VALID_OUT_OF_STOCK_BEHAVIORS = ['pre_order', 'hide', 'contact'];

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

const toNumber = (value, defaultValue = undefined) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  const numVal = Number(value);
  return Number.isNaN(numVal) ? defaultValue : numVal;
};

const toBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  return value === true || value === 'true';
};

const toStringArray = (value, defaultValue = []) => {
  const parsed = safeParse(value, defaultValue);
  if (!Array.isArray(parsed)) return defaultValue;
  return parsed.filter(item => typeof item === 'string' && item.trim() !== '');
};

const buildSlug = (value) => {
  return (value || '')
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const buildUniqueSlug = async (baseValue, excludeId = null) => {
  let baseSlug = buildSlug(baseValue);
  if (!baseSlug) baseSlug = `car-${Date.now()}`;

  const escapedSlug = baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const query = { slug: new RegExp(`^${escapedSlug}($|-\\d+$)`, 'i') };
  if (excludeId) query._id = { $ne: excludeId };

  const count = await Car.countDocuments(query);
  return count > 0 ? `${baseSlug}-${count + 1}` : baseSlug;
};

const ensureSkuUnique = async (sku, excludeId = null) => {
  if (!sku) return true;
  const query = { sku };
  if (excludeId) query._id = { $ne: excludeId };
  const existed = await Car.exists(query);
  return !existed;
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
    if (mongoose.Types.ObjectId.isValid(brand)) {
      matchStage.brandId = brand;
    } else {
      matchStage.brandName = { $regex: brand, $options: 'i' };
    }
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
        outOfStock: { $sum: { $cond: [{ $lte: ["$stock", 2] }, 1, 0] } },
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
    name, product_name, sku, slug: requestedSlug, tagline, description,
    price, salePrice, stock, isNew, brandId, brandName, year, odo, engine, power, fuel,
    seats, bodyStyle, isDemoAvailable, isFeatured, status,
    metaTitle, metaDescription, ogImage, outOfStockBehavior
  } = req.body

  const versions = safeParse(req.body.versions, []);
  let colors = safeParse(req.body.colors, []);
  let features = safeParse(req.body.features, []);
  const availableShowrooms = toStringArray(req.body.availableShowrooms, []);
  const metaKeywords = toStringArray(req.body.metaKeywords, []);

  const files = req.files || [];

  colors = colors.map((color, index) => {
    const isPending = color.image && typeof color.image === 'string' && color.image.startsWith('PEND_COL_');
    if (isPending) {
      const fileKey = color.image.replace('PEND_COL_', 'color_file_');
      const colorFile = files.find(f => f.fieldname === fileKey);
      if (colorFile) return { ...color, image: `/uploads/temp/${colorFile.filename}` };
    }
    return color;
  });

  features = features.map((feature, index) => {
    const isPending = feature.image && typeof feature.image === 'string' && feature.image.startsWith('PEND_FEAT_');
    if (isPending) {
      const fileKey = feature.image.replace('PEND_FEAT_', 'feature_file_');
      const featureFile = files.find(f => f.fieldname === fileKey);
      if (featureFile) return { ...feature, image: `/uploads/temp/${featureFile.filename}` };
    }
    return feature;
  });

  const gallery = safeParse(req.body.gallery, { photos: [], videos: [] });
  const specs = safeParse(req.body.specs, []);
  const threeSixty = safeParse(req.body.threeSixty, { images: [], lighting: 'Studio', environment: 'Minimalist Studio' });

  const finalName = name || product_name;
  const parsedPrice = toNumber(price, 0);
  const parsedSalePrice = toNumber(salePrice);
  const parsedStock = toNumber(stock, 0);
  const parsedYear = toNumber(year);
  const parsedOdo = toNumber(odo, 0);
  const parsedSeats = toNumber(seats);

  if (!finalName || price === undefined || price === null || price === '') {
    res.status(400)
    throw new Error('Thiếu thông tin bắt buộc của xe (Tên, Giá)')
  }

  if (parsedSalePrice !== undefined && parsedSalePrice >= parsedPrice) {
    res.status(400)
    throw new Error('Giá khuyến mãi phải nhỏ hơn giá niêm yết')
  }

  if (status && !VALID_CAR_STATUSES.includes(status)) {
    res.status(400)
    throw new Error('Trạng thái xe không hợp lệ')
  }

  if (outOfStockBehavior && !VALID_OUT_OF_STOCK_BEHAVIORS.includes(outOfStockBehavior)) {
    res.status(400)
    throw new Error('Nghiệp vụ cạn kho không hợp lệ')
  }

  const isSkuAvailable = await ensureSkuUnique(sku);
  if (!isSkuAvailable) {
    res.status(400)
    throw new Error('SKU đã tồn tại')
  }

  let heroImage = null;
  let galleryPhotos = gallery.photos || [];

  const singleFile = files.find(f => f.fieldname === 'image');
  if (singleFile) heroImage = `/uploads/temp/${singleFile.filename}`;

  const photoFiles = files.filter(f => f.fieldname === 'photos');
  if (photoFiles.length > 0) {
    const newPhotos = photoFiles.map(file => `/uploads/temp/${file.filename}`);
    galleryPhotos = [...galleryPhotos, ...newPhotos];
  }

  const slug = await buildUniqueSlug(requestedSlug || finalName);

  const car = new Car({
    name: finalName,
    slug,
    sku,
    status: status || 'Published',
    tagline,
    description,
    price: parsedPrice,
    salePrice: parsedSalePrice,
    stock: parsedStock,
    availableShowrooms,
    outOfStockBehavior: outOfStockBehavior || 'pre_order',
    isNew: toBoolean(isNew, false),
    brandId: brandId || slug.split('-')[0],
    brandName,
    year: parsedYear,
    odo: parsedOdo,
    engine,
    power,
    fuel,
    seats: parsedSeats,
    bodyStyle,
    isDemoAvailable: toBoolean(isDemoAvailable, true),
    isFeatured: toBoolean(isFeatured, false),
    versions,
    colors,
    gallery: { photos: galleryPhotos, videos: gallery.videos || [] },
    features,
    specs,
    threeSixty,
    image: heroImage || galleryPhotos[0] || null,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogImage,
  })

  const createdProduct = await car.save()

  if (files.length > 0) {
    await addImageUploadJob(createdProduct._id, files, 'car');
  }

  const io = getIO();
  if (io) io.emit('product_data_updated', { type: 'CREATE', productId: createdProduct._id });

  res.status(201).json({ success: true, data: createdProduct, message: 'Thêm xe mới thành công (Đang xử lý ảnh trên Cloud...)' })
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

  const files = req.files || [];

  const allowedFields = [
    'name', 'product_name', 'slug', 'sku', 'status', 'tagline', 'description',
    'price', 'salePrice', 'stock', 'isNew', 'brandId', 'brandName',
    'availableShowrooms', 'outOfStockBehavior', 'year', 'odo', 'engine', 'power', 'fuel', 'seats', 'bodyStyle',
    'isDemoAvailable', 'isFeatured', 'versions', 'colors', 'gallery', 'features', 'specs',
    'threeSixty', 'image', 'metaTitle', 'metaDescription', 'metaKeywords', 'ogImage'
  ]

  if (req.body.sku !== undefined && req.body.sku !== car.sku) {
    const isSkuAvailable = await ensureSkuUnique(req.body.sku, id);
    if (!isSkuAvailable) {
      res.status(400)
      throw new Error('SKU đã tồn tại')
    }
  }

  if (req.body.slug !== undefined) {
    const normalizedSlug = buildSlug(req.body.slug);
    if (!normalizedSlug) {
      res.status(400)
      throw new Error('Slug không hợp lệ')
    }
    const slugExists = await Car.exists({ slug: normalizedSlug, _id: { $ne: id } });
    if (slugExists) {
      res.status(400)
      throw new Error('Slug đã tồn tại')
    }
    req.body.slug = normalizedSlug;
  }

  if (req.body.price === '') {
    res.status(400)
    throw new Error('Giá niêm yết không được để trống')
  }

  const nextPrice = req.body.price !== undefined ? toNumber(req.body.price, car.price) : car.price;
  const nextSalePrice = req.body.salePrice !== undefined ? toNumber(req.body.salePrice) : car.salePrice;
  if (nextSalePrice !== undefined && nextSalePrice !== null && nextSalePrice >= nextPrice) {
    res.status(400)
    throw new Error('Giá khuyến mãi phải nhỏ hơn giá niêm yết')
  }

  if (req.body.status !== undefined && !VALID_CAR_STATUSES.includes(req.body.status)) {
    res.status(400)
    throw new Error('Trạng thái xe không hợp lệ')
  }

  if (req.body.outOfStockBehavior !== undefined) {
    if (req.body.outOfStockBehavior === '') {
      req.body.outOfStockBehavior = 'pre_order';
    } else if (!VALID_OUT_OF_STOCK_BEHAVIORS.includes(req.body.outOfStockBehavior)) {
      res.status(400)
      throw new Error('Nghiệp vụ cạn kho không hợp lệ')
    }
  }

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      if (field === 'product_name') car.name = req.body[field];
      else if (['versions', 'colors', 'features', 'specs', 'availableShowrooms', 'metaKeywords'].includes(field)) {
        let parsed = safeParse(req.body[field], []);

        if (field === 'colors') {
          parsed = parsed.map((color, index) => {
            const isPending = color.image && typeof color.image === 'string' && color.image.startsWith('PEND_COL_');
            if (isPending) {
              const fileKey = color.image.replace('PEND_COL_', 'color_file_');
              const colorFile = files.find(f => f.fieldname === fileKey);
              if (colorFile) {
                return { ...color, image: `/uploads/temp/${colorFile.filename}` };
              }
              const oldItem = car.colors && car.colors[index];
              return { ...color, image: (oldItem && oldItem.image) ? oldItem.image : null };
            }
            return color;
          });
        }

        if (field === 'features') {
          parsed = parsed.map((feature, index) => {
            const isPending = feature.image && typeof feature.image === 'string' && feature.image.startsWith('PEND_FEAT_');
            if (isPending) {
              const fileKey = feature.image.replace('PEND_FEAT_', 'feature_file_');
              const featureFile = files.find(f => f.fieldname === fileKey);
              if (featureFile) {
                return { ...feature, image: `/uploads/temp/${featureFile.filename}` };
              }
              const oldItem = car.features && car.features[index];
              return { ...feature, image: (oldItem && oldItem.image) ? oldItem.image : null };
            }
            return feature;
          });
        }

        car.set(field, parsed);
        car.markModified(field);
      }
      else if (['gallery', 'threeSixty'].includes(field)) {
        const parsed = safeParse(req.body[field], field === 'gallery' ? { photos: [], videos: [] } : { images: [], lighting: 'Studio', environment: 'Minimalist Studio' });
        car.set(field, parsed);
        car.markModified(field);
      }
      else if (field === 'isDemoAvailable' || field === 'isNew' || field === 'isFeatured') {
        car[field] = toBoolean(req.body[field], false);
      }
      else if (['price', 'salePrice', 'stock', 'year', 'odo', 'seats'].includes(field)) {
        if (req.body[field] === '') {
          if (field === 'stock') {
            car.stock = 0;
            return;
          }
          if (field !== 'price') {
            car.set(field, undefined);
          }
          return;
        }
        const numVal = Number(req.body[field]);
        if (!isNaN(numVal)) car[field] = numVal;
      }
      else if (field === 'image') {
        const val = req.body[field];
        if (val === '') {
          car.set('image', undefined);
        } else if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('/') || val.startsWith('blob:'))) {
          car.image = val;
        }
      }
      else car[field] = req.body[field]
    }
  })

  const singleFile = files.find(f => f.fieldname === 'image');
  if (singleFile) {
    const localUrl = `/uploads/temp/${singleFile.filename}`;
    car.image = localUrl;
    if (!car.gallery) car.gallery = { photos: [], videos: [] };
    if (!car.gallery.photos.includes(localUrl)) {
      car.gallery.photos = [localUrl, ...car.gallery.photos];
      car.markModified('gallery.photos');
    }
  }

  const photoFiles = files.filter(f => f.fieldname === 'photos');
  if (photoFiles.length > 0) {
    const newPhotos = photoFiles.map(file => `/uploads/temp/${file.filename}`);
    if (!car.gallery) car.gallery = { photos: [], videos: [] };
    car.gallery.photos = [...car.gallery.photos, ...newPhotos];
    car.markModified('gallery.photos');
  }

  const updatedProduct = await car.save()

  if (files.length > 0) {
    await addImageUploadJob(updatedProduct._id, files, 'car');
  }

  const io = getIO();
  if (io) io.emit('product_data_updated', { type: 'UPDATE', productId: updatedProduct._id });

  res.json({ success: true, data: updatedProduct, message: 'Cập nhật xe thành công (Đang xử lý ảnh trên Cloud...)' })
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
  const io = getIO();
  if (io) io.emit('product_data_updated', { type: 'DELETE', productId: id });
  res.json({ success: true, message: 'Xe đã được xóa thành công' })
})
