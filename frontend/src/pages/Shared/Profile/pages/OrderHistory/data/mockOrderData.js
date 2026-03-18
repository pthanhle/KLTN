export const mockOrders = [
    {
        order_code: 'ORD-2026-X89A',
        user_id: 'USR-08912',
        custom_info: {
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            address: '123 Đường B, Quận C, Hà Nội'
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
                product_id: 'PROD-911CS',
                sku: 'P911-S-2026',
                name: 'Porsche 911 Carrera S',
                quantity: 1,
                unit_price: 8230000000,
                total_price: 8230000000,
                image: 'https://images.unsplash.com/photo-1503376713546-7729f225adcc?auto=format&fit=crop&q=80&w=800'
            },
            {
                product_id: 'ACC-RSMAM',
                sku: 'RS-MAM-21IN',
                name: 'Bộ mâm hợp kim RS Spyder',
                quantity: 1,
                unit_price: 150000000,
                total_price: 150000000,
                image: 'https://images.unsplash.com/photo-1623512399650-6debf7aeef2b?auto=format&fit=crop&q=80&w=800'
            }
        ]
    },
    {
        order_code: 'ORD-2026-V12K',
        user_id: 'USR-08912',
        custom_info: {
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            address: '456 KĐT Mới, Quận 7, TP.HCM'
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
                product_id: 'ACC-THAMCB',
                sku: 'THAM-CB-S450',
                name: 'Thảm lót sàn cao cấp Carbon',
                quantity: 1,
                unit_price: 12500000,
                total_price: 12500000,
                image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800'
            }
        ]
    }
];
