import React from 'react';
import { Settings } from 'lucide-react';

import { Skeleton } from 'antd';

const ServiceList = ({ filteredServices, bookingData, handleServiceToggle, isServicesLoading, t }) => {
    return (
        <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4 block">
                {t('services:select_services')}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {isServicesLoading ? (
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-start gap-5 p-6 rounded-[24px] border-2 border-slate-200 dark:border-white/5 bg-white dark:bg-[#141416]">
                            <div className="w-12 h-12 rounded-[16px] shrink-0 bg-slate-100 dark:bg-white/5 animate-pulse" />
                            <div className="flex-1 space-y-3 w-full">
                                <Skeleton.Input active size="small" style={{ width: '80%' }} />
                                <Skeleton active paragraph={{ rows: 2, width: ['100%', '60%'] }} title={false} />
                            </div>
                        </div>
                    ))
                ) : (
                    filteredServices.map(srv => {
                        const isSelected = bookingData.selected_services?.some(s => s._id === srv._id) || false;

                        let priceDisplay = t('services:contact', 'LIÊN HỆ');
                        if (srv.priceType === 'FIXED') {
                            priceDisplay = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(srv.basePrice);
                        } else if (srv.priceType === 'STARTING_AT') {
                            priceDisplay = `${t('services:price_starting_at', 'TỪ')} ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(srv.basePrice)}`;
                        }

                        return (
                            <div
                                key={srv._id}
                                onClick={() => handleServiceToggle(srv)}
                                className={`flex items-start gap-5 p-6 rounded-[24px] cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-yellow-500 bg-white dark:bg-yellow-500/5 shadow-[0_20px_40px_rgba(234,179,8,0.08)]' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#141416] hover:border-slate-300 dark:hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-none'}`}
                            >
                                <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-yellow-50 border border-yellow-200/50 dark:bg-white/10 dark:border-white/10 text-yellow-600 dark:text-yellow-500' : 'bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-400'}`}>
                                    <Settings size={22} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-[15px] leading-tight mb-2 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {srv.serviceName}
                                    </h4>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                                        {srv.description}
                                    </p>
                                    <p className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-widest">
                                        {t('services:estimated_price', 'GIÁ DỰ KIẾN:')} {priceDisplay}
                                    </p>
                                </div>
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-yellow-500 border-yellow-500' : 'border-slate-300 dark:border-white/20'}`}>
                                    {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                            </div>
                        )
                    }))}
            </div>
        </div>
    );
};

export default ServiceList;
