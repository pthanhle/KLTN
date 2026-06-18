import { z } from 'zod';

export const getCancelContractSchema = (t) => {
    return z.object({
        cancel_reason: z.string({
            required_error: t('Vui lòng chọn lý do hủy'),
        }).min(1, t('Vui lòng chọn lý do hủy')),
        cancel_note: z.string().optional()
    });
};
