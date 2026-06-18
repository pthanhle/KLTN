import { z } from 'zod';

// Thêm schema để sau này có thể validate realtime các dữ liệu nhập trên A4
export const customerSnapshotSchema = z.object({
    full_name: z.string().min(1, 'Tên khách hàng không được để trống'),
    phone: z.string().optional(),
    email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
    address: z.string().optional(),
    id_number: z.string().optional(),
    tax_code: z.string().optional(),
    company_name: z.string().optional(),
});

export const vehicleSnapshotSchema = z.object({
    brandName: z.string().optional(),
    name: z.string().optional(),
    color: z.any().optional(), // Có thể là string hoặc object
    year: z.number().optional().or(z.string()),
    vin: z.string().optional(),
    engine_number: z.string().optional(),
});
