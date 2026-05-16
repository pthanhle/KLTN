import { z } from 'zod';

const safeString = (defaultVal = '') => z.string().nullable().optional().catch(defaultVal).transform(val => val || defaultVal);

const safeNumber = (defaultVal = 0) => z.coerce.number().catch(defaultVal).transform(val => isNaN(val) ? defaultVal : val);

export const orderItemSchema = z.object({
    _id: safeString(),
    part_id: safeString(),
    sku: safeString('N/A'),
    name: safeString('Sản phẩm không xác định'),
    image: safeString(),
    properties: safeString(),
    quantity: safeNumber(1),
    unit_price: safeNumber(0),
    total_price: safeNumber(0),
});

export const orderDetailSchema = z.object({
    order_code: safeString('UNKNOWN'),
    order_status: safeString('PENDING'),
    cancel_reason: safeString(),
    exception_issue: safeString(),
    handled_by: safeString(),

    financials: z.object({
        subtotal: safeNumber(0),
        shipping_fee: safeNumber(0),
        discount: safeNumber(0),
        vat: safeNumber(0),
        grand_total: safeNumber(0),
    }).catch({ subtotal: 0, shipping_fee: 0, discount: 0, vat: 0, grand_total: 0 }),

    payment: z.object({
        method: safeString(),
        method_name: safeString(),
        status: safeString('UNPAID'),
        transaction_id: safeString(),
    }).catch({ status: 'UNPAID' }),

    shipping: z.object({
        method: safeString(),
        provider: safeString(),
        tracking_code: safeString(),
        estimated_delivery: safeString(),
    }).nullable().optional().catch(null),

    delivery: z.object({
        receiver_name: safeString('Khách vãng lai'),
        phone: safeString(''),
        address: safeString(''),
        note: safeString(''),
    }).catch({ receiver_name: 'Khách vãng lai', phone: '', address: '', note: '' }),

    vat_info: z.object({
        company_name: safeString(),
        tax_code: safeString(),
        company_address: safeString(),
    }).nullable().optional().catch(null),

    items: z.array(orderItemSchema).catch([]),

    activity_log: z.array(z.object({
        status: safeString(),
        timestamp: safeString(),
        actor: safeString(),
        note: safeString(),
    })).catch([]),
});
