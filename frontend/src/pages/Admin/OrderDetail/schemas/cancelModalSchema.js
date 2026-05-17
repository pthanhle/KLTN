import { z } from 'zod';

export const cancelModalSchema = z.object({
    cancel_reason: z.string()
        .trim()
        .min(1, 'cancel_reason_required')
        .min(5, 'form_error_min_length')
        .max(500, 'form_error_too_long'),
});
