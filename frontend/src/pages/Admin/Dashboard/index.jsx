import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosClient from '../../../utils/axiosClient';
import { GreetingBanner } from './components/Widgets/GreetingBanner';
import { KPICards } from './components/Widgets/KPICards';
import { RevenueChart } from './components/Charts/RevenueChart';
import { RecentOrders } from './components/Widgets/RecentOrders';
import { MonthlyRevenueChart } from './components/Charts/MonthlyRevenueChart';
import { OrderStatusChart } from './components/Charts/OrderStatusChart';
import { TestDriveWidget } from './components/TestDriveWidget';
import { ServiceAppointmentsWidget } from './components/Widgets/ServiceAppointmentsWidget';
import { PageLoader } from '@/components/ui/page-loader';
import { RefreshCw, ShoppingCart, Users, Box, Settings } from 'lucide-react';
import dayjs from 'dayjs';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async (showRefreshing = false) => {
        if (showRefreshing) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await axiosClient.get('/admin/dashboard');
            setStats(res);
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading || !stats) {
        return <PageLoader />;
    }

    return (
        <div className="w-full flex justify-center pb-24 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>Tổng Quan | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Tổng quan</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Cập nhật lúc {lastUpdated ? dayjs(lastUpdated).format('HH:mm - DD/MM/YYYY') : '...'}
                        </p>
                    </div>
                    <button
                        onClick={() => fetchStats(true)}
                        disabled={refreshing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm disabled:opacity-60"
                    >
                        <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
                        {refreshing ? 'Đang tải...' : 'Làm mới'}
                    </button>
                </div>

                {/* Section 1: Greeting Banner */}
                <GreetingBanner stats={stats} />

                {/* Section 2: KPI Cards */}
                <KPICards stats={stats} />

                {/* Section 3: Revenue Area Chart + Order Status Donut */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <RevenueChart data={stats.dailyRevenue} />
                    </div>
                    <div className="xl:col-span-1">
                        <OrderStatusChart data={stats.orderStatusStats} />
                    </div>
                </div>

                {/* Section 4: Monthly Bar Chart + Recent Orders */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <MonthlyRevenueChart data={stats.monthlyRevenue} />
                    </div>
                    <div className="xl:col-span-1">
                        <RecentOrders orders={stats.recentOrders} />
                    </div>
                </div>

                {/* Section 5: Service Appointments + Low Stock */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <ServiceAppointmentsWidget appointments={stats.recentAppointments} />
                    <TestDriveWidget bookings={stats.recentTestDrives} />
                </div>

                {/* Section 6: Quick Action Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Đơn hàng', link: '/admin/orders', icon: ShoppingCart, gradient: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
                        { label: 'Khách hàng', link: '/admin/customers', icon: Users, gradient: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400' },
                        { label: 'Lịch dịch vụ', link: '/admin/services/reception', icon: Box, gradient: 'from-emerald-500 to-emerald-600', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
                        { label: 'Quản lý kho', link: '/admin/parts', icon: Settings, gradient: 'from-amber-500 to-amber-600', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
                    ].map((action) => {
                        const IconComponent = action.icon;
                        return (
                            <a key={action.link} href={action.link}
                                className="!bg-white dark:!bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer no-underline flex flex-col items-center gap-3"
                            >
                                <div className={`${action.iconBg} p-3.5 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent size={24} strokeWidth={2.5} className={action.iconColor} />
                                </div>
                                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 text-center">{action.label}</span>
                            </a>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
