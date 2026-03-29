import { mockServices } from '../../../Shared/Profile/pages/ServiceHistory/data/mockServiceData';

/**
 * Trích xuất dữ liệu gốc của Khách hàng từ Database dùng chung
 * @param {string} bookingCode - Mã đơn hàng
 * @returns {object} Dữ liệu Master Service
 */
export const getMasterServiceSession = (bookingCode) => {
    return mockServices.find(s => s.booking_code === bookingCode) || mockServices[0];
};

/**
 * [MOCK ONLY] Cập nhật CSDL Mock chung để 2 trang tự đồng bộ (Profile và Tracking)
 */
export const updateMasterServiceStatus = (bookingCode, newStatus) => {
    const session = mockServices.find(s => s.booking_code === bookingCode);
    if (session) {
        session.booking_status = newStatus;
    }
};

/**
 * Format số ODO theo định dạng quốc tế chuẩn
 * @param {number|string} odometer - Số KM đầu vào
 * @returns {string} Số ODO đã định dạng (VD: 45,210)
 */
export const formatOdometer = (odometer) => {
    if (!odometer) return '0';
    const num = typeof odometer === 'string' ? parseFloat(odometer.replace(/,/g, '')) : odometer;
    if (isNaN(num)) return odometer;
    return num.toLocaleString('en-US');
};

/**
 * Trích xuất an toàn Avatar của nhân viên từ dữ liệu service
 * @param {object} serviceSession - Master Service Data
 * @param {string} role - Vai trò (advisor, technician, manager)
 * @returns {object} Thông tin nhân viên với fallback
 */
export const getEmployeeData = (serviceSession, role = 'advisor') => {
    if (role === 'advisor') {
        return serviceSession.advisor_info || { name: 'Chưa Rõ', role: 'Service Advisor' };
    }
    // Expandable for technician, QC Manager, etc.
    return { name: 'Nhân Viên', role: role };
};

/**
 * Format tiền tệ VNĐ tiêu chuẩn
 * @param {number} amount - Số tiền
 * @returns {string} Trả về Chuỗi định dạng (vd: 1.500.000)
 */
export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '0';
    return new Intl.NumberFormat('vi-VN').format(amount);
};

/**
 * Format ISO String thành "HH:mm"
 * @param {string} isoString - "2026-03-25T14:05:00Z"
 */
export const formatTimeHHMM = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format ISO String thành "15:30 - Ngày 25/03"
 * @param {string} isoString 
 */
export const formatDateTimeShort = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    return `Sẵn sàng lúc ${time} - ${day}`;
};
