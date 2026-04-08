import mongoose from 'mongoose';

const partConditionSchema = new mongoose.Schema(
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
      trim: true // example: 'new', 'used', 'oem', 'aftermarket'
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const PartCondition = mongoose.model('PartCondition', partConditionSchema);
export default PartCondition;
