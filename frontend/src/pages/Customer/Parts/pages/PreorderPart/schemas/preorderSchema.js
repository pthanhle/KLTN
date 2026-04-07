import { z } from 'zod';

export const getPreorderSchema = (t, options = []) => {
    const optionsShape = {};
    if (options && options.length > 0) {
        options.forEach(opt => {
            optionsShape[opt.name] = z.any().refine(val => typeof val === 'string' && val.trim().length > 0, {
                message: t('val_option_req', 'Vui lòng chọn một tùy chọn')
            });
        });
    }

    return z.object({
        fullName: z.string().min(2, t('val_fullname_min', 'Vui lòng nhập họ và tên hợp lệ')),
        phoneNumber: z.string().regex(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, t('val_phone_invalid', 'Số điện thoại không hợp lệ')),
        email: z.string().email(t('val_email_invalid', 'Email không hợp lệ')).optional().or(z.literal('')),
        vehicleBrand: z.any().refine(val => typeof val === 'string' && val.trim().length > 0, {
            message: t('val_brand_req', 'Vui lòng điền thông tin xe của bạn')
        }),
        quantity: z.number().min(1, t('val_qty_min', 'Số lượng tối thiểu là 1')).max(100, t('val_qty_max', 'Số lượng vượt quá giới hạn')),
        selectedOptions: Object.keys(optionsShape).length > 0
            ? z.object(optionsShape, {
                required_error: t('val_option_req', 'Vui lòng chọn đầy đủ các tùy chọn'),
                invalid_type_error: t('val_option_req', 'Vui lòng chọn đầy đủ các tùy chọn')
            })
            : z.any().optional(),
    });
};
