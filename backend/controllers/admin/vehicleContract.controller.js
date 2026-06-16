import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import User from '../../models/userModel.js'
import Car from '../../models/carModel.js'
import Booking from '../../models/bookingModel.js'
import VehicleUnit from '../../models/vehicleUnitModel.js'
import VehicleContract from '../../models/vehicleContractModel.js'
import SalesCommission from '../../models/salesCommissionModel.js'
import {
  createVehicleStockTransaction,
  generateDocumentNumber,
  syncCarInventorySummary,
} from '../../utils/vehicleInventory.js'

const CONTRACT_STATUSES = ['draft', 'issued', 'signed', 'paid', 'cancelled', 'delivered']

const buildContractQuery = (req) => {
  const { status, customerId, salesId, carId, vehicleUnitId, search } = req.query
  const query = {}

  if (status) query.status = status
  if (customerId) query.customer_id = customerId
  if (salesId) query.sales_id = salesId
  if (carId) query.car_id = carId
  if (vehicleUnitId) query.vehicle_unit_id = vehicleUnitId
  if (search) query.contract_number = { $regex: search, $options: 'i' }

  if (req.user && !req.user.isAdmin && req.user.role_id?.role_name !== 'admin') {
    query.$or = [
      { sales_id: req.user._id },
      { created_by: req.user._id }
    ]
  }

  return query
}

const buildPricingSnapshot = (input = {}, car) => {
  const listPrice = Number(input.list_price ?? car.price ?? 0)
  const salePrice = Number(input.sale_price ?? car.salePrice ?? listPrice)
  const discount = Number(input.discount ?? Math.max(listPrice - salePrice, 0))
  const vat = Number(input.vat ?? 0)
  const registrationFee = Number(input.registration_fee ?? 0)
  const insuranceFee = Number(input.insurance_fee ?? 0)
  const otherFees = Number(input.other_fees ?? 0)
  const grandTotal = Number(input.grand_total ?? salePrice + vat + registrationFee + insuranceFee + otherFees)

  return {
    list_price: listPrice,
    sale_price: salePrice,
    discount,
    vat,
    registration_fee: registrationFee,
    insurance_fee: insuranceFee,
    other_fees: otherFees,
    grand_total: grandTotal,
  }
}

const buildCustomerSnapshot = (customer, input = {}) => ({
  full_name: input.full_name || customer.full_name,
  phone: input.phone || customer.phone,
  email: input.email || customer.email,
  address: input.address || customer.address || customer.addresses?.find(item => item.is_default)?.street || '',
  id_number: input.id_number || '',
  tax_code: input.tax_code || customer.tax_info?.tax_code || '',
  company_name: input.company_name || customer.tax_info?.company_name || '',
})

const buildVehicleSnapshot = (car, unit) => ({
  name: car.name,
  brandName: car.brandName,
  sku: car.sku,
  vin: unit.vin,
  engine_number: unit.engine_number,
  color: unit.color?.name || '',
  year: unit.model_year || car.year,
  odometer: unit.odometer,
  fuel: car.fuel,
  seats: car.seats,
})

const createCommissionIfNeeded = async (contract, invoiceId = null) => {
  if (!contract.sales_id || !contract.commission_snapshot?.amount) return null

  return SalesCommission.findOneAndUpdate(
    { contract_id: contract._id, sales_id: contract.sales_id },
    {
      sales_id: contract.sales_id,
      contract_id: contract._id,
      invoice_id: invoiceId,
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

const applyContractStatusToVehicle = async ({ contract, nextStatus, performedBy, reason }) => {
  const unit = await VehicleUnit.findById(contract.vehicle_unit_id)
  if (!unit) return null

  const fromStatus = unit.status
  const fromLocation = unit.location?.toObject ? unit.location.toObject() : unit.location
  let transactionType = null

  if (nextStatus === 'issued' && ['in_stock', 'demo_available', 'reserved'].includes(unit.status)) {
    unit.status = 'contract_pending'
    unit.lifecycle.contract_locked_at = new Date()
    transactionType = 'contract_lock'
  }

  if (['signed', 'paid'].includes(nextStatus) && ['contract_pending', 'reserved'].includes(unit.status)) {
    unit.status = 'sold'
    unit.lifecycle.sold_at = unit.lifecycle.sold_at || new Date()
    transactionType = 'sell'
  }

  if (nextStatus === 'delivered' && unit.status === 'sold') {
    unit.status = 'delivered'
    unit.lifecycle.delivered_at = new Date()
    transactionType = 'deliver'
  }

  if (nextStatus === 'cancelled' && ['reserved', 'contract_pending'].includes(unit.status)) {
    unit.status = 'in_stock'
    unit.reserved_by_customer_id = null
    unit.reserved_by_booking_id = null
    transactionType = 'release_reservation'
  }

  if (!transactionType) return unit

  unit.updated_by = performedBy
  await unit.save()

  await createVehicleStockTransaction({
    vehicleUnit: unit,
    type: transactionType,
    fromStatus,
    toStatus: unit.status,
    fromLocation,
    toLocation: unit.location?.toObject ? unit.location.toObject() : unit.location,
    relatedBookingId: contract.test_drive_booking_id,
    relatedContractId: contract._id,
    performedBy,
    reason,
  })

  await syncCarInventorySummary(unit.car_id)

  return unit
}

export const getVehicleContracts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const query = buildContractQuery(req)

  const [contracts, total] = await Promise.all([
    VehicleContract.find(query)
      .populate('customer_id', 'full_name email phone')
      .populate('car_id', 'name sku slug brandName image')
      .populate('vehicle_unit_id', 'vin unit_code status location color')
      .populate('sales_id', 'full_name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    VehicleContract.countDocuments(query),
  ])

  res.json({
    success: true,
    data: contracts,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

export const getVehicleContractById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID hợp đồng không hợp lệ')
  }

  const contract = await VehicleContract.findById(req.params.id)
    .populate('customer_id', 'full_name email phone address tax_info')
    .populate('car_id', 'name sku slug brandName image price salePrice')
    .populate('vehicle_unit_id')
    .populate('sales_id', 'full_name email phone avatar')
    .populate('test_drive_booking_id', 'booking_code booking_date time_slot booking_status')

  if (!contract) {
    res.status(404)
    throw new Error('Không tìm thấy hợp đồng mua xe')
  }

  res.json({ success: true, data: contract })
})

export const createVehicleContract = asyncHandler(async (req, res) => {
  const {
    customer_id,
    vehicle_unit_id,
    pricing_snapshot,
    customer_snapshot,
    sales_id,
    test_drive_booking_id,
    commission_snapshot,
    status,
    attachments,
    note,
  } = req.body

  if (!customer_id || !vehicle_unit_id) {
    res.status(400)
    throw new Error('Vui lòng chọn khách hàng và xe vật lý')
  }

  const [customer, unit, booking] = await Promise.all([
    User.findById(customer_id),
    VehicleUnit.findById(vehicle_unit_id),
    test_drive_booking_id ? Booking.findById(test_drive_booking_id) : null,
  ])

  if (!customer) {
    res.status(404)
    throw new Error('Khách hàng không tồn tại')
  }

  if (!unit) {
    res.status(404)
    throw new Error('Xe vật lý không tồn tại')
  }

  if (!['in_stock', 'demo_available', 'reserved', 'contract_pending'].includes(unit.status)) {
    res.status(400)
    throw new Error('Xe không đủ điều kiện tạo hợp đồng')
  }

  const car = await Car.findById(unit.car_id)
  if (!car) {
    res.status(404)
    throw new Error('Mẫu xe không tồn tại')
  }

  let finalSalesId = sales_id || booking?.advisor_id || unit.assigned_sales_id || null
  const finalStatus = status || 'draft'

  // Restrict sales_id for Sale Staff
  if (req.user && !req.user.isAdmin && req.user.role_id?.role_name !== 'admin') {
    finalSalesId = req.user._id
  }

  if (!CONTRACT_STATUSES.includes(finalStatus)) {
    res.status(400)
    throw new Error('Trạng thái hợp đồng không hợp lệ')
  }

  const pricing = buildPricingSnapshot(pricing_snapshot, car)
  const commission = {
    policy_code: commission_snapshot?.policy_code || '',
    basis_amount: Number(commission_snapshot?.basis_amount ?? pricing.grand_total),
    rate: Number(commission_snapshot?.rate ?? 0),
    amount: Number(commission_snapshot?.amount ?? 0),
  }

  const contract = await VehicleContract.create({
    contract_number: generateDocumentNumber('VHD'),
    customer_id,
    customer_snapshot: buildCustomerSnapshot(customer, customer_snapshot),
    car_id: car._id,
    vehicle_unit_id: unit._id,
    vehicle_snapshot: buildVehicleSnapshot(car, unit),
    pricing_snapshot: pricing,
    sales_id: finalSalesId,
    test_drive_booking_id: test_drive_booking_id || null,
    commission_snapshot: commission,
    status: finalStatus,
    attachments: attachments || [],
    note,
    created_by: req.user?._id,
    issued_at: ['issued', 'signed', 'paid', 'delivered'].includes(finalStatus) ? new Date() : undefined,
    signed_at: ['signed', 'paid', 'delivered'].includes(finalStatus) ? new Date() : undefined,
  })

  await applyContractStatusToVehicle({
    contract,
    nextStatus: finalStatus,
    performedBy: req.user?._id,
    reason: 'Tạo hợp đồng mua xe',
  })

  if (['signed', 'paid'].includes(finalStatus)) {
    await createCommissionIfNeeded(contract)
  }

  res.status(201).json({ success: true, data: contract })
})

export const updateVehicleContractStatus = asyncHandler(async (req, res) => {
  const { status, reason } = req.body

  if (!CONTRACT_STATUSES.includes(status)) {
    res.status(400)
    throw new Error('Trạng thái hợp đồng không hợp lệ')
  }

  const contract = await VehicleContract.findById(req.params.id)
  if (!contract) {
    res.status(404)
    throw new Error('Không tìm thấy hợp đồng mua xe')
  }

  if (contract.status === 'cancelled' || contract.status === 'delivered') {
    res.status(400)
    throw new Error('Không thể cập nhật hợp đồng đã hủy hoặc đã bàn giao')
  }

  contract.status = status
  if (status === 'issued') contract.issued_at = contract.issued_at || new Date()
  if (['signed', 'paid', 'delivered'].includes(status)) contract.signed_at = contract.signed_at || new Date()
  if (status === 'cancelled') contract.cancelled_at = new Date()

  await contract.save()

  await applyContractStatusToVehicle({
    contract,
    nextStatus: status,
    performedBy: req.user?._id,
    reason,
  })

  if (['signed', 'paid'].includes(status)) {
    await createCommissionIfNeeded(contract)
  }

  res.json({ success: true, data: contract })
})

export const updateVehicleContract = asyncHandler(async (req, res) => {
  const contract = await VehicleContract.findById(req.params.id)
  if (!contract) {
    res.status(404)
    throw new Error('Không tìm thấy hợp đồng mua xe')
  }

  if (contract.status !== 'draft') {
    res.status(400)
    throw new Error('Chỉ được sửa nội dung hợp đồng khi còn bản nháp')
  }

  const allowedFields = ['pricing_snapshot', 'commission_snapshot', 'attachments', 'note', 'sales_id']
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) contract.set(field, req.body[field])
  })

  await contract.save()

  res.json({ success: true, data: contract })
})
