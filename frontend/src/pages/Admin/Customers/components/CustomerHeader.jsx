import { Plus } from 'lucide-react';
import PageBreadcrumbs from '../../../../components/PageBreadcrumbs';

export const CustomerHeader = ({ t, breadcrumbItems }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
                <PageBreadcrumbs items={breadcrumbItems} />
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">{t('admin:customers.title')}</h1>
            </div>
            
            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-premium-gold dark:hover:bg-yellow-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-500/30 dark:shadow-premium-gold/20">
                <Plus size={20} />
                {t('admin:customers.addNew')}
            </button>
        </div>
    );
};
