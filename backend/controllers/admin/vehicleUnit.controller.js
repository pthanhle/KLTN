import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Car from '../../models/carModel.js'
import VehicleUnit from '../../models/vehicleUnitModel.js'
import VehicleStockTransaction from '../../models/vehicleStockTransactionModel.js'
import {
  createVehicleStockTransaction,
  syncCarInventorySummary,
} from '../../utils/vehicleInventory.js'

const VALID_TRANSITION_TYPES = ['transfer', 'reserve', 'release_reservation', 'contract_lock', 'sell', 'deliver', 'return', 'adjustment', 'service_hold', 'archive']

const buildUnitQuery = (req) => {
  const { carId, status, condition, locationCode, search } = req.query
  const query = {}

  if (carId) query.car_id = carId
  if (status) query.status = status
  if (condition) query.condition = condition
  if (locationCode) query['location.code'] = locationCode
  if (search) {
    query.$or = [
      { vin: { $regex: search, $options: 'i' } },
      { unit_code: { $regex: search, $options: 'i' } },
      { engine_number: { $regex: search, $options: 'i' } },
    ]
  }

  return query
}

export const getVehicleUnits = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const query = buildUnitQuery(req)

  const [units, total] = await Promise.all([
    VehicleUnit.find(query)
      .populate('car_id', 'name sku slug brandName image price salePrice')
      .populate('reserved_by_customer_id', 'full_name email phone')
      .populate('assigned_sales_id', 'full_name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    VehicleUnit.countDocuments(query),
  ])

  res.json({
    success: true,
    data: units,
    pagination: {
      current: page,
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

export const getVehicleUnitById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID xe vật lý không hợp lệ')
  }

  const unit = await VehicleUnit.findById(req.params.id)
    .populate('car_id', 'name sku slug brandName image price salePrice fuel seats year')
    .populate('reserved_by_customer_id', 'full_name email phone')
    .populate('assigned_sales_id', 'full_name email phone')
    .populate('reserved_by_booking_id', 'booking_code booking_date time_slot booking_status')

  if (!unit) {
    res.status(404)
    throw new Error('Không tìm thấy xe vật lý')
  }

  const transactions = await VehicleStockTransaction.find({ vehicle_unit_id: unit._id })
    .populate('performed_by', 'full_name email')
    .sort({ createdAt: -1 })
    .limit(50)

  res.json({ success: true, data: unit, transactions })
})

export const createVehicleUnit = asyncHandler(async (req, res) => {
  const {
    car_id,
    vin,
    engine_number,
    unit_code,
    color,
    model_year,
    odometer,
    condition,
    location,
    status,
    acquisition,
    pricing_snapshot,
    notes,
  } = req.body

  if (!car_id || !mongoose.Types.ObjectId.isValid(car_id)) {
    res.status(400)
    throw new Error('Vui lòng chọn mẫu xe hợp lệ')
  }

  const car = await Car.findById(car_id)
  if (!car) {
    res.status(404)
    throw new Error('Mẫu xe không tồn tại')
  }

  const unit = await VehicleUnit.create({
    car_id,
    vin,
    engine_number,
    unit_code,
    color,
    model_year: model_year || car.year,
    odometer: odometer || 0,
    condition: condition || 'new',
    location: location || {},
    status: status || 'in_stock',
    acquisition,
    pricing_snapshot: {
      listed_price: pricing_snapshot?.listed_price ?? car.price ?? 0,
      sale_price: pricing_snapshot?.sale_price ?? car.salePrice ?? null,
    },
    notes,
    created_by: req.user?._id,
    updated_by: req.user?._id,
  })

  await createVehicleStockTransaction({
    vehicleUnit: unit,
    type: 'import',
    toStatus: unit.status,
    toLocation: unit.location,
    performedBy: req.user?._id,
    reason: 'Nhập xe vật lý vào kho',
  })

  await syncCarInventorySummary(unit.car_id)

  res.status(201).json({ success: true, data: unit })
})

export const updateVehicleUnit = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('ID xe vật lý không hợp lệ')
  }

  const unit = await VehicleUnit.findById(req.params.id)
  if (!unit) {
    res.status(404)
    throw new Error('Không tìm thấy xe vật lý')
  }

  if (['sold', 'delivered'].includes(unit.status)) {
    const restrictedFields = ['vin', 'engine_number', 'car_id', 'color', 'model_year']
    const hasRestrictedChange = restrictedFields.some(field => req.body[field] !== undefined)
    if (hasRestrictedChange) {
      res.status(400)
      throw new Error('Không thể thay đổi thông tin định danh của xe đã bán hoặc đã bàn giao')
    }
  }

  const allowedFields = [
    'vin',
    'engine_number',
    'unit_code',
    'color',
    'model_year',
    'odometer',
    'condition',
    'location',
    'acquisition',
    'pricing_snapshot',
    'notes',
    'assigned_sales_id',
  ]

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      unit.set(field, req.body[field])
    }
  })

  unit.updated_by = req.user?._id
  await unit.save()

  await syncCarInventorySummary(unit.car_id)

  res.json({ success: true, data: unit })
})

export const transitionVehicleUnit = asyncHandler(async (req, res) => {
  const { type, status, location, reason, related_booking_id, related_contract_id, related_invoice_id, reserved_by_customer_id, assigned_sales_id } = req.body

  if (!VALID_TRANSITION_TYPES.includes(type)) {
    res.status(400)
    throw new Error('Loại giao dịch kho xe không hợp lệ')
  }

  const unit = await VehicleUnit.findById(req.params.id)
  if (!unit) {
    res.status(404)
    throw new Error('Không tìm thấy xe vật lý')
  }

  const fromStatus = unit.status
  const fromLocation = unit.location?.toObject ? unit.location.toObject() : unit.location

  if (type === 'reserve' && !['in_stock', 'demo_available'].includes(unit.status)) {
    res.status(400)
    throw new Error('Chỉ có thể giữ chỗ xe đang còn hàng hoặc xe demo khả dụng')
  }

  if (type === 'contract_lock' && !['in_stock', 'demo_available', 'reserved'].includes(unit.status)) {
    res.status(400)
    throw new Error('Xe không đủ điều kiện khóa hợp đồng')
  }

  if (type === 'sell' && !['contract_pending', 'reserved'].includes(unit.status)) {
    res.status(400)
    throw new Error('Xe cần được giữ chỗ hoặc khóa hợp đồng trước khi bán')
  }

  const nextStatusByType = {
    reserve: 'reserved',
    release_reservation: 'in_stock',
    contract_lock: 'contract_pending',
    sell: 'sold',
    deliver: 'delivered',
    service_hold: 'service_hold',
    archive: 'archived',
  }

  const nextStatus = status || nextStatusByType[type] || unit.status
  unit.status = nextStatus

  if (location) unit.location = location
  if (reserved_by_customer_id !== undefined) unit.reserved_by_customer_id = reserved_by_customer_id || null
  if (related_booking_id !== undefined) unit.reserved_by_booking_id = related_booking_id || null
  if (assigned_sales_id !== undefined) unit.assigned_sales_id = assigned_sales_id || null

  if (type === 'reserve') unit.lifecycle.reserved_at = new Date()
  if (type === 'release_reservation') {
    unit.reserved_by_customer_id = null
    unit.reserved_by_booking_id = null
  }
  if (type === 'contract_lock') unit.lifecycle.contract_locked_at = new Date()
  if (type === 'sell') unit.lifecycle.sold_at = new Date()
  if (type === 'deliver') unit.lifecycle.delivered_at = new Date()

  unit.updated_by = req.user?._id
  await unit.save()

  await createVehicleStockTransaction({
    vehicleUnit: unit,
    type,
    fromStatus,
    toStatus: unit.status,
    fromLocation,
    toLocation: unit.location?.toObject ? unit.location.toObject() : unit.location,
    relatedBookingId: related_booking_id,
    relatedContractId: related_contract_id,
    relatedInvoiceId: related_invoice_id,
    performedBy: req.user?._id,
    reason,
  })

  await syncCarInventorySummary(unit.car_id)

  res.json({ success: true, data: unit })
})

export const archiveVehicleUnit = asyncHandler(async (req, res) => {
  const unit = await VehicleUnit.findById(req.params.id)
  if (!unit) {
    res.status(404)
    throw new Error('Không tìm thấy xe vật lý')
  }

  if (['sold', 'delivered'].includes(unit.status)) {
    res.status(400)
    throw new Error('Không thể lưu trữ xe đã bán hoặc đã bàn giao')
  }

  const fromStatus = unit.status
  const fromLocation = unit.location?.toObject ? unit.location.toObject() : unit.location
  unit.status = 'archived'
  unit.updated_by = req.user?._id
  await unit.save()

  await createVehicleStockTransaction({
    vehicleUnit: unit,
    type: 'archive',
    fromStatus,
    toStatus: unit.status,
    fromLocation,
    toLocation: unit.location?.toObject ? unit.location.toObject() : unit.location,
    performedBy: req.user?._id,
    reason: req.body.reason,
  })

  await syncCarInventorySummary(unit.car_id)

  res.json({ success: true, data: unit })
})
