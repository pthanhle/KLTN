import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true // example: 'Mercedes-Benz', 'BMW', 'Audi'
    },
    image: {
      type: String,
      default: ''
    },
    is_partner: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    collation: { locale: 'en', strength: 2 } // Case-insensitive matching built-in
  }
);

// Virtual for counting cars (can be populated later or aggregated, but keeping it flexible)
brandSchema.virtual('carCount', {
  ref: 'Product', // Assuming Car model is handled elsewhere or Product
  localField: '_id',
  foreignField: 'brand_id',
  count: true
});

brandSchema.set('toObject', { virtuals: true });
brandSchema.set('toJSON', { virtuals: true });

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
