import React from 'react';
import { CalendarDays, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

export const GreetingBanner = ({ stats }) => {
    const user = useSelector((state) => state.auth.user);
    const hour = dayjs().hour();

    let greeting = 'Chào buổi sáng';
    if (hour >= 12 && hour < 18) greeting = 'Chào buổi chiều';
    else if (hour >= 18) greeting = 'Chào buổi tối';

    const pendingAppointments = (stats.pendingAppointmentsCount || 0) + (stats.pendingTestDrivesCount || 0);
    const pendingOrders = stats.pendingOrdersCount || 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-3 text-sm">
                        <CalendarDays size={16} />
                        <span className="capitalize font-medium">{dayjs().format('dddd, DD MMMM YYYY')}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                        {greeting}, {user?.full_name || 'Admin'} <span className="inline-block origin-bottom-right hover:animate-wiggle cursor-default">👋</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 max-w-xl text-base leading-relaxed">
                        Theo dõi các chỉ số quan trọng hôm nay. Bạn đang có{' '}
                        <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingOrders} đơn hàng</span> và{' '}
                        <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingAppointments} lịch hẹn</span> đang chờ xử lý.
                    </p>
                </div>

                {/* Quick Alert Box */}
                {(pendingOrders > 0 || pendingAppointments > 0) && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-4 min-w-[280px]">
                        <div className="bg-amber-500 p-2.5 rounded-lg text-white flex-shrink-0">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-1">Cần xử lý ngay</p>
                            <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                                {pendingOrders > 0 && <li>• {pendingOrders} đơn hàng đang chờ duyệt</li>}
                                {pendingAppointments > 0 && <li>• {pendingAppointments} lịch dịch vụ/lái thử mới</li>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
