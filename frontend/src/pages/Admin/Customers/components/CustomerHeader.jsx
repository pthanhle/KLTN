import { Plus } from 'lucide-react';
import PageBreadcrumbs from '../../../../components/PageBreadcrumbs';

export const CustomerHeader = ({ t, breadcrumbItems, onAddCustomer }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
                <PageBreadcrumbs items={breadcrumbItems} />
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">{t('adminCustomers:title', 'Quản lý khách hàng')}</h1>
            </div>
            
            <button 
                type="button"
                onClick={onAddCustomer}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none w-full md:w-auto mt-4 md:mt-0"
            >
                <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                {t('adminCustomers:addNew', 'Thêm khách hàng')}
            </button>
        </div>
    );
};
