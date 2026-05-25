import React from 'react';
import { TrendingUp, ShoppingCart, Users, Wrench } from 'lucide-react';
import { formatVND } from '../../Customers/utils/format';

const KPICard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
    <div className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{title}</p>
                <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{value}</h3>
            </div>
            <div className={`p-3.5 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} strokeWidth={2.5} />
            </div>
        </div>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            {subtitle}
        </p>
    </div>
);

export const KPICards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
                title="Doanh thu 30 ngày" 
                value={formatVND(stats.totalRevenue)} 
                icon={TrendingUp} 
                colorClass="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-500/20 dark:to-emerald-500/10 dark:text-emerald-400"
                subtitle="Tổng tiền đơn hàng đã hoàn thành"
            />
            <KPICard 
                title="Đơn hàng chờ xử lý" 
                value={stats.pendingOrdersCount?.toLocaleString('vi-VN') || '0'} 
                icon={ShoppingCart} 
                colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400"
                subtitle="Đơn hàng đang chờ được duyệt"
            />
            <KPICard 
                title="Khách hàng mới" 
                value={stats.newCustomers?.toLocaleString('vi-VN') || '0'} 
                icon={Users} 
                colorClass="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 dark:from-amber-500/20 dark:to-amber-500/10 dark:text-amber-400"
                subtitle="Khách đăng ký trong 30 ngày"
            />
            <KPICard 
                title="Lịch dịch vụ & Lái thử" 
                value={((stats.pendingAppointmentsCount || 0) + (stats.pendingTestDrivesCount || 0)).toLocaleString('vi-VN')} 
                icon={Wrench} 
                colorClass="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400"
                subtitle="Yêu cầu dịch vụ đang chờ xử lý"
            />
        </div>
    );
};
