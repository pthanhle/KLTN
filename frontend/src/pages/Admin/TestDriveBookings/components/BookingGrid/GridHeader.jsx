import React from 'react';

export const GridHeader = ({ t }) => {
    return (
        <div className="hidden md:grid md:grid-cols-[1.9fr_1.8fr_1fr_2.3fr_1.2fr_0.8fr_1fr] gap-4 px-6 text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-black mb-3 items-center">
            <div>{t('adminTestDriveBookings:col_customer', 'Khách Hàng')}</div>
            <div>{t('adminTestDriveBookings:col_car', 'Xe')}</div>
            <div>{t('adminTestDriveBookings:col_type', 'Hình Thức')}</div>
            <div>{t('adminTestDriveBookings:col_location', 'Địa Điểm')}</div>
            <div>{t('adminTestDriveBookings:col_time', 'Thời Gian')}</div>
            <div className="text-center">{t('adminTestDriveBookings:col_status', 'Trạng Thái')}</div>
            <div className="text-center">{t('adminTestDriveBookings:col_assignee', 'Phụ Trách')}</div>
        </div>
    );
};
