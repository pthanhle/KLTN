import { z } from 'zod';

export const getStep1Schema = (t) => {
    return z.object({
        vehicle_brand: z.string().min(1, t?.('services:error_brand_required') || 'Vui lòng chọn hãng xe'),
        vehicle_model: z.string().min(1, t?.('services:error_model_required') || 'Vui lòng nhập dòng xe'),
        license_plate: z.string().min(1, t?.('services:error_license_required') || 'Vui lòng nhập biển số xe'),
        vehicle_condition: z.string().optional(),
        contact_phone: z.string().optional(),
        selected_services: z.array(
            z.object({
                _id: z.string(),
                serviceName: z.string(),
                basePrice: z.number().optional(),
                priceType: z.string().optional(),
            })
        ).optional().default([])
    }).refine(data => data.selected_services.length > 0 || (data.vehicle_condition && data.vehicle_condition.trim().length > 0), {
        message: t?.('services:error_service_or_condition_required') || "Vui lòng chọn dịch vụ hoặc mô tả triệu chứng xe",
        path: ["vehicle_condition"]
    });
};

export const getStep2Schema = (t) => {
    return z.object({
        booking_date: z.string().min(1, t?.('services:error_date_required') || 'Vui lòng chọn ngày'),
        time_slot: z.string().min(1, t?.('services:error_time_required') || 'Vui lòng chọn khung giờ')
    });
};

export const getServiceBookingSchema = (t) => {
    return getStep1Schema(t).and(getStep2Schema(t));
};
