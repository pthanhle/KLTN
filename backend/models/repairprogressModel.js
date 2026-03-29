import mongoose from 'mongoose'

// Sub-schema: bước tiến trình sửa chữa / dịch vụ
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
    // Nhân viên tiếp nhận / kỹ thuật viên
    advisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    mechanic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // Trạng thái tổng thể (đồng bộ với step hiện tại trong timeline)
    current_step: {
      type: String,
      enum: ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED'],
      default: 'RECEIVED',
    },

    // Toàn bộ dòng thời gian tiến trình
    timeline: { type: [timelineStepSchema], default: [] },

    // Ghi chú nội bộ tổng quan
    notes: { type: String, default: '' },

    // Ước tính hoàn thành
    estimated_completion: { type: Date },

    // Ảnh trước & sau
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