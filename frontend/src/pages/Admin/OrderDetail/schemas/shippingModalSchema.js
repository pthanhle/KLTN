import { z } from 'zod';

export const shippingModalSchema = z.object({
    provider: z.string()
        .trim()
        .min(1, 'shipping_provider_required'),

    tracking_code: z.string()
        .trim()
        .min(1, 'tracking_code_required')
        .max(50, 'form_error_too_long')
        .regex(/^[a-zA-Z0-9-_]+$/, 'form_error_invalid_format'),

    estimated_delivery: z.any().optional(),
});