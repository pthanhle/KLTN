import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

let multerInstance = null
let isConfigured = false

const ensureConfigured = () => {
  if (isConfigured) return

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary environment variables')
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'carshop/products',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 800, height: 600, crop: 'limit' }],
    },
  })

  multerInstance = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true)
      } else {
        cb(new Error('Chỉ chấp nhận file hình ảnh'), false)
      }
    },
  })

  isConfigured = true
}

export const upload = {
  single(fieldName) {
    ensureConfigured()
    return multerInstance.single(fieldName)
  },
  array(fieldName, maxCount) {
    ensureConfigured()
    return multerInstance.array(fieldName, maxCount)
  },
  fields(fieldsArray) {
    ensureConfigured()
    return multerInstance.fields(fieldsArray)
  },
  any() {
    ensureConfigured()
    return multerInstance.any()
  }
}

export { cloudinary, ensureConfigured }