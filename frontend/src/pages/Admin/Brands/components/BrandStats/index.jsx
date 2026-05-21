import React from 'react';

export const BrandStats = ({ stats, t }) => {
    return (
        <div className="grid grid-cols-4 gap-6 mb-8 w-full">
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminBrands:statsTotal', 'Tổng Số Hãng')}
                </p>
                <p className="text-3xl font-black text-yellow-600 dark:text-[#ffd165]">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminBrands:statsPartner', 'Hãng Đối Tác')}
                </p>
                <p className="text-3xl font-black text-blue-500 dark:text-[#adddff]">{stats.partnerBrands}</p>
            </div>
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminBrands:statsProducts', 'Tổng Số Sản Phẩm')}
                </p>
                <p className="text-3xl font-black text-emerald-500 dark:text-[#4edea3]">{stats.totalProducts}</p>
            </div>
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-[#9b8f79]/10 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">
                    {t('adminBrands:statsHot', 'Thương Hiệu Lớn Nhất')}
                </p>
                <p className="text-3xl font-black text-slate-800 dark:text-white truncate">{stats.hotBrand}</p>
            </div>
        </div>
    );
};
