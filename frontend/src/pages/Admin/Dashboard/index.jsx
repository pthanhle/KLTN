import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axiosClient from '../../../utils/axiosClient';
import { GreetingBanner } from './components/GreetingBanner';
import { KPICards } from './components/KPICards';
import { RevenueChart } from './components/RevenueChart';
import { RecentOrders } from './components/RecentOrders';
import { MonthlyRevenueChart } from './components/MonthlyRevenueChart';
import { OrderStatusChart } from './components/OrderStatusChart';
import { LowStockAlert } from './components/LowStockAlert';
import { ServiceAppointmentsWidget } from './components/ServiceAppointmentsWidget';
import { PageLoader } from '@/components/ui/page-loader';
import { RefreshCw } from 'lucide-react';
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
                    <LowStockAlert parts={stats.lowStockParts} />
                </div>

                {/* Section 6: Quick Action Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Tạo đơn hàng', link: '/admin/orders', emoji: '🛒', color: 'from-blue-500 to-indigo-600' },
                        { label: 'Quản lý khách hàng', link: '/admin/customers', emoji: '👥', color: 'from-violet-500 to-purple-600' },
                        { label: 'Lịch dịch vụ', link: '/admin/service-reception', emoji: '🔧', color: 'from-emerald-500 to-teal-600' },
                        { label: 'Quản lý kho', link: '/admin/parts', emoji: '📦', color: 'from-amber-500 to-orange-600' },
                    ].map((action) => (
                        <a key={action.link} href={action.link}
                            className={`bg-gradient-to-br ${action.color} p-5 rounded-3xl text-white flex flex-col items-start gap-3 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group cursor-pointer no-underline`}
                        >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{action.emoji}</span>
                            <span className="font-bold text-sm leading-tight">{action.label}</span>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
