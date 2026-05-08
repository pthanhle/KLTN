import React from 'react';
import { MapPin } from 'lucide-react';
import { Tooltip, Typography } from 'antd';
import { SHOWROOM_BRANCHES } from '../../../../../Customer/TestDriveBooking/data/testDrive.mock';

const { Text } = Typography;

export const LocationCell = ({ booking, t }) => {
    const renderLocationContent = () => {
        if (booking.bookingType === 'showroom' || booking.bookingType === 'waitlist') {
            const branch = SHOWROOM_BRANCHES.find(b => b.id === booking.showroomBranch);
            const branchName = branch ? branch.name : t('adminTestDriveBookings:unknown_branch', 'Chi nhánh không xác định');
            return <span className="font-semibold">{branchName}</span>;
        }

        const fullAddress = `${booking.addressDetail}, ${booking.ward}, ${booking.district}, ${booking.city}`;

        return (
            <Tooltip title={fullAddress} placement="topLeft">
                <div className="flex flex-col text-xs leading-relaxed max-w-full">
                    <span className="font-bold truncate text-slate-800 dark:text-slate-200">{booking.addressDetail}</span>
                    <Text type="secondary" className="text-[11px] truncate dark:text-slate-400">
                        {`${booking.ward}, ${booking.district}, ${booking.city}`}
                    </Text>
                </div>
            </Tooltip>
        );
    };

    return (
        <div className="flex items-center space-x-2 truncate">
            <span className="md:hidden text-xs uppercase tracking-widest text-slate-500 font-bold w-24">{t('adminTestDriveBookings:col_location', 'Địa Điểm')}:</span>
            <div className="flex items-start text-sm text-slate-700 dark:text-slate-300 pr-2 w-full overflow-hidden">
                <MapPin size={14} className="mt-0.5 mr-2 flex-shrink-0 text-slate-400" />
                <div className="flex-1 min-w-0">
                    {renderLocationContent()}
                </div>
            </div>
        </div>
    );
};
