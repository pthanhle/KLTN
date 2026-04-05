import React from 'react';
import { Skeleton } from 'antd';
import { Grid, TrendingUp, Archive } from 'lucide-react';

export const CategoryStats = ({ stats, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm"><Skeleton active paragraph={{ rows: 2 }} /></div>
                ))}
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl relative overflow-hidden group shadow-sm border border-slate-200 dark:border-[#9b8f79]/10">
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                    <Grid size={64} className="text-yellow-500" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-2">{t('adminCategories:statTotal', 'Tổng Kiểu Dáng')}</div>
                <div className="text-5xl font-black text-yellow-500">{stats.totalCategories}</div>
                <div className="mt-4 flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-widest">
                    <span>{t('adminCategories:statTotalDesc', 'Active Categories')}</span>
                </div>
            </div>
            
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl relative overflow-hidden group shadow-sm border border-slate-200 dark:border-[#9b8f79]/10">
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={64} className="text-slate-800 dark:text-white" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-2">{t('adminCategories:statPopular', 'Phổ Biến Nhất')}</div>
                <div className="text-5xl font-black text-slate-800 dark:text-white">{stats.mostPopular}</div>
                <div className="mt-4 flex items-center gap-2 text-slate-500 dark:text-[#d3c5ac] text-xs font-bold uppercase tracking-widest">
                    <span>{t('adminCategories:statPopularDesc', 'Market Favorite')}</span>
                </div>
            </div>
            
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl relative overflow-hidden group shadow-sm border border-slate-200 dark:border-[#9b8f79]/10">
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
                    <Archive size={64} className="text-yellow-500" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-[#d3c5ac] mb-2">{t('adminCategories:statInventory', 'Tổng Tài Sản')}</div>
                <div className="text-5xl font-black text-yellow-500">
                    {stats.totalCars} <span className="text-lg font-medium text-slate-500 dark:text-[#d3c5ac]">{t('adminCategories:txtCar', 'xe')}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#4edea3] text-xs font-bold uppercase tracking-widest">
                    <span>{t('adminCategories:statInventoryDesc', 'Fleet Capacity')}</span>
                </div>
            </div>
        </section>
    );
};
