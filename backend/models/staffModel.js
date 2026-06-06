import mongoose from 'mongoose'

const kpiSchema = new mongoose.Schema(
  {
    revenue: {
      current: { type: Number, default: 0 },
      target: { type: Number, default: 0 }
    },
    csat: {
      score: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      percentile: { type: String }
    },
    efficiency: {
      billed: { type: Number, default: 0 },
      clocked: { type: Number, default: 0 },
      rate: { type: Number, default: 0 }
    },
    rework: {
      rate: { type: Number, default: 0 },
      trend: { type: Number, default: 0 }
    }
  },
  { _id: false }
)

const kanbanTaskSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    priority: { type: String },
    sla: { type: String },
    progress: { type: Number },
    billed: { type: String },
    customerName: { type: String },
    licensePlate: { type: String },
    customerPhone: { type: String },
    vehicleModel: { type: String },
    appointmentTime: { type: String },
    description: { type: String }
  },
  { _id: false }
)

const staffIdentitySchema = new mongoose.Schema({
  idNumber: { type: String, default: null },
  issueDate: { type: String, default: null },
  issuePlace: { type: String, default: null },
  dob: { type: String, default: null },
  pob: { type: String, default: null },
  permanentAddress: { type: String, default: null },
  currentAddress: { type: String, default: null },
}, { _id: false })

const staffFinancialSchema = new mongoose.Schema({
  bankAccount: { type: String, default: null },
  bankName: { type: String, default: null },
  bankBranch: { type: String, default: null },
  taxCode: { type: String, default: null },
  insuranceCode: { type: String, default: null },
}, { _id: false })

const staffEmergencySchema = new mongoose.Schema({
  contactName: { type: String, default: null },
  relation: { type: String, default: null },
  phone: { type: String, default: null },
  address: { type: String, default: null },
}, { _id: false })

const staffSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'], default: 'ACTIVE' },

    baseSalary: { type: Number, default: 0 },
    kpiType: { type: String, default: 'SALARY_ONLY' },
    kpiValue: { type: Number, default: 0 },
    isOvertimeEligible: { type: Boolean, default: false },
    accessLevel: { type: String, default: 'STANDARD_USER' },
    lastSetPassword: { type: String, default: null },

    identity: { type: staffIdentitySchema, default: () => ({}) },
    financial: { type: staffFinancialSchema, default: () => ({}) },
    emergency: { type: staffEmergencySchema, default: () => ({}) },

    performance: {
      kpis: { type: kpiSchema },
      kanban: {
        todo: [kanbanTaskSchema],
        inProgress: [kanbanTaskSchema],
        done: [kanbanTaskSchema]
      }
    }
  },
  {
    timestamps: true,
  }
)

const Staff = mongoose.model('Staff', staffSchema)
export default Staff
