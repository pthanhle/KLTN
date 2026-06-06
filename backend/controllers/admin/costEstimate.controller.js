import asyncHandler from 'express-async-handler'
import CostEstimateConfig from '../../models/costEstimateConfigModel.js'

export const getCostEstimateConfig = asyncHandler(async (req, res) => {
    let config = await CostEstimateConfig.findOne()
    if (!config) {
        config = await CostEstimateConfig.create({})
    }
    res.json(config)
})

export const updateCostEstimateConfig = asyncHandler(async (req, res) => {
    const { phi_kiem_dinh, phi_duong_bo, bao_hiem_tnds, bao_hiem_than_xe, le_phi_kv1, le_phi_kv2, le_phi_kv3 } = req.body

    let config = await CostEstimateConfig.findOne()
    if (!config) {
        config = await CostEstimateConfig.create({ phi_kiem_dinh, phi_duong_bo, bao_hiem_tnds, bao_hiem_than_xe, le_phi_kv1, le_phi_kv2, le_phi_kv3 })
    } else {
        if (phi_kiem_dinh !== undefined) config.phi_kiem_dinh = phi_kiem_dinh
        if (phi_duong_bo !== undefined) config.phi_duong_bo = phi_duong_bo
        if (bao_hiem_tnds !== undefined) config.bao_hiem_tnds = bao_hiem_tnds
        if (bao_hiem_than_xe !== undefined) config.bao_hiem_than_xe = bao_hiem_than_xe
        if (le_phi_kv1 !== undefined) config.le_phi_kv1 = le_phi_kv1
        if (le_phi_kv2 !== undefined) config.le_phi_kv2 = le_phi_kv2
        if (le_phi_kv3 !== undefined) config.le_phi_kv3 = le_phi_kv3
        await config.save()
    }

    res.json({ message: 'Cập nhật cấu hình dự toán chi phí thành công', config })
})
