import { z } from 'zod';
import dayjs from 'dayjs';

export const rescheduleSchema = z.object({
    newDate: z.any().refine((val) => val && dayjs(val).isValid(), {
        message: 'Ngày không hợp lệ / Invalid date',
    }),
    newTime: z.any().refine((val) => val && dayjs(val).isValid(), {
        message: 'Giờ không hợp lệ / Invalid time',
    }),
});
