import * as z from 'zod';

export const getVehicleUnitSchema = (t) => {
    return z.object({
        vin: z.string()
            .min(1, { message: t('Vui lòng nhập Số Khung (VIN)') })
            .regex(/^[A-HJ-NPR-Z0-9]{17}$/i, { message: t('Số Khung (VIN) không hợp lệ (phải đủ 17 ký tự chữ và số, không chứa I, O, Q)') }),
        engine_number: z.string().optional(),
        unit_code: z.string().optional(),
        model_year: z.preprocess(
            (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
            z.number({ invalid_type_error: t('Năm sản xuất phải là số') })
                .min(1900, { message: t('Năm sản xuất không hợp lệ (>= 1900)') })
                .max(new Date().getFullYear() + 1, { message: t(`Năm sản xuất không vượt quá ${new Date().getFullYear() + 1}`) })
        ).optional(),
        odometer: z.preprocess(
            (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
            z.number({ invalid_type_error: t('ODO phải là số') })
                .min(0, { message: t('ODO không được là số âm') })
        ).optional(),
        condition: z.enum(['new', 'demo', 'used', 'certified_pre_owned']).optional(),
        color_name: z.string().optional(),
        color_value: z.string()
            .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: t('Mã màu không hợp lệ') })
            .optional()
            .or(z.literal('')),
        location_type: z.enum(['warehouse', 'showroom', 'service', 'customer', 'in_transit', 'other']).optional(),
        location_name: z.string().optional(),
        location_code: z.string().optional(),
        notes: z.string().max(1000, { message: t('Ghi chú tối đa 1000 ký tự') }).optional(),
    });
};
