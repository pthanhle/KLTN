import mongoose from 'mongoose';

const serviceAppointmentSchema = new mongoose.Schema({
  appointmentCode: { type: String, required: true, unique: true },

  customerInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true }
  },

  vehicleInfo: {
    brand: { type: String, required: true },
    model: { type: String },
    plateNumber: { type: String, required: true },
    symptoms: { type: String }
  },

  requestedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceItem' }],

  dropoffDate: { type: Date, required: true },
  dropoffTimeWindow: { type: String, required: true },

  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'ARRIVED'], default: 'PENDING' },
  serviceCenter: { type: String }
}, { timestamps: true });

const ServiceAppointment = mongoose.model('ServiceAppointment', serviceAppointmentSchema);
export default ServiceAppointment;
