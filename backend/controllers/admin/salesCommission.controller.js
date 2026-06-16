import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import SalesCommission from '../../models/salesCommissionModel.js'
import VehicleContract from '../../models/vehicleContractModel.js'
import VehicleInvoice from '../../models/vehicleInvoiceModel.js'

const COMMISSION_STATUSES = ['pending', 'approved', 'paid', 'cancelled']

const buildCommissionQuery = (req) => {
  const { salesId, contractId, invoiceId, status, customerId, carId } = req.query
  const query = {}

  if (salesId) query.sales_id = salesId
  if (contractId) query.contract_id = contractId
  if (invoiceId) query.invoice_id = invoiceId
  if (status) query.status = status
  if (customerId) query.customer_id = customerId
  if (carId) query.car_id = carId

  return query
}

export const getSalesCommissions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const query = buildCommissionQuery(req)

  const [commissions, total] = await Promise.all([
    SalesCommission.find(query)
      .populate('sales_id', 'full_name email phone')
      .populate('contract_id', 'contract_number status')
      .populate('invoice_id', 'invoice_number payment_status paid_amount amount')
      .populate('customer_id', 'full_name email phone')
      .populate('car_id', 'name sku brandName')
      .populate('vehicle_unit_id', 'vin unit_code status')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    SalesCommission.countDocuments(query),
  ])

  res.json({
    success: true,
    data: commissions,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

export const getSalesCommissionById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID hoa hồng không hợp lệ')
  }

  const commission = await SalesCommission.findById(req.params.id)
    .populate('sales_id', 'full_name email phone')
    .populate('contract_id')
    .populate('invoice_id')
    .populate('customer_id', 'full_name email phone')
    .populate('car_id', 'name sku brandName')
    .populate('vehicle_unit_id')
    .populate('approved_by', 'full_name email')

  if (!commission) {
    res.status(404)
    throw new Error('Không tìm thấy hoa hồng sales')
  }

  res.json({ success: true, data: commission })
})

export const createSalesCommission = asyncHandler(async (req, res) => {
  const { contract_id, invoice_id, commission_rate, commission_amount, basis_amount, note } = req.body

  if (!contract_id || !mongoose.Types.ObjectId.isValid(contract_id)) {
    res.status(400)
    throw new Error('Vui lòng chọn hợp đồng hợp lệ')
  }

  const contract = await VehicleContract.findById(contract_id)
  if (!contract) {
    res.status(404)
    throw new Error('Hợp đồng mua xe không tồn tại')
  }

  if (!contract.sales_id) {
    res.status(400)
    throw new Error('Hợp đồng chưa có sales phụ trách')
  }

  const invoice = invoice_id ? await VehicleInvoice.findById(invoice_id) : null
  const finalBasisAmount = Number(basis_amount ?? contract.pricing_snapshot?.grand_total ?? invoice?.amount ?? 0)
  const finalRate = Number(commission_rate ?? contract.commission_snapshot?.rate ?? 0)
  const finalAmount = Number(commission_amount ?? contract.commission_snapshot?.amount ?? finalBasisAmount * finalRate)

  const commission = await SalesCommission.findOneAndUpdate(
    { contract_id: contract._id, sales_id: contract.sales_id },
    {
      sales_id: contract.sales_id,
      contract_id: contract._id,
      invoice_id: invoice?._id || null,
      customer_id: contract.customer_id,
      car_id: contract.car_id,
      vehicle_unit_id: contract.vehicle_unit_id,
      test_drive_booking_id: contract.test_drive_booking_id || null,
      basis_amount: finalBasisAmount,
      commission_rate: finalRate,
      commission_amount: finalAmount,
      status: 'pending',
      note,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )

  res.status(201).json({ success: true, data: commission })
})

export const updateSalesCommissionStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body

  if (!COMMISSION_STATUSES.includes(status)) {
    res.status(400)
    throw new Error('Trạng thái hoa hồng không hợp lệ')
  }

  const commission = await SalesCommission.findById(req.params.id)
  if (!commission) {
    res.status(404)
    throw new Error('Không tìm thấy hoa hồng sales')
  }

  commission.status = status
  if (note !== undefined) commission.note = note
  if (status === 'approved') {
    commission.approved_by = req.user?._id
    commission.approved_at = new Date()
  }
  if (status === 'paid') {
    commission.paid_at = new Date()
  }

  await commission.save()

  res.json({ success: true, data: commission })
})
