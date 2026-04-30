import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Wrench' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);
export default ServiceCategory;
