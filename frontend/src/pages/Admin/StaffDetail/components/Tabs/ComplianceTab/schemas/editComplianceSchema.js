import { z } from 'zod';

export const identitySchema = z.object({
    idNumber: z.string().regex(/^\d{9}(\d{3})?$/, 'Số CCCD/CMND phải gồm 9 hoặc 12 chữ số').optional().or(z.literal('')),
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
    taxCode: z.string().regex(/^\d{10}(\d{3})?$/, 'Mã số thuế phải gồm 10 hoặc 13 chữ số').optional().or(z.literal('')),
    insuranceCode: z.string().regex(/^\d{10}$/, 'Mã số BHXH phải gồm 10 chữ số').optional().or(z.literal(''))
});

export const emergencySchema = z.object({
    contactName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').optional().or(z.literal('')),
    relation: z.string().optional(),
    phone: z.string().regex(/^(0)[0-9]{9}$/, 'Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số').optional().or(z.literal('')),
    address: z.string().optional()
});
