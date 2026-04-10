/**
 * Bộ lọc dữ liệu (Data Filter / Sorting Utils) Tách riêng biệt khỏi Logic của Hook.
 * Giúp cho tệp cấu trúc mạch lạc hơn.
 */
import { SHOWROOM_BRANCHES } from '../../../../../Customer/TestDriveBooking/data/testDrive.mock';

export const filterTestDrivesByStatus = (drives, filterType) => {
    if (!drives || drives.length === 0) return [];
    
    // 'upcoming': Trạng thái 1 (Chờ xác nhận), 2 (Chốt lịch), 3 (Đang diễn ra)
    // 'history': Trạng thái 4 (Hoàn thành), 5 (Đã hủy)
    if (filterType === 'upcoming') {
        return drives.filter(d => [1, 2, 3].includes(d.booking_status));
    }
    
    return drives.filter(d => [4, 5].includes(d.booking_status));
};

export const formatDriveLocation = (drive, t) => {
    if (drive.test_drive_type === 'showroom') {
        const branch = SHOWROOM_BRANCHES.find(b => b.id === drive.showroom_branch);
        return branch ? branch.name : (drive.delivery_address || t('showroom_tt_auto', 'Showroom TT AUTO'));
    }
    
    if (typeof drive.delivery_address === 'object' && drive.delivery_address !== null) {
        return `${drive.delivery_address.street}, ${drive.delivery_address.ward}, ${drive.delivery_address.district}, ${drive.delivery_address.city}`;
    }
    
    return drive.delivery_address || t('updating', 'Đang cập nhật');
};

export const formatDriveDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('-').reverse().join('/');
};
