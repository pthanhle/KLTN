import { z } from 'zod';

export const getStep1Schema = (t) => {
    return z.object({
        vehicle_brand: z.string().min(1, t?.('services:error_brand_required') || 'Vui lòng chọn hãng xe'),
        vehicle_model: z.string().min(1, t?.('services:error_model_required') || 'Vui lòng nhập dòng xe'),
        license_plate: z.string().min(1, t?.('services:error_license_required') || 'Vui lòng nhập biển số xe'),
        vehicle_condition: z.string().optional(),
        selected_services: z.array(
            z.object({
                _id: z.string(),
                service_name: z.string(),
                price: z.number()
            })
        ).min(1, t?.('services:error_service_required') || 'Vui lòng chọn ít nhất một dịch vụ')
    });
};

export const getStep2Schema = (t) => {
    return z.object({
        booking_date: z.string().min(1, t?.('services:error_date_required') || 'Vui lòng chọn ngày'),
        time_slot: z.string().min(1, t?.('services:error_time_required') || 'Vui lòng chọn khung giờ')
    });
};

// Tổng hợp schema cho review
export const getServiceBookingSchema = (t) => {
    return getStep1Schema(t).and(getStep2Schema(t));
};
