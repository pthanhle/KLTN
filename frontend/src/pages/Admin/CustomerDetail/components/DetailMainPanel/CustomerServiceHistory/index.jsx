import React from 'react';
import { Skeleton } from 'antd';
import { ServiceHistoryRow } from './components/ServiceHistoryRow';

export const CustomerServiceHistory = ({ serviceHistory, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="space-y-4 animate-pulse mt-8">
                <Skeleton.Button active size="large" block className="!h-16 !rounded-2xl" />
                <Skeleton.Button active size="large" block className="!h-16 !rounded-2xl" />
            </div>
        );
    }

    if (!serviceHistory || serviceHistory.length === 0) {
        return <div className="p-8 mt-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('adminCustomers:emptyHistory', 'Chưa có lịch sử dịch vụ')}</div>;
    }

    return (
        <section className="space-y-6 mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">
                    {t('adminCustomers:maintenanceRecords', 'Lịch Sử Dịch Vụ')}
                </h3>
            </div>
            
            <div className="bg-slate-50 dark:bg-[#141416] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5">
                <div className="grid grid-cols-12 gap-x-4 px-8 py-4 bg-slate-100 dark:bg-[#0c1324]/50 text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400">
                    <div className="col-span-2">{t('adminCustomers:colId', 'Mã HD')}</div>
                    <div className="col-span-4">{t('adminCustomers:colVehicleService', 'Xe / Dịch vụ')}</div>
                    <div className="col-span-2">{t('adminCustomers:colType', 'Phân loại')}</div>
                    <div className="col-span-2">{t('adminCustomers:colDate', 'Ngày hoàn thành')}</div>
                    <div className="col-span-2">{t('adminCustomers:colStatus', 'Trạng Thái')}</div>
                </div>
                
                <div className="divide-y divide-slate-200 dark:divide-white/5">
                    {serviceHistory.map(record => (
                        <ServiceHistoryRow key={record.id} record={record} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};
