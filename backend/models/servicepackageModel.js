import mongoose from 'mongoose'

const servicePackageSchema = mongoose.Schema(
  {
    service_name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    service_type: {
      type: String,
      enum: ['MAINTENANCE', 'CAR_SPA', 'REPAIR', 'INSPECTION', 'OTHER'],
      default: 'OTHER',
    },
    image: { type: String },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema)

export default ServicePackage