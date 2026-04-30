import mongoose from 'mongoose';

const serviceItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  serviceName: { type: String, required: true },
  priceType: { type: String, enum: ['FIXED', 'STARTING_AT', 'CONTACT'], required: true, default: 'CONTACT' },
  basePrice: { type: Number, default: 0 },
  estimatedDuration: { type: Number, default: null },
  isPackage: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceCategory' },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ServiceItem = mongoose.model('ServiceItem', serviceItemSchema);
export default ServiceItem;
