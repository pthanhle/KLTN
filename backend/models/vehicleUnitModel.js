import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['warehouse', 'showroom', 'service', 'in_transit', 'customer', 'other'],
      default: 'warehouse',
    },
    code: { type: String },
    name: { type: String },
    address: { type: String },
  },
  { _id: false }
)

const colorSnapshotSchema = new mongoose.Schema(
  {
    name: { type: String },
    value: { type: String },
  },
  { _id: false }
)

const acquisitionSchema = new mongoose.Schema(
  {
    source: { type: String },
    received_at: { type: Date },
    purchase_cost: { type: Number, default: 0 },
    supplier_name: { type: String },
  },
  { _id: false }
)

const pricingSnapshotSchema = new mongoose.Schema(
  {
    listed_price: { type: Number, default: 0 },
    sale_price: { type: Number, default: null },
  },
  { _id: false }
)

const lifecycleSchema = new mongoose.Schema(
  {
    reserved_at: { type: Date },
    contract_locked_at: { type: Date },
    sold_at: { type: Date },
    delivered_at: { type: Date },
  },
  { _id: false }
)

const vehicleUnitSchema = new mongoose.Schema(
  {
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true, index: true },
    vin: { type: String, unique: true, sparse: true, trim: true },
    engine_number: { type: String, trim: true },
    unit_code: { type: String, unique: true, sparse: true, trim: true },
    color: { type: colorSnapshotSchema, default: () => ({}) },
    model_year: { type: Number },
    odometer: { type: Number, default: 0 },
    condition: {
      type: String,
      enum: ['new', 'demo', 'used', 'certified_pre_owned'],
      default: 'new',
      index: true,
    },
    location: { type: locationSchema, default: () => ({}) },
    status: {
      type: String,
      enum: ['in_stock', 'demo_available', 'reserved', 'contract_pending', 'sold', 'delivered', 'service_hold', 'in_transit', 'archived'],
      default: 'in_stock',
      index: true,
    },
    reserved_by_customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    reserved_by_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
    assigned_sales_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    acquisition: { type: acquisitionSchema, default: () => ({}) },
    pricing_snapshot: { type: pricingSnapshotSchema, default: () => ({}) },
    lifecycle: { type: lifecycleSchema, default: () => ({}) },
    notes: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

vehicleUnitSchema.index({ car_id: 1, status: 1 })
vehicleUnitSchema.index({ 'location.code': 1, status: 1 })
vehicleUnitSchema.index({ assigned_sales_id: 1 })
vehicleUnitSchema.index({ reserved_by_booking_id: 1 })

vehicleUnitSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

const VehicleUnit = mongoose.model('VehicleUnit', vehicleUnitSchema)

export default VehicleUnit
