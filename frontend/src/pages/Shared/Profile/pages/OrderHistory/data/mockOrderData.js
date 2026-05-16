import { MOCK_PARTS } from '@/pages/Customer/Parts/data/parts.mock';
import { MOCK_PROFILE_CUSTOMER } from '@/pages/Shared/Profile/data/profile.mock';

export const mockOrders = [
    {
        order_code: 'ORD-2026-X89A',
        user_id: 'USR-08912',
        order_type: 'PART_PURCHASE',
        order_date: '12/10/2026',
        order_status: 'COMPLETED',
        financials: {
            subtotal: 8380000000,
            shipping_fee: 0,
            discount: 15000000,
            vat: 0,
            grand_total: 8365000000
        },
        payment: {
            method: 'BANK_TRANSFER',
            method_name: 'Chuyển khoản / VNPAY',
            status: 'PAID',
            transaction_id: '#VNP129930X'
        },
        shipping: {
            provider: 'Giao Hàng Đặc Biệt TT',
            tracking_code: 'TT-VIP-89A-001',
            estimated_delivery: '15/10/2026'
        },
        delivery: {
            receiver_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            email: MOCK_PROFILE_CUSTOMER.email,
            masked_email: '',
            address: MOCK_PROFILE_CUSTOMER.address,
            note: 'Giao giờ hành chính, bọc kỹ xước xe'
        },
        vat_info: null,
        cancel_reason: null,
        invoice_url: 'https://ttauto.vn/invoice/INV-2026-X89A.pdf',
        items: [
            {
                _id: 'ITEM-1',
                part_id: MOCK_PARTS[2].id,
                sku: MOCK_PARTS[2].sku,
                name: MOCK_PARTS[2].name,
                image: MOCK_PARTS[2].image,
                properties: '', // MOCK_PARTS[2] (Giảm Xóc Bilstein B16) không có options
                quantity: 1,
                original_price: MOCK_PARTS[2].original_price || MOCK_PARTS[2].price + 50000,
                unit_price: MOCK_PARTS[2].price,
                total_price: MOCK_PARTS[2].price,
                is_reviewed: false
            },
            {
                _id: 'ITEM-2',
                part_id: MOCK_PARTS[1].id,
                sku: MOCK_PARTS[1].sku,
                name: MOCK_PARTS[1].name,
                image: MOCK_PARTS[1].image,
                properties: '', // MOCK_PARTS[1] (Đĩa Phanh Carbon Ceramic) không có options
                quantity: 1,
                original_price: MOCK_PARTS[1].original_price,
                unit_price: MOCK_PARTS[1].price,
                total_price: MOCK_PARTS[1].price,
                is_reviewed: true
            }
        ]
    },
    {
        order_code: 'ORD-2026-V12K',
        user_id: 'USR-08912',
        order_type: 'ACCESSORIES',
        order_date: '05/11/2026',
        order_status: 'PENDING',
        financials: {
            subtotal: 12500000,
            shipping_fee: 50000,
            discount: 0,
            vat: 1000000,
            grand_total: 13550000
        },
        payment: {
            method: 'CASH',
            method_name: 'Thanh toán tiền mặt',
            status: 'UNPAID',
            transaction_id: ''
        },
        shipping: {
            provider: 'Giao Hàng Tiết Kiệm',
            tracking_code: 'GHTK-V12K-999',
            estimated_delivery: '08/11/2026'
        },
        delivery: {
            receiver_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            email: MOCK_PROFILE_CUSTOMER.email,
            masked_email: '',
            address: MOCK_PROFILE_CUSTOMER.address,
            note: ''
        },
        vat_info: null,
        cancel_reason: null,
        invoice_url: null,
        items: [
            {
                _id: 'ITEM-3',
                part_id: MOCK_PARTS[5] ? MOCK_PARTS[5].id : 'PRT-X',
                sku: MOCK_PARTS[5] ? MOCK_PARTS[5].sku : 'SKU-XX',
                name: MOCK_PARTS[5] ? MOCK_PARTS[5].name : 'Linh kiện X',
                image: MOCK_PARTS[5] ? MOCK_PARTS[5].image : '',
                properties: 'Màu logo: Đỏ', // MOCK_PARTS[5] (Ốp Chia Khóa Carbon) có options: Màu logo
                quantity: 1,
                original_price: null,
                unit_price: 12500000,
                total_price: 12500000,
                is_reviewed: false
            }
        ]
    }
];
