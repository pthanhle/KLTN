import { z } from 'zod';
import i18n from '../../../../i18n/i18n';

export const promotionFormSchema = z.object({
    title: z.string()
        .min(1, { message: i18n.t('adminPromotionForm:msg_err_name_req') })
        .max(100, { message: i18n.t('adminPromotionForm:msg_err_name_max') }),

    description: z.string()
        .max(500, { message: i18n.t('adminPromotionForm:msg_err_desc_max') })
        .optional()
        .nullable(),

    discount_type: z.enum(['PERCENT', 'FIXED', 'FREE_SHIPPING']),

    discount_value: z.number().optional().nullable(),

    max_discount: z.number().optional().nullable(),

    is_loyalty: z.boolean(),

    points_required: z.number().optional().nullable(),

    code: z.string().optional().nullable(),

    min_order_value: z.number().optional().nullable(),

    date_range: z.array(z.any()).nullable().optional(),

    validity_days: z.number().optional().nullable(),
}).superRefine((data, ctx) => {
    if (data.discount_type === 'PERCENT') {
        if (!data.max_discount || data.max_discount <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_max_discount_min'),
                path: ['max_discount']
            });
        }
    }

    if (data.discount_type !== 'FREE_SHIPPING') {
        if (data.discount_value === null || data.discount_value === undefined || data.discount_value <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_val_min'),
                path: ['discount_value']
            });
        }
    }

    if (data.is_loyalty) {
        if (!data.points_required || data.points_required <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_points_req'),
                path: ['points_required']
            });
        }
        if (!data.validity_days || data.validity_days <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_validity_req'),
                path: ['validity_days']
            });
        }
    } else {
        if (!data.code || data.code.trim().length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_code_req'),
                path: ['code']
            });
        } else if (!/^[A-Z0-9]+$/.test(data.code)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_code_format'),
                path: ['code']
            });
        }

        if (!data.date_range || data.date_range.length !== 2 || !data.date_range[0] || !data.date_range[1]) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: i18n.t('adminPromotionForm:msg_err_date_req'),
                path: ['date_range']
            });
        }
    }

    if (data.min_order_value === null || data.min_order_value === undefined || data.min_order_value < 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: i18n.t('adminPromotionForm:msg_err_min_order'),
            path: ['min_order_value']
        });
    }
});
