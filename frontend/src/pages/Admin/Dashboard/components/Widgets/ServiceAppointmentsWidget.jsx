import { Calendar, Clock, ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { SERVICE_STATUS_CONFIG } from '../../constants/dashboard.constants';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const iconMap = { AlertCircle, CheckCircle, XCircle };

export const ServiceAppointmentsWidget = ({ appointments }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('adminDashboard');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('widget_appointments_title')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('widget_appointments_subtitle')}</p>
                </div>
                <div className="p-2.5 bg-violet-50 dark:bg-violet-500/10 rounded-2xl">
                    <Calendar size={20} className="text-violet-500" />
                </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2">
                {appointments && appointments.length > 0 ? appointments.map((appt, idx) => {
                    const cfg = SERVICE_STATUS_CONFIG[appt.booking_status] || SERVICE_STATUS_CONFIG.PENDING;
                    const StatusIcon = iconMap[cfg.icon] || AlertCircle;
                    return (
                        <button key={appt._id || idx} onClick={() => navigate(`/admin/services/reception/${appt._id}`)} className="w-full text-left flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className={`p-2 rounded-xl ${cfg.bg} flex-shrink-0 mt-0.5`}>
                                <StatusIcon size={16} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-white truncate">
                                        {appt.customer_info?.full_name || t('widget_test_drive_customer')}
                                    </p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                                        {t(cfg.labelKey)}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{appt.vehicle_info?.brand} {appt.vehicle_info?.model} — {appt.vehicle_info?.license_plate}</p>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock size={11} />
                                        {appt.time_slot}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Calendar size={11} />
                                        {dayjs(appt.booking_date).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                }) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2 min-h-[160px]">
                        <Calendar size={32} className="opacity-20" />
                        <span className="text-sm">{t('widget_appointments_empty')}</span>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-white/5 text-center">
                <Link to="/admin/services/reception" className="inline-flex items-center gap-1 text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
                    {t('widget_appointments_view_all')} <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
};
