import mongoose from 'mongoose'

const customerInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String },
    contact_phone: { type: String },
    email: { type: String },
  },
  { _id: false }
)

const vehicleInfoSchema = new mongoose.Schema(
  {
    brand: { type: String },
    model: { type: String },
    license_plate: { type: String },
    vin_number: { type: String },
    current_odometer: { type: Number },
  },
  { _id: false }
)

const attachmentsSchema = new mongoose.Schema(
  {
    before: { type: [String], default: [] },
    after: { type: [String], default: [] },
  },
  { _id: false }
)

const bookingServiceSchema = new mongoose.Schema(
  {
    service_id: { type: String },
    service_name: { type: String },
    price: { type: Number, default: 0 },
  },
  { _id: false }
)

const timelineStepSchema = new mongoose.Schema(
  {
    step: {
      type: String,
      enum: ['RECEIVED', 'IN_PROGRESS', 'COMPLETED'],
    },
    key: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
      default: 'PENDING',
    },
    time: { type: Date },
    note: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { _id: false }
)

const bookingSchema = mongoose.Schema(
  {
    booking_code: { type: String, unique: true, sparse: true },
    sequence_number: { type: Number, index: true },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    customer_info: { type: customerInfoSchema },

    booking_type: {
      type: String,
      enum: ['test_drive', 'service', 'maintenance'],
      required: true,
      default: 'test_drive',
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: false,
    },
    vehicle_info: { type: vehicleInfoSchema },


    booking_date: { type: Date, required: true },
    time_slot: { type: String, required: true },

    test_drive_type: {
      type: String,
      enum: ['showroom', 'home'],
      default: 'showroom',
    },
    showroom_branch: { type: String },
    delivery_address: {
      type: mongoose.Schema.Types.Mixed, // Accept old strings OR new {street, ward, district, city} objects
    },

    service_type: {
      type: String,
      enum: ['MAINTENANCE', 'CAR_SPA', 'REPAIR', 'INSPECTION', 'OTHER'],
    },
    services: { type: [bookingServiceSchema], default: [] },
    total_cost: { type: Number, default: 0 },
    attachments: { type: attachmentsSchema },

    advisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    mechanic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    requested_staff: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requested_at: { type: Date, default: Date.now },
        _id: false,
      },
    ],
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    assignment_note: { type: String },

    booking_status: {
      type: String,
      enum: [
        'PENDING',
        'CONFIRMED',
        'RECEIVED',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
      ],
      default: 'PENDING',
    },
    status_text: { type: String },

    timeline: { type: [timelineStepSchema], default: [] },

    // Committed before test drive (from client booking form)
    has_driver_license: { type: Boolean, default: false },

    // Test-drive checkin data (collected by sales staff on mobile)
    driver_license_url: { type: String },
    signature_url: { type: String },
    // Post-drive evaluation
    interest_level: { type: Number, min: 0, max: 2 },
    evaluation_feedback: { type: String },

    customer_note: { type: String },
    reschedule_reason: { type: String },
    rating: { type: Number, min: 1, max: 5, default: null },
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking