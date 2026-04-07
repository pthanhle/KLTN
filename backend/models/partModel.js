import mongoose from 'mongoose';

const fitmentSchema = new mongoose.Schema(
  {
    brand: { type: String },
    model: { type: String, required: true },
    yearRange: { type: String, required: true },
  },
  { _id: false }
);

const specSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const optionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    choices: { type: mongoose.Schema.Types.Mixed, default: [] },
  },
  { _id: false }
);

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên phụ tùng là bắt buộc'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'Mã SKU là bắt buộc'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      required: [true, 'Danh mục là bắt buộc'],
      trim: true,
    },
    original_price: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Giá bán là bắt buộc'],
    },
    images: {
      type: [String],
      default: [],
    },
    compatible_brands: {
      type: [String],
      default: [], // Array of brand strings like ['Audi', 'BMW']
      // Collation note: For case-insensitive search, we handle it at query level or add index
    },
    fitment_data: {
      type: [fitmentSchema],
      default: [],
    },
    landing_blocks: {
      type: mongoose.Schema.Types.Mixed, // Dynamic array of JSON blocks from Adaptive Builder
      default: [],
    },
    inventory: {
      warehouse: { type: Number, default: 0, min: 0 },
      showroom: { type: Number, default: 0, min: 0 },
    },
    specs: {
      type: [specSchema],
      default: [],
    },
    options: {
      type: [optionSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'draft'],
      default: 'draft',
    },
    slug: {
      type: String,
      unique: true,
    },
    seo_title: {
      type: String,
      maxlength: 60,
    },
    seo_description: {
      type: String,
      maxlength: 160,
    },
    reviews_summary: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      total: { type: Number, default: 0 },
      distribution: {
        1: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        5: { type: Number, default: 0 }
      }
    },
    sold_count: {
      type: Number,
      default: 0,
    },
    is_best_seller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collation: { locale: 'en', strength: 2 } // Enables case-insensitive sorting/indexing natively
  }
);

// Virtual field to compute total stock dynamically
partSchema.virtual('stock').get(function () {
  return (this.inventory?.warehouse || 0) + (this.inventory?.showroom || 0);
});

// Virtual field to extract the primary image
partSchema.virtual('image').get(function () {
  return this.images && this.images.length > 0 ? this.images[0] : null;
});

// Middleware: Auto-generate slug before saving if not present or modified
partSchema.pre('save', async function () {
  if (this.isModified('name')) {
    let slug = this.name.toLowerCase();
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d");
    slug = slug.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const count = await mongoose.model('Part').countDocuments({ slug: new RegExp(`^${slug}`, 'i') });
    this.slug = count > 0 ? `${slug}-${count + 1}` : slug;
  }
});

// Notice: In the future, we will mount Mongoose Audit Log middleware here

const Part = mongoose.model('Part', partSchema);

export default Part;
