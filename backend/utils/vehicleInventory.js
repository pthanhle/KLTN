import Car from '../models/carModel.js'
import VehicleUnit from '../models/vehicleUnitModel.js'
import VehicleStockTransaction from '../models/vehicleStockTransactionModel.js'

export const SALEABLE_VEHICLE_STATUSES = ['in_stock', 'demo_available']

export const generateDocumentNumber = (prefix) => {
  const now = new Date()
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${prefix}-${datePart}-${randomPart}`
}

export const syncCarInventorySummary = async (carId) => {
  const [stock, showroomRows] = await Promise.all([
    VehicleUnit.countDocuments({
      car_id: carId,
      status: { $in: SALEABLE_VEHICLE_STATUSES },
    }),
    VehicleUnit.distinct('location.code', {
      car_id: carId,
      status: { $in: SALEABLE_VEHICLE_STATUSES },
      'location.code': { $nin: [null, ''] },
    }),
  ])

  await Car.findByIdAndUpdate(carId, {
    stock,
    availableShowrooms: showroomRows,
  })

  return { stock, availableShowrooms: showroomRows }
}

export const createVehicleStockTransaction = async ({
  vehicleUnit,
  type,
  fromStatus,
  toStatus,
  fromLocation,
  toLocation,
  relatedBookingId,
  relatedContractId,
  relatedInvoiceId,
  performedBy,
  reason,
  metadata,
}) => {
  return VehicleStockTransaction.create({
    vehicle_unit_id: vehicleUnit._id,
    car_id: vehicleUnit.car_id,
    type,
    from_status: fromStatus,
    to_status: toStatus,
    from_location: fromLocation,
    to_location: toLocation,
    related_booking_id: relatedBookingId || null,
    related_contract_id: relatedContractId || null,
    related_invoice_id: relatedInvoiceId || null,
    performed_by: performedBy,
    reason,
    metadata,
  })
}
