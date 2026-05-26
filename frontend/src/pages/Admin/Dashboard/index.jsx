import React from 'react';
import { Helmet } from 'react-helmet-async';
import { RefreshCw } from 'lucide-react';
import dayjs from 'dayjs';
import { useDashboardLogic } from './hooks/useDashboardLogic';
import { QUICK_ACTIONS } from './constants/dashboardConstants';
import { DashboardSkeleton } from './components/Skeletons/DashboardSkeleton';
import { GreetingBanner } from './components/Widgets/GreetingBanner';
import { KPICards } from './components/Widgets/KPICards';
import { RecentOrders } from './components/Widgets/RecentOrders';
import { LowStockAlert } from './components/Widgets/LowStockAlert';
import { ServiceAppointmentsWidget } from './components/Widgets/ServiceAppointmentsWidget';
import { RevenueChart } from './components/Charts/RevenueChart';
import { MonthlyRevenueChart } from './components/Charts/MonthlyRevenueChart';
import { OrderStatusChart } from './components/Charts/OrderStatusChart';

const AdminDashboard = () => {
    const {
        stats,
        isLoading,
        isFetching,
        lastUpdated,
        handleRefresh,
        greetingKey,
        t
    } = useDashboardLogic();

    if (isLoading || !stats) {
        return <DashboardSkeleton />;
    }

    return (
        <main className="w-full flex justify-center pb-24 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>{t('title_dashboard')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8 space-y-6">

                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{t('title_dashboard')}</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {t('updated_at')} {lastUpdated ? dayjs(lastUpdated).format('HH:mm - DD/MM/YYYY') : '...'}
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm disabled:opacity-60"
                    >
                        <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                        {isFetching ? t('btn_refreshing') : t('btn_refresh')}
                    </button>
                </header>

                <GreetingBanner stats={stats} greetingKey={greetingKey} />

                <KPICards stats={stats} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <RevenueChart data={stats.dailyRevenue} />
                    </div>
                    <div className="xl:col-span-1">
                        <OrderStatusChart data={stats.orderStatusStats} />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <MonthlyRevenueChart data={stats.monthlyRevenue} />
                    </div>
                    <div className="xl:col-span-1">
                        <RecentOrders orders={stats.recentOrders} />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <ServiceAppointmentsWidget appointments={stats.recentAppointments} />
                    <LowStockAlert parts={stats.lowStockParts} />
                </div>

                <nav className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {QUICK_ACTIONS.map((action) => {
                        const IconComponent = action.icon;
                        return (
                            <a key={action.link} href={action.link}
                                className="!bg-white dark:!bg-[#141416] border border-slate-200 dark:border-white/5 p-5 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer no-underline flex flex-col items-center gap-3"
                            >
                                <div className={`${action.iconBg} p-3.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent size={24} strokeWidth={2.5} className={action.iconColor} />
                                </div>
                                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 text-center">{t(action.labelKey)}</span>
                            </a>
                        );
                    })}
                </nav>

            </div>
        </main>
    );
};

export default AdminDashboard;
