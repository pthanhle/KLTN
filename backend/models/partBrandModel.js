import mongoose from 'mongoose';

const partBrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true // example: 'Brembo', 'Bosch', 'Yamaha'
    },
    logo: {
      type: String,
      default: ''
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
    collation: { locale: 'en', strength: 2 } // Case-insensitive matching built-in
  }
);

const PartBrand = mongoose.model('PartBrand', partBrandSchema);
export default PartBrand;
