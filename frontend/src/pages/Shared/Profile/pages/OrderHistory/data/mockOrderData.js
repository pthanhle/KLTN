import { MOCK_PARTS } from '@/pages/Customer/Parts/data/parts.mock';
import { MOCK_PROFILE_CUSTOMER } from '@/pages/Shared/Profile/data/profile.mock';

export const mockOrders = [
    // Đơn 1: Đã hoàn tất (Happy Path)
    {
        order_code: 'ORD-2026-X89A',
        user_id: 'USR-08912',
        order_type: 'PART_PURCHASE',
        order_date: '12/10/2026',
        order_status: 'COMPLETED',
        financials: {
            subtotal: 20900000,
            shipping_fee: 0,
            discount: 900000,
            vat: 0,
            grand_total: 20000000
        },
        payment: {
            method: 'BANK_TRANSFER',
            method_name: 'Chuyển khoản / VNPAY',
            status: 'PAID',
            transaction_id: '#VNP129930X'
        },
        shipping: {
            method: 'Tiết kiệm',
            provider: 'Giao Hàng Đặc Biệt TT',
            tracking_code: 'TT-VIP-89A-001',
            estimated_delivery: '15/10/2026'
        },
        handled_by: 'NV-KHO-01 (Nguyễn Văn A)',
        activity_log: [
            { status: 'PENDING', timestamp: '12/10/2026 08:30', actor: 'System', note: 'Đơn hàng được tạo thành công' },
            { status: 'CONFIRMED', timestamp: '12/10/2026 09:15', actor: 'Admin (Lê Phước Thành)', note: 'Đã xác nhận đơn hàng và thanh toán' },
            { status: 'PROCESSING', timestamp: '12/10/2026 10:00', actor: 'System', note: 'Lệnh xuất kho đã chuyển đến Bộ phận Kho' },
            { status: 'PACKED', timestamp: '12/10/2026 14:20', actor: 'NV Kho (Nguyễn Văn A)', note: 'Đã đóng gói, chờ lấy hàng' },
            { status: 'SHIPPING', timestamp: '13/10/2026 09:00', actor: 'NV Kho (Nguyễn Văn A)', note: 'Đã bàn giao cho đơn vị vận chuyển' },
            { status: 'COMPLETED', timestamp: '15/10/2026 16:45', actor: 'System', note: 'Giao hàng thành công' }
        ],
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
                properties: '', 
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
                properties: '', 
                quantity: 1,
                original_price: MOCK_PARTS[1].original_price,
                unit_price: MOCK_PARTS[1].price,
                total_price: MOCK_PARTS[1].price,
                is_reviewed: true
            }
        ]
    },
    // Đơn 2: Báo Ngoại Lệ (Exception từ Kho - Flow thực tế)
    {
        order_code: 'ORD-2026-V12K',
        user_id: 'USR-08912',
        order_type: 'ACCESSORIES',
        order_date: '05/11/2026',
        order_status: 'PROCESSING',
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
            method: 'Tiêu chuẩn',
            provider: 'Giao Hàng Tiết Kiệm',
            tracking_code: 'GHTK-V12K-999',
            estimated_delivery: '08/11/2026'
        },
        exception_issue: 'Kho báo rách bao bì hộp đựng Ốp Carbon, đang chờ điều chuyển từ kho Quận 7 qua. Khách hối giao nhanh.',
        handled_by: 'NV-KHO-03 (Trần Thị B)',
        activity_log: [
            { status: 'PENDING', timestamp: '05/11/2026 10:00', actor: 'System', note: 'Đơn hàng được tạo' },
            { status: 'CONFIRMED', timestamp: '05/11/2026 10:15', actor: 'Admin (Lê Phước Thành)', note: 'Đã gọi xác nhận khách hàng. Duyệt đơn.' },
            { status: 'PROCESSING', timestamp: '05/11/2026 10:16', actor: 'System', note: 'Lệnh xuất kho đã chuyển đến Bộ phận Kho' },
            { status: 'EXCEPTION', timestamp: '05/11/2026 11:30', actor: 'NV Kho (Trần Thị B)', note: 'BÁO LỖI: Rách bao bì hộp khi đi nhặt hàng' }
        ],
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
                properties: 'Màu logo: Đỏ',
                quantity: 1,
                original_price: null,
                unit_price: 12500000,
                total_price: 12500000,
                is_reviewed: false
            }
        ]
    },
    // Đơn 3: Pre-order (Chờ Báo Giá / Chờ Cọc)
    {
        order_code: 'ORD-2026-PO99',
        user_id: 'USR-08912',
        order_type: 'PRE_ORDER',
        order_date: '10/11/2026',
        order_status: 'PENDING',
        financials: {
            subtotal: 142500000,
            shipping_fee: 0,
            discount: 0,
            vat: 0,
            grand_total: 142500000
        },
        payment: {
            method: 'BANK_TRANSFER',
            method_name: 'Chuyển khoản (Đặt cọc)',
            status: 'UNPAID',
            transaction_id: ''
        },
        shipping: {
            method: 'Nhập khẩu 14 ngày',
            provider: 'TT AUTO Logistics',
            tracking_code: '',
            estimated_delivery: 'TBD'
        },
        exception_issue: null,
        handled_by: 'NV-SALE-02 (Phạm Văn C)',
        activity_log: [
            { status: 'PENDING', timestamp: '10/11/2026 09:00', actor: 'System', note: 'Đơn yêu cầu đặt hàng (Pre-order) được tạo' },
            { status: 'PENDING_QUOTE', timestamp: '10/11/2026 10:30', actor: 'Sale (Phạm Văn C)', note: 'Đã liên hệ Hãng kiểm tra giá và báo lại khách hàng' }
        ],
        delivery: {
            receiver_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            email: MOCK_PROFILE_CUSTOMER.email,
            masked_email: '',
            address: MOCK_PROFILE_CUSTOMER.address,
            note: 'Gọi điện xác nhận cấu hình xe trước khi đặt'
        },
        vat_info: null,
        cancel_reason: null,
        invoice_url: null,
        items: [
            {
                _id: 'ITEM-4',
                part_id: 'PRT-PO-1',
                sku: 'TT-GT-2026',
                name: 'Mâm TT GranTurismo S-Line (Forged)',
                image: 'https://images.unsplash.com/photo-1598555122176-b99684346bb6?q=80&w=800',
                properties: 'Kích thước: 20 Inch | Màu: Đen mờ',
                quantity: 1,
                original_price: 150000000,
                unit_price: 142500000,
                total_price: 142500000,
                is_reviewed: false
            }
        ]
    },
    // Đơn 4: Đơn Hàng Mới Chờ Duyệt (PENDING)
    {
        order_code: 'ORD-2026-NEW1',
        user_id: 'USR-08912',
        order_type: 'PART_PURCHASE',
        order_date: '16/05/2026',
        order_status: 'PENDING',
        financials: {
            subtotal: 5400000,
            shipping_fee: 45000,
            discount: 0,
            vat: 540000,
            grand_total: 5985000
        },
        payment: {
            method: 'MOMO',
            method_name: 'Ví MoMo',
            status: 'PAID',
            transaction_id: '#MM-293847'
        },
        shipping: {
            method: 'Hỏa tốc',
            provider: 'AhaMove',
            tracking_code: '',
            estimated_delivery: '16/05/2026'
        },
        exception_issue: null,
        handled_by: null,
        activity_log: [
            { status: 'PENDING', timestamp: '16/05/2026 17:30', actor: 'System', note: 'Đơn hàng được tạo và thanh toán qua MoMo thành công' }
        ],
        delivery: {
            receiver_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            email: MOCK_PROFILE_CUSTOMER.email,
            masked_email: '',
            address: MOCK_PROFILE_CUSTOMER.address,
            note: 'Giao hỏa tốc trong 2h'
        },
        vat_info: null,
        cancel_reason: null,
        invoice_url: null,
        items: [
            {
                _id: 'ITEM-5',
                part_id: MOCK_PARTS[3] ? MOCK_PARTS[3].id : 'PRT-Y',
                sku: MOCK_PARTS[3] ? MOCK_PARTS[3].sku : 'SKU-YY',
                name: MOCK_PARTS[3] ? MOCK_PARTS[3].name : 'Lốp Michelin Pilot Sport',
                image: MOCK_PARTS[3] ? MOCK_PARTS[3].image : '',
                properties: '',
                quantity: 1,
                original_price: null,
                unit_price: 5400000,
                total_price: 5400000,
                is_reviewed: false
            }
        ]
    },
    // Đơn 5: Bị Hủy (CANCELED)
    {
        order_code: 'ORD-2026-CANCEL',
        user_id: 'USR-08912',
        order_type: 'PART_PURCHASE',
        order_date: '01/05/2026',
        order_status: 'CANCELLED',
        financials: {
            subtotal: 520000,
            shipping_fee: 30000,
            discount: 0,
            vat: 0,
            grand_total: 550000
        },
        payment: {
            method: 'COD',
            method_name: 'Thanh toán khi nhận hàng',
            status: 'UNPAID',
            transaction_id: ''
        },
        shipping: {
            method: 'Tiêu chuẩn',
            provider: 'Viettel Post',
            tracking_code: '',
            estimated_delivery: 'TBD'
        },
        exception_issue: null,
        handled_by: 'Admin (Lê Phước Thành)',
        activity_log: [
            { status: 'PENDING', timestamp: '01/05/2026 09:00', actor: 'System', note: 'Đơn hàng được tạo' },
            { status: 'CANCELLED', timestamp: '01/05/2026 10:30', actor: 'Admin (Lê Phước Thành)', note: 'Hủy đơn do khách hàng đổi ý không mua nữa' }
        ],
        delivery: {
            receiver_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            email: MOCK_PROFILE_CUSTOMER.email,
            masked_email: '',
            address: MOCK_PROFILE_CUSTOMER.address,
            note: ''
        },
        vat_info: null,
        cancel_reason: 'Khách hàng liên hệ xin hủy vì đã mua được hàng ở nơi khác.',
        invoice_url: null,
        items: [
            {
                _id: 'ITEM-6',
                part_id: MOCK_PARTS[4] ? MOCK_PARTS[4].id : 'PRT-Z',
                sku: MOCK_PARTS[4] ? MOCK_PARTS[4].sku : 'SKU-ZZ',
                name: MOCK_PARTS[4] ? MOCK_PARTS[4].name : 'Dầu nhớt Castrol Edge',
                image: MOCK_PARTS[4] ? MOCK_PARTS[4].image : '',
                properties: 'Dung tích: 4L',
                quantity: 1,
                original_price: null,
                unit_price: 520000,
                total_price: 520000,
                is_reviewed: false
            }
        ]
    }
];
