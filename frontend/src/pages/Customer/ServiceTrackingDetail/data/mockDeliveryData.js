import { getMasterServiceSession } from '../utils/trackingDataUtils';

export const getDeliveryData = (trackingId) => {
    const serviceSession = getMasterServiceSession(trackingId);
    return {
        id: trackingId, vin: serviceSession?.vehicle_info?.vin_number || 'WP0AA2...', handover_brief: { odo_out: 12500, next_maintenance_date: '2026-09-25T00:00:00Z', next_maintenance_km: 17500, warranty_months: 24, status_code: 'READY' },
        invoice_ledger: {
            transaction_id: 'KP-8829-01', original_quote_total: 22500000, mid_service_additions: 15000000, sub_total: 37500000, vat_amount: 3750000, grand_total: 41250000, deposit_paid: 10000000, balance_due: 31250000, payment_status: 'PENDING', has_disputed: false,
            items: [
                { id: '1', code: 'PT-BRK-01', name: 'Bộ má phanh gốm cường độ cao (Trước)', qty: 1, base_price: 11000000, total: 11000000, is_addition: false },
                { id: '2', code: 'PT-BUSH-A', name: 'Bộ bọc cao su càng A', qty: 2, base_price: 4500000, total: 9000000, is_addition: false },
                { id: '3', code: 'LB-TONG', name: 'Tổng Công tháo lắp & cân chỉnh', qty: 1, base_price: 2500000, total: 2500000, is_addition: false },
                { id: '4', code: 'PT-BRK-DSC', name: 'Phát sinh: Cặp đĩa phanh tản nhiệt', qty: 1, base_price: 15000000, total: 15000000, is_addition: true }
            ]
        },
        post_service_actions: { gate_pass: { code: 'EXIT-30A88888', barcode_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg', is_cleared: false }, nps_rating: { is_submitted: false } },
        payment_terminal: { supported_methods: ['VIETQR', 'APPLE_PAY'], qr_image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" },
        handshake_protocol: {
            advisor_signature: { is_signed: true, image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Steve_Jobs_signature.svg/512px-Steve_Jobs_signature.svg.png", role: serviceSession?.advisor_info?.role || "Service Advisor", name: serviceSession?.advisor_info?.name || "Nguyễn Hoàng Nam" },
            client_signature: { is_signed: false, image_url: null }
        }
    };
};
