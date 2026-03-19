/**
 * Bộ lọc dữ liệu (Data Filter / Sorting Utils) Tách riêng biệt khỏi Logic của Hook.
 * Giúp cho tệp cấu trúc mạch lạc hơn.
 */

export const filterTestDrivesByStatus = (drives, filterType) => {
    if (!drives || drives.length === 0) return [];
    
    // 'upcoming': Trạng thái 1 (Chờ xác nhận), 2 (Chốt lịch), 3 (Đang diễn ra)
    // 'history': Trạng thái 4 (Hoàn thành), 5 (Đã hủy)
    if (filterType === 'upcoming') {
        return drives.filter(d => [1, 2, 3].includes(d.booking_status));
    }
    
    return drives.filter(d => [4, 5].includes(d.booking_status));
};
