import mongoose from 'mongoose'

const timelineStepSchema = new mongoose.Schema(
  {
    step: {
      type: String,
      enum: ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED'],
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

const repairProgressSchema = mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    advisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    mechanic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    current_step: {
      type: String,
      enum: ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED'],
      default: 'RECEIVED',
    },

    timeline: { type: [timelineStepSchema], default: [] },

    notes: { type: String, default: '' },

    estimated_completion: { type: Date },

    attachments: {
      before: { type: [String], default: [] },
      after: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
)

const RepairProgress = mongoose.models.RepairProgress || mongoose.model('RepairProgress', repairProgressSchema)

export default RepairProgress