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
      enum: ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED', 'CANCELLED'],
      default: 'RECEIVED',
    },
    current_step: {
      type: String,
      enum: ['RECEIVED', 'DIAGNOSING', 'QUOTING', 'IN_PROGRESS', 'QC_TESTING', 'COMPLETED'],
      default: 'RECEIVED'
    },
    diagnostics: [
      {
        id: String,
        title: String,
        icon: String,
        technician_note: String,
        items: [
          {
            name: String,
            status: { type: String, enum: ['normal', 'warning', 'critical'], default: 'normal' },
            action_required: String
          }
        ]
      }
    ],
    quotation: {
      parts: [
        {
          sku: String,
          name: String,
          quantity: { type: Number, default: 0 },
          unit_price: { type: Number, default: 0 }
        }
      ],
      labors: [
        {
          description: String,
          hours: { type: Number, default: 0 },
          rate: { type: Number, default: 0 }
        }
      ],
      vat_rate: { type: Number, default: 0.1 },
      deposit_amount: { type: Number, default: 0 },
      status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
      approved_at: Date
    },
    parts_usage: [
      {
        name: String,
        progress: { type: Number, default: 0 },
        status: { type: String, enum: ['WAITING', 'IN_PROGRESS', 'COMPLETED'], default: 'WAITING' },
        eta: Date
      }
    ],
    system_logs: [
      {
        time: { type: Date, default: Date.now },
        type: { type: String, enum: ['LOG', 'INF', 'WRN', 'ERR'], default: 'LOG' },
        message: String
      }
    ],
    qc_metrics: {
      pass_rate: { type: Number, default: 100 },
      time_spent_minutes: { type: Number, default: 0 },
      technician_count: { type: Number, default: 0 },
      faults_count: { type: Number, default: 0 }
    },
    reception_info: {
      odometer: Number,
      fuel_level: Number,
      customer_notes: String,
      damage_map: [
        {
          label: String,
          description: String,
          x: Number,
          y: Number
        }
      ],
      belongings: [
        {
          item: String,
          status: { type: Boolean, default: false }
        }
      ]
    },
    signatures: {
      advisor: {
        name: String,
        signature_url: String
      },
      customer: {
        name: String,
        signature_url: String
      }
    },
    qc_checklist: [
      {
        task: String,
        status: { type: String, enum: ['passed', 'failed', 'pending'], default: 'pending' },
        checked_at: Date
      }
    ],
    delivery: {
      handover_brief: {
        odometer_at_delivery: Number,
        fuel_level_at_delivery: String,
        is_car_washed: { type: Boolean, default: false },
        is_interior_cleaned: { type: Boolean, default: false }
      },
      invoice_ledger: {
        invoice_no: String,
        payment_status: { type: String, enum: ['UNPAID', 'PARTIALLY_PAID', 'PAID'], default: 'UNPAID' },
        payment_method: String,
        paid_amount: { type: Number, default: 0 },
        total_amount: { type: Number, default: 0 },
        payment_qr_url: String
      },
      handover_agreement: {
        received_old_parts: { type: Boolean, default: false },
        no_new_scratches: { type: Boolean, default: false },
        personal_belongings_checked: { type: Boolean, default: false }
      },
      handshake_protocol: {
        promised_delivery_date: Date,
        actual_delivery_date: Date,
        customer_satisfaction_level: { type: Number, min: 1, max: 5 }
      }
    },
    notes: {
      type: String,
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