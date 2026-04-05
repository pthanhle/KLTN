import React from 'react';
import PageBreadcrumbs from '../../../../../components/PageBreadcrumbs';
import { Download, Plus } from 'lucide-react';

export const CategoryHeader = ({ t, onAddCategory }) => {
    const breadcrumbItems = [
        { label: t('adminCategories:siderLabel', 'Danh mục') }
    ];

    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full relative z-10">
            <div>
                <PageBreadcrumbs items={breadcrumbItems} />
                <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                    {t('adminCategories:pageTitle', 'Quản Lý Danh Mục Xe')}
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
                <button className="flex justify-center items-center gap-2 px-6 py-3.5 bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 rounded-full font-black text-[11px] tracking-widest uppercase shadow-sm active:scale-95 transition-all outline-none">
                    <Download size={16} strokeWidth={2.5} />
                    {t('adminCategories:btnExport', 'Xuất Dữ Liệu')}
                </button>
                <button 
                    type="button"
                    onClick={onAddCategory}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none"
                >
                    <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                    {t('adminCategories:btnAdd', 'Thêm Danh Mục')}
                </button>
            </div>
        </div>
    );
};
