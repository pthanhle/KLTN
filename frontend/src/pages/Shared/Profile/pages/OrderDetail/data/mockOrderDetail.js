export const getMockOrderDetail = (id) => {
    return {
        order_code: id || 'ORD-2026-X89A',
        created_at: 'Oct 24, 2024 • 14:32 PM',
        status: 'SHIPPING', // PENDING, CONFIRMED, SHIPPING, DELIVERED, COMPLETED, CANCELLED
        delivery: {
            receiver_name: 'Nguyễn Minh Đức',
            phone: '0901 234 567',
            address: 'Tòa nhà FPT, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội\nVietnam',
            note: 'Giao giờ hành chính. Nhớ bọc chống xốc kỹ cho mâm xe Forged nhé shop.'
        },
        shipping: {
            provider: 'J&T Express',
            tracking_code: 'JT123456789',
            estimated_delivery: 'Oct 28, 2024'
        },
        payment: {
            method: 'VNPAY / Thẻ Tín dụng',
            status: 'PAID', // UNPAID, PAID, REFUNDED
            transaction_id: '#VNP123456'
        },
        vat_info: {
            is_requested: true,
            company_name: 'Công ty TNHH Phần mềm FPT',
            tax_code: '0101248141',
            company_address: 'Tòa nhà FPT, Cầu Giấy, Hà Nội'
        },
        cancel_reason: null, // 'Thay đổi ý định mua hàng' Nếu status là CANCELLED
        items: [
            {
                id: '1',
                sku: 'TT-GT-2026',
                name: 'TT GranTurismo S-Line (Mâm gốc)',
                properties: 'Màu: Đen tuyền | Kích cỡ: Tiêu chuẩn 19"',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmK6T48q5swrv1iMKE3-C-6oXmhq7sh-IbB9B0zfPwjZxkhsh96PwYSOrdqDquJ-9ByDg7Coqmor7-cNaemhGQpUIyOL90l4oDXk2713cLK05H1TXdQJdaIur488fe8nc_hHj4HcV4DsHedtJ5LneTIC5Uwc_FleIJ4xb50Yz7oubhdBFloOT-erI000pv_qN5-UgjRDbLzVbYuuVvLAh9aUJL7TF0udf7ck09iUIXMvPBH8reCWRhNM8Dyx51RLrnzcVqQ4npaOs',
                quantity: 1,
                original_price: null,
                final_price: 1425000000,
                is_reviewed: false
            },
            {
                id: '2',
                sku: 'WH-FORGED-20',
                name: 'Forged Alloy Wheel Set (Thay thế)',
                properties: 'Custom: Phay xước 20" | Tương thích: GT-2026',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-nY0YrxmMzWnV6CR6Q6ME7Vwe3G_sIV7Yhctnqh1v8aEWMym3Bigh6n6z_iCbkZTqo24E43D2rNk66zJrFjnLK66BPLTC7Yeure1cznon_EXhIONsCbZZheTLu41iOqyDQ6S6_QK2ePx6XI-qcbGiwGzdKUpMhGC78EAmludfX5wp-hilS2QGRwhEMN5USwhaTXfv4nbl8bOR-YNm7hvScpD36C7G6l3Y3hb3wubvDojlYaFmvFxy0ZCA4fDH8HbRPMlmCf1YIuA',
                quantity: 1,
                original_price: 95000000,
                final_price: 85000000,
                is_reviewed: true
            }
        ],
        financials: {
            subtotal: 1510000000,
            shipping_fee: 50000,
            discount: 200000,
            vat: 120800000, // Roughly 8%
            grand_total: 1630850000
        }
    };
};
