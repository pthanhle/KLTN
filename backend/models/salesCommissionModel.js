import mongoose from 'mongoose'

const salesCommissionSchema = new mongoose.Schema(
  {
    sales_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleContract', required: true, index: true },
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleInvoice', default: null, index: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true, index: true },
    vehicle_unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleUnit', required: true, index: true },
    test_drive_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
    basis_amount: { type: Number, required: true, default: 0 },
    commission_rate: { type: Number, required: true, default: 0 },
    commission_amount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'paid', 'cancelled'],
      default: 'pending',
      index: true,
    },
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    approved_at: { type: Date },
    paid_at: { type: Date },
    note: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

salesCommissionSchema.index({ contract_id: 1, sales_id: 1 }, { unique: true })

salesCommissionSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const SalesCommission = mongoose.model('SalesCommission', salesCommissionSchema)

export default SalesCommission
