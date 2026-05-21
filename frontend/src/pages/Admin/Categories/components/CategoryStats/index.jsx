import React from 'react';
import { Skeleton } from 'antd';

export const CategoryStats = ({ stats, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                        <Skeleton active paragraph={{ rows: 1 }} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminCategories:statsTotal', 'Tổng Kiểu Dáng')}
                </p>
                <p className="text-3xl font-black text-yellow-600 dark:text-[#ffd165]">{stats.totalCategories}</p>
            </div>
            
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminCategories:statsActive', 'Kiểu Dáng Hoạt Động')}
                </p>
                <p className="text-3xl font-black text-blue-500 dark:text-[#adddff]">{stats.activeCategories}</p>
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminCategories:statsCars', 'Tổng Số Xe')}
                </p>
                <p className="text-3xl font-black text-emerald-500 dark:text-[#4edea3]">
                    {stats.totalCars} <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{t('adminCategories:txtCar', 'xe')}</span>
                </p>
            </div>

            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminCategories:statsPopular', 'Phổ Biến Nhất')}
                </p>
                <p className="text-3xl font-black text-slate-800 dark:text-white truncate uppercase">{stats.mostPopular}</p>
            </div>
        </div>
    );
};
