import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    value: { type: String },
    filterStyle: { type: String },
  },
  { _id: false }
)

const gallerySchema = new mongoose.Schema(
  {
    photos: { type: [String], default: [] },
    videos: { type: [String], default: [] },
  },
  { _id: false }
)

const specItemSchema = new mongoose.Schema(
  {
    label: { type: String },
    value: { type: String },
  },
  { _id: false }
)

const specCategorySchema = new mongoose.Schema(
  {
    category: { type: String },
    items: [specItemSchema],
  },
  { _id: false }
)

const featureSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String },
    image: { type: String },
  },
  { _id: false }
)

const productSchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    type: {
      type: String,
      enum: ['car', 'part', 'accessory', 'tire'],
      default: 'part',
      required: true,
    },

    sku: { type: String, unique: true, sparse: true },
    product_name: { type: String, required: true },
    tagline: { type: String },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    stock: { type: Number, default: 0 },
    isNew: { type: Boolean, default: false },
    images: { type: [String], default: [] },

    brandId: { type: String },
    brandName: { type: String },
    year: { type: Number },
    odo: { type: Number, default: 0 },
    engine: { type: String },
    fuel: { type: String },
    seats: { type: Number },
    bodyStyle: {
      type: String,
      enum: ['Sedan', 'SUV', 'Coupe', 'Cabriolet', 'Hatchback', 'Pickup', 'Van', 'Minivan'],
    },
    isDemoAvailable: { type: Boolean, default: true },
    versions: { type: [String], default: [] },
    colors: { type: [colorSchema], default: [] },
    gallery: { type: gallerySchema },
    features: { type: [featureSchema], default: [] },
    specs: { type: [specCategorySchema], default: [] },
    threeSixty: { type: [String], default: [] },
    compatible_brands: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

productSchema.virtual('name').get(function () {
  return this.product_name
})

productSchema.virtual('image').get(function () {
  return this.images && this.images.length > 0 ? this.images[0] : null
})

const Product = mongoose.model('Product', productSchema)

export default Product