export const MOCK_INVOICES = {
    'SRV-2026-X11A': {
        invoice_id: 'INV-2026-0001',
        status: 'PENDING',
        items: [
            { id: 'item_1', name: 'Sơn dặm cản trước', type: 'SERVICE', qty: 1, unitPrice: 800000, total: 800000 },
            { id: 'item_2', name: 'Đánh bóng toàn xe', type: 'SERVICE', qty: 1, unitPrice: 1500000, total: 1500000 },
        ],
        financials: {
            subtotal: 2300000,
            vatRate: 10,
            vat: 230000,
            deposit: 0,
            finalBalance: 2530000
        }
    },
    'SRV-2026-R11': {
        invoice_id: 'INV-2026-0002',
        status: 'COMPLETED',
        items: [
            { id: 'item_1', name: 'Kiểm tra gầm', type: 'SERVICE', qty: 1, unitPrice: 300000, total: 300000 },
            { id: 'item_2', name: 'Thay thế cao su càng A', type: 'PART', qty: 2, unitPrice: 850000, total: 1700000 },
            { id: 'item_3', name: 'Công thợ thay thế', type: 'LABOR', qty: 1.5, unitPrice: 200000, total: 300000 },
        ],
        financials: {
            subtotal: 2300000,
            vatRate: 10,
            vat: 230000,
            deposit: 500000,
            finalBalance: 2030000
        }
    },
    'SRV-2026-B77P': {
        invoice_id: 'INV-2026-0003',
        status: 'PENDING',
        items: [
            { id: 'PT-BRK-01', name: 'Bộ má phanh gốm cường độ cao (Trước)', type: 'PART', qty: 1, unitPrice: 11000000, total: 11000000 },
            { id: 'PT-BUSH-A', name: 'Bộ bọc cao su càng A', type: 'PART', qty: 2, unitPrice: 4500000, total: 9000000 },
            { id: 'PT-OIL-0W40', name: 'Dầu hộp số tổng hợp cao cấp', type: 'PART', qty: 1, unitPrice: 2500000, total: 2500000 },
            { id: 'LB-01', name: 'Công ép cao su càng A và cân chỉnh thước lái 3D', type: 'LABOR', qty: 2, unitPrice: 800000, total: 1600000 },
            { id: 'LB-02', name: 'Công thay má phanh và chạy phần mềm Reset', type: 'LABOR', qty: 1, unitPrice: 900000, total: 900000 }
        ],
        financials: {
            subtotal: 25000000,
            vatRate: 10,
            vat: 2500000,
            deposit: 10000000,
            finalBalance: 17500000
        }
    },
    'SRV-2026-X99R': {
        invoice_id: 'INV-2026-0004',
        status: 'PENDING',
        items: [
            { id: 'item_1', name: 'Phủ Ceramic toàn xe', type: 'SERVICE', qty: 1, unitPrice: 15000000, total: 15000000 },
        ],
        financials: {
            subtotal: 15000000,
            vatRate: 10,
            vat: 1500000,
            deposit: 0,
            finalBalance: 16500000
        }
    },
    'SRV-2026-M01': {
        invoice_id: 'INV-2026-0005',
        status: 'COMPLETED',
        items: [
            { id: 'item_1', name: 'Bảo dưỡng cấp trung bình', type: 'SERVICE', qty: 1, unitPrice: 4500000, total: 4500000 },
        ],
        financials: {
            subtotal: 4500000,
            vatRate: 10,
            vat: 450000,
            deposit: 0,
            finalBalance: 4950000
        }
    },
    'SRV-2026-M02': {
        invoice_id: 'INV-2026-0006',
        status: 'PENDING',
        items: [
            { id: 'item_1', name: 'Thay má phanh và cân chỉnh thước lái', type: 'SERVICE', qty: 1, unitPrice: 12500000, total: 12500000 },
        ],
        financials: {
            subtotal: 12500000,
            vatRate: 10,
            vat: 1250000,
            deposit: 2000000,
            finalBalance: 11750000
        }
    }
};

export const MOCK_QC_DATA = {
    'SRV-2026-X11A': {
        qc_id: 'QC-2026-001',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Kiểm tra độ đều màu sơn', status: 'completed' },
            { id: 'kcs_2', title: 'Kiểm tra độ bóng bề mặt', status: 'completed' },
            { id: 'kcs_3', title: 'Vệ sinh nội ngoại thất', status: 'completed' },
        ],
        inspected_by: 'qc_01',
        inspected_at: new Date().toISOString()
    },
    'SRV-2026-R11': {
        qc_id: 'QC-2026-002',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Chạy thử kiểm tra tiếng kêu gầm', status: 'completed' },
            { id: 'kcs_2', title: 'Kiểm tra ốc gầm', status: 'completed' },
            { id: 'kcs_3', title: 'Rửa xe', status: 'completed' },
        ],
        inspected_by: 'qc_02',
        inspected_at: new Date(Date.now() - 3600000).toISOString()
    },
    'SRV-2026-B77P': {
        qc_id: 'QC-2026-003',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Chạy thử kiểm tra phanh ở tốc độ cao', status: 'completed' },
            { id: 'kcs_2', title: 'Kiểm tra độ rơ góc lái', status: 'completed' },
            { id: 'kcs_3', title: 'Kiểm tra mức dầu hộp số', status: 'completed' }
        ],
        inspected_by: 'qc_03',
        inspected_at: new Date().toISOString()
    },
    'SRV-2026-X99R': {
        qc_id: 'QC-2026-004',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Test bề mặt bằng công nghệ hồng ngoại', status: 'completed' },
            { id: 'kcs_2', title: 'Kiểm tra độ dày lớp Ceramic', status: 'completed' }
        ],
        inspected_by: 'qc_01',
        inspected_at: new Date().toISOString()
    },
    'SRV-2026-M01': {
        qc_id: 'QC-2026-005',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Kiểm tra mức dầu động cơ', status: 'completed' },
            { id: 'kcs_2', title: 'Đọc lỗi toàn bộ hệ thống bằng máy chẩn đoán', status: 'completed' },
            { id: 'kcs_3', title: 'Kiểm tra áp suất lốp', status: 'completed' }
        ],
        inspected_by: 'qc_02',
        inspected_at: new Date().toISOString()
    },
    'SRV-2026-M02': {
        qc_id: 'QC-2026-006',
        status: 'PASSED',
        kcs_tasks: [
            { id: 'kcs_1', title: 'Đo độ dày má phanh', status: 'completed' },
            { id: 'kcs_2', title: 'Chạy thử đường thẳng kiểm tra vô lăng', status: 'completed' },
            { id: 'kcs_3', title: 'In phiếu kết quả cân chỉnh thước lái 3D', status: 'completed' }
        ],
        inspected_by: 'qc_03',
        inspected_at: new Date().toISOString()
    }
};

// Hàm giả lập fetching Data chuẩn
export const fetchInvoiceData = (bookingCode) => {
    return MOCK_INVOICES[bookingCode] || null;
};

export const fetchQcData = (bookingCode) => {
    return MOCK_QC_DATA[bookingCode] || null;
};
