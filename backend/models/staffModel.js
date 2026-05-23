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
