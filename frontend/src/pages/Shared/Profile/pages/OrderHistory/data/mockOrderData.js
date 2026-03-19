import { DUMMY_CARS } from '@/pages/Customer/Cars/data/cars.mock';
import { MOCK_PARTS } from '@/pages/Customer/Parts/data/parts.mock';
import { MOCK_PROFILE_CUSTOMER } from '@/pages/Shared/Profile/data/profile.mock';

export const mockOrders = [
    {
        order_code: 'ORD-2026-X89A',
        user_id: 'USR-08912',
        customer_info: {
            full_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            address: MOCK_PROFILE_CUSTOMER.address
        },
        order_type: 'CAR_PURCHASE',
        order_date: '12/10/2026',
        order_status: 'COMPLETED',
        payment_method: 'BANK_TRANSFER',
        payment_status: 'PAID',
        shipping_fee: 0,
        discount_amount: 15000000,
        total_amount: 8365000000,
        invoice_url: 'https://ttauto.vn/invoice/INV-2026-X89A.pdf',
        tracking_info: {
            provider: 'Giao Hàng Đặc Biệt',
            tracking_code: 'TT-VIP-89A-001'
        },
        items: [
            {
                product_id: DUMMY_CARS[8].id,
                sku: DUMMY_CARS[8].sku,
                name: DUMMY_CARS[8].name,
                quantity: 1,
                unit_price: DUMMY_CARS[8].price,
                total_price: DUMMY_CARS[8].price,
                image: DUMMY_CARS[8].image
            },
            {
                product_id: MOCK_PARTS[1].id,
                sku: MOCK_PARTS[1].sku,
                name: MOCK_PARTS[1].name,
                quantity: 1,
                unit_price: MOCK_PARTS[1].price,
                total_price: MOCK_PARTS[1].price,
                image: MOCK_PARTS[1].image
            }
        ]
    },
    {
        order_code: 'ORD-2026-V12K',
        user_id: 'USR-08912',
        customer_info: {
            full_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            address: MOCK_PROFILE_CUSTOMER.address
        },
        order_type: 'ACCESSORIES',
        order_date: '05/11/2026',
        order_status: 'PENDING',
        payment_method: 'CASH',
        payment_status: 'UNPAID',
        shipping_fee: 50000,
        discount_amount: 0,
        total_amount: 12550000,
        invoice_url: null,
        tracking_info: {
            provider: 'Giao Hàng Tiết Kiệm',
            tracking_code: 'GHTK-V12K-999'
        },
        items: [
            {
                product_id: MOCK_PARTS[5].id,
                sku: MOCK_PARTS[5].sku,
                name: MOCK_PARTS[5].name,
                quantity: 1,
                unit_price: MOCK_PARTS[5].price,
                total_price: MOCK_PARTS[5].price,
                image: MOCK_PARTS[5].image
            }
        ]
    }
];
