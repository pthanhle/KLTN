import mongoose from 'mongoose'

const customerSnapshotSchema = new mongoose.Schema(
  {
    full_name: String,
    phone: String,
    email: String,
    address: String,
    id_number: String,
    tax_code: String,
    company_name: String,
  },
  { _id: false }
)

const vehicleSnapshotSchema = new mongoose.Schema(
  {
    name: String,
    brandName: String,
    sku: String,
    vin: String,
    engine_number: String,
    color: String,
    year: Number,
    odometer: Number,
    fuel: String,
    seats: Number,
  },
  { _id: false }
)

const contractPricingSnapshotSchema = new mongoose.Schema(
  {
    list_price: { type: Number, default: 0 },
    sale_price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    vat: { type: Number, default: 0 },
    registration_fee: { type: Number, default: 0 },
    insurance_fee: { type: Number, default: 0 },
    other_fees: { type: Number, default: 0 },
    grand_total: { type: Number, default: 0 },
  },
  { _id: false }
)

const commissionSnapshotSchema = new mongoose.Schema(
  {
    policy_code: String,
    basis_amount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
  },
  { _id: false }
)

const vehicleContractSchema = new mongoose.Schema(
  {
    contract_number: { type: String, required: true, unique: true, index: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    customer_snapshot: { type: customerSnapshotSchema, default: () => ({}) },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true, index: true },
    vehicle_unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleUnit', required: true, index: true },
    vehicle_snapshot: { type: vehicleSnapshotSchema, default: () => ({}) },
    pricing_snapshot: { type: contractPricingSnapshotSchema, default: () => ({}) },
    sales_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    test_drive_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
    commission_snapshot: { type: commissionSnapshotSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ['draft', 'issued', 'signed', 'paid', 'cancelled', 'delivered'],
      default: 'draft',
      index: true,
    },
    generated_file_url: { type: String },
    attachments: { type: [String], default: [] },
    note: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    issued_at: Date,
    signed_at: Date,
    cancelled_at: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

vehicleContractSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

vehicleContractSchema.index({ createdAt: -1 })

const VehicleContract = mongoose.model('VehicleContract', vehicleContractSchema)

export default VehicleContract
