import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GreetingBanner } from './components/Header/GreetingBanner';
import { KPICards } from './components/KPI/KPICards';
import { OrderStatusChart } from './components/Analytics/OrderStatusChart';
import { RevenueTrendChart } from './components/Analytics/RevenueTrendChart';
import { RecentOrders } from './components/Widgets/RecentOrders';
import { TestDriveWidget } from './components/Widgets/TestDriveWidget';
import { ServiceAppointmentsWidget } from './components/Widgets/ServiceAppointmentsWidget';
import { LowStockAlert } from './components/Widgets/LowStockAlert';
import { QuickActionsWidget } from './components/Widgets/QuickActionsWidget';
import { PageLoader } from '@/components/ui/page-loader';
import { DashboardSkeleton } from './components/Skeletons/DashboardSkeleton';
import { RefreshCw, BarChart3, ArrowRight } from 'lucide-react';
import dayjs from 'dayjs';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { useDashboardLogic } from './hooks/useDashboardLogic';

const AdminDashboard = () => {
    const { t } = useTranslation('adminDashboard');
    const { stats, loading, lastUpdated, refreshing, fetchStats, greetingKey } = useDashboardLogic();

    if (loading || !stats) {
        return (
            <div className="w-full flex justify-center pb-24 pt-4 md:pt-6">
                <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8">
                    <DashboardSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center pb-24 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>{t('title_dashboard')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                        <PageBreadcrumbs items={[{ label: t('title_dashboard') }]} />
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            {t('title_dashboard')}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {t('updated_at')} {lastUpdated ? dayjs(lastUpdated).format('HH:mm - DD/MM/YYYY') : '...'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
                        <Link
                            to="/admin/revenue-report"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-full font-black text-[11px] tracking-widest uppercase text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all no-underline"
                        >
                            <BarChart3 size={16} strokeWidth={2.5} />
                            {t('report_revenue')}
                            <ArrowRight size={16} strokeWidth={2.5} />
                        </Link>
                        <button
                            onClick={() => fetchStats(true)}
                            disabled={refreshing}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-[#1e1e20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full font-black text-[11px] tracking-widest uppercase active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-60"
                        >
                            <RefreshCw size={16} strokeWidth={2.5} className={refreshing ? 'animate-spin' : ''} />
                            {refreshing ? t('btn_refreshing').toUpperCase() : t('btn_refresh').toUpperCase()}
                        </button>
                    </div>
                </div>

                <GreetingBanner stats={stats} greetingKey={greetingKey} />

                <KPICards stats={stats} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <RevenueTrendChart data={stats.dailyRevenue} />
                    </div>
                    <div className="xl:col-span-1">
                        <OrderStatusChart data={stats.orderStatusStats} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <RecentOrders orders={stats.recentOrders} />
                    </div>
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <ServiceAppointmentsWidget appointments={stats.recentAppointments} />
                        <TestDriveWidget bookings={stats.recentTestDrives} />
                    </div>
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <QuickActionsWidget />
                        <LowStockAlert parts={stats.lowStockParts} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
