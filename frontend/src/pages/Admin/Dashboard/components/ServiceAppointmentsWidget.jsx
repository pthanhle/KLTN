import React from 'react';
import { Calendar, Clock, ArrowRight, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const STATUS_CONFIG = {
    PENDING:   { label: 'Chờ xác nhận', icon: AlertCircle, color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-500/10' },
    CONFIRMED: { label: 'Đã xác nhận',  icon: CheckCircle, color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-500/10' },
    ARRIVED:   { label: 'Đã đến',       icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    CANCELLED: { label: 'Đã hủy',       icon: XCircle,     color: 'text-red-500',    bg: 'bg-red-50 dark:bg-red-500/10' },
};

export const ServiceAppointmentsWidget = ({ appointments }) => {
    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Lịch hẹn dịch vụ</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Các yêu cầu gần nhất</p>
                </div>
                <div className="p-2.5 bg-violet-50 dark:bg-violet-500/10 rounded-2xl">
                    <Calendar size={20} className="text-violet-500" />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
                {appointments && appointments.length > 0 ? appointments.map((appt, idx) => {
                    const cfg = STATUS_CONFIG[appt.status] || STATUS_CONFIG.PENDING;
                    const StatusIcon = cfg.icon;
                    return (
                        <div key={appt._id || idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div className={`p-2 rounded-xl ${cfg.bg} flex-shrink-0 mt-0.5`}>
                                <StatusIcon size={16} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-white truncate">
                                        {appt.customerInfo?.fullName || 'Khách hàng'}
                                    </p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                                        {cfg.label}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{appt.vehicleInfo?.brand} {appt.vehicleInfo?.model} — {appt.vehicleInfo?.plateNumber}</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {appt.dropoffTimeWindow}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Calendar size={11} />
                                        {dayjs(appt.dropoffDate).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[160px]">
                        <Calendar size={32} className="opacity-20" />
                        <span className="text-sm">Chưa có lịch hẹn nào</span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/service-reception" className="inline-flex items-center gap-1 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
                    Quản lý lịch dịch vụ <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};
