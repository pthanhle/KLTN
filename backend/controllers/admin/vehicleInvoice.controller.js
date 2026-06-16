import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import VehicleInvoice from '../../models/vehicleInvoiceModel.js'
import VehicleContract from '../../models/vehicleContractModel.js'
import VehicleUnit from '../../models/vehicleUnitModel.js'
import SalesCommission from '../../models/salesCommissionModel.js'
import {
  createVehicleStockTransaction,
  generateDocumentNumber,
  syncCarInventorySummary,
} from '../../utils/vehicleInventory.js'

const PAYMENT_STATUSES = ['unpaid', 'partial', 'paid', 'refunded', 'cancelled']

const buildInvoiceQuery = (req) => {
  const { contractId, customerId, vehicleUnitId, paymentStatus, search } = req.query
  const query = {}

  if (contractId) query.contract_id = contractId
  if (customerId) query.customer_id = customerId
  if (vehicleUnitId) query.vehicle_unit_id = vehicleUnitId
  if (paymentStatus) query.payment_status = paymentStatus
  if (search) query.invoice_number = { $regex: search, $options: 'i' }

  return query
}

const createCommissionFromInvoice = async (contract, invoice) => {
  if (!contract.sales_id || !contract.commission_snapshot?.amount) return null

  return SalesCommission.findOneAndUpdate(
    { contract_id: contract._id, sales_id: contract.sales_id },
    {
      sales_id: contract.sales_id,
      contract_id: contract._id,
      invoice_id: invoice._id,
      customer_id: contract.customer_id,
      car_id: contract.car_id,
      vehicle_unit_id: contract.vehicle_unit_id,
      test_drive_booking_id: contract.test_drive_booking_id || null,
      basis_amount: contract.commission_snapshot.basis_amount,
      commission_rate: contract.commission_snapshot.rate,
      commission_amount: contract.commission_snapshot.amount,
      status: 'pending',
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
}

const markVehicleSoldFromInvoice = async (contract, performedBy) => {
  const unit = await VehicleUnit.findById(contract.vehicle_unit_id)
  if (!unit || !['contract_pending', 'reserved'].includes(unit.status)) return

  const fromStatus = unit.status
  const fromLocation = unit.location?.toObject ? unit.location.toObject() : unit.location
  unit.status = 'sold'
  unit.lifecycle.sold_at = unit.lifecycle.sold_at || new Date()
  unit.updated_by = performedBy
  await unit.save()

  await createVehicleStockTransaction({
    vehicleUnit: unit,
    type: 'sell',
    fromStatus,
    toStatus: unit.status,
    fromLocation,
    toLocation: unit.location?.toObject ? unit.location.toObject() : unit.location,
    relatedBookingId: contract.test_drive_booking_id,
    relatedContractId: contract._id,
    performedBy,
    reason: 'Hóa đơn mua xe đã thanh toán',
  })

  await syncCarInventorySummary(unit.car_id)
}

export const getVehicleInvoices = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const query = buildInvoiceQuery(req)

  const [invoices, total] = await Promise.all([
    VehicleInvoice.find(query)
      .populate('contract_id', 'contract_number status pricing_snapshot')
      .populate('customer_id', 'full_name email phone')
      .populate('vehicle_unit_id', 'vin unit_code status')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    VehicleInvoice.countDocuments(query),
  ])

  res.json({
    success: true,
    data: invoices,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

export const getVehicleInvoiceById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID hóa đơn không hợp lệ')
  }

  const invoice = await VehicleInvoice.findById(req.params.id)
    .populate('contract_id')
    .populate('customer_id', 'full_name email phone address')
    .populate('vehicle_unit_id')

  if (!invoice) {
    res.status(404)
    throw new Error('Không tìm thấy hóa đơn mua xe')
  }

  res.json({ success: true, data: invoice })
})

export const createVehicleInvoice = asyncHandler(async (req, res) => {
  const { contract_id, amount, paid_amount, payment_status, payment_method, transaction_refs, generated_file_url } = req.body

  if (!contract_id || !mongoose.Types.ObjectId.isValid(contract_id)) {
    res.status(400)
    throw new Error('Vui lòng chọn hợp đồng hợp lệ')
  }

  const contract = await VehicleContract.findById(contract_id)
  if (!contract) {
    res.status(404)
    throw new Error('Hợp đồng mua xe không tồn tại')
  }

  if (contract.status === 'cancelled') {
    res.status(400)
    throw new Error('Không thể tạo hóa đơn cho hợp đồng đã hủy')
  }

  const finalAmount = Number(amount ?? contract.pricing_snapshot?.grand_total ?? 0)
  const finalPaidAmount = Number(paid_amount ?? 0)
  const finalStatus = payment_status || (finalPaidAmount >= finalAmount && finalAmount > 0 ? 'paid' : finalPaidAmount > 0 ? 'partial' : 'unpaid')

  if (!PAYMENT_STATUSES.includes(finalStatus)) {
    res.status(400)
    throw new Error('Trạng thái thanh toán không hợp lệ')
  }

  const invoice = await VehicleInvoice.create({
    invoice_number: generateDocumentNumber('VINV'),
    contract_id: contract._id,
    customer_id: contract.customer_id,
    vehicle_unit_id: contract.vehicle_unit_id,
    amount: finalAmount,
    paid_amount: finalPaidAmount,
    payment_status: finalStatus,
    payment_method,
    transaction_refs: transaction_refs || [],
    paid_at: finalStatus === 'paid' ? new Date() : undefined,
    generated_file_url,
    created_by: req.user?._id,
  })

  if (finalStatus === 'paid') {
    contract.status = 'paid'
    await contract.save()
    await markVehicleSoldFromInvoice(contract, req.user?._id)
    await createCommissionFromInvoice(contract, invoice)
  }

  res.status(201).json({ success: true, data: invoice })
})

export const updateVehicleInvoice = asyncHandler(async (req, res) => {
  const invoice = await VehicleInvoice.findById(req.params.id)
  if (!invoice) {
    res.status(404)
    throw new Error('Không tìm thấy hóa đơn mua xe')
  }

  const allowedFields = ['paid_amount', 'payment_status', 'payment_method', 'transaction_refs', 'generated_file_url']
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) invoice.set(field, req.body[field])
  })

  if (invoice.payment_status && !PAYMENT_STATUSES.includes(invoice.payment_status)) {
    res.status(400)
    throw new Error('Trạng thái thanh toán không hợp lệ')
  }

  if (invoice.payment_status === 'paid') invoice.paid_at = invoice.paid_at || new Date()
  await invoice.save()

  if (invoice.payment_status === 'paid') {
    const contract = await VehicleContract.findById(invoice.contract_id)
    if (contract) {
      contract.status = 'paid'
      await contract.save()
      await markVehicleSoldFromInvoice(contract, req.user?._id)
      await createCommissionFromInvoice(contract, invoice)
    }
  }

  res.json({ success: true, data: invoice })
})
