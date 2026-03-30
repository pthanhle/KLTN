import mongoose from 'mongoose'

const revenueReportSchema = mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    total_revenue: {
      type: mongoose.Types.Decimal128,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

revenueReportSchema.index({ month: 1, year: 1 }, { unique: true })

const RevenueReport = mongoose.model('RevenueReport', revenueReportSchema)

export default RevenueReport