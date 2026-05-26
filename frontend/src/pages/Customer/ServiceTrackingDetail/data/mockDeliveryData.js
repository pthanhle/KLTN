import { getMasterServiceSession } from '../utils/trackingDataUtils';

export const getDeliveryData = (trackingId) => {
    const serviceSession = getMasterServiceSession(trackingId);
    return {
        id: trackingId, vin: serviceSession?.vehicle_info?.vin_number || 'WP0AA2...', handover_brief: { odo_out: 12500, next_maintenance_date: '2026-09-25T00:00:00Z', next_maintenance_km: 17500, warranty_months: 24, status_code: 'READY' },
        invoice_ledger: {
            transaction_id: 'KP-8829-01', original_quote_total: 25000000, mid_service_additions: 15000000, sub_total: 40000000, vat_amount: 4000000, grand_total: 44000000, deposit_paid: 10000000, balance_due: 34000000, payment_status: 'PENDING', has_disputed: false,
            items: [
                { id: '1', sku: 'PT-BRK-01', name: 'Bộ má phanh gốm cường độ cao (Trước)', quantity: 1, unit_price: 11000000, total_price: 11000000, is_addition: false },
                { id: '2', sku: 'PT-BUSH-A', name: 'Bộ bọc cao su càng A', quantity: 2, unit_price: 4500000, total_price: 9000000, is_addition: false },
                { id: '3', sku: 'PT-OIL-0W40', name: 'Dầu hộp số tổng hợp cao cấp', quantity: 1, unit_price: 2500000, total_price: 2500000, is_addition: false },
                { id: '4', labor_code: 'LB-TONG', name: 'Tổng Công tháo lắp & cân chỉnh', quantity: 1, unit_price: 2500000, total_price: 2500000, is_addition: false },
                { id: '5', sku: 'PT-BRK-DSC', name: 'Phát sinh: Cặp đĩa phanh tản nhiệt', quantity: 1, unit_price: 15000000, total_price: 15000000, is_addition: true }
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
