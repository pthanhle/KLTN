import mongoose from 'mongoose'

const costEstimateConfigSchema = mongoose.Schema(
    {
        phi_kiem_dinh: { type: Number, default: 340000 },
        phi_duong_bo: { type: Number, default: 1560000 },
        bao_hiem_tnds: { type: Number, default: 436700 },
        bao_hiem_than_xe: { type: Number, default: 8535000 },
        le_phi_kv1: { type: Number, default: 11000000 },
        le_phi_kv2: { type: Number, default: 1000000 },
        le_phi_kv3: { type: Number, default: 200000 },
    },
    { timestamps: true }
)

const CostEstimateConfig = mongoose.model('CostEstimateConfig', costEstimateConfigSchema)

export default CostEstimateConfig
