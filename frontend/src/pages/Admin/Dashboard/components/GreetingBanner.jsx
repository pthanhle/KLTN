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
        <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-100 mb-3 font-medium text-sm bg-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                        <CalendarDays size={16} />
                        <span className="capitalize">{dayjs().format('dddd, DD MMMM YYYY')}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                        {greeting}, {user?.full_name || 'Admin'} <span className="inline-block origin-bottom-right hover:animate-wiggle cursor-default">👋</span>
                    </h1>
                    <p className="text-indigo-100/90 max-w-xl text-base leading-relaxed">
                        Theo dõi các chỉ số quan trọng hôm nay. Bạn đang có <strong className="text-white bg-white/20 px-2 py-0.5 rounded-md mx-1">{pendingOrders} đơn hàng</strong> 
                        và <strong className="text-white bg-white/20 px-2 py-0.5 rounded-md mx-1">{pendingAppointments} lịch hẹn</strong> đang chờ xử lý.
                    </p>
                </div>

                {/* Quick Alert Box */}
                {(pendingOrders > 0 || pendingAppointments > 0) && (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-start gap-4 min-w-[280px]">
                        <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-300">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white mb-1">Cần xử lý ngay</p>
                            <ul className="text-xs text-indigo-100 space-y-1">
                                {pendingOrders > 0 && <li>• {pendingOrders} đơn hàng đang chờ duyệt</li>}
                                {pendingAppointments > 0 && <li>• {pendingAppointments} lịch dịch vụ/lái thử mới</li>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-1000"></div>
            <div className="absolute right-1/4 -bottom-32 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-3xl group-hover:translate-x-8 transition-transform duration-1000"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        </div>
    );
};
