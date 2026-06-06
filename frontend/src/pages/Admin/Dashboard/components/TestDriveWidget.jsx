import React from 'react';
import { Car, Clock, ArrowRight, CheckCircle, XCircle, AlertCircle, MapPin, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const STATUS_CONFIG = {
    PENDING:     { label: 'Chờ xác nhận', icon: AlertCircle, color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
    CONFIRMED:   { label: 'Đã xác nhận',  icon: CheckCircle, color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-500/10' },
    RECEIVED:    { label: 'Đã tiếp nhận', icon: CheckCircle, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    IN_PROGRESS: { label: 'Đang lái thử', icon: Car,         color: 'text-emerald-500',bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    COMPLETED:   { label: 'Hoàn tất',     icon: CheckCircle, color: 'text-teal-500',   bg: 'bg-teal-50 dark:bg-teal-500/10' },
    CANCELLED:   { label: 'Đã hủy',       icon: XCircle,     color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-500/10' },
};

export const TestDriveWidget = ({ bookings }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Lịch hẹn lái thử</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Các yêu cầu gần nhất</p>
                </div>
                <div className="p-2.5 bg-sky-50 dark:bg-sky-500/10 rounded-2xl">
                    <Car size={20} className="text-sky-500" />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
                {bookings && bookings.length > 0 ? bookings.map((booking, idx) => {
                    const statusKey = booking.booking_status || 'PENDING';
                    const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.PENDING;
                    const StatusIcon = cfg.icon;
                    const carName = booking.product_id?.name || 'Chưa chọn xe';
                    const isHome = booking.test_drive_type === 'home';

                    return (
                        <button
                            key={booking._id || idx}
                            onClick={() => navigate('/admin/test-drive-bookings')}
                            className="w-full text-left flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                            <div className={`p-2 rounded-xl ${cfg.bg} flex-shrink-0 mt-0.5`}>
                                <StatusIcon size={16} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                        {booking.customer_info?.full_name || 'Khách hàng'}
                                    </p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                                        {cfg.label}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{carName}</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {booking.time_slot}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {dayjs(booking.booking_date).format('DD/MM/YYYY')}
                                    </span>
                                    <span className={`flex items-center gap-1 text-xs ${isHome ? 'text-purple-500' : 'text-slate-400'}`}>
                                        {isHome ? <Home size={11} /> : <MapPin size={11} />}
                                        {isHome ? 'Tại nhà' : 'Showroom'}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                }) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[160px]">
                        <Car size={32} className="opacity-20" />
                        <span className="text-sm">Chưa có lịch lái thử nào</span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/test-drive-bookings" className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors">
                    Quản lý lịch lái thử <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};
