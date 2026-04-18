import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

  const uploadDir = path.join(__dirname, '../uploads/temp')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  multerInstance = multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024,
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