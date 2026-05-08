import { z } from 'zod';

export const identitySchema = z.object({
    idNumber: z.string().regex(/^([0-9]{9}|[0-9]{12})$/, 'Số CCCD/CMND phải gồm chính xác 9 hoặc 12 chữ số').optional().or(z.literal('')),
    issueDate: z.string().optional(),
    issuePlace: z.string().optional(),
    dob: z.string().optional(),
    pob: z.string().optional(),
    permanentAddress: z.string().optional(),
    currentAddress: z.string().optional()
});

export const financialSchema = z.object({
    bankAccount: z.string().regex(/^\d+$/, 'Số tài khoản chỉ được chứa chữ số').optional().or(z.literal('')),
    bankName: z.string().optional(),
    bankBranch: z.string().optional(),
    taxCode: z.string().regex(/^([0-9]{10}|[0-9]{13})$/, 'Mã số thuế phải gồm chính xác 10 hoặc 13 chữ số').optional().or(z.literal('')),
    insuranceCode: z.string().regex(/^[0-9]{10}$/, 'Mã số BHXH phải gồm chính xác 10 chữ số').optional().or(z.literal(''))
});

export const emergencySchema = z.object({
    contactName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').optional().or(z.literal('')),
    relation: z.string().optional(),
    phone: z.string().regex(/^(03|05|07|08|09)[0-9]{8}$/, 'Số điện thoại không hợp lệ (Phải là đầu số VN, đủ 10 số)').optional().or(z.literal('')),
    address: z.string().optional()
});
