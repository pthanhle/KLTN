import mongoose from 'mongoose'

const vehicleInvoiceSchema = new mongoose.Schema(
  {
    invoice_number: { type: String, required: true, unique: true, index: true },
    contract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleContract', required: true, index: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    vehicle_unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleUnit', required: true, index: true },
    amount: { type: Number, required: true, default: 0 },
    paid_amount: { type: Number, default: 0 },
    payment_status: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'refunded', 'cancelled'],
      default: 'unpaid',
      index: true,
    },
    payment_method: { type: String },
    transaction_refs: { type: [String], default: [] },
    issued_at: { type: Date, default: Date.now },
    paid_at: { type: Date },
    generated_file_url: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

vehicleInvoiceSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const VehicleInvoice = mongoose.model('VehicleInvoice', vehicleInvoiceSchema)

export default VehicleInvoice
