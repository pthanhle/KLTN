import mongoose from 'mongoose';

const partCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

const PartCategory = mongoose.model('PartCategory', partCategorySchema);
export default PartCategory;
