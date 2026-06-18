import React from 'react';
import { Tag } from 'antd';
import { formatVND } from '../../../../../Customers/utils/format';

export const AdminServiceHistoryCard = ({ service, index, t }) => {
    const isCompleted = service.booking_status === 'COMPLETED';
    const isCancelled = service.booking_status === 'CANCELLED';

    const renderPrice = (amount) => {
        if (!amount || amount <= 0) return '0 ₫';
        return formatVND(amount);
    };

    const formattedOdo = service.vehicle_info?.current_odometer?.toLocaleString() || '0';

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden group hover:border-slate-200 dark:hover:border-white/10 transition-colors">
            {/* Watermark Index */}
            <div className="absolute top-0 right-0 p-4 pointer-events-none">
                <span className="text-6xl font-black text-slate-50 dark:text-white/[0.02] absolute -top-4 -right-2 select-none group-hover:scale-105 transition-transform duration-500">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-5">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <p className="text-yellow-600 dark:text-yellow-500 font-bold text-[10px] uppercase tracking-widest">{service.vehicle_info?.brand || 'N/A'}</p>
                            <Tag className="m-0 border-0 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-bold tracking-widest uppercase text-[9px]">
                                {service.service_type === 'MAINTENANCE' ? t('Bảo dưỡng') : 
                                 service.service_type === 'CAR_SPA' ? t('Chăm sóc - Làm đẹp') : 
                                 t('Sửa chữa')}
                            </Tag>
                        </div>
                        <h3 className="text-lg font-extrabold text-[#0a0a0b] dark:text-white uppercase tracking-tight">
                            {service.vehicle_info?.model || 'Xe Nội Bộ'} {service.vehicle_info?.license_plate ? `- ${service.vehicle_info.license_plate}` : ''}
                        </h3>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                        isCompleted 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-500/20'
                            : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-500/20'
                    }`}>
                        {isCompleted ? t('Hoàn thành') : t('Đã Hủy')}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('Số ODO')}
                        </p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{formattedOdo} KM</p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('Cố vấn dịch vụ')}
                        </p>
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                            {service.advisor_id?.full_name || 'Chưa phân bổ'}
                        </p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('Kỹ thuật viên')}
                        </p>
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                            {service.mechanic_id?.full_name || 'Chưa phân bổ'}
                        </p>
                    </div>
                    <div className="bg-[#f8fafc] dark:bg-[#0a0a0b] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            {t('Tổng chi phí')}
                        </p>
                        <p className="text-sm font-black text-yellow-600 dark:text-premium-gold">
                            {renderPrice(service.total_cost)}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white border-l-2 border-yellow-500 pl-2">
                        {t('Nội dung thực hiện')}
                    </h4>
                    <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {(service.services || []).map((task, i) => (
                            <li key={task.service_id || i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full flex-shrink-0"></span> 
                                {task.service_name || task.name || task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
