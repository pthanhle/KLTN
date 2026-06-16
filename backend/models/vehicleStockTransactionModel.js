import mongoose from 'mongoose'

const vehicleStockTransactionSchema = new mongoose.Schema(
  {
    vehicle_unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleUnit', required: true, index: true },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true, index: true },
    type: {
      type: String,
      enum: ['import', 'transfer', 'reserve', 'release_reservation', 'contract_lock', 'sell', 'deliver', 'return', 'adjustment', 'service_hold', 'archive'],
      required: true,
      index: true,
    },
    from_status: { type: String },
    to_status: { type: String },
    from_location: { type: mongoose.Schema.Types.Mixed },
    to_location: { type: mongoose.Schema.Types.Mixed },
    related_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
    related_contract_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleContract', default: null },
    related_invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleInvoice', default: null },
    performed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
)

vehicleStockTransactionSchema.index({ vehicle_unit_id: 1, createdAt: -1 })
vehicleStockTransactionSchema.index({ car_id: 1, createdAt: -1 })

const VehicleStockTransaction = mongoose.model('VehicleStockTransaction', vehicleStockTransactionSchema)

export default VehicleStockTransaction
