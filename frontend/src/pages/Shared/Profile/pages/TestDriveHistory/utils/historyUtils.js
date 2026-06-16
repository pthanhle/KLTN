/**
 * Bộ lọc dữ liệu (Data Filter / Sorting Utils) Tách riêng biệt khỏi Logic của Hook.
 * Giúp cho tệp cấu trúc mạch lạc hơn.
 */
import { SHOWROOM_BRANCHES } from '../../../../../Customer/TestDriveBooking/data/testDrive.mock';

export const filterTestDrivesByStatus = (drives, filterType) => {
    if (!drives || drives.length === 0) return [];
    
    // 'upcoming': Pending, Confirmed, Received, InProgress
    // 'history': Completed, Cancelled
    if (filterType === 'upcoming') {
        return drives.filter(d => ['Pending', 'Confirmed', 'Received', 'InProgress'].includes(d.status));
    }
    
    return drives.filter(d => ['Completed', 'Cancelled'].includes(d.status));
};

export const formatDriveLocation = (drive, t) => {
    if (drive.bookingType === 'showroom') {
        const branch = SHOWROOM_BRANCHES.find(b => b.id === drive.showroomBranch);
        return branch ? branch.name : (drive.addressDetail || t('showroom_tt_auto', 'Showroom TT AUTO'));
    }
    
    if (drive.bookingType === 'home' && drive.city) {
        return `${drive.addressDetail}, ${drive.ward}, ${drive.district}, ${drive.city}`;
    }
    
    return drive.addressDetail || t('updating', 'Đang cập nhật');
};

export const formatDriveDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('-').reverse().join('/');
};
