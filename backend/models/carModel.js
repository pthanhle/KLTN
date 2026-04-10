import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    image: { type: String },
    filterStyle: { type: String },
  },
  { 
    _id: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  } 
);

colorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const featureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }
);

const specItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const specCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: [specItemSchema],
  },
  { _id: false }
);

const gallerySchema = new mongoose.Schema(
  {
    photos: { type: [String], default: [] },
    videos: { type: [String], default: [] },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String, unique: true, sparse: true },
    status: { 
      type: String, 
      enum: ['Draft', 'Published', 'Archived'], 
      default: 'Draft' 
    },
    
    tagline: { type: String },
    description: { type: String },
    brandId: { type: String, index: true },
    brandName: { type: String },
    bodyStyle: { type: String },
    isNew: { type: Boolean, default: true },
    isDemoAvailable: { type: Boolean, default: true },
    
    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number },
    stock: { type: Number, default: 1 },
    availableShowrooms: { type: [String], default: [] },
    outOfStockBehavior: { 
      type: String, 
      enum: ['pre_order', 'hide', 'contact'], 
      default: 'pre_order' 
    },
    
    year: { type: Number },
    odo: { type: Number, default: 0 },
    engine: { type: String },
    power: { type: String },
    fuel: { type: String, default: 'Xăng' },
    seats: { type: Number },
    versions: { type: [String], default: [] },

    image: { type: String },
    gallery: { type: gallerySchema, default: () => ({}) },
    threeSixty: { type: [String], default: [] },

    colors: [colorSchema],
    features: [featureSchema],
    specs: [specCategorySchema],

    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

carSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Car = mongoose.model('Car', carSchema);

export default Car;