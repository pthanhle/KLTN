import * as z from 'zod';

export const getCheckoutSchema = (t) => {
    return z.object({
        full_name: z.string()
            .min(1, { message: t('val_required', 'Vui lòng nhập họ tên') })
            .min(2, { message: t('val_name_min', 'Họ tên phải có ít nhất 2 ký tự') }),
            
        phone: z.string()
            .min(1, { message: t('val_required', 'Vui lòng nhập số điện thoại') })
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: t('val_phone_invalid', 'Số điện thoại không hợp lệ') }),
            
        email: z.string()
            .min(1, { message: t('val_required', 'Vui lòng nhập email') })
            .email({ message: t('val_email_invalid', 'Email không đúng định dạng') }),
            
        city: z.string({ required_error: t('val_required', 'Vui lòng chọn Tỉnh/Thành phố') })
            .min(1, { message: t('val_required', 'Vui lòng chọn Tỉnh/Thành phố') }),
            
        district: z.string({ required_error: t('val_required', 'Vui lòng chọn Quận/Huyện') })
            .min(1, { message: t('val_required', 'Vui lòng chọn Quận/Huyện') }),
            
        ward: z.string({ required_error: t('val_required', 'Vui lòng chọn Phường/Xã') })
            .min(1, { message: t('val_required', 'Vui lòng chọn Phường/Xã') }),
            
        address: z.string()
            .min(1, { message: t('val_required', 'Vui lòng nhập địa chỉ cụ thể') })
            .min(5, { message: t('val_address_min', 'Địa chỉ quá ngắn') })
    });
};
