import { z } from 'zod';

export const serviceItemSchema = z.object({
    sku: z.string().min(3, 'SKU phải có ít nhất 3 ký tự').max(20, 'SKU không quá 20 ký tự'),
    serviceName: z.string().min(5, 'Tên dịch vụ quá ngắn').max(100, 'Tên dịch vụ quá dài'),
    category: z.string().min(1, 'Vui lòng chọn danh mục'),
    priceType: z.enum(['FIXED', 'STARTING_AT', 'CONTACT'], {
        errorMap: () => ({ message: 'Loại giá không hợp lệ' })
    }),
    basePrice: z.number().min(0, 'Giá không được âm').optional(),
    estimatedDuration: z.number().min(0, 'Thời gian không hợp lệ').nullable().optional(),
    isActive: z.boolean().default(true),
    isPackage: z.boolean().default(false),
    description: z.string().optional()
});
