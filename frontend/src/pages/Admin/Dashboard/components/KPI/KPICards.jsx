import React from 'react';
import { TrendingUp, ShoppingCart, Users, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatVND } from '../../../Customers/utils/format';

const KPICard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
    <article className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{title}</h2>
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{value}</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} strokeWidth={2.5} />
            </div>
        </div>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            {subtitle}
        </p>
    </article>
);

export const KPICards = ({ stats }) => {
    const { t } = useTranslation('adminDashboard');

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
                title={t('kpi_revenue_30d')} 
                value={formatVND(stats?.totalRevenue || 0)} 
                icon={TrendingUp} 
                colorClass="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-500/20 dark:to-emerald-500/10 dark:text-emerald-400"
                subtitle={t('kpi_revenue_30d_desc')}
            />
            <KPICard 
                title={t('kpi_pending_orders')} 
                value={stats?.pendingOrdersCount?.toLocaleString('vi-VN') || '0'} 
                icon={ShoppingCart} 
                colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400"
                subtitle={t('kpi_pending_orders_desc')}
            />
            <KPICard 
                title={t('kpi_new_customers')} 
                value={stats?.newCustomers?.toLocaleString('vi-VN') || '0'} 
                icon={Users} 
                colorClass="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 dark:from-amber-500/20 dark:to-amber-500/10 dark:text-amber-400"
                subtitle={t('kpi_new_customers_desc')}
            />
            <KPICard 
                title={t('kpi_service_appointments')} 
                value={((stats?.pendingAppointmentsCount || 0) + (stats?.pendingTestDrivesCount || 0)).toLocaleString('vi-VN')} 
                icon={Wrench} 
                colorClass="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400"
                subtitle={t('kpi_service_appointments_desc')}
            />
        </section>
    );
};
