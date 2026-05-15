import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const addressSchema = new mongoose.Schema(
  {
    is_default: { type: Boolean, default: false },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String },
    street: { type: String, required: true },
    label: { type: String, enum: ['HOME', 'OFFICE', 'OTHER'], default: 'HOME' }
  },
  { _id: true }
)

const vehicleSchema = new mongoose.Schema(
  {
    is_default: { type: Boolean, default: false },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number },
    license_plate: { type: String },
    vin: { type: String },
    last_odo: { type: Number, default: 0 },
    color: { type: String }
  },
  { _id: true }
)

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    full_name: { type: String, required: true },

    address: { type: String },

    addresses: { type: [addressSchema], default: [] },
    garage: { type: [vehicleSchema], default: [] },

    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    googleId: { type: String },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    avatar: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'inactive' },

    customer_type: { type: String, enum: ['INDIVIDUAL', 'BUSINESS'], default: 'INDIVIDUAL' },
    tax_info: {
      company_name: { type: String },
      tax_code: { type: String },
      company_address: { type: String }
    },

    loyalty: {
      points: { type: Number, default: 0 },
      accumulated_points: { type: Number, default: 0 },
      tier: { type: String, enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'TITANIUM'], default: 'BRONZE' },
      total_spent: { type: Number, default: 0 },
      active_vouchers: { type: Number, default: 0 }
    },

    debt: { type: Number, default: 0 },
    source: { type: String, default: 'ORGANIC' },
    last_visit_date: { type: Date },

    preferences: {
      receive_marketing: { type: Boolean, default: true }
    },
    admin_notes: { type: String },

    isEmailVerified: { type: Boolean, default: false },
    emailOTP: { type: String },
    emailOTPExpire: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpire: { type: Date },
    refreshTokens: { type: [String], default: [] },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User
