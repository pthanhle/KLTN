import React from 'react';
import PageBreadcrumbs from '../../../../../components/PageBreadcrumbs';
import { Download, Plus } from 'lucide-react';

export const BrandHeader = ({ t, onAddBrand }) => {
    return (
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
            <div>
                <PageBreadcrumbs items={[{ label: t('adminBrands:pageTitle', 'Quản Lý Thương Hiệu') }]} />
                <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                    {t('adminBrands:pageTitle', 'Quản Lý Thương Hiệu')}
                </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">

                <button
                    type="button"
                    onClick={onAddBrand}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none"
                >
                    <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                    {t('adminBrands:btnAdd', 'Thêm Thương Hiệu')}
                </button>
            </div>
        </div>
    );
};
