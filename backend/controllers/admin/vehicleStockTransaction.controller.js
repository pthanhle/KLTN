import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import VehicleStockTransaction from '../../models/vehicleStockTransactionModel.js'

const buildTransactionQuery = (req) => {
  const { vehicleUnitId, carId, type, contractId, invoiceId, bookingId } = req.query
  const query = {}

  if (vehicleUnitId) query.vehicle_unit_id = vehicleUnitId
  if (carId) query.car_id = carId
  if (type) query.type = type
  if (contractId) query.related_contract_id = contractId
  if (invoiceId) query.related_invoice_id = invoiceId
  if (bookingId) query.related_booking_id = bookingId

  return query
}

export const getVehicleStockTransactions = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 30
  const query = buildTransactionQuery(req)

  const [transactions, total] = await Promise.all([
    VehicleStockTransaction.find(query)
      .populate('vehicle_unit_id', 'vin unit_code status location')
      .populate('car_id', 'name sku brandName')
      .populate('performed_by', 'full_name email')
      .populate('related_contract_id', 'contract_number status')
      .populate('related_invoice_id', 'invoice_number payment_status')
      .populate('related_booking_id', 'booking_code booking_status')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    VehicleStockTransaction.countDocuments(query),
  ])

  res.json({
    success: true,
    data: transactions,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

export const getVehicleStockTransactionById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID giao dịch kho xe không hợp lệ')
  }

  const transaction = await VehicleStockTransaction.findById(req.params.id)
    .populate('vehicle_unit_id')
    .populate('car_id', 'name sku brandName')
    .populate('performed_by', 'full_name email')
    .populate('related_contract_id', 'contract_number status')
    .populate('related_invoice_id', 'invoice_number payment_status')
    .populate('related_booking_id', 'booking_code booking_status')

  if (!transaction) {
    res.status(404)
    throw new Error('Không tìm thấy giao dịch kho xe')
  }

  res.json({ success: true, data: transaction })
})
