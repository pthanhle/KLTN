import { z } from 'zod';

export const createContactSchema = (t) => z.object({
    fullName: z.string().min(1, { message: t('validation_nameReq') }),
    phone: z.string()
        .min(1, { message: t('validation_phoneReq') })
        .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, { message: t('validation_phoneInv') }),
    email: z.string().min(1, { message: t('validation_emailReq') }).email({ message: t('validation_emailInv') }),
    subject: z.string().min(1, { message: t('validation_subjectReq') }),
    message: z.string().min(1, { message: t('validation_messageReq') })
});
