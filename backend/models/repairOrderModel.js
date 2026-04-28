import mongoose from 'mongoose';

const repairOrderSchema = new mongoose.Schema({
  orderCode: { type: String, unique: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceAppointment' },
  serviceAdvisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  leadMechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },

  overallProgress: { type: Number, default: 0 },
  currentStage: { type: String, enum: ['RECEPTION', 'DIAGNOSIS', 'QUOTING', 'CUSTOMER_APPROVAL', 'EXECUTION', 'QC', 'HANDOVER'], default: 'RECEPTION' },

  diagnosticData: {
    summary: { critical: { type: Number, default: 0 }, warning: { type: Number, default: 0 }, normal: { type: Number, default: 0 } },
    conclusion: String,
    checkItems: [{
      systemCategory: String,
      itemName: String,
      healthStatus: { type: String, enum: ['NORMAL', 'WARNING', 'CRITICAL'] },
      mechanicNotes: String,
      recommendedAction: String
    }]
  },

  quotationData: {
    parts: [{
      partCode: String, name: String, quantity: Number, unitPrice: Number
    }],
    labors: [{
      laborCode: String, description: String, hours: Number, rate: Number
    }],
    vatRate: { type: Number, default: 0.1 },
    status: { type: String, enum: ['DRAFT', 'WAITING_FOR_CUSTOMER', 'APPROVED', 'REJECTED'], default: 'DRAFT' },
    customerSignatureUrl: String
  },

  additionalRequests: [{
    title: String,
    description: String,
    additionalCost: Number,
    approvalStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
  }]
}, { timestamps: true });

const RepairOrder = mongoose.model('RepairOrder', repairOrderSchema);
export default RepairOrder;
